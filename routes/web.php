<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NotificationPreferenceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RideController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('login', function () {
    return inertia('auth/Login');
});
Route::get('/', function () {
    return inertia('Home');
});
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
Route::post('/register',[AuthController::class, 'register'])->name('register');
Route::get('/register', function () {
    return inertia('auth/Register');
});

Route::get('/dashboard', [DashboardController::class,'index'])->middleware('auth')->name('dashboard');
Route::get('/profile', [ProfileController::class,'index'])->middleware('auth')->name('profile');
Route::post('/profile', [ProfileController::class,'update'])->middleware('auth')->name('profile.update');
Route::get('profile/{user}', [ProfileController::class, 'show'])->name('profile.show');
// Rides routes
Route::get('/rides', [RideController::class, 'index'])->name('rides.index');
Route::get('/rides/search', [RideController::class, 'search'])->name('rides.search');
Route::get('/rides/create', [RideController::class, 'create'])->name('rides.create')->middleware('auth');
Route::post('/rides', [RideController::class, 'store'])->name('rides.store')->middleware('auth');
Route::get('/rides/{ride}', [RideController::class, 'show'])->name('rides.show');
Route::get('/rides/{ride}/edit', [RideController::class, 'edit'])->name('rides.edit')->middleware('auth');
Route::patch('/rides/{ride}/complete', [RideController::class, 'complete'])->name('rides.complete')->middleware('auth');


Route::get('/rides/{ride}/book', [BookingController::class, 'create'])->name('bookings.create')->middleware('auth');
Route::get('/bookings/{booking}', [BookingController::class, 'show'])->name('bookings.show')->middleware('auth');
Route::middleware(['auth', 'ride.owner'])->group(function () {
    Route::put('/rides/{ride}', [RideController::class, 'update'])->name('rides.update');
    Route::patch('/rides/{ride}/cancel', [RideController::class, 'cancel'])->name('rides.cancel');
});

Route::middleware(['auth'])->group(function () {
    Route::post('/rides', [RideController::class, 'store'])->name('rides.store');
    Route::post('/rides/{ride}/book', [BookingController::class, 'store'])->name('rides.book');
});
Route::middleware(['auth'])->group(function () {

    Route::post('/bookings', [BookingController::class, 'create'])->name('bookings.create');
    Route::get('/bookings', [BookingController::class, 'index'])->name('bookings.index');
    Route::patch('/bookings/{booking}/cancel', [BookingController::class, 'cancel'])->name('bookings.cancel');
    Route::patch('/bookings/{booking}/confirm', [BookingController::class, 'confirm'])->name('bookings.confirm');
});

Route::middleware('auth')->group(function () {
    Route::post('/notification-preferences', [NotificationPreferenceController::class, 'store'])
        ->name('notification-preferences.store');
    Route::delete('/notification-preferences/{preference}', [NotificationPreferenceController::class, 'destroy'])
        ->name('notification-preferences.destroy');
});

