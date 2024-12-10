import { Committee, Meeting, Note } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


type props = {
  meeting: Meeting;
  onClose: () => void;
  onEdit?: (newNotes: Note[]) => void;
};


export default function TakeMinutesForm({ meeting, onClose, onEdit }: props) {

    const form = useForm({
        committeeMinutes: {} as { [key: number]: string }, // Change to object
    });

    // console.log(meeting)

    const [committees, setCommittees] = useState<Committee[]>([]);
    const [notes, setNotes] = useState<Note[]>(meeting?.notes || [])
    const user = usePage().props.auth.user;


    const meetingTitle = meeting?.title || '';
    let meetingStart = '';
    let meetingEnd = '';
    if (meeting && meeting.start_time) {
        meetingStart = new Date(meeting.start_time).toISOString().slice(0, 16) || '';
    }

    if (meeting && meeting.end_time) {
        meetingEnd = new Date(meeting.end_time).toISOString().slice(0, 16) || '';
    }


    // get notes for committee from meeting based on committee_id
    const getNotes = (committee: Committee) => {
        if(meeting && meeting.notes) {
            const note = notes.find((note) => note.committee_id === committee.id);
            return note ? note.content : '';
        }
    }

    //on change handler for notes
    function handleNotesChange(content: string, committee: Committee){
        form.setData('committeeMinutes', {
          ...form.data.committeeMinutes,
          [committee.id]: content,
        });
        let newNotes = [...notes]
        let index = newNotes.findIndex((n) => n.committee_id === committee.id)
        //create a new note object
        if(index === -1){
            let newNote: Note = {
                committee_id: committee.id,
                content: content,
                created_at: new Date().toISOString(),
                meeting_id: meeting?.id.toString() || "",
                updated_at: new Date().toISOString(),
                user_id: user.id
            }
            newNotes.push(newNote)
        } else {
            //edit existing note
            newNotes[index].content = content
        }
        setNotes(newNotes)
    }

    const handleNotesUpdate = (content: string, committee: Committee) => {

        const response = window.axios.post(`/meetings/${meeting?.id}/minutes`, {
            committeeMinutes: Object.entries(form.data.committeeMinutes).map(([committeeId, content]) => ({
                committee_id: committeeId,
                content: content,
            })),
        });
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

            if(onEdit){
               onEdit(notes)
            }
            // Handle successful response (e.g., show a success message, close the modal)
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
                    disabled
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
                    disabled
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
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
                    {committees.map((committee) => (
                        <div key={committee.id}>
                            <label className="block text-gray-300 font-bold mb-2" htmlFor={`committee-${committee.id}`}>
                                {committee.name}
                            </label>
                            <ReactQuill
                                theme="snow"
                                className="bg-gray-800 text-gray-100"
                                id={`committee-${committee.id}`}
                                value={getNotes(committee)}
                                onChange={(content) => handleNotesChange(content, committee)}
                                onBlur={(content) => handleNotesUpdate(content, committee)}
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
