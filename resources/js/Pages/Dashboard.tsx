import { usePage } from "@inertiajs/react";
import React from "react";
import { FaUserCircle, FaEnvelope, FaHome } from "react-icons/fa";

interface User {
    id: number;
    name: string;
    email: string;
}

interface Auth {
    user: User | null;
}

interface Props {
    auth: Auth;
}

export default function Dashboard({ auth }: Props) {
    const user = auth.user;

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden animate-fadeIn">
                <div className="bg-blue-600 text-white p-6 flex items-center">
                    <FaHome className="mr-4 text-4xl" />
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                </div>
                <div className="p-8 space-y-6">
                    <div className="flex items-center bg-blue-50 p-4 rounded-lg shadow-sm">
                        <FaUserCircle className="text-blue-600 text-4xl mr-4" />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                Welcome, {user.name}
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center bg-green-50 p-4 rounded-lg shadow-sm">
                        <FaEnvelope className="text-green-600 text-4xl mr-4" />
                        <div>
                            <h3 className="text-lg text-gray-700">
                                Email: {user.email}
                            </h3>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-purple-50 p-4 rounded-lg text-center hover:bg-purple-100 transition">
                            <h4 className="font-semibold text-purple-800">
                                Rides
                            </h4>
                            <p className="text-2xl font-bold text-purple-600">
                                0
                            </p>
                        </div>
                        <div className="bg-indigo-50 p-4 rounded-lg text-center hover:bg-indigo-100 transition">
                            <h4 className="font-semibold text-indigo-800">
                                Bookings
                            </h4>
                            <p className="text-2xl font-bold text-indigo-600">
                                0
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
