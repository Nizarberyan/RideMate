import React, { useState } from "react";
import {
    FaUserCircle,
    FaEnvelope,
    FaHome,
    FaCar,
    FaCalendarCheck,
    FaBell,
    FaUsers,
    FaMapMarkerAlt,
    FaUser,
    FaRoad,
    FaTrash, // Added for delete icon consistency
} from "react-icons/fa";
import type { Ride } from "@/Pages/Rides";
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

type TabKey = "home" | "yourRides" | "manageBookings" | "adminPanel";
type AdminSubTabKey = "users" | "rides"; // Type for admin sub-tabs

export default function Dashboard({
    auth,
    stats,
    rides,
    ridesWithBookings,
    adminData,
}: Props) {
    const user = auth.user;
    const [ridesList, setRidesList] = useState(rides || []);
    const [ridesWithBookingsList, setRidesWithBookingsList] = useState(
        ridesWithBookings || [],
    );

    const [adminUsers, setAdminUsers] = useState(adminData?.users || []);
    const [adminRides, setAdminRides] = useState(adminData?.rides || []);

    const [activeTab, setActiveTab] = useState<TabKey>("home");
    // --- State for Admin Panel Sub-tabs ---
    const [adminActiveSubTab, setAdminActiveSubTab] =
        useState<AdminSubTabKey>("users");

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

    // --- Helper Function for Admin Delete Button ---
    const handleDeleteClick = (
        type: "user" | "ride",
        id: number,
        name: string,
    ) => {
        if (confirm(`Are you sure you want to delete ${type} ${name}?`)) {
            if (type === "user") {
                router.delete(`/admin/users/${id}`, {
                    onSuccess: () =>
                        setAdminUsers((prev) =>
                            prev.filter((u) => u.id !== id),
                        ),
                    onError: () =>
                        alert(
                            `Failed to delete user ${name}. Please try again.`,
                        ),
                });
            } else if (type === "ride") {
                router.delete(`/admin/rides/${id}`, {
                    onSuccess: () =>
                        setAdminRides((prev) =>
                            prev.filter((r) => r.id !== id),
                        ),
                    onError: () =>
                        alert(
                            `Failed to delete ride ${name}. Please try again.`,
                        ),
                });
            }
        }
    };

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
                    {/* --- Home Tab Content --- */}
                    {activeTab === "home" && (
                        <>
                            <section className="flex items-center gap-6 bg-blue-50 p-6 rounded-lg shadow-md mb-8">
                                {user.photo ? (
                                    <img
                                        src={"/storage/" + user.photo}
                                        alt={user.name}
                                        className="w-20 h-20 rounded-full object-cover" // Added object-cover
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
                                    {user.role && (
                                        <p className="mt-1 text-sm text-blue-800 bg-blue-100 px-2 py-0.5 rounded inline-block">
                                            Role:{" "}
                                            <span className="font-semibold capitalize">
                                                {user.role}
                                            </span>
                                        </p>
                                    )}
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

                    {/* --- Your Rides Tab Content --- */}
                    {activeTab === "yourRides" && (
                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold text-indigo-700 mb-4">
                                Your Rides
                            </h2>
                            {ridesList.length === 0 ? (
                                <p className="text-gray-600 text-center py-10">
                                    You haven't created any rides yet.
                                </p>
                            ) : (
                                ridesList.map((ride) => (
                                    <div
                                        key={ride.id}
                                        className="border rounded-lg p-4 shadow-sm bg-white"
                                    >
                                        <RideItem
                                            ride={ride}
                                            currentUserId={user.id}
                                        />
                                        {ride.status === "active" && (
                                            <div className="mt-4 flex gap-3 border-t pt-3">
                                                <button
                                                    onClick={() =>
                                                        updateRideStatus(
                                                            ride.id,
                                                            "completed",
                                                        )
                                                    }
                                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                                                >
                                                    Mark as Completed
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        updateRideStatus(
                                                            ride.id,
                                                            "cancelled",
                                                        )
                                                    }
                                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                                                >
                                                    Cancel Ride
                                                </button>
                                            </div>
                                        )}
                                        {ride.status !== "active" && (
                                            <div className="mt-4 border-t pt-3">
                                                <p
                                                    className={`text-sm font-medium ${ride.status === "completed" ? "text-green-600" : "text-red-600"}`}
                                                >
                                                    Status:{" "}
                                                    <span className="capitalize">
                                                        {ride.status}
                                                    </span>
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </section>
                    )}

                    {/* --- Manage Bookings Tab Content --- */}
                    {activeTab === "manageBookings" && (
                        <section className="space-y-8">
                            <h2 className="text-2xl font-bold text-green-700 mb-4">
                                Manage Bookings
                            </h2>
                            {ridesWithBookingsList.length === 0 ||
                            ridesWithBookingsList.every(
                                (r) => r.bookings.length === 0,
                            ) ? (
                                <p className="text-gray-600 text-center py-10">
                                    No pending booking requests for your rides.
                                </p>
                            ) : (
                                ridesWithBookingsList.flatMap((ride) =>
                                    ride.bookings
                                        .filter(
                                            (b: any) => b.status === "pending",
                                        ) // Ensure only pending bookings are shown initially
                                        .map((booking: any) => (
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

                    {/* --- Admin Panel Tab Content --- */}
                    {activeTab === "adminPanel" && user.role === "admin" && (
                        <section className="space-y-8">
                            <h2 className="text-2xl font-bold text-red-700 mb-6">
                                Admin Management Panel
                            </h2>

                            {/* --- Admin Sub-tab Navigation --- */}
                            <div className="flex space-x-4 mb-6 border-b border-gray-300 pb-3">
                                <button
                                    onClick={() =>
                                        setAdminActiveSubTab("users")
                                    }
                                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-colors text-sm ${
                                        adminActiveSubTab === "users"
                                            ? "bg-red-100 text-red-700 shadow-sm"
                                            : "text-gray-600 hover:bg-gray-100"
                                    }`}
                                    type="button"
                                >
                                    <FaUsers className="w-4 h-4" /> Manage Users
                                </button>
                                <button
                                    onClick={() =>
                                        setAdminActiveSubTab("rides")
                                    }
                                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-colors text-sm ${
                                        adminActiveSubTab === "rides"
                                            ? "bg-red-100 text-red-700 shadow-sm"
                                            : "text-gray-600 hover:bg-gray-100"
                                    }`}
                                    type="button"
                                >
                                    <FaCar className="w-4 h-4" /> Manage Rides
                                </button>
                            </div>

                            {/* --- Admin Users Sub-section --- */}
                            {adminActiveSubTab === "users" && (
                                <section>
                                    <h3 className="text-xl font-semibold mb-4 text-gray-800">
                                        All Users ({adminUsers.length})
                                    </h3>
                                    {adminUsers.length === 0 ? (
                                        <p className="text-gray-600 bg-gray-50 p-4 rounded-md">
                                            No users found.
                                        </p>
                                    ) : (
                                        <div className="space-y-4">
                                            {adminUsers.map((u) => (
                                                <div
                                                    key={u.id}
                                                    className="bg-white rounded-xl shadow-lg border-l-4 border-green-500 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between transition hover:shadow-xl"
                                                >
                                                    <div className="flex-1 mb-3 sm:mb-0 sm:mr-4">
                                                        <div className="flex items-center text-gray-800 mb-1">
                                                            <FaUser className="w-4 h-4 mr-2 text-green-500" />
                                                            <span className="font-medium truncate">
                                                                {u.name}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center text-gray-600 text-sm">
                                                            <FaEnvelope className="w-4 h-4 mr-2 text-gray-400" />
                                                            <span className="truncate">
                                                                {u.email}
                                                            </span>
                                                        </div>
                                                        {u.role && (
                                                            <p className="mt-2 text-xs text-blue-800 bg-blue-100 px-2 py-0.5 rounded inline-block">
                                                                Role:{" "}
                                                                <span className="font-semibold capitalize">
                                                                    {u.role}
                                                                </span>
                                                            </p>
                                                        )}
                                                    </div>
                                                    <button
                                                        className="text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1 rounded transition text-sm font-medium flex items-center gap-1 self-start sm:self-center"
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                "user",
                                                                u.id,
                                                                u.name,
                                                            )
                                                        }
                                                    >
                                                        <FaTrash className="w-3 h-3" />{" "}
                                                        Delete
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </section>
                            )}

                            {/* --- Admin Rides Sub-section --- */}
                            {adminActiveSubTab === "rides" && (
                                <section>
                                    <h3 className="text-xl font-semibold mb-4 text-gray-800">
                                        All Rides ({adminRides.length})
                                    </h3>
                                    {adminRides.length === 0 ? (
                                        <p className="text-gray-600 bg-gray-50 p-4 rounded-md">
                                            No rides found in the system.
                                        </p>
                                    ) : (
                                        <div className="space-y-4">
                                            {adminRides.map((ride) => (
                                                <div
                                                    key={ride.id}
                                                    className="bg-white rounded-xl shadow-lg border-l-4 border-blue-500 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between transition hover:shadow-xl"
                                                >
                                                    <div className="flex-1 mb-3 sm:mb-0 sm:mr-4">
                                                        {/* Ride Details */}
                                                        <div className="flex items-center text-gray-700 mb-1">
                                                            <FaMapMarkerAlt className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" />
                                                            <span className="font-medium text-gray-800 truncate">
                                                                {
                                                                    ride.start_location
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center pl-6 mb-1">
                                                            {" "}
                                                            {/* Indent arrow */}
                                                            <span className="text-gray-400">
                                                                &#8594;
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center text-gray-700 mb-2">
                                                            <FaMapMarkerAlt className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                                                            <span className="font-medium text-gray-800 truncate">
                                                                {
                                                                    ride.end_location
                                                                }
                                                            </span>
                                                        </div>
                                                        {/* Driver & Distance */}
                                                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 pl-1">
                                                            <div className="flex items-center">
                                                                <FaUser className="w-4 h-4 mr-2 text-blue-500" />
                                                                <span className="mr-1">
                                                                    Driver:
                                                                </span>
                                                                <span className="font-medium truncate">
                                                                    {ride.driver
                                                                        ?.name ||
                                                                        "Unknown"}{" "}
                                                                    (ID:{" "}
                                                                    {
                                                                        ride.driver_id
                                                                    }
                                                                    )
                                                                </span>
                                                            </div>
                                                            {ride.distance_km && (
                                                                <div className="flex items-center">
                                                                    <FaRoad className="w-4 h-4 mr-2 text-purple-500" />
                                                                    <span>
                                                                        {ride.distance_km.toFixed(
                                                                            1,
                                                                        )}{" "}
                                                                        km
                                                                    </span>
                                                                </div>
                                                            )}
                                                            <div className="flex items-center">
                                                                <FaCalendarCheck className="w-4 h-4 mr-2 text-orange-500" />
                                                                <span>
                                                                    Status:{" "}
                                                                    <span className="font-medium capitalize">
                                                                        {
                                                                            ride.status
                                                                        }
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        className="text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1 rounded transition text-sm font-medium flex items-center gap-1 self-start sm:self-center"
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                "ride",
                                                                ride.id,
                                                                `from ${ride.start_location}`,
                                                            )
                                                        }
                                                    >
                                                        <FaTrash className="w-3 h-3" />{" "}
                                                        Delete
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </section>
                            )}
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}

// --- StatCard Component (Unchanged) ---
interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: number;
    color: "purple" | "indigo" | "green" | "yellow";
}

function StatCard({ icon, title, value, color }: StatCardProps) {
    // (Keep the existing StatCard implementation)
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
