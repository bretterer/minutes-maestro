<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Laravel\Jetstream\Jetstream;

class DashboardController extends Controller
{
    public function index()
    {

        $teamId = auth()->user()->currentTeam->id;
        $meetings = Meeting::upcomingMeetings();
        $recentMeetings = Meeting::recentMeetings();
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
