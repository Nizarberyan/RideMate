<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\RideController;
use App\Http\Controllers\testController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('login', function () {
    return inertia('auth/Login');
});
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
Route::get('register', function () {
    return inertia('auth/Register');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware('auth')->name('dashboard');

// Rides routes
Route::get('/rides', [RideController::class, 'index'])->name('rides.index');
Route::get('/rides/search', [RideController::class, 'search'])->name('rides.search');
Route::get('/rides/create', [RideController::class, 'create'])->name('rides.create')->middleware('auth');
Route::post('/rides', [RideController::class, 'store'])->name('rides.store')->middleware('auth');
Route::get('/rides/{ride}', [RideController::class, 'show'])->name('rides.show');
Route::get('/rides/{ride}/edit', [RideController::class, 'edit'])->name('rides.edit')->middleware('auth');
Route::put('/rides/{ride}', [RideController::class, 'update'])->name('rides.update')->middleware('auth');
Route::patch('/rides/{ride}/cancel', [RideController::class, 'cancel'])->name('rides.cancel')->middleware('auth');
Route::patch('/rides/{ride}/complete', [RideController::class, 'complete'])->name('rides.complete')->middleware('auth');

// Bookings routes
Route::get('/bookings', [BookingController::class, 'index'])->name('bookings.index')->middleware('auth');
Route::get('/rides/{ride}/book', [BookingController::class, 'create'])->name('bookings.create')->middleware('auth');
Route::post('/rides/{ride}/book', [BookingController::class, 'store'])->name('bookings.store')->middleware('auth');
Route::get('/bookings/{booking}', [BookingController::class, 'show'])->name('bookings.show')->middleware('auth');
Route::patch('/bookings/{booking}/cancel', [BookingController::class, 'cancel'])->name('bookings.cancel')->middleware('auth');
