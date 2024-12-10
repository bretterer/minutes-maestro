<?php

use App\Models\User;

test('a user can see new meeting button on dashboard', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get('/dashboard');

    $response->assertSee('Create Meeting');
});

