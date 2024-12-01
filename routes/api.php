<?php

use App\Mail\MeetingShare;
use App\Models\Committee;
use App\Models\Meeting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
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


Route::get('/meetings/{meeting}/committees', function (Meeting $meeting) {
    return $meeting->committees;
})->middleware('auth:sanctum');


Route::post('/meetings/{meeting}/approveMinutes', function (Meeting $meeting) {
    $meeting->minutes_approved = true;
    $meeting->save();
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


Route::post('/meetings/{meeting}/send', function (Meeting $meeting) {

    //get all members of the team for the meeting
    $members = $meeting->team->allUsers();
    $mail = new MeetingShare($meeting);

    //send email to each member
    foreach ($members as $member) {
        Mail::to($member->email)->queue($mail);
    }


    return response()->json(['message' => 'Minutes sent', 'success' => true]);

})->middleware('auth:sanctum');
