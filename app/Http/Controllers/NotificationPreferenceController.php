<?php

namespace App\Http\Controllers;

use App\Models\NotificationPreference;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationPreferenceController extends Controller
{
    public function store(Request $request)
    {

        $request->validate([
            'cities' => 'required|string',
        ]);


        $cities = array_map('trim', explode(',', $request->input('cities')));


        foreach ($cities as $city) {
            if (strlen($city) === 0 || strlen($city) > 255) {
                return back()->withErrors(['cities' => 'Each city name must be between 1 and 255 characters.']);
            }
        }

        $user = auth()->user();


        $user->notificationPreferences()->delete();


        foreach ($cities as $city) {
            $user->notificationPreferences()->create([
                'city' => $city,
            ]);
        }
        $notificationPreferences = $user->notificationPreferences()->pluck('city')->toArray();

        return redirect()->route('settings');
 }

    public function destroy(NotificationPreference $preference)
    {
        $this->authorize('delete', $preference);
        $preference->delete();

        return back()->with('success', 'Notification preference removed.');
    }
}
