<?php

use App\Models\User;

test('a user can see new meeting button on dashboard', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get('/dashboard');

    $response->assertSee('Create Meeting');
});

test('a user can fill out meeting fields and submit', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get('/meetings/create');

    $response->assertSee('Create Meeting');

    $response = $this->post('/meetings', [
        'name' => 'My First Meeting',
        'start' => '2021-01-01 12:00',
        'end' => '2021-01-01 13:00',
    ]);

    $response->assertRedirect('/dashboard');
    $this->assertDatabaseHas('meetings', [
        'name' => 'My First Meeting',
        'start_time' => '2021-01-01 12:00',
        'end_time' => '2021-01-01 13:00',
    ]);
});
