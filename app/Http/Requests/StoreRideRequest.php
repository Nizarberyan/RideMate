<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRideRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'start_location' => ['required', 'string', 'max:255'],
            'end_location' => ['required', 'string', 'max:255'],
            'departure_date' => ['required', 'date', 'after_or_equal:today'],
            'departure_time' => ['required', 'date_format:H:i'],
            'available_seats' => ['required', 'integer', 'min:1', 'max:99'],
            'distance_km' => ['required', 'numeric', 'min:0.1'],
            'description' => ['nullable', 'string', 'max:1000'],
        ];
    }

    public function messages(): array
    {
        return [
            'departure_date.after_or_equal' => 'The departure date must be today or a future date.',
            'available_seats.min' => 'There must be at least one available seat.',
            'distance_km.min' => 'The distance must be greater than 0 kilometers.',
        ];
    }


}
