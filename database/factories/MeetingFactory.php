<?php

namespace Database\Factories;

use App\Models\Organization;
use App\Models\Team;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class MeetingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startTime = now()->createFromDate($this->faker->dateTimeBetween('now', '+1 year'));
        $endTime = $startTime->clone()->addMinutes(array_rand([30, 60, 90, 120]));
        return [
            'name' => $this->faker->sentence,
            'start_time' => $startTime,
            'end_time' => $endTime,
            'team_id' => Team::factory(),
        ];
    }
}
