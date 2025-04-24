<?php

namespace App\Http\Controllers;

use App\Models\NotificationPreference;
use Illuminate\Http\Request;

class NotificationPreferenceController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'city' => 'required|string|max:255',
        ]);

        auth()->user()->notificationPreferences()->create($validated);

        return back()->with('success', 'Notification preference added successfully.');
    }

    public function destroy(NotificationPreference $preference)
    {
        $this->authorize('delete', $preference);
        $preference->delete();

        return back()->with('success', 'Notification preference removed.');
    }
}
