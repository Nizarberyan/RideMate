<?php

namespace App\Http\Controllers;

use App\Models\Ride;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function deleteUser(User $user) {
        $user->delete();
        return back();
    }
    public function deleteRide(Ride $ride) {
        $ride->delete();
        return back();
    }
}
