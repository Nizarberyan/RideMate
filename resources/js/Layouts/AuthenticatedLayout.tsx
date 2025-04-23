// resources/js/Layouts/AuthenticatedLayout.tsx
import { Link } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import {
    Home,
    User,
    Calendar,
    Car,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
} from "lucide-react";

export default function AuthenticatedLayout({
    children,
    auth,
}: {
    children: React.ReactNode;
    auth: { user: { name: string; email: string } };
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            // Only close sidebar on click outside if it's open AND screen is small (mobile view)
            if (sidebarOpen && window.innerWidth < 1024) {
                const sidebar = document.getElementById("sidebar-auth");
                const toggleBtn = document.getElementById(
                    "sidebar-toggle-auth",
                );
                if (
                    sidebar &&
                    !sidebar.contains(event.target as Node) &&
                    toggleBtn &&
                    !toggleBtn.contains(event.target as Node)
                ) {
                    setSidebarOpen(false);
                }
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () =>
            document.removeEventListener("mousedown", handleOutsideClick);
    }, [sidebarOpen]);

    return (
        // Removed lg:flex-row as sidebar and main content are positioned independently now
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 antialiased">
            {/* Mobile sidebar toggle - Remains fixed */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    id="sidebar-toggle-auth"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg bg-white shadow-md text-gray-700 hover:bg-gray-50 focus:outline-none"
                >
                    {sidebarOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>
            </div>

            {/* Sidebar overlay for mobile */}
            {sidebarOpen && window.innerWidth < 1024 && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/20 z-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar - Changed to always be fixed */}
            <aside
                id="sidebar-auth"
                className={`fixed top-0 left-0 z-40 h-screen w-64 transform transition-transform duration-300 ease-in-out
                    bg-white/90 backdrop-blur-md shadow-lg overflow-y-auto
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`} // Show by default on lg screens
            >
                {/* Sidebar Content */}
                <div className="h-full flex flex-col py-6">
                    <div className="px-6 mb-6 flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-800">
                            RideMate
                        </h1>
                        {/* Optional: Add close button for mobile inside sidebar */}
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-1 text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* User profile section */}
                    <div className="px-6 mb-6">
                        <div className="flex items-center p-3 bg-blue-50 rounded-xl">
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                                {auth.user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="ml-3 overflow-hidden">
                                <p className="text-sm font-medium text-gray-800 truncate">
                                    {auth.user.name}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    {auth.user.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 space-y-2">
                        <Link
                            href="/dashboard"
                            className="group flex items-center px-4 py-3 rounded-lg transition-all duration-300 ease-in-out text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                        >
                            <Home className="mr-3 w-5 h-5 group-hover:text-blue-500 transition-colors" />
                            <span className="text-sm font-medium">
                                Dashboard
                            </span>
                        </Link>
                        <Link
                            href="/profile"
                            className="group flex items-center px-4 py-3 rounded-lg transition-all duration-300 ease-in-out text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                        >
                            <User className="mr-3 w-5 h-5 group-hover:text-blue-500 transition-colors" />
                            <span className="text-sm font-medium">Profile</span>
                        </Link>
                        <Link
                            href="/bookings"
                            className="group flex items-center px-4 py-3 rounded-lg transition-all duration-300 ease-in-out text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                        >
                            <Calendar className="mr-3 w-5 h-5 group-hover:text-blue-500 transition-colors" />
                            <span className="text-sm font-medium">
                                Bookings
                            </span>
                        </Link>
                        <Link
                            href="/rides"
                            className="group flex items-center px-4 py-3 rounded-lg transition-all duration-300 ease-in-out text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                        >
                            <Car className="mr-3 w-5 h-5 group-hover:text-blue-500 transition-colors" />
                            <span className="text-sm font-medium">Rides</span>
                        </Link>
                        <Link
                            href="/settings"
                            className="group flex items-center px-4 py-3 rounded-lg transition-all duration-300 ease-in-out text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                        >
                            <Settings className="mr-3 w-5 h-5 group-hover:text-blue-500 transition-colors" />
                            <span className="text-sm font-medium">
                                Settings
                            </span>
                        </Link>
                    </nav>

                    {/* Footer Links */}
                    <div className="px-4 mt-auto">
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="w-full group flex items-center px-4 py-3 rounded-lg transition-all duration-300 ease-in-out text-gray-600 hover:bg-red-50 hover:text-red-600"
                        >
                            <LogOut className="mr-3 w-5 h-5 group-hover:text-red-500 transition-colors" />
                            <span className="text-sm font-medium">Logout</span>
                        </Link>

                        <div className="p-4 mt-4 rounded-lg bg-gray-50">
                            <p className="text-xs text-gray-500">
                                © 2024 RideMate
                            </p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main content wrapper - Added left margin for large screens */}
            <div className="lg:ml-64">
                {" "}
                {/* Offset content by sidebar width */}
                {/* Top navbar - Remains sticky */}
                <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md shadow-sm">
                    <div className="max-w-full mx-auto px-4">
                        <div className="flex justify-end h-16 items-center">
                            {/* Notification bell */}
                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setNotificationsOpen(!notificationsOpen)
                                    }
                                    className="p-2 rounded-full text-gray-500 hover:bg-gray-100 relative"
                                >
                                    <Bell className="w-6 h-6" />
                                    {/* Example notification dot */}
                                    <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                                </button>

                                {/* Notification dropdown */}
                                {notificationsOpen && (
                                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100">
                                        <div className="px-4 py-2 border-b border-gray-100">
                                            <h3 className="text-sm font-semibold text-gray-700">
                                                Notifications
                                            </h3>
                                        </div>
                                        <div className="max-h-64 overflow-y-auto">
                                            {/* Example Notifications */}
                                            <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-50">
                                                <p className="text-sm font-medium text-gray-800">
                                                    New ride available: City A
                                                    to City B
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    5 minutes ago
                                                </p>
                                            </div>
                                            <div className="px-4 py-3 hover:bg-gray-50">
                                                <p className="text-sm text-gray-700">
                                                    Your booking for Ride #123
                                                    was confirmed.
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    1 hour ago
                                                </p>
                                            </div>
                                        </div>
                                        <div className="px-4 py-2 border-t border-gray-100 text-center">
                                            <a
                                                href="#" // Link to notifications page
                                                className="text-xs text-blue-600 hover:underline font-medium"
                                            >
                                                View all notifications
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>
                {/* Page Content */}
                <main className="w-full pt-4 px-4 pb-4">
                    {/* Ensure content has enough space */}
                    <div className="max-w-full mx-auto min-h-[calc(100vh-5rem)]">
                        {" "}
                        {/* Adjust min-height if needed */}
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
