<?php
namespace App\Actions;

use App\Mail\MeetingApprovedNotification;
use Illuminate\Support\Facades\Mail;

class ApproveMeetingAction
{
    public function execute($meeting)
    {
        // Approve the meeting
        $this->approveMeeting($meeting);

        // Email the meeting owner
        $this->sendEmailNotificationToOwner($meeting);

        return $meeting;
    }

    public function approveMeeting($meeting)
    {
        $meeting->minutes_approved = true;
        $meeting->save();
    }

    public function sendEmailNotificationToOwner($meeting)
    {
        Mail::to($meeting->team->owner->email)
            ->send(new MeetingApprovedNotification($meeting));
    }
}
