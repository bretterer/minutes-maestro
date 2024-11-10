import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <p>Hello World! Dashboard is working.</p>
                    </div>

                    {/* Quick Actions Section */}
                    <div className="bg-white shadow-sm sm:rounded-lg p-8 mb-8">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                            Quick Actions
                        </h3>
                        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                            {/* Create Meeting Button */}
                            <div className="flex items-center justify-center bg-blue-600 text-white p-6 rounded-lg shadow hover-effect">
                                <i className="fas fa-calendar-alt mr-2"></i> Create New Meeting
                            </div>
                            {/* Take Minutes Button */}
                            <div className="flex items-center justify-center bg-green-600 text-white p-6 rounded-lg shadow hover-effect">
                                <i className="fas fa-pencil-alt mr-2"></i> Take Minutes
                            </div>
                            {/* Review Minutes Button */}
                            <div className="flex items-center justify-center bg-gray-600 text-white p-6 rounded-lg shadow hover-effect">
                                <i className="fas fa-clipboard-list mr-2"></i> Review Minutes
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Meetings Section */}
                    <div className="bg-white shadow-sm sm:rounded-lg p-8 mb-8">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                            Upcoming Meetings
                        </h3>
                        <ul className="mt-4 space-y-4">
                            <li className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-sm">
                                <div>
                                    <p className="text-lg font-semibold">Team Sync</p>
                                    <p className="text-sm text-gray-600">March 20, 2024, 2:00 PM</p>
                                    <p className="text-sm text-gray-500">Host: John Doe</p>
                                    <p className="text-sm text-gray-500">Attendees: Alice, Bob, Charlie</p>
                                </div>
                            </li>
                            <li className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-sm">
                                <div>
                                    <p className="text-lg font-semibold">Project Kickoff</p>
                                    <p className="text-sm text-gray-600">March 22, 2024, 10:00 AM</p>
                                    <p className="text-sm text-gray-500">Host: Sarah Smith</p>
                                    <p className="text-sm text-gray-500">Attendees: Dave, Eve, Frank</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Recent Meeting Minutes Section */}
                    <div className="bg-white shadow-sm sm:rounded-lg p-8 mb-8">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                            Recent Minutes
                        </h3>
                        <ul className="mt-4 space-y-4">
                            <li className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-sm">
                                <div>
                                    <p className="text-lg font-semibold">Board Meeting</p>
                                    <p className="text-sm text-gray-600">Minutes Available</p>
                                </div>
                            </li>
                            <li className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-sm">
                                <div>
                                    <p className="text-lg font-semibold">Sprint Review</p>
                                    <p className="text-sm text-gray-600">Minutes Available</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}