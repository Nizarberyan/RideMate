<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'remember_token',
        'driver_status',
        'driver_opted_in_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'driver_opted_in_at' => 'datetime',
    ];

    const DRIVER_STATUS_INACTIVE = 'inactive';
    const DRIVER_STATUS_ACTIVE = 'active';

    public function rides(): HasMany
    {
        return $this->hasMany(Ride::class);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(RideReview::class);
    }

    public function isActiveDriver(): bool
    {
        return $this->driver_status === self::DRIVER_STATUS_ACTIVE;
    }

    public function activateAsDriver(): void
    {
        $this->update([
            'driver_status' => self::DRIVER_STATUS_ACTIVE,
            'driver_opted_in_at' => now(),
        ]);
    }

    public function deactivateAsDriver(): void
    {
        $this->update([
            'driver_status' => self::DRIVER_STATUS_INACTIVE,
            'driver_opted_in_at' => null,
        ]);
    }
    public function notificationPreferences(): HasMany
    {
        return $this->hasMany(NotificationPreference::class);
    }

}
