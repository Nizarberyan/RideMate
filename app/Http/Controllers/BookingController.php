<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Ride;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with(['ride.driver'])
            ->where('user_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('Bookings', [
            'bookings' => $bookings
        ]);
    }

    public function store(Ride $ride)
    {
        try {

            if ($ride->status !== 'active') {
                throw ValidationException::withMessages([
                    'ride' => ['This ride is no longer available.']
                ]);
            }


            if ($ride->available_seats <= 0) {
                throw ValidationException::withMessages([
                    'ride' => ['No seats available for this ride.']
                ]);
            }


            if ($ride->driver_id === auth()->id()) {
                throw ValidationException::withMessages([
                    'ride' => ['You cannot book your own ride.']
                ]);
            }


            $existingBooking = Booking::where('user_id', auth()->id())
                ->where('ride_id', $ride->id)
                ->whereNotIn('status', ['cancelled'])
                ->first();

            if ($existingBooking) {
                throw ValidationException::withMessages([
                    'ride' => ['You already have a booking for this ride.']
                ]);
            }

            $booking = Booking::create([
                'user_id' => auth()->id(),
                'ride_id' => $ride->id,
                'status' => 'pending'
            ]);


            $ride->decrement('available_seats');

            return redirect()->route('bookings.index')
                ->with('success', 'Booking created successfully!');

        } catch (ValidationException $e) {
            return back()->withErrors($e->errors());
        } catch (\Exception $e) {
            return back()->with('error', 'Something went wrong while creating your booking. ' . $e->getMessage());
        }
    }
    public function confirm(Booking $booking) {
        $booking->update(['status' => 'confirmed']);
        return redirect()->back()->with('success', 'Booking confirmed successfully.');
    }
    public function cancel(Booking $booking) {
        $booking->update(['status' => 'cancelled']);
        return redirect()->back()->with('success', 'Booking cancelled successfully.');
    }
}
