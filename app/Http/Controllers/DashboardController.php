<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index() {
        $meetings = auth()->user()->currentTeam->meetings;

        $meetings->map(function ($meeting) {
            $meeting->load('team.committees');
            $meeting->title = $meeting->name;
            $meeting->date = $meeting->start_time->format('M d, Y');
            $meeting->time = $meeting->start_time->format('h:i A');
            $meeting->start = $meeting->start_time->format('Y-m-d\TH:i:s');
            $meeting->end = $meeting->end_time->format('Y-m-d\TH:i:s');

            return $meeting;
        });



        return Inertia::render('Dashboard', [
            'meetings' => $meetings,
        ]);
    }
}
