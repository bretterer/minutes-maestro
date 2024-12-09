<?php

namespace App\Events;

use App\Models\Meeting;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MeetingCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public $meeting)
    {
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

    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('meetings'),
        ];
    }
}
