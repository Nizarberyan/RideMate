<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index() {
        $user = auth()->user();
        $notificationPreferences = $user->notificationPreferences()->pluck('city')->toArray();

        return Inertia::render('Settings',['notificationPreferences' => $notificationPreferences,]);
    }
}
