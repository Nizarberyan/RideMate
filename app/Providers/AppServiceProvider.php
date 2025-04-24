<?php

namespace App\Providers;

use App\Events\RideCreated;
use App\Listeners\NotifyInterestedUsers;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    protected $listen = [
        RideCreated::class => [
            NotifyInterestedUsers::class,
        ],
    ];
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
