<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Laravel\Jetstream\Jetstream;

class DashboardController extends Controller
{
    public function index()
    {
        $meetings = auth()->user()->currentTeam->meetings()->with('notes')->orderBy('start_time')->where("start_time", ">=", now()->addHours(2))->get();
        $teamId = auth()->user()->currentTeam->id;

        $meetings->map(function ($meeting) {
            $meeting->load('team.committees');
            $meeting->title = $meeting->name;
            $meeting->date = $meeting->start_time->format('M d, Y');
            $meeting->time = $meeting->start_time->format('h:i A');
            $meeting->start = $meeting->start_time->format('Y-m-d\TH:i:s');
            $meeting->end = $meeting->end_time->format('Y-m-d\TH:i:s');

            return $meeting;
        });

        $recentMeetings = auth()->user()->currentTeam->meetings()
            ->orderBy('start_time')
            ->where("start_time", "<=", now())
            ->where("start_time", ">", now()->subMonth())
            ->with('notes')
            ->get();

        $recentMeetings->map(function ($meeting) {
            $meeting->load('committees');

            $meeting->notes = $meeting->notes->groupBy('committee_id')->map(function ($notes) {
                return $notes->pluck('content');
            });

            $meeting->title = $meeting->name;
            $meeting->date = $meeting->start_time->format('M d, Y');
            $meeting->time = $meeting->start_time->format('h:i A');
            $meeting->start = $meeting->start_time->format('Y-m-d\TH:i:s');
            $meeting->end = $meeting->end_time->format('Y-m-d\TH:i:s');
            $meeting->minutesApproved = $meeting->minutes_approved;

            return $meeting;
        });

        $team = Jetstream::newTeamModel()->findOrFail($teamId);


        return Inertia::render('Dashboard', [
            'meetings' => $meetings,
            'recentMeetings' => $recentMeetings,
            'team' => $team->load('owner', 'users', 'teamInvitations'),
            'availableRoles' => array_values(Jetstream::$roles),
            'availablePermissions' => Jetstream::$permissions,
            'defaultPermissions' => Jetstream::$defaultPermissions,
            'permissions' => [
                'canAddTeamMembers' => Gate::check('addTeamMember', $team),
                'canDeleteTeam' => Gate::check('delete', $team),
                'canRemoveTeamMembers' => Gate::check('removeTeamMember', $team),
                'canUpdateTeam' => Gate::check('update', $team),
                'canUpdateTeamMembers' => Gate::check('updateTeamMember', $team),
            ],
        ]);
    }
}
