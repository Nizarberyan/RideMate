<?php
namespace App\Models;

use App\Events\RideCreated;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Log;

class Ride extends Model
{
    use HasFactory;
    protected $fillable = [
        'driver_id',
        'start_location',
        'end_location',
        'departure_datetime',
        'available_seats',
        'distance_km',
        'description',
        'status',
    ];
    protected $dispatchesEvents = [
        'created' => RideCreated::class,
    ];


    protected $casts = [
        'departure_datetime' => 'datetime',
        'distance_km' => 'float',
        'available_seats' => 'integer',
    ];
    protected static function booted()
    {
        static::created(function ($ride) {
            Log::info('Ride created event triggered', [
                'ride_id' => $ride->id,
                'start_location' => $ride->start_location,
                'end_location' => $ride->end_location
            ]);
        });
    }


    public function driver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'driver_id');
    }
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
    public function reviews(): HasMany
    {
        return $this->hasMany(RideReview::class);
    }
    public function carbonSavingKg(): float {
        $distanceKm = $this->distance_km;
        $passengers = $this->available_seats + 1;
        $averageEmission = 150;

        $emissionAlone = $distanceKm * $averageEmission;
        $emissionShared = $emissionAlone / $passengers;
        $carbonSavedGrams = $emissionAlone - $emissionShared;
        return round ($carbonSavedGrams / 1000, 2);

    }
}
