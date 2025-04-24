<?php

namespace App\Notifications;

use App\Models\Ride;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewRideNotification extends Notification
{
    use Queueable;

    public function __construct(
        protected Ride $ride
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('New Ride Available!')
            ->line("A new ride has been posted from {$this->ride->start_location} to {$this->ride->end_location}")
            ->line("Departure: {$this->ride->departure_datetime}")
            ->line("Available seats: {$this->ride->available_seats}")
            ->action('View Ride', route('rides.show', $this->ride))
            ->line('Thank you for using our application!');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'ride_id' => $this->ride->id,
            'message' => "New ride available from {$this->ride->start_location} to {$this->ride->end_location}",
            'start_location' => $this->ride->start_location,
            'end_location' => $this->ride->end_location,
        ];
    }
}
