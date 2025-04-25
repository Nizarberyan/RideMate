<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Ride;
use App\Models\Booking;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();


        if (!$user) {
            return Inertia::render('auth/Login',);
        }

        $userId = $user->id;


        $ridesCount = Ride::where('driver_id', $userId)->count();


        $upcomingRides = Ride::where('driver_id', $userId)
            ->where('status', 'active')
            ->where('departure_datetime', '>', now())
            ->count();


        $completed = Ride::where('driver_id', $userId)->where('status', 'completed')->count();
        $cancelled = Ride::where('driver_id', $userId)->where('status', 'cancelled')->count();
        $active = Ride::where('driver_id', $userId)->where('status', 'active')->count();

        $ridesStatus = [
            'completed' => $completed,
            'cancelled' => $cancelled,
            'active' => $active,
        ];


        $bookingsCount = Booking::where('user_id', $userId)->count();


        $notifications = $user->unreadNotifications()->count();



        $userRides = Ride::where('driver_id', $userId)
            ->orderBy('departure_datetime', 'desc')
            ->get(['id', 'start_location', 'end_location', 'departure_datetime', 'status']);

        $ridesWithBookings = Ride::with([
            'driver',                 // eager load driver relation
            'bookings' => function ($query) {
                $query->where('status', 'pending')->with('user');
            }
        ])
            ->where('driver_id', $userId)
            ->where('status', 'active')
            ->get();



        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ],
            ],
            'stats' => [
                'ridesCount' => $ridesCount,
                'bookingsCount' => $bookingsCount,
                'upcomingRides' => $upcomingRides,
                'notifications' => $notifications,
                'ridesStatus' => $ridesStatus,
            ],
            'rides' => $userRides,
            'ridesWithBookings' => $ridesWithBookings,
        ]);
    }
}
