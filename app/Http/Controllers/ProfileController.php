<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


class ProfileController extends Controller
{
    public function index()
    {
        Log::info('Profile page viewed', ['user_id' => Auth::id()]);
        return Inertia::render('Profile', ['user' => Auth::user()]);
    }

    public function update(Request $request)
    {
        $user = Auth::user();
//        dd($request);
        Log::info('Profile update requested', [
            'user_id' => $user->id,
            'fields' => $request->only(['name', 'email', 'bio']),
            'has_avatar' => $request->hasFile('avatar')
        ]);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
            'bio' => 'sometimes|nullable|string|max:1000',
            'avatar' => 'sometimes|file|image|max:2048', // max 2MB image
        ]);

        if ($request->hasFile('avatar')) {
            if ($user->photo && Storage::disk('public')->exists($user->photo)) {

                Storage::disk('public')->delete($user->photo);
            }
            $path = $request->file('avatar')->store('avatars', 'public');
            $validated['photo'] = $path;
            Log::info('Avatar uploaded', [
                'user_id' => $user->id,
                'path' => $path
            ]);
        }

        $user->update($validated);

        Log::info('Profile updated successfully', [
            'user_id' => $user->id,
            'updated_fields' => array_keys($validated)
        ]);

        return Inertia::render('Profile', ['user' => Auth::user(), 'flash' => ['success' => 'Profile updated successfully.']]);
    }
    public function show(User $user) {
        $rides = $user->rides()->where('status', 'active')->get();
        return Inertia::render('SocialProfile', ['user' => $user, 'rides' => $rides ]);
    }
    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('register');
    }
}
