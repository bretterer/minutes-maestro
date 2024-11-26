<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

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



}
