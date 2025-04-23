<?php

namespace App\Http\Controllers;

use App\Http\Requests\RideUpdateRequest;
use App\Models\Ride;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Inertia\Inertia;

class RideController extends Controller
{
    public function index()
{
    $rides = Ride::with('driver')->latest()->get();
    return Inertia::render('Rides', [
        'rides' => $rides
    ]);
}
public function show(Ride $ride) {
    return Inertia::render('Ride', [
        'ride' => $ride,
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


}
