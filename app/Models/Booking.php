<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Booking extends Model
{
    use HasFactory;


    protected $fillable = [
        'ride_id',
        'passenger_id',
        'seats_booked',
        'status',
        'total_price',
        'passenger_notes',
        'pickup_location',
        'dropoff_location',
        'is_rated',
    ];


    protected $casts = [
        'seats_booked' => 'integer',
        'total_price' => 'decimal:2',
        'is_rated' => 'boolean',
    ];


    public function ride(): BelongsTo
    {
        return $this->belongsTo(Ride::class);
    }

    public function passenger(): BelongsTo
    {
        return $this->belongsTo(User::class, 'passenger_id');
    }


    public function reviews(): HasMany
    {
        return $this->hasMany(RideReview::class);
    }

  
}
