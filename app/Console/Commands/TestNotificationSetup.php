<?php

namespace App\Console\Commands;

use App\Models\NotificationPreference;
use App\Models\User;
use App\Models\Ride;
use App\Notifications\NewRideNotification;
use Illuminate\Console\Command;

class TestNotificationSetup extends Command
{
    protected $signature = 'notification:setup-test';
    protected $description = 'Setup and test notification system';

    public function handle()
    {
        // Get the first user
        $user = User::first();
        if (!$user) {
            $this->error('No users found!');
            return 1;
        }

        $this->info("Testing with user: {$user->email}");

        // Create a notification preference
        $preference = NotificationPreference::updateOrCreate(
            [
                'user_id' => $user->id,
                'city' => 'Test City'
            ],
            [
                'user_id' => $user->id,  // Make sure it's included here too
                'city' => 'Test City',
                'is_active' => true
            ]
        );

        $this->info("Created notification preference for city: Test City");

        // Create a test ride
        $ride = Ride::create([
            'driver_id' => $user->id,
            'start_location' => 'Test City', // Match the notification preference
            'end_location' => 'Another City',
            'departure_datetime' => now()->addDays(1),
            'available_seats' => 4,
            'distance_km' => 100,
            'description' => 'Test ride',
            'status' => 'active',
        ]);

        $this->info("Created test ride");

        // Manually test notification
        try {
            $user->notify(new NewRideNotification($ride));
            $this->info("Test notification sent directly");
        } catch (\Exception $e) {
            $this->error("Failed to send notification: " . $e->getMessage());
        }

        // Check mail configuration
        $this->info("Current mail configuration:");
        $this->table(
            ['Config Key', 'Value'],
            [
                ['MAIL_MAILER', config('mail.default')],
                ['MAIL_HOST', config('mail.mailers.smtp.host')],
                ['MAIL_PORT', config('mail.mailers.smtp.port')],
                ['MAIL_USERNAME', config('mail.mailers.smtp.username') ? 'Set' : 'Not set'],
                ['MAIL_FROM_ADDRESS', config('mail.from.address')],
            ]
        );

        return 0;
    }
}
