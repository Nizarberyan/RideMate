import { Link } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import { Home, LogIn, UserPlus, Menu, X } from "lucide-react";

export default function GuestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (sidebarOpen && window.innerWidth < 1024) {
                const sidebar = document.getElementById("sidebar-guest");
                const toggleBtn = document.getElementById(
                    "sidebar-toggle-guest",
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 antialiased">
            {/* Mobile sidebar toggle */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    id="sidebar-toggle-guest"
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
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/20 z-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Fixed Sidebar */}
            <aside
                id="sidebar-guest"
                className={`fixed top-0 left-0 z-40 h-full w-64 transform transition-transform duration-300 ease-in-out
                    bg-white/90 backdrop-blur-md shadow-lg
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
            >
                <div className="h-full flex flex-col py-6">
                    <div className="px-6 mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">
                            RideMate
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Get started today
                        </p>
                    </div>

                    <nav className="flex-1 px-4 space-y-2">
                        <Link
                            href="/"
                            className="group flex items-center px-4 py-3 rounded-lg transition-all duration-300 ease-in-out text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                        >
                            <Home className="mr-3 w-5 h-5 group-hover:text-blue-500 transition-colors" />
                            <span className="text-sm font-medium">Home</span>
                        </Link>
                        <Link
                            href="/login"
                            className="group flex items-center px-4 py-3 rounded-lg transition-all duration-300 ease-in-out text-gray-600 hover:bg-green-50 hover:text-green-600"
                        >
                            <LogIn className="mr-3 w-5 h-5 group-hover:text-green-500 transition-colors" />
                            <span className="text-sm font-medium">Login</span>
                        </Link>
                        <Link
                            href="/register"
                            className="group flex items-center px-4 py-3 rounded-lg transition-all duration-300 ease-in-out text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                        >
                            <UserPlus className="mr-3 w-5 h-5 group-hover:text-purple-500 transition-colors" />
                            <span className="text-sm font-medium">
                                Register
                            </span>
                        </Link>
                    </nav>

                    <div className="px-4 mt-auto">
                        <div className="p-4 rounded-lg bg-gray-50">
                            <p className="text-xs text-gray-500">
                                © 2024 RideMate
                            </p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main content - with left margin to account for fixed sidebar */}
            <main>
                <div className="w-full">{children}</div>
            </main>
        </div>
    );
}
