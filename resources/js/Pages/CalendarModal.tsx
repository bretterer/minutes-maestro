import React, { useState } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import the default calendar CSS
import Modal from "@/Components/Modal"; // Assuming you're using a custom modal component

interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  host: string;
  attendees: string[];
  summary?: string;
  agenda?: string[];
  discussionPoints?: string[];
  actionItems?: string[];
  notes?: string;
}

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  meetings: Meeting[];
  onMeetingSelect: (meeting: Meeting) => void;
}

export default function CalendarModal({
  isOpen,
  onClose,
  meetings,
  onMeetingSelect,
}: CalendarModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter meetings based on the selected date and search term
  const filteredMeetings = meetings.filter(
    (meeting) =>
      (selectedDate && new Date(meeting.date).toDateString() === selectedDate.toDateString()) ||
      meeting.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="calendar-modal-container">
        {/* Close Button */}
        <button
          className="close-button"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <h3 className="modal-title">Search Past Meetings</h3>

        {/* Calendar Component */}
        <div className="calendar-container">
          <ReactCalendar
            onChange={(value) => setSelectedDate(value as Date)}
            value={selectedDate}
            className="react-calendar"
          />
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by title"
            className="search-input"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Display Filtered Meetings */}
        <div className="meetings-list">
          {filteredMeetings.length > 0 ? (
            <ul>
              {filteredMeetings.map((meeting) => (
                <li
                  key={meeting.id}
                  className="meeting-item"
                  onClick={() => onMeetingSelect(meeting)}
                >
                  <p className="meeting-title">{meeting.title}</p>
                  <p className="meeting-date">{meeting.date}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-meetings">No meetings found.</p>
          )}
        </div>
      </div>
    </Modal>
  );
}
