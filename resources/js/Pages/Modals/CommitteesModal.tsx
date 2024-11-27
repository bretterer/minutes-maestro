import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

interface Committee {
    id: number;
    name: string;
    notesCount: number;
}



export default function CommitteesModal({ committees, onClose }: { committees: Committee[], onClose: () => void }) {

    const form = useForm({
        name: '',
    });

    const [teamCommittees, setTeamCommittees] = useState<Committee[]>([]);

    useEffect(() => {
        const fetchTeamCommittees = async () => {
            try {
                const response = await window.axios.get('/api/committees');
                setTeamCommittees(response.data);
                form.setData('name', '');


            } catch (error) {
                console.error('Error fetching committees:', error);
            }
        };
        fetchTeamCommittees();
    }, []);


    const addCommittee = async () => {
        try {
            const response = await window.axios.post('/api/committees', {
                name: form.data.name,
            });
            setTeamCommittees([...teamCommittees, response.data]);
        } catch (error) {
            console.error('Error adding committee:', error);
        }
    };

    const removeCommittee = (committeeId: number) => async () => {
        try {
            await window.axios.delete(`/api/committees/${committeeId}`);
            setTeamCommittees(teamCommittees.filter(committee => committee.id !== committeeId));
        } catch (error) {
            console.error('Error removing committee:', error);
        }
    };

    return (
        <div>
            <div className="bg-gray-800 text-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
                <div className="sm:flex sm:items-start sm:justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-300">Committees</h3>

                </div>
                {/* Add new committee section */}
                <div className="mt-5">
                    <div className="flex justify-between">
                        <label htmlFor="committee" className="block text-sm font-medium text-gray-300">Add new committee</label>
                    </div>
                    <div className="mt-1 flex space-x-4">
                        <input
                            type="text"
                            id="committeeName"
                            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
                            value={form.data.name}
                            onChange={e => form.setData('name', e.currentTarget.value)}
                            autoFocus
                        />
                        <button
                            type="button"
                            className="p-4 rounded-lg text-sm font-medium text-gray-400 hover:text-gray-200 border-gray-600 bg-gray-700"
                            onClick={addCommittee}
                        >
                            Add
                        </button>
                    </div>
                </div>

                <div className="mt-5">
                    <ul className="divide-y divide-gray-200">
                        {teamCommittees.map((committee) => (
                            <li key={committee.id} className="py-4 flex items-center justify-between">
                                <div className="flex w-0 flex-1 items-center">
                                    <span className="ml-2 flex-1 w-0 truncate">{committee.name}</span>
                                    {/* If committee does not have notes, add remove button */}
                                    {committee.notesCount === 0 && (
                                        <button
                                            type="button"
                                            className="text-gray-400 hover:text-red-500"
                                            onClick={removeCommittee(committee.id)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                                <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    ) || <div className="text-gray-400">Cannot Delete, Notes exist!</div>}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )

}
