<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use App\Models\FreeTrialUsage;

class HomeController extends Controller
{
    /**
     * Display the homepage.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('Welcome');
    }

    /**
     * Maximum number of free translations allowed
     */
    const MAX_FREE_TRANSLATIONS = 2;

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
            'text' => 'required|string',
        ]);

        // Get client IP address
        $ipAddress = $request->ip();
        $userId = $request->user()->id ?? null;

        // Check if this IP has reached the free trial limit
        $usageCount = $this->checkFreeTrialUsage($ipAddress, $userId);

        // If usage exceeds limit and user is not logged in, return limit reached message
        if ($usageCount >= self::MAX_FREE_TRANSLATIONS && !$userId) {
            return response()->json([
                'translation' => "You've reached the limit of free translations. Please sign in to continue using our service!",
                'status' => 'limit_reached',
                'remainingTranslations' => 0
            ], 403);
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

                // Record this translation usage
                $this->recordTranslationUsage($ipAddress, $userId);

                // Calculate remaining translations for free users
                $remainingTranslations = $userId ? null : (self::MAX_FREE_TRANSLATIONS - $usageCount - 1);

                return response()->json([
                    'translation' => $translation,
                    'status' => 'success',
                    'remainingTranslations' => $remainingTranslations
                ]);
            } else {
                return response()->json([
                    'translation' => 'Translation service is currently unavailable. Please try again later.',
                    'status' => 'error',
                    'error' => $response->json()
                ], 500);
            }
        } catch (\Exception $e) {
            return response()->json([
                'translation' => 'An error occurred during translation.',
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Check and return the number of free trial usages for this IP/user
     * 
     * @param string $ipAddress
     * @param int|null $userId
     * @return int
     */
    private function checkFreeTrialUsage($ipAddress, $userId = null)
    {
        if ($userId) {
            // If user is logged in, don't count against free trial
            return 0;
        }

        // Count usages by this IP address
        return FreeTrialUsage::where('ip_address', $ipAddress)
            ->where('created_at', '>=', now()->subDays(30)) // Only count last 30 days
            ->count();
    }

    /**
     * Record a translation usage
     * 
     * @param string $ipAddress
     * @param int|null $userId
     * @return void
     */
    private function recordTranslationUsage($ipAddress, $userId = null)
    {
        // Only record for non-authenticated users
        if (!$userId) {
            FreeTrialUsage::create([
                'ip_address' => $ipAddress,
                'user_agent' => request()->userAgent(),
                'text_length' => strlen(request()->text)
            ]);
        }
    }
}
