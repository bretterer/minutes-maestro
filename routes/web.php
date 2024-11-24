<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Landing Page
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Authenticated Routes
Route::middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified'])->group(function () {

    // Dashboard Route
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Review Minutes (Static View)
    Route::get('/review-minutes', function () {
        return Inertia::render('ReviewMinutes');
    })->name('review-minutes');

    // Review Minutes by ID
    Route::get('/review-minutes/{id}', function ($id) {
        return Inertia::render('ReviewMinutes', ['id' => $id]);
    })->name('review-minutes-id');

    // Take Minutes Form Route
    Route::get('/take-minutes', function () {
        return Inertia::render('TakeMinutesForm');
    })->name('take-minutes');
});
