<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('meetings', function ($user) {
    return true;
});
