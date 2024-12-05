import { Committee, Meeting, Note } from '@/types';
import React, { useState } from 'react';
import { FaPencilAlt, FaEnvelope, FaPrint, FaFilePdf } from 'react-icons/fa';
import TakeMinutesForm from './TakeMinutesForm';
import ReactQuill from 'react-quill';

interface ReviewMinutesModalProps {
  meeting: Meeting;
  onClose: () => void;
}

export default function ReviewMinuets({
  meeting,
  onClose,
}: ReviewMinutesModalProps) {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [editedNotes, setEditedNotes] = useState(meeting.notes || []);
  const [showApproveButton, setShowApproveButton] = useState(
    !meeting.minutesApproved,
  );

  const handleNotesChange = (notes: Note[]) => {
    setEditedNotes(notes);
  };

  const handleApproveMinutes = async () => {
    try {
      const response = await window.axios.post(
        `/api/meetings/${meeting.id}/approveMinutes`,
      );
      meeting.minutesApproved = true;
      setShowApproveButton(false);
    } catch (error) {
      console.error('Error approving minutes:', error);
    }
  };

  const handleShare = () => {
    // Create the mailto link to share the notes via email
    const subject = encodeURIComponent(`Meeting Notes: ${meeting.title}`);
    const body = encodeURIComponent(
      `Here are the meeting notes for "${meeting.title}":\n\n${meeting.notes}`,
    );
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;

    // Open the email client
    window.location.href = mailtoLink;
  };

  const handlePrint = () => {
    // Logic for printing or saving as PDF
    const printContent = document.getElementById('print-content');
    if (printContent) {
      const printWindow = window.open('', '_blank');
      printWindow?.document.write(printContent.innerHTML);
      printWindow?.document.close();
      printWindow?.print();
    }
  };

  const handlePdf = () => {
    // open new tab with pdf url
    window.open(`/meetings/${meeting.id}/pdf`, '_blank');
  };

  const getNotes = (committee: Committee) => {
    if (meeting && meeting.notes) {
      const note = editedNotes.find(note => note.committee_id === committee.id);
      return note ? note.content : '';
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 text-white rounded-lg shadow-lg p-8 max-w-3xl w-full"
        onClick={e => e.stopPropagation()}
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
            ) : null}
            <button className="text-green-500" onClick={handleShare}>
              <FaEnvelope className="text-xl" />
            </button>
            <button className="text-yellow-500" onClick={handlePdf}>
              <FaFilePdf className="text-xl" />
            </button>
          </div>
          {isEditingNotes ? (
            <div className="h-96 overflow-y-auto">
              <TakeMinutesForm
                meeting={meeting}
                onClose={() => setIsEditingNotes(false)}
                onEdit={handleNotesChange}
              />
            </div>
          ) : (
            <>
              {meeting.committees?.map(committee => (
                <div key={committee.id}>
                  <label
                    className="block text-gray-300 font-bold mb-2"
                    htmlFor={`committee-${committee.id}`}
                  >
                    {committee.name}
                  </label>
                  <ReactQuill
                    theme="snow"
                    className="bg-gray-800 text-gray-100"
                    id={`committee-${committee.id}`}
                    value={getNotes(committee)}
                    readOnly
                  />
                </div>
              ))}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
