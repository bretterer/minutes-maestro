<?php

use App\Events\MeetingCreated;
use App\Events\NotesSaved;
use App\Http\Controllers\DashboardController;
use App\Models\Meeting;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Spatie\LaravelPdf\Facades\Pdf;
use function Spatie\LaravelPdf\Support\pdf;

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


    Route::post('/meetings', function (Request $request) {
        $request->validate([
            'name' => 'required',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
        ]);

        $meeting = new Meeting();
        $meeting->name = $request->name;
        $meeting->start_time = $request->start_time;
        $meeting->end_time = $request->end_time;

        $createdMeeting = auth()->user()->currentTeam->meetings()->save($meeting);

        // associate committees with meeting
        $committees = $request->committees ?? [];
        $createdMeeting->committees()->sync($committees);


        MeetingCreated::dispatch($createdMeeting);

        return response()->json($meeting, 201);

    })->name('meetings.store');


    Route::post('meetings/{meeting}/minutes', function (Meeting $meeting, Request $request) {
        // foreach committeeMinutes, save as a note
        foreach ($request->committeeMinutes as $committeeMinutes) {
            $meeting->notes()->updateOrCreate(
                [
                    'committee_id' => $committeeMinutes['committee_id'],
                    'meeting_id' => $meeting->id,
                ],
                [
                    'content' => $committeeMinutes['content'],
                    'user_id' => auth()->id(),
                ]
            );
        }
        NotesSaved::dispatch($meeting->fresh()->load('notes'));
        return response()->json($meeting->minutes, 201);
    })->name('minutes.store');


    Route::get('meetings/{meeting}/pdf', function (Meeting $meeting) {
        // return view('pdfs.meeting', ['meeting' => $meeting]);
        return pdf()->view('pdfs.meeting', ['meeting' => $meeting])
            ->headerHtml('<div>My header</div>')
            ->footerHtml('<div>My footer</div>')
            ->name("{$meeting->name}.pdf")
            ->download();

    })->name('minutes.pdf');


    Route::get('/dologout', function (Request $request) {

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    })->name('dologout');

});
