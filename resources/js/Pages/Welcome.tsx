import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth }) {
    const testimonials = [
        {
            name: "Andrew Hopkins",
            role: "Manager",
            feedback: "Minutes Maestro has transformed the way we manage our meetings!",
            image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?crop=faces&fit=crop&w=200&q=80",
        },
        {
            name: "John Smith",
            role: "Team Lead",
            feedback: "An intuitive tool that saves us hours of work every week.",
            image: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
        },
        {
            name: "Sarah Lee",
            role: "Coordinator",
            feedback: "I love how easy it is to distribute polished meeting notes.",
            image: "https://writestylesonline.com/wp-content/uploads/2019/01/What-To-Wear-For-Your-Professional-Profile-Picture-or-Headshot.jpg",
        },
    ];
    

    return (
        <>
            <Head title="Minutes Maestro" />
            <div className="bg-gray-50 text-gray-900">
                {/* Navbar */}
                <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
                    <div className="container mx-auto flex items-center justify-between px-6 py-4">
                        <div className="text-2xl font-bold text-blue-600">
                            Minutes Maestro
                        </div>
                        <nav className="space-x-6">
                            <a href="#features" className="hover:text-blue-600">
                                Features
                            </a>
                            <a href="#testimonials" className="hover:text-blue-600">
                                Testimonials
                            </a>
                            <a href="#contact" className="hover:text-blue-600">
                                Contact
                            </a>
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-600 to-indigo-600 text-white">
                    <div className="text-center px-6">
                        <h1 className="text-6xl font-extrabold tracking-tight">
                            Simplify Your Meetings
                        </h1>
                        <p className="mt-4 text-lg text-gray-200">
                            Capture, organize, and distribute your meeting minutes seamlessly.
                        </p>
                        <div className="mt-8">
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="px-8 py-3 rounded-md bg-white text-blue-600 font-semibold hover:bg-gray-100 transition"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={route("register")}
                                    className="px-8 py-3 rounded-md bg-white text-blue-600 font-semibold hover:bg-gray-100 transition"
                                >
                                    Get Started
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div id="features" className="py-20 bg-gray-100">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl font-extrabold text-center text-gray-900">
                            Key Features
                        </h2>
                        <p className="mt-4 text-lg text-center text-gray-700">
                            Everything you need to streamline your meetings.
                        </p>
                        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition">
                                <h3 className="text-xl font-bold text-blue-600">
                                    Meeting Setup
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    Schedule meetings, add attendees, and create agendas effortlessly.
                                </p>
                            </div>
                            <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition">
                                <h3 className="text-xl font-bold text-blue-600">
                                    Minute Taking
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    Capture notes in real-time using customizable templates.
                                </p>
                            </div>
                            <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition">
                                <h3 className="text-xl font-bold text-blue-600">
                                    Review & Distribution
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    Generate and distribute polished meeting minutes automatically.
                                </p>
                            </div>
                            <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition">
                                <h3 className="text-xl font-bold text-blue-600">
                                    Account Management
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    Manage organizations, control roles, and keep everything organized.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonials Section */}
                <div id="testimonials" className="py-20 bg-gradient-to-b from-gray-100 to-gray-50">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-4xl font-extrabold text-gray-900">
                            What Our Users Say
                        </h2>
                        <p className="mt-4 text-lg text-gray-700">
                            Trusted by professionals worldwide.
                        </p>
                        <div className="mt-12 grid gap-8 md:grid-cols-3">
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition"
                                >
                                    <p className="italic text-gray-600">
                                        "{testimonial.feedback}"
                                    </p>
                                    <div className="mt-4 flex items-center justify-center">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="h-16 w-16 rounded-full shadow-md"
                                        />
                                        <div className="ml-4">
                                            <p className="font-bold text-gray-900">
                                                {testimonial.name}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Call-to-Action Section */}
                <div id="contact" className="py-20 bg-white text-center">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl font-extrabold text-gray-900">
                            Ready to Simplify Your Meetings?
                        </h2>
                        <p className="mt-4 text-lg text-gray-700">
                            Sign up today and experience the difference.
                        </p>
                        <div className="mt-8">
                            <Link
                                href={route("register")}
                                className="px-8 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="py-8 bg-gray-200 text-center text-gray-600">
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
