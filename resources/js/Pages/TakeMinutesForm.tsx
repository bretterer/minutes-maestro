import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function TakeMinutesForm({ onClose }: { onClose: () => void }) {
  const [agenda, setAgenda] = useState('');
  const [discussionPoints, setDiscussionPoints] = useState('');
  const [actionItems, setActionItems] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
      <h3 className="text-3xl font-semibold text-gray-900 mb-6">Take Meeting Minutes</h3>
      
      {/* Title */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Enter meeting title"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Start Time */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="startTime">Start Time</label>
        <input
          type="datetime-local"
          id="startTime"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* End Time */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="endTime">End Time</label>
        <input
          type="datetime-local"
          id="endTime"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Attendees */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="attendees">Attendees</label>
        <input
          type="text"
          id="attendees"
          placeholder="Enter attendees separated by commas"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Agenda */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="agenda">Agenda</label>
        <ReactQuill value={agenda} onChange={setAgenda} theme="snow" />
      </div>

      {/* Key Discussion Points */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="discussionPoints">Key Discussion Points</label>
        <ReactQuill value={discussionPoints} onChange={setDiscussionPoints} theme="snow" />
      </div>

      {/* Action Items */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="actionItems">Action Items</label>
        <ReactQuill value={actionItems} onChange={setActionItems} theme="snow" />
      </div>

      {/* Additional Notes */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="additionalNotes">Additional Notes</label>
        <ReactQuill value={notes} onChange={setNotes} theme="snow" />
      </div>

      {/* Buttons */}
      <div className="flex justify-end mt-8">
        <button
          onClick={onClose}
          className="bg-gray-500 text-white py-3 px-6 rounded-lg shadow-md mr-4 hover:bg-gray-600 focus:outline-none"
        >
          Cancel
        </button>
        <button
          type="button"
          className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
        >
          Save Minutes
        </button>
      </div>
    </div>
  );
}
