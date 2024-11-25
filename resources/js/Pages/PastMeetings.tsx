import React, { useState } from "react";
import Modal from "@/Components/Modal";
import ReviewMinutes from "@/Pages/ReviewMinuets"; 

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

interface PastMeetingsProps {
  isOpen: boolean;
  onClose: () => void;
  meetings: Meeting[];
  onMeetingSelect: (meeting: Meeting) => void;
}

export default function PastMeetings({
  isOpen,
  onClose,
  meetings,
  onMeetingSelect,
}: PastMeetingsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDate, setSortDate] = useState("");
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  // Filter meetings based on the search term
  const filteredMeetings = meetings.filter((meeting) =>
    meeting.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedMeetings = filteredMeetings.sort((a, b) =>
    sortDate === "asc"
      ? new Date(a.date).getTime() - new Date(b.date).getTime()
      : sortDate === "desc"
      ? new Date(b.date).getTime() - new Date(a.date).getTime()
      : 0
  );

  const handleMeetingSelect = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    onMeetingSelect(meeting);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        style={{
          backgroundColor: "#2d3748",
          padding: "30px",
          borderRadius: "10px",
          color: "#fff",
          width: "500px",
          position: "relative",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Close Button */}
        <button
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: "24px",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
            style={{ width: "24px", height: "24px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <h3
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "15px",
            textAlign: "center",
          }}
        >
          Search Past Meetings
        </h3>

        {/* Search Bar and Sort By Date */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search by title"
            style={{
              width: "70%",
              padding: "12px",
              backgroundColor: "#4a5568",
              color: "#fff",
              border: "1px solid #2d3748",
              borderRadius: "8px",
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            style={{
              width: "28%",
              padding: "12px",
              backgroundColor: "#4a5568",
              color: "#fff",
              border: "1px solid #2d3748",
              borderRadius: "8px",
            }}
            value={sortDate}
            onChange={(e) => setSortDate(e.target.value)}
          >
            <option value="">Sort by date</option>
            <option value="asc">Oldest to Newest</option>
            <option value="desc">Newest to Oldest</option>
          </select>
        </div>

        {/* Display Sorted & Filtered Meetings */}
        <div style={{ marginTop: "20px" }}>
          {sortedMeetings.length > 0 ? (
            <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
              {sortedMeetings.map((meeting) => (
                <li
                  key={meeting.id}
                  style={{
                    backgroundColor: "#4a5568",
                    marginBottom: "15px",
                    padding: "15px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                  onClick={() => handleMeetingSelect(meeting)}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      margin: "0",
                      fontSize: "16px",
                    }}
                  >
                    {meeting.title}
                  </p>
                  <p
                    style={{
                      color: "#ccc",
                      margin: "0",
                      fontSize: "14px",
                    }}
                  >
                    {meeting.date}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: "#fff", textAlign: "center" }}>No meetings found.</p>
          )}
        </div>
      </div>

      {selectedMeeting && (
        <ReviewMinutes
          meeting={selectedMeeting} 
          onClose={() => setSelectedMeeting(null)} 
        />
      )}
    </Modal>
  );
}
