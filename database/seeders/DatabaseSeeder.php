<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->withPersonalTeam()->create();

        $user = User::factory()->withPersonalTeam()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $user->currentTeam->meetings()->create([
            'name' => 'Test Meeting',
            'start_time' => now(),
            'end_time' => now()->addHour(),
        ]);

        $user->currentTeam->meetings()->create([
            'name' => 'Another Test Meeting',
            'start_time' => now()->addDay(),
            'end_time' => now()->addDay()->addHour(),
        ]);

        $user->currentTeam->meetings()->create([
            'name' => 'Yet Another Test Meeting',
            'start_time' => now()->addDays(2),
            'end_time' => now()->addDays(2)->addHour(),
        ]);

        $user->currentTeam->meetings()->create([
            'name' => 'Final Test Meeting',
            'start_time' => now()->addDays(3),
            'end_time' => now()->addDays(3)->addHour(),
        ]);

        $user->currentTeam->committees()->create([
            'name' => 'Test Committee',
        ]);

        $user->currentTeam->committees()->create([
            'name' => 'Another Test Committee',
        ]);

        $user->currentTeam->committees()->create([
            'name' => 'Yet Another Test Committee',
        ]);
    }
}
