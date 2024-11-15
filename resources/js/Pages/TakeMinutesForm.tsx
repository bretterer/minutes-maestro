import React from 'react';

export default function TakeMinutesForm() {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg sm:rounded-lg mt-8">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Take Meeting Minutes</h1>
      <form className="space-y-6">
        {/* Title */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-2">Title</label>
          <input
            type="text"
            className="p-3 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter meeting title"
          />
        </div>

        {/* Start Time */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-2">Start Time</label>
          <input
            type="datetime-local"
            className="p-3 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>

        {/* End Time */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-2">End Time</label>
          <input
            type="datetime-local"
            className="p-3 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>

        {/* Attendees */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-2">Attendees</label>
          <textarea
            className="p-3 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter attendees separated by commas"
          ></textarea>
        </div>

        {/* Agenda */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-2">Agenda</label>
          <textarea
            className="p-3 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter agenda points"
          ></textarea>
        </div>

        {/* Key Discussion Points */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-2">Key Discussion Points</label>
          <textarea
            className="p-3 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter key discussion points"
          ></textarea>
        </div>

        {/* Action Items */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-2">Action Items</label>
          <textarea
            className="p-3 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter action items"
          ></textarea>
        </div>

        {/* Additional Notes */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-2">Additional Notes</label>
          <textarea
            className="p-3 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter any additional notes"
          ></textarea>
        </div>

        {/* Save Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Save Minutes
          </button>
        </div>
      </form>
    </div>
  );
}
