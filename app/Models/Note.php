<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Note extends Model
{
    use HasFactory;
    use HasUlids;

    public function meeting(): BelongsTo
    {
        return $this->belongsTo(Meeting::class);
    }

    public function committee(): BelongsTo
    {
        return $this->belongsTo(Committee::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }



}
