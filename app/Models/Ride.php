<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ride extends Model
{
    use HasFactory;
    protected $fillable = [
        'driver_id',
        'start_location',
        'end_location',
        'departure_datetime',
        'available_seats',
        'status',
        'description',
    ];

    protected $casts = [
        'departure_datetime' => 'datetime',
        'price' => 'decimal:2',
    ];

    public function driver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'driver_id');
    }
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }


}
