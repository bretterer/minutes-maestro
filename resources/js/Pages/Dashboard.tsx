import React, { useState, useRef, useEffect } from "react";
import { usePage, Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Modal from "@/Components/Modal";
import TakeMinutesForm from "@/Pages/TakeMinutesForm";
import ReviewMinutes from "@/Pages/ReviewMinuets";
import CalendarModal from "@/Pages/PastMeetings";
import CommitteesModal from "./Modals/CommitteesModal";
import ManageTeamModal from "./Modals/ManageTeamModal";
import Show from "./Teams/Show";
import { JetstreamTeamPermissions, Meeting, Role, Team } from "@/types";
import CreateMeetingForm from "@/Components/CreateMeetingForm";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {
    const { props } = usePage();
    const [isCreateMeetingModalOpen, setCreateMeetingModalOpen] = useState(false);
    const [isTakeMinutesModalOpen, setTakeMinutesModalOpen] = useState(false);
    const [isManageTeamModalOpen, setManageTeamModalOpen] = useState(false);
    const [isCommittesModalOpen, setCommitteesModalOpen] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete confirmation modal
    const [deleteConfirmationId, setDeleteConfirmationId] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<"upcoming" | "recent">("upcoming");
    const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
    const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false); // State for Calendar Modal
    const [selectedMinute, setSelectedMinute] = useState<Meeting | null>(null); // State to hold selected meeting for review
    const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
    const user = usePage().props.auth.user;


    const dropdownRefs = useRef<Map<number, HTMLDivElement>>(new Map());

    const [upcomingMeetings, setUpcomingMeetings] = useState<Meeting[]>(props.meetings as Meeting[])
    const [recentMinutes, setRecentMinutes] = useState<Meeting[]>(props.recentMeetings as Meeting[])
    const availableRoles = props.availableRoles as Role[]
    const permissions = props.permissions as JetstreamTeamPermissions
    const team = props.team as any



    window.Echo.private('meetings')
        .listen('MeetingCreated', (e: any) => {
            console.log(e);
            toast.success('New Meeting Created: ' + e.meeting.name);
            setUpcomingMeetings([...upcomingMeetings, e.meeting])
            console.log(upcomingMeetings);
        });

    const toggleDropdown = (id: number) => {
        setDropdownOpen((prev) => (prev === id ? null : id));
    };

    const handleDelete = (id: number) => {
        setDeleteConfirmationId(id);
        setIsDeleteModalOpen(true); // Open delete confirmation modal
        setDropdownOpen(null);
    };

    const handleTakeMinutes = (meeting: Meeting) => {
        console.log("Taking minutes for meeting ID:", meeting.id);
        setTakeMinutesModalOpen(true); // Open Take Minutes Modal
        setSelectedMeeting(meeting); // Set the selected meeting
        setDropdownOpen(null);
    };

    const confirmDelete = () => {
        console.log("Deleted meeting ID:", deleteConfirmationId);

        const response = window.axios.delete(`/api/meetings/${deleteConfirmationId}`).then(() => {
            setDeleteConfirmationId(null);
            setIsDeleteModalOpen(false); // Close delete confirmation modal
        });
        setUpcomingMeetings(upcomingMeetings.filter(m => m.id !== deleteConfirmationId))
    };

    const cancelDelete = () => {
        setDeleteConfirmationId(null);
        setIsDeleteModalOpen(false); // Close delete confirmation modal
    };

    const openModal = (minute: Meeting) => {
        setSelectedMinute(minute); // Store the selected minute
        setIsReviewModalOpen(true); // Open Review Modal
    };

    const closeReviewModal = () => {
        setIsReviewModalOpen(false); // Close Review Modal
        setSelectedMinute(null); // Clear selected minute
    };

    const openCalendarModal = () => {
        setIsCalendarModalOpen(true); // Open CalendarModal when "Review Minutes" button is clicked
    };

    return (
        <AuthenticatedLayout>

            <ToastContainer />
            <Head title="Dashboard" />
            <div className="min-h-screen bg-gray-900 text-gray-300 py-12 px-6">
                <div className="max-w-7xl mx-auto space-y-12">
                    {/* Hero Banner */}
                    <div className="bg-gradient-to-r from-indigo-700 via-blue-800 to-indigo-900 text-white rounded-lg shadow-md p-8">
                        <h1 className="text-3xl font-bold mb-4">Welcome Back, {user.name}</h1>
                        <p className="text-lg">
                            Track your meetings, review minutes, and stay organized effortlessly.
                        </p>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <button
                            onClick={() => setCreateMeetingModalOpen(true)}
                            className="flex flex-col items-center justify-center bg-gray-800 text-blue-400 py-6 px-8 rounded-lg shadow-lg hover:bg-gray-700 hover:text-blue-300 transform hover:scale-105 transition"
                        >
                            <i className="fas fa-calendar-plus text-4xl mb-2"></i>
                            <span className="font-semibold">Create Meeting</span>
                        </button>
                        <button
                            onClick={() => setCommitteesModalOpen(true)}
                            disabled={!permissions.canUpdateTeam}
                            className="flex flex-col items-center justify-center bg-gray-800 text-green-400 py-6 px-8 rounded-lg shadow-lg hover:bg-gray-700 hover:text-green-300 transform hover:scale-105 transition disabled:bg-gray-800 disabled:text-gray-500 disabled:hover:scale-100"
                        >
                            <i className="fas fa-pencil-alt text-4xl mb-2"></i>
                            <span className="font-semibold">Committees</span>
                        </button>
                        <button
                            onClick={() => setManageTeamModalOpen(true)}
                            className="flex flex-col items-center justify-center bg-gray-800 text-gray-400 py-6 px-8 rounded-lg shadow-lg hover:bg-gray-700 hover:text-gray-300 transform hover:scale-105 transition disabled:bg-gray-800 disabled:text-gray-500 disabled:hover:scale-100"
                        >
                            <i className="fas fa-file-alt text-4xl mb-2"></i>
                            <span className="font-semibold">Manage Team</span>
                        </button>
                    </div>

                    {/* Meetings Section with Tabs */}
                    <div className="bg-gray-800 rounded-lg shadow-lg p-8">
                        <div className="flex justify-center space-x-4 border-b pb-3">
                            <button
                                className={`text-lg font-semibold ${activeTab === "upcoming"
                                    ? "border-b-4 border-blue-500 text-blue-400"
                                    : "text-gray-400"
                                    }`}
                                onClick={() => setActiveTab("upcoming")}
                            >
                                Upcoming Meetings
                            </button>
                            <button
                                className={`text-lg font-semibold ${activeTab === "recent"
                                    ? "border-b-4 border-blue-500 text-blue-400"
                                    : "text-gray-400"
                                    }`}
                                onClick={() => setActiveTab("recent")}
                            >
                                Recent Minutes
                            </button>
                        </div>

                        <div className="mt-6">
                            {activeTab === "upcoming" ? (
                                <table className="table-auto w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-700">
                                            <th className="px-4 py-2">Title</th>
                                            <th className="px-4 py-2">Date</th>
                                            <th className="px-4 py-2">Time</th>
                                            <th className="px-4 py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {upcomingMeetings.map((meeting) => (
                                            <tr key={meeting.id} className="hover:bg-gray-700 transition">
                                                <td className="px-4 py-2">{meeting.title}</td>
                                                <td className="px-4 py-2">{meeting.date}</td>
                                                <td className="px-4 py-2">{meeting.time}</td>
                                                <td
                                                    className="px-4 py-2 relative"
                                                    ref={(el) =>
                                                        dropdownRefs.current.set(meeting.id, el as HTMLDivElement)
                                                    }
                                                >
                                                    {meeting.permissions.canTakeNotes ? (
                                                        <>
                                                            <button
                                                                onClick={() => toggleDropdown(meeting.id)}
                                                                className="bg-gray-500 text-white py-1 px-4 rounded-md hover:bg-gray-600 transition"
                                                            >
                                                                Actions
                                                            </button>

                                                            {dropdownOpen === meeting.id && (
                                                                <div className="absolute mt-2 w-40 bg-gray-700 shadow-lg rounded-md z-10">
                                                                    <button
                                                                        className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                                                                        onClick={() => handleTakeMinutes(meeting)}
                                                                    >
                                                                        Take Minutes
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDelete(meeting.id)}
                                                                        className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-600"
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <button
                                                            onClick={() => openModal(meeting)} // Assuming you have this function
                                                            className="bg-gray-500 text-white py-1 px-4 rounded-md hover:bg-gray-600 transition"
                                                        >
                                                            View
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <table className="table-auto w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-700">
                                            <th className="px-4 py-2">Title</th>
                                            <th className="px-4 py-2">Minutes Approved</th>
                                            <th className="px-4 py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentMinutes.map((meeting) => (
                                            <tr key={meeting.id} className="hover:bg-gray-700 transition">
                                                <td className="px-4 py-2">{meeting.title}</td>
                                                <td className="px-4 py-2">
                                                    {meeting.minutesApproved ? "Approved" : "Not Approved"}
                                                </td>
                                                <td className="px-4 py-2 relative">
                                                    <button
                                                        onClick={() => openModal(meeting)} // Open Review Modal
                                                        className="bg-gray-500 text-white py-1 px-4 rounded-md hover:bg-gray-600 transition"
                                                    >
                                                        Review
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for confirming deletion */}
            {isDeleteModalOpen && (
                <Modal isOpen={isDeleteModalOpen} onClose={cancelDelete}>
                    <div className="bg-gray-900 text-white p-6 rounded-lg">
                        <h3 className="text-xl font-semibold">Are you sure you want to delete this meeting?</h3>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={cancelDelete}
                                className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 mr-4"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Modal for Calendar to review past minutes */}
            {isCalendarModalOpen && (
                <CalendarModal
                    isOpen={isCalendarModalOpen}
                    onClose={() => setIsCalendarModalOpen(false)}
                    meetings={upcomingMeetings}
                    onMeetingSelect={(meeting) => {
                        console.log(meeting); // Handle meeting selection
                        setIsCalendarModalOpen(false);
                    }}
                />
            )}

            {/* Modal for reviewing minutes */}
            {isReviewModalOpen && selectedMinute && (
                <ReviewMinutes meeting={selectedMinute} onClose={closeReviewModal} />
            )}

            {/* Modal for Take Minutes */}
            {isTakeMinutesModalOpen && selectedMeeting && (
                <Modal
                    isOpen={isTakeMinutesModalOpen}
                    onClose={() => {
                        setTakeMinutesModalOpen(false);
                        setSelectedMeeting(null);
                    }}>
                    <TakeMinutesForm
                        meeting={selectedMeeting}
                        onClose={() => setTakeMinutesModalOpen(false)} />
                </Modal>
            )}

            {/* Modal for Committees */}
            {isCommittesModalOpen && (
                <Modal
                    isOpen={isCommittesModalOpen}
                    onClose={() => {
                        setCommitteesModalOpen(false);
                    }}>
                    <CommitteesModal
                        committees={[]}
                        onClose={() => setCommitteesModalOpen(false)} />
                </Modal>
            )}



            {/* Modal for Take Minutes */}
            {isCreateMeetingModalOpen && (
                <Modal
                    isOpen={isCreateMeetingModalOpen}
                    onClose={() => {
                        setCreateMeetingModalOpen(false);
                    }}>
                    <CreateMeetingForm
                        onClose={() => setCreateMeetingModalOpen(false)} />
                </Modal>
            )}

            {/* Modal for Manage Team */}
            {isManageTeamModalOpen && (
                <Modal
                    isOpen={isManageTeamModalOpen}
                    onClose={() => {
                        setManageTeamModalOpen(false);
                    }}>
                    <ManageTeamModal
                        team={team}
                        availableRoles={availableRoles}
                        permissions={permissions}
                        onClose={() => setManageTeamModalOpen(false)} />
                </Modal>
            )}
        </AuthenticatedLayout>
    );
}
