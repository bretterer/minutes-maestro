import React from "react";
import { Head, Link } from "@inertiajs/react";

interface Auth {
    user?: {
        name: string;
        email: string;
    };
}

export default function Welcome({ auth }: { auth: Auth }) {
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
                <header className="fixed top-0 left-0 w-full z-50">
                    <div className="container mx-auto flex items-center justify-between px-6 py-4 text-white">
                        <div className="text-2xl font-bold">Minutes Maestro</div>
                        <nav className="space-x-6">
                            <a href="#features" className="hover:text-gray-300 smooth-scroll">
                                Features
                            </a>
                            <a href="#testimonials" className="hover:text-gray-300 smooth-scroll">
                                Testimonials
                            </a>
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="px-4 py-2 rounded-md bg-white text-blue-800 font-semibold hover:bg-gray-100 transition"
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
                                        className="px-4 py-2 rounded-md bg-white text-blue-800 font-semibold hover:bg-gray-100 transition"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <div className="relative flex flex-col lg:flex-row items-center justify-between min-h-screen px-6 lg:px-16 bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-600 text-white">
                    <div className="max-w-md text-center lg:text-left lg:mr-12">
                        <h1 className="text-5xl font-extrabold leading-tight">
                            Simplify Your Meetings
                        </h1>
                        <p className="mt-4 text-lg text-gray-300">
                            Capture, organize, and distribute your meeting minutes seamlessly.
                        </p>
                        <div className="mt-8">
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="px-8 py-3 rounded-md bg-white text-blue-700 font-semibold hover:bg-gray-100 transition"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={route("register")}
                                    className="px-8 py-3 rounded-md bg-white text-blue-700 font-semibold hover:bg-gray-100 transition"
                                >
                                    Get Started
                                </Link>
                            )}
                        </div>
                    </div>
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Business Meeting"
                            className="max-w-[800px] w-full h-auto rounded-lg shadow-lg"
                        />
                    </div>
                </div>

                {/* Features Section */}
                <div id="features" className="min-h-screen bg-gray-900 text-white flex items-center">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl font-extrabold text-center">Key Features</h2>
                        <p className="mt-4 text-lg text-center text-gray-300">
                            Everything you need to streamline your meetings.
                        </p>
                        <div className="mt-12 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                            {[{ title: "Meeting Setup", description: "Schedule meetings effortlessly.", icon: "📅" },
                                { title: "Minute Taking", description: "Capture notes in real-time.", icon: "📝" },
                                { title: "Review & Distribution", description: "Generate polished notes.", icon: "📤" },
                                { title: "Account Management", description: "Manage roles and teams.", icon: "👥" }].map((feature, index) => (
                                    <div key={index} className="p-8 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition text-center">
                                        <div className="text-4xl">{feature.icon}</div>
                                        <h3 className="mt-4 text-xl font-bold">{feature.title}</h3>
                                        <p className="mt-2">{feature.description}</p>
                                    </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Testimonials Section */}
                <div id="testimonials" className="min-h-screen bg-gray-900 text-white flex items-center">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-4xl font-extrabold">What Our Users Say</h2>
                        <p className="mt-4 text-lg text-gray-300">Trusted by professionals worldwide.</p>
                        <div className="mt-12 grid gap-8 md:grid-cols-3">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="p-8 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition">
                                    <p className="italic">"{testimonial.feedback}"</p>
                                    <div className="mt-4 flex items-center justify-center">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="h-16 w-16 rounded-full shadow-md"
                                        />
                                        <div className="ml-4">
                                            <p className="font-bold">{testimonial.name}</p>
                                            <p className="text-sm">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Call-to-Action Section */}
                <div id="contact" className="min-h-screen bg-gray-900 text-white flex items-center text-center">
                    <div className="container mx-auto px-6">
                        <h2 className="text-5xl font-extrabold">Ready to Simplify Your Meetings?</h2>
                        <p className="mt-4 text-lg">
                            Sign up today and experience the difference.
                        </p>
                        <div className="mt-8">
                            <Link
                                href={route("register")}
                                className="px-8 py-3 rounded-md bg-white text-blue-700 font-semibold hover:bg-gray-100 transition"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="py-8 bg-gray-900 text-gray-300 text-center">
                    <p className="text-sm">© 2024 Minutes Maestro. All rights reserved.</p>
                    <p className="mt-2">
                        <a href="mailto:support@minutesmaestro.com" className="hover:text-gray-100">
                            support@minutesmaestro.com
                        </a>
                    </p>
                </footer>
            </div>
        </>
    );
}
