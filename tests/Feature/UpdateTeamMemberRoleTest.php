<?php

use App\Models\User;

test('team member roles can be updated', function () {
    $this->actingAs($user = User::factory()->withPersonalTeam()->create());

    $user->currentTeam->users()->attach(
        $otherUser = User::factory()->create(), ['role' => 'admin']
    );

    $this->put('/teams/'.$user->currentTeam->id.'/members/'.$otherUser->id, [
        'role' => 'secretary',
    ]);

    expect($otherUser->fresh()->hasTeamRole(
        $user->currentTeam->fresh(), 'secretary'
    ))->toBeTrue();
});

test('only team owner can update team member roles', function () {
    $user = User::factory()->withPersonalTeam()->create();

    $user->currentTeam->users()->attach(
        $otherUser = User::factory()->create(), ['role' => 'admin']
    );

    $this->actingAs($otherUser);

    $this->put('/teams/'.$user->currentTeam->id.'/members/'.$otherUser->id, [
        'role' => 'editor',
    ]);

    expect($otherUser->fresh()->hasTeamRole(
        $user->currentTeam->fresh(), 'admin'
    ))->toBeTrue();
});
