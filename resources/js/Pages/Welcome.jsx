import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Minutes Maestro" />
            <div className="bg-gray-100 min-h-screen text-gray-900">
                {/* Navbar */}
                <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
                    <div className="container mx-auto flex items-center justify-between px-6 py-4">
                        <div className="text-2xl font-semibold">
                            Minutes Maestro
                        </div>
                        <nav className="space-x-6">
                            <a href="#features" className="hover:text-blue-600">
                                Features
                            </a>
                            <a href="#roles" className="hover:text-blue-600">
                                Roles
                            </a>
                            <a href="#contact" className="hover:text-blue-600">
                                Contact
                            </a>
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-white pt-20">
                    <div className="text-center px-6">
                        <h1 className="text-5xl font-bold tracking-tight text-black">
                            Simplify Your Meetings
                        </h1>
                        <p className="mt-4 text-lg text-gray-700">
                            Capture, organize, and distribute your meeting minutes seamlessly.
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="px-8 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('register')}
                                        className="px-8 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div id="features" className="py-16 bg-white">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-semibold text-center text-gray-900">
                            Key Features
                        </h2>
                        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {/* Feature Cards */}
                            <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    Meeting Setup
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    Schedule meetings, add attendees, and create agendas effortlessly.
                                </p>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    Minute Taking
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    Capture notes in real-time using customizable templates.
                                </p>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    Review & Distribution
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    Generate and distribute polished meeting minutes automatically.
                                </p>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    Account Management
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    Create accounts, manage organizations, and control user roles.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Roles Section */}
                <div id="roles" className="py-16 bg-gray-100">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-semibold text-center text-gray-900">
                            User Roles and Access Control
                        </h2>
                        <p className="mt-4 text-center text-gray-700">
                            Minutes Maestro offers distinct user roles with varying levels of access.
                        </p>
                        <div className="mt-12 overflow-x-auto">
                            <table className="w-full text-left table-auto border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border-b-2">Action</th>
                                        <th className="px-4 py-2 border-b-2">Administrator</th>
                                        <th className="px-4 py-2 border-b-2">Secretary</th>
                                        <th className="px-4 py-2 border-b-2">User</th>
                                        <th className="px-4 py-2 border-b-2">Guest</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td className="px-4 py-2 border-b">
                                            Add Committee Notes
                                        </td>
                                        <td className="px-4 py-2 border-b text-center">✅</td>
                                        <td className="px-4 py-2 border-b text-center">✅</td>
                                        <td className="px-4 py-2 border-b text-center">
                                            ❗ (Own Committee)
                                        </td>
                                        <td className="px-4 py-2 border-b text-center">❌</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 border-b">
                                            Create Meeting
                                        </td>
                                        <td className="px-4 py-2 border-b text-center">✅</td>
                                        <td className="px-4 py-2 border-b text-center">✅</td>
                                        <td className="px-4 py-2 border-b text-center">❌</td>
                                        <td className="px-4 py-2 border-b text-center">❌</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Call-to-Action Section */}
                <div className="py-16 bg-white">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl font-semibold text-gray-900">
                            Ready to Simplify Your Meetings?
                        </h2>
                        <p className="mt-4 text-gray-700">
                            Sign up today and experience the efficiency of Minutes Maestro.
                        </p>
                        <div className="mt-8">
                            <Link
                                href={route('register')}
                                className="px-8 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer
                    id="contact"
                    className="py-6 bg-gray-200 text-center text-gray-600"
                >
                    <p className="text-sm">
                        © 2024 Minutes Maestro. All rights reserved.
                    </p>
                    <p className="mt-2">
                        <a
                            href="mailto:support@minutesmaestro.com"
                            className="hover:text-blue-600"
                        >
                            support@minutesmaestro.com
                        </a>
                    </p>
                </footer>
            </div>
        </>
    );
}
