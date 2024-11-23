import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function ReviewMinutes() {
  const mockMinutes = {
    id: 1, // Use a static ID for now
    title: "Board Meeting",
    date: "March 15, 2024",
    time: "10:00 AM",
    host: "Jane Doe",
    attendees: ["Alice", "Bob", "Charlie"],
    content: `
      Meeting Agenda:
      - Discuss quarterly goals
      - Review performance metrics
      - Approve budget adjustments
      
      Meeting Notes:
      - Q1 goals are progressing on track.
      - Performance metrics need improvement in sales.
      - Budget adjustments were approved unanimously.
    `,
  };

  return (
    <AuthenticatedLayout>
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg sm:rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Review Minutes for {mockMinutes.title} (ID: {mockMinutes.id})
            </h3>
            <p className="text-sm text-gray-600">
              <strong>Date:</strong> {mockMinutes.date}, <strong>Time:</strong>{" "}
              {mockMinutes.time}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Host:</strong> {mockMinutes.host}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Attendees:</strong> {mockMinutes.attendees.join(", ")}
            </p>
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Meeting Content</h4>
              <pre className="bg-gray-100 p-4 rounded-md text-sm whitespace-pre-wrap">
                {mockMinutes.content}
              </pre>
            </div>
            <div className="mt-6">
              <button
                onClick={() => window.print()}
                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
              >
                Print as PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
