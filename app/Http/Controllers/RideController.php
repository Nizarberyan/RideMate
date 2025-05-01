<?php

namespace App\Http\Controllers;

use App\Events\RideCreated;
use App\Http\Requests\RideUpdateRequest;
use App\Http\Requests\StoreRideRequest;
use App\Models\Ride;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class RideController extends Controller
{
    public function index()
{
    $rides = Ride::with('driver')->latest()->get();
    $ridesWithCarbonSaving = $rides->map(function ($ride) {
        return array_merge($ride->toArray(), ['carbonSavingKg' => $ride->carbonSavingKg()]);
    });
    return Inertia::render('Rides', [
        'rides' => $ridesWithCarbonSaving
    ]);
}
public function show(Ride $ride) {

    return Inertia::render('Ride', [
        'ride' => $ride->load('driver'),
        'carbonSavingKg' => $ride->carbonSavingKg(),
        'flash' => [
            'error' => session('error'),
            'success' => session('success')
        ]
    ]);
}
    public function update(RideUpdateRequest $request, Ride $ride)
{
    if ($ride->driver_id !== Auth::id()) {
        return back()->with('error', 'You are not authorized to update this ride.');
    }

    if ($ride->status !== 'active') {
        return back()->with('error', 'This ride cannot be modified anymore.');
    }

    try {
        $ride->update($request->validated());
        return back()->with('success', 'Ride updated successfully.');
    } catch (\Exception $e) {
        return back()->with('error', 'Failed to update ride. Please try again.');
    }
}
    public function cancel(Ride $ride) {
        $ride->update(['status' => 'cancelled']);
        return redirect()->back()->with('success', 'Ride cancelled successfully.');
    }
    public function create() {
        return Inertia::render('CreateRide');
    }
    public function store(StoreRideRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $departure_datetime = $validated['departure_date'] . ' ' . $validated['departure_time'];

        Log::info('Creating new ride', [
            'start_location' => $validated['start_location'],
            'end_location' => $validated['end_location']
        ]);

        $ride = Ride::create([
            'driver_id' => auth()->id(),
            'start_location' => $validated['start_location'],
            'end_location' => $validated['end_location'],
            'departure_datetime' => $departure_datetime,
            'available_seats' => $validated['available_seats'],
            'distance_km' => $validated['distance_km'],
            'description' => $validated['description'],
            'status' => 'active',
        ]);

        Log::info('Ride created', ['ride_id' => $ride->id]);

        // Debug: Check for notification preferences
        $interestedUsers = \App\Models\NotificationPreference::query()
            ->where('is_active', true)
            ->where(function ($query) use ($ride) {
                $query->where('city', $ride->start_location)
                    ->orWhere('city', $ride->end_location);
            })
            ->with('user')
            ->get();

        Log::info('Found interested users for notification', [
            'count' => $interestedUsers->count(),
            'users' => $interestedUsers->map(fn($pref) => [
                'user_id' => $pref->user_id,
                'email' => $pref->user->email,
                'city' => $pref->city
            ])
        ]);

        return redirect()
            ->route('rides.index')
            ->with('success', 'Ride created successfully!');
    }
    public function complete(Ride $ride) {
        $ride->update(['status' => 'completed']);
        $carbonSavingKg = $ride->carbonSavingKg();
        Log::info($carbonSavingKg > 0 ? 'Carbon saving found' : 'No carbon saving found', []);
        $bookedUsers = $ride->bookings()
            ->where('status', 'confirmed')
            ->with('user')
            ->get()
            ->pluck('user')
            ->filter();
        foreach ($bookedUsers as $user) {
            $user->increment('carbon_saving_kg', $carbonSavingKg);
            Log::info('Carbon saving incremented', []);
        }
        Log::info('Ride completed', []);

        return redirect()->back()->with('success', 'Ride completed successfully.');
    }





}
