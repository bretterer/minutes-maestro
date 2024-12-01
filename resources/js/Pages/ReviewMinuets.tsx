import React, { useState } from "react";
import { FaPencilAlt, FaEnvelope, FaPrint, FaFilePdf } from "react-icons/fa";

interface Meeting {
    id: string;
    title: string;
    date: string;
    summary?: string;
    agenda?: string[];
    discussionPoints?: string[];
    minutesApproved?: boolean;
    actionItems?: string[];
    notes?: Note[];
    committees?: Committee[];
}

interface Note {
    content: string;
    committee_id: string;
}

interface Committee {
    id: string;
    name: string;
}


interface ReviewMinutesModalProps {
    meeting: Meeting;
    onClose: () => void;
}

export default function ReviewMinuets({ meeting, onClose }: ReviewMinutesModalProps) {
    const [isEditingNotes, setIsEditingNotes] = useState(false);
    const [editedNotes, setEditedNotes] = useState(meeting.notes || "");
    const [showApproveButton, setShowApproveButton] = useState(!meeting.minutesApproved);

    const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditedNotes(event.target.value);
    };

    const handleSaveNotes = () => {
        // Logic to save notes (e.g., send it to an API or update the state)
        setIsEditingNotes(false);
    };

    const handleApproveMinutes = async () => {
        try {
            const response = await window.axios.post(`/api/meetings/${meeting.id}/approveMinutes`);
            meeting.minutesApproved = true;
            setShowApproveButton(false);
        } catch (error) {
            console.error('Error approving minutes:', error);
        }
    };


    const handleShare = async () => {
        try {
            const response = await window.axios.post(`/api/meetings/${meeting.id}/send`)
            .then((response) => {
                console.log(response);
                // Logic to show a success message or error message
                if(response.data.success) {
                    alert('Meeting minutes shared successfully');
                }
            });

        } catch (error) {
            console.error('Error approving minutes:', error);
        }
    };

    const handlePrint = () => {
        // Logic for printing or saving as PDF
        const printContent = document.getElementById("print-content");
        if (printContent) {
            const printWindow = window.open("", "_blank");
            printWindow?.document.write(printContent.innerHTML);
            printWindow?.document.close();
            printWindow?.print();
        }
    };

    const handlePdf = () => {
        // open new tab with pdf url
        window.open(`/meetings/${meeting.id}/pdf`, "_blank");
    };

    return (
        <div
            className="fixed inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-gray-900 text-white rounded-lg shadow-lg p-8 max-w-3xl w-full"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Print content section */}
                <div id="print-content">
                    <h2 className="text-2xl font-semibold">{meeting.title}</h2>
                    <p className="text-sm text-gray-400">Meeting Date: {meeting.date}</p>

                    {/* Icons for actions */}
                    <div className="flex space-x-4 mt-4 mb-4">
                        {!meeting.minutesApproved ? (
                        <button
                            className="text-blue-500"
                            onClick={() => setIsEditingNotes(!isEditingNotes)}
                        >
                            <FaPencilAlt className="text-xl" />
                        </button>
                        ): null}
                        <button className="text-green-500" onClick={() => handleShare()}>
                            <FaEnvelope className="text-xl" />
                        </button>
                        <button className="text-yellow-500" onClick={handlePdf}>
                            <FaFilePdf className="text-xl" />
                        </button>
                    </div>


                    {meeting.committees?.map((committee) => (
                        <div key={committee.id} className="mt-6">
                            <h3 className="font-bold text-lg">{committee.name}</h3>
                            {meeting.notes
                                ?.filter((note) => note.committee_id === committee.id)
                                .map((note, index) => (
                                    <div key={index} className="mt-2">
                                        <p>{note.content}</p>
                                    </div>
                                )) || <p>No notes for this committee</p>
                            }
                        </div>
                    ))}

                </div>

                <div className="mt-8 flex justify-end space-x-2">
                    {showApproveButton && (
                        <button
                            className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
                            onClick={handleApproveMinutes}
                        >
                            Approve
                        </button>
                    )}
                    <button
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
