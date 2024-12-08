<?php

use App\Actions\ApproveMeetingAction;
use App\Models\Committee;
use App\Models\Meeting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::get('/committees', function () {
    $user = auth()->user();

    if ($user->currentTeam) {
        $committees = $user->currentTeam->committees;

        $committees->map(function ($committee) {
            $committee->notesCount = $committee->notes->count();
            return $committee;
        });

        return $committees;

    }
})->middleware('auth:sanctum');

Route::post('/committees', function (Request $request) {
    $request->validate([
        'name' => 'required',
    ]);

    $committee = new Committee();
    $committee->name = $request->name;
    $committee->team_id = auth()->user()->currentTeam->id;
    $committee->save();

    return $committee;
})->middleware('auth:sanctum');

Route::delete('/committees/{committee}', function (Committee $committee) {
    $committee->delete();
    return response()->json(['message' => 'Committee deleted']);
})->middleware('auth:sanctum');

Route::get('/meetings/upcoming', function () {
    return Meeting::upcomingMeetings();
})->middleware('auth:sanctum');

Route::get('/meetings/recent', function () {
    return Meeting::recentMeetings();
})->middleware('auth:sanctum');

Route::delete('/meetings/{meeting}', function (Meeting $meeting) {
    $meeting->notes()->delete();
    $meeting->committees()->detach();

    $meeting->delete();
    return response()->json(['message' => 'Meeting deleted']);
})->middleware('auth:sanctum');

Route::get('/meetings/{meeting}/committees', function (Meeting $meeting) {
    return $meeting->committees;
})->middleware('auth:sanctum');


Route::post('/meetings/{meeting}/approveMinutes', function (Meeting $meeting) {
    (new ApproveMeetingAction())->execute($meeting);
    return response()->json(['message' => 'Minutes approved']);
})->middleware('auth:sanctum');


Route::get('/team', function () {
    return auth()->user()->currentTeam;
})->middleware('auth:sanctum');

Route::get('/user/teams', function () {
    $teams = auth()->user()->allTeams();

    $teams->map(function ($team) {
        $team->currentTeam = $team->id === auth()->user()->currentTeam->id;
        return $team;
    });

    return $teams;
})->middleware('auth:sanctum');
