import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Meeting = {
    id: number;
    title: string;
    date: string;
    start_time: string;
    end_time: string;
    time: string;
    host: string;
    attendees: string[];
    minutesAvailable?: boolean;
    summary?: string;
    agenda?: string[];
    discussionPoints?: string[];
    actionItems?: string[];
    notes?: string;
};

interface Committee {
    id: number;
    name: string;
}

export default function TakeMinutesForm({ meeting, onClose }: { meeting?: Meeting, onClose: () => void }) {

    const form = useForm({
        committeeMinutes: {} as { [key: number]: string }, // Change to object
    });


    const [committees, setCommittees] = useState<Committee[]>([]);

    const [agenda, setAgenda] = useState("");
    const [discussionPoints, setDiscussionPoints] = useState("");
    const [actionItems, setActionItems] = useState("");
    const [notes, setNotes] = useState("");

    const meetingTitle = meeting?.title || '';
    let meetingStart = '';
    let meetingEnd = '';
    if (meeting && meeting.start_time) {
        meetingStart = new Date(meeting.start_time).toISOString().slice(0, 16) || '';
    }

    if (meeting && meeting.end_time) {
        meetingEnd = new Date(meeting.end_time).toISOString().slice(0, 16) || '';
    }


    useEffect(() => {
        const fetchCommittees = async () => {
            try {

                const response = await window.axios.get(`/api/meetings/${meeting?.id}/committees`);
                setCommittees(response.data);

            } catch (error) {
                console.error('Error fetching committees:', error);
            }


        };

        fetchCommittees();
    }, [meeting?.id]);



    const handleSubmit = async () => {
        try {
            const response = await window.axios.post(`/meetings/${meeting?.id}/minutes`, {
                committeeMinutes: Object.entries(form.data.committeeMinutes).map(([committeeId, content]) => ({
                    committee_id: committeeId,
                    content: content,
                })),
            });

            // Handle successful response (e.g., show a success message, close the modal)
            console.log('Minutes saved:', response.data);
            onClose();

        } catch (error) {
            console.error('Error saving minutes:', error);
            // Handle errors (e.g., display an error message)
        }
    };



    return (
        <div className="bg-gray-800 text-gray-100 rounded-lg shadow-lg p-8 max-w-4xl w-full">
            <link rel="stylesheet" type="text/css" href="/css/QuillCustom.css" />

            <h3 className="text-3xl font-semibold text-gray-100 mb-6">
                Take Meeting Minutes
            </h3>

            {/* Title */}
            <div className="mb-4">
                <label className="block text-gray-300 font-bold mb-2" htmlFor="title">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    placeholder="Enter meeting title"
                    className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
                    defaultValue={meetingTitle}
                />
            </div>

            {/* Start Time */}
            <div className="mb-4">
                <label className="block text-gray-300 font-bold mb-2" htmlFor="startTime">
                    Start Time
                </label>
                <input
                    type="datetime-local"
                    id="startTime"
                    className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
                    defaultValue={meetingStart}
                />
            </div>

            {/* End Time */}
            <div className="mb-4">
                <label className="block text-gray-300 font-bold mb-2" htmlFor="endTime">
                    End Time
                </label>
                <input
                    type="datetime-local"
                    id="endTime"
                    className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
                    defaultValue={meetingEnd}
                />
            </div>

            {/* Attendees */}
            <div className="mb-4">
                <label className="block text-gray-300 font-bold mb-2" htmlFor="attendees">
                    Attendees
                </label>
                <input
                    type="text"
                    id="attendees"
                    placeholder="Enter attendees separated by commas"
                    className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
                />
            </div>


            {/* Each Committee gets a Quill */}
            <div className="mb-4">
                <label className="block text-gray-300 font-bold mb-2" htmlFor="committeeMinutes">
                    Committee Minutes
                </label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {committees.map((committee) => (
                        <div key={committee.id}>
                            <label className="block text-gray-300 font-bold mb-2" htmlFor={`committee-${committee.id}`}>
                                {committee.name}
                            </label>
                            <ReactQuill
                                theme="snow"
                                className="bg-gray-800 text-gray-100"
                                id={`committee-${committee.id}`}
                                value={form.data.committeeMinutes[committee.id] || ""}
                                onChange={(content) => {
                                    form.setData('committeeMinutes', {
                                        ...form.data.committeeMinutes,
                                        [committee.id]: content
                                    });
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-8">
                <button
                    onClick={onClose}
                    className="bg-gray-600 text-gray-200 py-3 px-6 rounded-lg shadow-md mr-4 hover:bg-gray-700 focus:outline-none"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
                >
                    Save Minutes
                </button>
            </div>
        </div>
    );
}
