import React from "react";

export default function ReviewMinutesModal({ meeting, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center z-50"
      onClick={onClose} // Close modal when clicking outside
    >
      <div
        className="bg-gray-900 text-white rounded-lg shadow-lg p-8 max-w-3xl w-full"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <h2 className="text-2xl font-semibold">{meeting.title}</h2>
        <p className="text-sm text-gray-400">Meeting Date: {meeting.date}</p>

        <div className="mt-6">
          <h3 className="font-bold text-lg">Meeting Summary</h3>
          <p>{meeting.summary}</p>
        </div>

        <div className="mt-4">
          <h3 className="font-bold text-lg">Agenda</h3>
          <ul className="list-disc pl-5">
            {meeting.agenda.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h3 className="font-bold text-lg">Discussion Points</h3>
          <ul className="list-disc pl-5">
            {meeting.discussionPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h3 className="font-bold text-lg">Action Items</h3>
          <ul className="list-disc pl-5">
            {meeting.actionItems.map((action, index) => (
              <li key={index}>{action}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h3 className="font-bold text-lg">Additional Notes</h3>
          <p>{meeting.notes}</p>
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
