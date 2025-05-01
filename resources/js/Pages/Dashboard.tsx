import React, { useState } from "react";
import {
    FaUserCircle,
    FaEnvelope,
    FaHome,
    FaCar,
    FaCalendarCheck,
    FaBell,
    FaCalendarAlt,
    FaClock,
    FaUser,
    FaChair,
    FaRoad,
    FaMapMarkerAlt,
    FaUsers,
    FaCarSide,
} from "react-icons/fa";
import type { Ride } from "@/Pages/Rides";
import axios from "axios";
import { router } from "@inertiajs/react";
import RideItem from "./RideItem";
import BookingItem from "./BookingItem";

interface User {
    id: number;
    name: string;
    email: string;
    photo: string;
    role?: string;
}

interface AdminData {
    users?: User[];
    rides?: Ride[];
}

interface Props {
    auth: { user: User | null };
    stats?: {
        ridesCount?: number;
        bookingsCount?: number;
        upcomingRides?: number;
        notifications?: number;
        ridesStatus?: {
            completed: number;
            cancelled: number;
            active: number;
        };
    };
    rides?: Ride[];
    ridesWithBookings?: Ride[];
    adminData?: AdminData;
}

// And destructure like this in the function:
export default function Dashboard({
    auth,
    stats,
    rides,
    ridesWithBookings,
    adminData,
}: Props) {
    // ...rest stays the same
    console.log(ridesWithBookings);
    const user = auth.user;
    const [ridesList, setRidesList] = useState(rides || []);
    const [ridesWithBookingsList, setRidesWithBookingsList] = useState(
        ridesWithBookings || [],
    );

    const [adminUsers, setAdminUsers] = useState(adminData?.users || []);
    const [adminRides, setAdminRides] = useState(adminData?.rides || []);

    const [activeTab, setActiveTab] = useState<TabKey>("home");

    if (!user) {
        return null;
    }

    const {
        ridesCount = 0,
        bookingsCount = 0,
        upcomingRides = 0,
        notifications = 0,
        ridesStatus = { completed: 0, cancelled: 0, active: 0 },
    } = stats || {};

    const totalRidesStatus =
        ridesStatus.completed + ridesStatus.cancelled + ridesStatus.active || 1;

    const completedPercent = (ridesStatus.completed / totalRidesStatus) * 100;
    const cancelledPercent = (ridesStatus.cancelled / totalRidesStatus) * 100;
    const activePercent = (ridesStatus.active / totalRidesStatus) * 100;

    const updateRideStatus = async (
        id: number,
        status: "completed" | "cancelled",
    ) => {
        try {
            if (status === "completed") {
                router.patch(`/rides/${id}/complete`);
            } else if (status === "cancelled") {
                router.patch(`/rides/${id}/cancel`);
            }
            setRidesList((prev) =>
                prev.map((ride) =>
                    ride.id === id ? { ...ride, status } : ride,
                ),
            );
        } catch {
            alert("Failed to update ride status. Please try again.");
        }
    };

    const confirmBooking = async (bookingId: number) => {
        try {
            router.patch(`/bookings/${bookingId}/confirm`);
            setRidesWithBookingsList((prevRides) =>
                prevRides.map((ride) => ({
                    ...ride,
                    bookings: ride.bookings.filter(
                        (b: any) => b.id !== bookingId,
                    ),
                })),
            );
        } catch {
            alert("Failed to confirm booking");
        }
    };
    const cancelBooking = async (bookingId: number) => {
        try {
            router.patch(`/bookings/${bookingId}/cancel`);
            setRidesWithBookingsList((prevRides) =>
                prevRides.map((ride) => ({
                    ...ride,
                    bookings: ride.bookings.filter(
                        (b: any) => b.id !== bookingId,
                    ),
                })),
            );
        } catch (error) {
            alert("Failed to cancel booking");
        }
    };

    const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
        {
            key: "home",
            label: "Home",
            icon: <FaUserCircle className="w-5 h-5 text-blue-600" />,
        },
        {
            key: "yourRides",
            label: "Your Rides",
            icon: <FaCalendarCheck className="w-5 h-5 text-indigo-600" />,
        },
        {
            key: "manageBookings",
            label: "Manage Bookings",
            icon: <FaEnvelope className="w-5 h-5 text-green-600" />,
        },
    ];

    if (user.role === "admin") {
        tabs.push({
            key: "adminPanel",
            label: "Admin Panel",
            icon: <FaUsers className="w-5 h-5 text-red-600" />,
        });
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden animate-fadeIn">
                <header className="bg-blue-600 text-white p-6 flex items-center gap-4">
                    <FaHome className="w-8 h-8" />
                    <h1 className="text-4xl font-extrabold tracking-tight">
                        Dashboard
                    </h1>
                </header>

                <nav className="bg-blue-50 flex space-x-4 px-6 py-4 border-b border-blue-200">
                    {tabs.map(({ key, label, icon }) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-colors text-sm ${
                                activeTab === key
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "text-blue-700 hover:bg-blue-100"
                            }`}
                            type="button"
                        >
                            {icon}
                            {label}
                        </button>
                    ))}
                </nav>

                <main className="p-10 space-y-8 min-h-[400px]">
                    {activeTab === "home" && (
                        <>
                            <section className="flex items-center gap-6 bg-blue-50 p-6 rounded-lg shadow-md mb-8">
                                {user.photo ? (
                                    <img
                                        src={"/storage/" + user.photo}
                                        alt={user.name}
                                        className="w-20 h-20 rounded-full"
                                    />
                                ) : (
                                    <FaUserCircle className="text-blue-600 w-20 h-20" />
                                )}
                                <div>
                                    <h2 className="text-3xl font-semibold text-blue-900">
                                        Welcome back, {user.name}!
                                    </h2>
                                    <p className="mt-1 text-gray-700">
                                        Your registered email:{" "}
                                        <span className="font-medium">
                                            {user.email}
                                        </span>
                                    </p>
                                </div>
                            </section>

                            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                <StatCard
                                    icon={
                                        <FaCar className="w-6 h-6 text-purple-600" />
                                    }
                                    title="Total Rides"
                                    value={ridesCount}
                                    color="purple"
                                />
                                <StatCard
                                    icon={
                                        <FaCalendarCheck className="w-6 h-6 text-indigo-600" />
                                    }
                                    title="Upcoming Rides"
                                    value={upcomingRides}
                                    color="indigo"
                                />
                                <StatCard
                                    icon={
                                        <FaCalendarCheck className="w-6 h-6 text-green-600" />
                                    }
                                    title="Total Bookings"
                                    value={bookingsCount}
                                    color="green"
                                />
                                <StatCard
                                    icon={
                                        <FaBell className="w-6 h-6 text-yellow-600" />
                                    }
                                    title="Notifications"
                                    value={notifications}
                                    color="yellow"
                                />
                            </section>

                            <section className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                    Ride Status Ratio
                                </h3>

                                <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden flex">
                                    <div
                                        className="bg-green-500 h-6"
                                        style={{
                                            width: `${completedPercent}%`,
                                        }}
                                        title={`Completed: ${ridesStatus.completed}`}
                                    />
                                    <div
                                        className="bg-red-500 h-6"
                                        style={{
                                            width: `${cancelledPercent}%`,
                                        }}
                                        title={`Cancelled: ${ridesStatus.cancelled}`}
                                    />
                                    <div
                                        className="bg-yellow-400 h-6"
                                        style={{ width: `${activePercent}%` }}
                                        title={`Active: ${ridesStatus.active}`}
                                    />
                                </div>

                                <div className="mt-4 flex justify-between text-sm text-gray-600 font-medium">
                                    <div className="flex items-center gap-2">
                                        <span className="block w-4 h-4 bg-green-500 rounded" />
                                        Completed ({ridesStatus.completed})
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="block w-4 h-4 bg-red-500 rounded" />
                                        Cancelled ({ridesStatus.cancelled})
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="block w-4 h-4 bg-yellow-400 rounded" />
                                        Active ({ridesStatus.active})
                                    </div>
                                </div>
                            </section>
                        </>
                    )}
                    {activeTab === "yourRides" && (
                        <section className="space-y-6">
                            {ridesList.length === 0 && (
                                <p className="text-gray-600">
                                    You have no rides.
                                </p>
                            )}
                            {ridesList.map((ride) => (
                                <div
                                    key={ride.id}
                                    className="border rounded p-4 shadow-sm"
                                >
                                    <RideItem
                                        ride={ride}
                                        currentUserId={user.id}
                                    />
                                    {ride.status === "active" && (
                                        <div className="mt-4 flex gap-3">
                                            <button
                                                onClick={() =>
                                                    updateRideStatus(
                                                        ride.id,
                                                        "completed",
                                                    )
                                                }
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                                            >
                                                Complete
                                            </button>
                                            <button
                                                onClick={() =>
                                                    updateRideStatus(
                                                        ride.id,
                                                        "cancelled",
                                                    )
                                                }
                                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </section>
                    )}

                    {activeTab === "manageBookings" && (
                        <section className="space-y-8">
                            {ridesWithBookingsList.length === 0 ? (
                                <p className="text-gray-600 text-center py-10">
                                    No pending bookings.
                                </p>
                            ) : (
                                ridesWithBookingsList.flatMap((ride) =>
                                    ride.bookings.map((booking: any) => (
                                        <BookingItem
                                            key={booking.id}
                                            booking={booking}
                                            ride={ride}
                                            currentUserId={user.id}
                                            onConfirm={confirmBooking}
                                            onCancel={cancelBooking}
                                        />
                                    )),
                                )
                            )}
                        </section>
                    )}

                    {activeTab === "adminPanel" && user.role === "admin" && (
                        <section className="space-y-8">
                            <h2 className="text-2xl font-bold text-red-700 mb-4">
                                Admin Management
                            </h2>

                            <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
                                <section>
                                    <h3 className="font-semibold mb-4 text-gray-800">
                                        Users
                                    </h3>
                                    {adminUsers.length === 0 ? (
                                        <p className="text-gray-600">
                                            No users found.
                                        </p>
                                    ) : (
                                        <ul className="divide-y divide-gray-200">
                                            {adminUsers.map((u) => (
                                                <li
                                                    key={u.id}
                                                    className="py-3 flex justify-between items-center"
                                                >
                                                    <span className="text-gray-700">
                                                        {u.name} ({u.email})
                                                    </span>
                                                    <button
                                                        className="text-red-600 hover:bg-red-50 px-3 py-1 rounded transition text-sm"
                                                        onClick={() =>
                                                            alert(
                                                                `Delete user ${u.name} (not implemented)`,
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </section>

                                <section>
                                    <h3 className="font-semibold mb-4 text-gray-800">
                                        Rides
                                    </h3>
                                    {adminRides.length === 0 ? (
                                        <p className="text-gray-600">
                                            No rides found.
                                        </p>
                                    ) : (
                                        <ul className="divide-y divide-gray-200">
                                            {adminRides.map((ride) => (
                                                <li
                                                    key={ride.id}
                                                    className="py-3 flex justify-between items-center"
                                                >
                                                    <span className="text-gray-700">
                                                        Ride from{" "}
                                                        {ride.start_location} to{" "}
                                                        {ride.end_location}
                                                    </span>
                                                    <button
                                                        className="text-red-600 hover:bg-red-50 px-3 py-1 rounded transition text-sm"
                                                        onClick={() =>
                                                            alert(
                                                                `Delete ride ${ride.id} (not implemented)`,
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </section>
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: number;
    color: "purple" | "indigo" | "green" | "yellow";
}

function StatCard({ icon, title, value, color }: StatCardProps) {
    const bgMap = {
        purple: "bg-purple-50 hover:bg-purple-100",
        indigo: "bg-indigo-50 hover:bg-indigo-100",
        green: "bg-green-50 hover:bg-green-100",
        yellow: "bg-yellow-50 hover:bg-yellow-100",
    };

    const textMap = {
        purple: "text-purple-700",
        indigo: "text-indigo-700",
        green: "text-green-700",
        yellow: "text-yellow-700",
    };

    const valueMap = {
        purple: "text-purple-600",
        indigo: "text-indigo-600",
        green: "text-green-600",
        yellow: "text-yellow-600",
    };

    return (
        <div
            className={`${bgMap[color]} p-6 rounded-lg shadow-sm cursor-pointer transition duration-200`}
        >
            <div className="flex items-center space-x-4 mb-4">{icon}</div>
            <h3 className={`font-semibold text-lg ${textMap[color]}`}>
                {title}
            </h3>
            <p className={`text-3xl font-extrabold ${valueMap[color]}`}>
                {value}
            </p>
        </div>
    );
}

function formatDateTime(datetime: string) {
    const d = new Date(datetime);
    return {
        date: d.toLocaleDateString(),
        time: d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
}
