<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Organization extends Model
{
    use HasFactory;
    use HasUlids;

    public function committees(): HasMany
    {
        return $this->hasMany(Committee::class);
    }

    public function meetings(): HasMany
    {
        return $this->hasMany(Meeting::class);
    }

    public function notes(): HasManyThrough
    {
        return $this->hasManyThrough(Note::class, Committee::class);
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
