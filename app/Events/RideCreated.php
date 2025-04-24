<?php

namespace App\Events;

use App\Models\Ride;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class RideCreated
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public Ride $ride
    ) {
        Log::info('RideCreated event constructed', [
            'ride_id' => $ride->id,
            'start_location' => $ride->start_location,
            'end_location' => $ride->end_location
        ]);
    }
}
