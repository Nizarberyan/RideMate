<?php

namespace App\Http\Middleware;

use App\Models\Ride;
use Closure;
use Illuminate\Http\Request;

class CheckRideOwnership
{
    public function handle(Request $request, Closure $next)
    {
        $ride = $request->route('ride');

        if (!$ride || $ride->driver_id !== auth()->id() || $ride->status !== 'active') {
            return redirect()->back()->with('error', 'You are not authorized to modify this ride.');
        }

        return $next($request);
    }
}
