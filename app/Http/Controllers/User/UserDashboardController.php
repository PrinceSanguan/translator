<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\User;

class UserDashboardController extends Controller
{
    /**
     * The maximum number of translations allowed per minute.
     */
    const MAX_TRANSLATIONS_PER_MINUTE = 3;

    /**
     * Display the user dashboard.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        /** @var User $user */
        $user = Auth::user();

        // Update last login timestamp
        if ($user) {
            DB::table('users')
                ->where('id', $user->id)
                ->update(['last_login_at' => now()]);

            // Refresh user data after update
            $user = User::find($user->id);
        }

        return Inertia::render('User/Dashboard', [
            'user' => $user ? [
                'name' => $user->name,
                'email' => $user->email,
                'avatar' => $user->avatar,
                'translations_count' => $user->translations_count,
                'joined_date' => $user->created_at->format('M d, Y'),
                'last_login' => $user->last_login_at ? $user->last_login_at->diffForHumans() : null,
            ] : null,
        ]);
    }

    /**
     * Translate text using Gemini API.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function translate(Request $request)
    {
        // Validate the request
        $request->validate([
            'text' => 'required|string|max:1000',
        ]);

        // Get the authenticated user
        $user = Auth::user();
        $userId = $user->id;

        // Check rate limit
        $cacheKey = "user:{$userId}:translations";
        $translationsInMinute = Cache::get($cacheKey, []);

        // Clean up old entries (older than 1 minute)
        $now = Carbon::now();
        $translationsInMinute = array_filter($translationsInMinute, function ($timestamp) use ($now) {
            return Carbon::parse($timestamp)->diffInSeconds($now) < 60;
        });

        // Check if user has exceeded rate limit
        if (count($translationsInMinute) >= self::MAX_TRANSLATIONS_PER_MINUTE) {
            return response()->json([
                'error' => 'Rate limit exceeded',
                'message' => 'You can only make ' . self::MAX_TRANSLATIONS_PER_MINUTE . ' translations per minute.',
                'cooldown' => 60 - Carbon::parse(min($translationsInMinute))->diffInSeconds($now)
            ], 429);
        }

        // Get the text to translate
        $textToTranslate = $request->text;

        // Get the API key from config
        $apiKey = Config::get('services.gemini.api_key');

        // Create system prompt
        $systemPrompt = "In the following text, translate the text into English. "
            . "Make it to the point. "
            . "Do not add any other text to the response. "
            . "Check first if the text is in English, if it is, just return the text. "
            . "Check if the text is in Tagalog, if it is, translate it into English but if it is not, "
            . "just return the text'.";

        // Create messages array for Gemini API
        $messages = [
            [
                'role' => 'user',
                'parts' => [
                    [
                        'text' => $systemPrompt . "\n\nText to translate: " . $textToTranslate
                    ]
                ]
            ]
        ];

        try {
            // Make request to Gemini API
            $response = Http::post("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={$apiKey}", [
                'contents' => $messages,
                'generationConfig' => [
                    'temperature' => 0.7,
                    'topP' => 0.95,
                    'topK' => 40,
                    'maxOutputTokens' => 1000,
                ]
            ]);

            // Check if the response is successful
            if ($response->successful()) {
                $result = $response->json();

                // Extract the translation from the response
                $translation = $result['candidates'][0]['content']['parts'][0]['text'] ?? 'Translation failed';

                // Update user's translation count
                DB::table('users')->where('id', $user->id)->increment('translations_count');

                // Update rate limiting cache
                $translationsInMinute[] = $now->toDateTimeString();
                Cache::put($cacheKey, $translationsInMinute, 60);

                // Return the translation
                return response()->json([
                    'translation' => $translation,
                    'status' => 'success',
                    'remaining' => self::MAX_TRANSLATIONS_PER_MINUTE - count($translationsInMinute)
                ]);
            } else {
                return response()->json([
                    'error' => 'Translation service error',
                    'message' => 'The translation service is currently unavailable. Please try again later.',
                    'details' => $response->json()
                ], 500);
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Translation failed',
                'message' => 'An error occurred during translation.',
                'details' => $e->getMessage()
            ], 500);
        }
    }
}
