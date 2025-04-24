<?php

namespace App\Listeners;

use App\Events\RideCreated;
use App\Models\NotificationPreference;
use App\Notifications\NewRideNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;

class NotifyInterestedUsers implements ShouldQueue
{
    public function handle(RideCreated $event): void
    {
        Log::info('NotifyInterestedUsers listener started', [
            'ride_id' => $event->ride->id,
            'start_location' => $event->ride->start_location,
            'end_location' => $event->ride->end_location
        ]);

        $interestedUsers = NotificationPreference::query()
            ->where('is_active', true)
            ->where(function ($query) use ($event) {
                $query->where('city', $event->ride->start_location)
                    ->orWhere('city', $event->ride->end_location);
            })
            ->with('user')
            ->get();

        Log::info('Found interested users in listener', [
            'count' => $interestedUsers->count(),
            'preferences' => $interestedUsers->map(fn($pref) => [
                'user_id' => $pref->user_id,
                'email' => $pref->user->email,
                'city' => $pref->city
            ])
        ]);

        foreach ($interestedUsers as $preference) {
            try {
                $preference->user->notify(new NewRideNotification($event->ride));
                Log::info('Notification sent successfully', [
                    'user_id' => $preference->user_id,
                    'email' => $preference->user->email
                ]);
            } catch (\Exception $e) {
                Log::error('Failed to send notification', [
                    'user_id' => $preference->user_id,
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
            }
        }
    }
}
