import React, { useState } from "react";
import { FaPencilAlt, FaEnvelope, FaPrint } from "react-icons/fa"; 

interface Meeting {
  title: string;
  date: string;
  summary?: string; 
  agenda?: string[]; 
  discussionPoints?: string[]; 
  actionItems?: string[]; 
  notes?: string; 
}

interface ReviewMinutesModalProps {
  meeting: Meeting; 
  onClose: () => void;
}

export default function ReviewMinuets({ meeting, onClose }: ReviewMinutesModalProps) {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [editedNotes, setEditedNotes] = useState(meeting.notes || "");

  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedNotes(event.target.value);
  };

  const handleSaveNotes = () => {
    // Logic to save notes (e.g., send it to an API or update the state)
    setIsEditingNotes(false);
  };

  const handleShare = () => {
    // Create the mailto link to share the notes via email
    const subject = encodeURIComponent(`Meeting Notes: ${meeting.title}`);
    const body = encodeURIComponent(`Here are the meeting notes for "${meeting.title}":\n\n${meeting.notes}`);
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    
    // Open the email client
    window.location.href = mailtoLink;
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
            <button
              className="text-blue-500"
              onClick={() => setIsEditingNotes(!isEditingNotes)}
            >
              <FaPencilAlt className="text-lg" />
            </button>
            <button className="text-green-500" onClick={handleShare}>
              <FaEnvelope className="text-lg" />
            </button>
            <button className="text-yellow-500" onClick={handlePrint}>
              <FaPrint className="text-lg" />
            </button>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-lg">Meeting Summary</h3>
            <p>{meeting.summary}</p>
          </div>

          <div className="mt-4">
            <h3 className="font-bold text-lg">Agenda</h3>
            <ul className="list-disc pl-5">
              {meeting.agenda?.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="font-bold text-lg">Discussion Points</h3>
            <ul className="list-disc pl-5">
              {meeting.discussionPoints?.map((point: string, index: number) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="font-bold text-lg">Action Items</h3>
            <ul className="list-disc pl-5">
              {meeting.actionItems?.map((action: string, index: number) => (
                <li key={index}>{action}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="font-bold text-lg">Additional Notes</h3>
            {isEditingNotes ? (
              <div>
                <textarea
                  value={editedNotes}
                  onChange={handleNotesChange}
                  className="w-full p-2 border border-gray-600 bg-gray-700 text-gray-100 rounded-lg"
                  rows={5}
                />
                <div className="flex justify-end mt-2">
                  <button
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg"
                    onClick={handleSaveNotes}
                  >
                    Save Notes
                  </button>
                </div>
              </div>
            ) : (
              <p>{meeting.notes}</p>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
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
