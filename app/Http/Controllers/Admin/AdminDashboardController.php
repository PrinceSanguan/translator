<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class AdminDashboardController extends Controller
{
    public function index()
    {

        $users = User::where('user_role', '!=', 'admin')
            ->latest()
            ->get();

        return Inertia::render('Admin/AdminDashboard', [
            'users' => $users
        ]);
    }
}
