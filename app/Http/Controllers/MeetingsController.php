<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MeetingsController extends Controller
{
    public function create() {
        return Inertia::render('Meetings/Create');
    }

    public function store() {
        // Validate the request...
        $validated = request()->validate([
            'name' => 'required',
            'start_time' => 'required|date',
            'end_time' => 'nullable|date',
        ]);

        // dd(Auth::user()->currentTeam->meetings());

        Auth::user()->currentTeam->meetings()->create($validated);

        return redirect()->route('dashboard');
    }
}
