<?php

namespace App\Policies;

use App\Models\Ride;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class RidePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Ride $ride): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Ride $ride): bool
    {
        return $user->id === $ride->driver_id && $ride->status === 'active';
    }
    public function cancel(User $user, Ride $ride): bool
    {
        return $user->id === $ride->driver_id && $ride->status === 'active';
    }


    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Ride $ride): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Ride $ride): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Ride $ride): bool
    {
        return false;
    }
}
