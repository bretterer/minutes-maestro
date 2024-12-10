<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('meetings', function ($user) {
    return true;
});

Broadcast::channel('meetings.{meeting}', function ($user, $meeting) {
    return true;
});
