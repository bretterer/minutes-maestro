import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Modal from "@/Components/Modal";
import TakeMinutesForm from "@/Pages/TakeMinutesForm";

type Meeting = {
  id: number;
  title: string;
  date: string;
  time: string;
  host: string;
  attendees: string[];
  minutesAvailable?: boolean; // For recent minutes
};

export default function Dashboard() {
  const [isTakeMinutesModalOpen, setTakeMinutesModalOpen] = useState(false);

  // Sample data for meetings
  const upcomingMeetings: Meeting[] = [
    {
      id: 1,
      title: "Team Sync",
      date: "March 20, 2024",
      time: "2:00 PM",
      host: "John Doe",
      attendees: ["Alice", "Bob", "Charlie"],
    },
    {
      id: 2,
      title: "Project Kickoff",
      date: "March 22, 2024",
      time: "10:00 AM",
      host: "Sarah Smith",
      attendees: ["Dave", "Eve", "Frank"],
    },
  ];

  const recentMinutes: Meeting[] = [
    {
      id: 1,
      title: "Board Meeting",
      date: "March 15, 2024",
      time: "10:00 AM",
      host: "Jane Doe",
      attendees: ["Alice", "Bob", "Charlie"],
      minutesAvailable: true,
    },
    {
      id: 2,
      title: "Sprint Review",
      date: "March 16, 2024",
      time: "3:00 PM",
      host: "Sam Green",
      attendees: ["Eve", "Frank"],
      minutesAvailable: true,
    },
  ];

  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Quick Actions Section */}
          <div className="bg-white shadow-lg sm:rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Create Meeting Button */}
              <Link
                href="/meetings/create"
                className="flex items-center justify-center bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <i className="fas fa-calendar-alt mr-2"></i> Create New Meeting
              </Link>

              {/* Take Minutes Button */}
              <button
                onClick={() => setTakeMinutesModalOpen(true)}
                className="flex items-center justify-center bg-green-600 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <i className="fas fa-pencil-alt mr-2"></i> Take Minutes
              </button>

              {/* Review Minutes Button */}
              <Link
                href="/review-minutes"
                className="flex items-center justify-center bg-gray-600 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <i className="fas fa-clipboard-list mr-2"></i> Review Minutes
              </Link>
            </div>
          </div>

          {/* Upcoming Meetings Section */}
          <div className="bg-white shadow-lg sm:rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Upcoming Meetings
            </h3>
            <ul className="mt-4 space-y-4">
              {upcomingMeetings.map((meeting) => (
                <li
                  key={meeting.id}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-md"
                >
                  <div>
                    <p className="text-lg font-semibold">{meeting.title}</p>
                    <p className="text-sm text-gray-600">
                      {meeting.date}, {meeting.time}
                    </p>
                    <p className="text-sm text-gray-500">Host: {meeting.host}</p>
                    <p className="text-sm text-gray-500">
                      Attendees: {meeting.attendees.join(", ")}
                    </p>
                  </div>
                  <button
                    onClick={() => setTakeMinutesModalOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Take Minutes
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Minutes Section */}
          <div className="bg-white shadow-lg sm:rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Recent Minutes
            </h3>
            <ul className="mt-4 space-y-4">
              {recentMinutes.map((minute) => (
                <li
                  key={minute.id}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-md"
                >
                  <div>
                    <p className="text-lg font-semibold">{minute.title}</p>
                    <p className="text-sm text-gray-600">
                      {minute.minutesAvailable
                        ? "Minutes Available"
                        : "No Minutes Yet"}
                    </p>
                  </div>
                  {minute.minutesAvailable && (
                    <Link
                      href={`/review-minutes/${minute.id}`}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Review Minutes
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Take Minutes Modal */}
      <Modal
        isOpen={isTakeMinutesModalOpen}
        onClose={() => setTakeMinutesModalOpen(false)}
      >
        <TakeMinutesForm onClose={() => setTakeMinutesModalOpen(false)} />
      </Modal>
    </AuthenticatedLayout>
  );
}
