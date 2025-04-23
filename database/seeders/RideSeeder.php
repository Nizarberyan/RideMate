<?php

namespace Database\Seeders;

use App\Models\Ride;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RideSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Make sure we have at least one user
        $userId = DB::table('users')->first()->id ?? 1;

        // Create test rides
        $rides = [
            [
                'driver_id' => $userId,
                'start_location' => 'Cape Town',
                'end_location' => 'Johannesburg',
                'departure_datetime' => now()->addDays(2),
                'available_seats' => 3,
                'status' => 'active',
                'description' => 'Weekend trip to Johannesburg. Comfortable car with AC.',
                'distance_km' => 1400,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'driver_id' => $userId,
                'start_location' => 'Pretoria',
                'end_location' => 'Durban',
                'departure_datetime' => now()->addDays(1),
                'available_seats' => 2,
                'status' => 'active',
                'description' => 'Going to the beach for the weekend.',
                'distance_km' => 600,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'driver_id' => $userId,
                'start_location' => 'Johannesburg',
                'end_location' => 'Bloemfontein',
                'departure_datetime' => now()->addDays(5),
                'available_seats' => 4,
                'status' => 'active',
                'description' => 'Business trip, can share the ride.',
                'distance_km' => 400,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'driver_id' => $userId,
                'start_location' => 'Port Elizabeth',
                'end_location' => 'East London',
                'departure_datetime' => now()->addHours(12),
                'available_seats' => 1,
                'status' => 'active',
                'description' => 'Quick trip along the coast.',
                'distance_km' => 300,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'driver_id' => $userId,
                'start_location' => 'Durban',
                'end_location' => 'Cape Town',
                'departure_datetime' => now()->subDays(3),
                'available_seats' => 2,
                'status' => 'completed',
                'description' => 'Long road trip, completed last week.',
                'distance_km' => 1700,
                'created_at' => now()->subDays(5),
                'updated_at' => now()->subDays(2),
            ],
            [
                'driver_id' => $userId,
                'start_location' => 'Nelspruit',
                'end_location' => 'Pretoria',
                'departure_datetime' => now()->addDays(1),
                'available_seats' => 3,
                'status' => 'cancelled',
                'description' => 'Trip was cancelled due to car issues.',
                'distance_km' => 330,
                'created_at' => now()->subDays(2),
                'updated_at' => now()->subDays(1),
            ],
            [
                'driver_id' => $userId,
                'start_location' => 'Kimberley',
                'end_location' => 'Upington',
                'departure_datetime' => now()->addDays(7),
                'available_seats' => 2,
                'status' => 'active',
                'description' => 'Desert road trip, bring your own water.',
                'distance_km' => 400,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'driver_id' => $userId,
                'start_location' => 'Polokwane',
                'end_location' => 'Johannesburg',
                'departure_datetime' => now()->addDays(4),
                'available_seats' => 3,
                'status' => 'active',
                'description' => 'Regular commute back to the city.',
                'distance_km' => 300,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'driver_id' => $userId,
                'start_location' => 'Cape Town',
                'end_location' => 'George',
                'departure_datetime' => now()->addDays(10),
                'available_seats' => 2,
                'status' => 'active',
                'description' => 'Garden route journey, beautiful scenery.',
                'distance_km' => 430,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'driver_id' => $userId,
                'start_location' => 'Bloemfontein',
                'end_location' => 'Maseru',
                'departure_datetime' => now()->addDays(3),
                'available_seats' => 4,
                'status' => 'active',
                'description' => 'Trip to Lesotho, border crossing included.',
                'distance_km' => 140,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert all rides
        DB::table('rides')->insert($rides);
    }
}
