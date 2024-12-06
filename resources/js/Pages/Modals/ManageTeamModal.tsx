import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import TeamMemberManager from "../Teams/Partials/TeamMemberManager";
import {
    JetstreamTeamPermissions,
    Role,
    TeamInvitation,
    User,
  } from '@/types';

interface Team {
    id?: number;
    name?: string;
    currentTeam?: boolean;
    personal_team: boolean;
    created_at: Date;
    updated_at: Date;
}

interface Props {
    team: Team & {
      team_invitations: TeamInvitation[];
      users: UserMembership[];
    };
    availableRoles: Role[];
    userPermissions: JetstreamTeamPermissions;
  }

export default function ManageTeamModal({ team, availableRoles, permissions, onClose }: { team: Team, availableRoles: Role[], permissions: JetstreamTeamPermissions, onClose: () => void }) {

    const [userTeams, setUserTeams] = useState<Team[]>([]);


    useEffect(() => {
        const fetchUserTeams = async () => {
            try {
                const response = await window.axios.get('/api/user/teams');
                setUserTeams(response.data);
            } catch (error) {
                console.error('Error fetching user teams:', error);
            }
        }
        fetchUserTeams();
    }, []);

    const switchTeam = (teamId: number) => async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            await window.axios.put('/current-team', { team_id: teamId }).then(() => {
            window.location.reload();
            });
        } catch (error) {
            console.error('Error switching team:', error);
        }
    }


    return (
        <div>
            <div className="bg-gray-800 text-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
                <div className="sm:flex sm:items-start sm:justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-300">Teams</h3>
                </div>
                {/* List Teams */}
                <div className="mt-5">
                    <ul className="divide-y divide-gray-200">
                        {userTeams.map((team) => (
                            <li key={team.id} className="py-4 flex items-center justify-between">
                                <div className="flex w-0 flex-1 items-center">
                                    <span className="ml-2 flex-1 w-0 truncate">{team.name}</span>
                                    {team.currentTeam == false && (


                                        <a href="#"
                                            onClick={switchTeam(team.id)}
                                            className="text-gray-400 hover:text-green-500"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                <path fill-rule="evenodd" d="M15.97 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H7.5a.75.75 0 0 1 0-1.5h11.69l-3.22-3.22a.75.75 0 0 1 0-1.06Zm-7.94 9a.75.75 0 0 1 0 1.06l-3.22 3.22H16.5a.75.75 0 0 1 0 1.5H4.81l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
                                            </svg>

                                        </a>
                                    ) || <div className="text-gray-400">Current Team</div>}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                {permissions.canRemoveTeamMembers == true && (
                <div className="mt-5">
                    <TeamMemberManager
                        team={team}
                        availableRoles={availableRoles}
                        userPermissions={permissions} />
                </div>
)}
            </div>
        </div>
    );
}
