<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Meeting extends Model
{
    use HasFactory;
    use HasUlids;

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];

    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    /**
     * Get all of the committees for the Meeting
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function committees(): BelongsToMany
    {
        return $this->belongsToMany(Committee::class, 'committees_meetings');
    }

    public function notes(): HasMany
    {
        return $this->hasMany(Note::class);
    }



    public static function upcomingMeetings(): Collection
    {
        $meetings = auth()->user()->currentTeam->meetings()->with('notes')->orderBy('start_time')->where("start_time", ">=", now()->addHours(2))->get();

        $meetings->map(function ($meeting) {
            $meeting->load('team.committees');
            $meeting->load('committees');
            $meeting->title = $meeting->name;
            $meeting->date = $meeting->start_time->format('M d, Y');
            $meeting->time = $meeting->start_time->format('h:i A');
            $meeting->start = $meeting->start_time->format('Y-m-d\TH:i:s');
            $meeting->end = $meeting->end_time->format('Y-m-d\TH:i:s');
            $meeting->notes = $meeting->notes->groupBy('committee_id')->map(function ($notes) {
                return $notes->pluck('content');
            });
            $meeting->permissions = [
                'canTakeNotes' => auth()->user()->can('takeNotes', $meeting),
                'canApproveMinutes' => auth()->user()->can('approveMinutes', $meeting),
            ];

            return $meeting;
        });

        return $meetings;
    }

    public static function recentMeetings(): Collection
    {
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

            $meeting->permissions = [
                'canTakeNotes' => auth()->user()->can('takeNotes', $meeting),
                'canApproveMinutes' => auth()->user()->can('approveMinutes', $meeting),
            ];

            return $meeting;
        });

        return $recentMeetings;
    }


}
