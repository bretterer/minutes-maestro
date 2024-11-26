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

        $committee1 = $user->currentTeam->committees()->create([
            'name' => 'Test Committee',
        ]);

        $committee2 = $user->currentTeam->committees()->create([
            'name' => 'Another Test Committee',
        ]);

        $committee3 = $user->currentTeam->committees()->create([
            'name' => 'Yet Another Test Committee',
        ]);


        $meeting1 = $user->currentTeam->meetings()->create([
            'name' => 'Test Meeting',
            'start_time' => now(),
            'end_time' => now()->addHour(),
        ]);
        $meeting1->committees()->attach($committee1);
        $meeting1->committees()->attach($committee2);

        $meeting2 = $user->currentTeam->meetings()->create([
            'name' => 'Another Test Meeting',
            'start_time' => now()->addDay(),
            'end_time' => now()->addDay()->addHour(),
        ]);
        $meeting2->committees()->attach($committee2);
        $meeting2->committees()->attach($committee3);

        $meeting3 = $user->currentTeam->meetings()->create([
            'name' => 'Yet Another Test Meeting',
            'start_time' => now()->addDays(2),
            'end_time' => now()->addDays(2)->addHour(),
        ]);
        $meeting3->committees()->attach($committee1);
        $meeting3->committees()->attach($committee3);

        $meeting4 = $user->currentTeam->meetings()->create([
            'name' => 'Final Test Meeting',
            'start_time' => now()->addDays(3),
            'end_time' => now()->addDays(3)->addHour(),
        ]);
        $meeting4->committees()->attach($committee1);
        $meeting4->committees()->attach($committee2);
        $meeting4->committees()->attach($committee3);

        // create notes for each meeting
        $meeting1->notes()->create([
            'content' => 'Test Note 1',
            'committee_id' => $committee1->id,
            'user_id' => $user->id,
        ]);

        $meeting1->notes()->create([
            'content' => 'Test Note 2',
            'committee_id' => $committee2->id,
            'user_id' => $user->id,
        ]);

        $meeting2->notes()->create([
            'content' => 'Test Note 3',
            'committee_id' => $committee2->id,
            'user_id' => $user->id,
        ]);

        $meeting2->notes()->create([
            'content' => 'Test Note 4',
            'committee_id' => $committee3->id,
            'user_id' => $user->id,
        ]);

        $meeting3->notes()->create([
            'content' => 'Test Note 5',
            'committee_id' => $committee1->id,
            'user_id' => $user->id,
        ]);

        $meeting3->notes()->create([
            'content' => 'Test Note 6',
            'committee_id' => $committee3->id,
            'user_id' => $user->id,
        ]);

        $meeting4->notes()->create([
            'content' => 'Test Note 7',
            'committee_id' => $committee1->id,
            'user_id' => $user->id,
        ]);

        $meeting4->notes()->create([
            'content' => 'Test Note 8',
            'committee_id' => $committee2->id,
            'user_id' => $user->id,
        ]);

        $meeting4->notes()->create([
            'content' => 'Test Note 9',
            'committee_id' => $committee3->id,
            'user_id' => $user->id,
        ]);


    }
}
