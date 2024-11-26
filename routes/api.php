<?php

use App\Models\Meeting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::get('/committees', function () {
    $user = auth()->user();

    if ($user->currentTeam) {
        return $user->currentTeam->committees;
    }
})->middleware('auth:sanctum');



Route::get('/meetings/{meeting}/committees', function (Meeting $meeting) {
    return $meeting->committees;
})->middleware('auth:sanctum');


Route::post('/meetings/{meeting}/approveMinutes', function (Meeting $meeting) {
    $meeting->minutes_approved = true;
    $meeting->save();
    return response()->json(['message' => 'Minutes approved']);
})->middleware('auth:sanctum');
