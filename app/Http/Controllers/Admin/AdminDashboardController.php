<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Tracker;
use Illuminate\Support\Facades\DB;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $users = User::where('user_role', '!=', 'admin')
            ->latest()
            ->get();

        // Get analytics data from tracker
        $dailyVisits = Tracker::daily()->count();
        $monthlyVisits = Tracker::monthly()->count();

        // Count unique visitors by IP for today
        $dailyUniqueVisitors = Tracker::daily()
            ->distinct('ip_address')
            ->count('ip_address');

        // Count unique visitors by IP for this month
        $monthlyUniqueVisitors = Tracker::monthly()
            ->distinct('ip_address')
            ->count('ip_address');

        // Get top 5 most visited pages this month
        $topPages = Tracker::monthly()
            ->select('url', DB::raw('count(*) as count'))
            ->groupBy('url')
            ->orderBy('count', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($item) {
                return [
                    'url' => $item->url,
                    'count' => $item->count
                ];
            });

        return Inertia::render('Admin/AdminDashboard', [
            'users' => $users,
            'analytics' => [
                'dailyVisits' => $dailyVisits,
                'monthlyVisits' => $monthlyVisits,
                'dailyUniqueVisitors' => $dailyUniqueVisitors,
                'monthlyUniqueVisitors' => $monthlyUniqueVisitors,
                'topPages' => $topPages
            ]
        ]);
    }
}
