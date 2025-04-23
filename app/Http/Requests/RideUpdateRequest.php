<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RideUpdateRequest extends FormRequest
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
            'departure_datetime' => ['required', 'date', 'after:now'],
            'available_seats' => ['required', 'integer', 'min:0'],
            'description' => ['nullable', 'string', 'max:1000'],
            'distance_km' => ['nullable', 'numeric', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'departure_datetime.after' => 'The departure time must be in the future.',
            'available_seats.min' => 'The number of available seats cannot be negative.',
            'distance_km.min' => 'The distance cannot be negative.',
        ];
    }
}
