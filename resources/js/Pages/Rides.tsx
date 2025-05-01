import React, { useState } from "react";
import { Link, Head, usePage } from "@inertiajs/react"; // Import Head for title
import {
    FaCar,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaClock,
    FaUser,
    FaSearch,
    FaLeaf,
    FaRoad,
    FaChair,
    FaInfoCircle,
} from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useRideStatus } from "@/hooks/useRideStatus";

interface User {
    photo: any;
    id: number;
    name: string;
    email: string;
}

export interface Ride {
    carbonSavingKg: number;
    bookings: any;
    id: number;
    driver_id: number;
    start_location: string;
    end_location: string;
    departure_datetime: string;
    available_seats: number;
    status: "active" | "completed" | "cancelled";
    description: string | null;
    distance_km: number | null;
    driver: User;
}

export interface PageProps {
    auth: {
        user: User | null;
    };
    rides: Ride[];
    [key: string]: any;
}

// Helper function for status colors and text
const getStatusStyle = (status: Ride["status"]) => {
    switch (status) {
        case "active":
            return {
                badgeBg: "bg-green-100",
                badgeText: "text-green-800",
                border: "border-green-500",
                text: "Active",
            };
        case "completed":
            return {
                badgeBg: "bg-blue-100",
                badgeText: "text-blue-800",
                border: "border-blue-500",
                text: "Completed",
            };
        case "cancelled":
            return {
                badgeBg: "bg-red-100",
                badgeText: "text-red-800",
                border: "border-red-500",
                text: "Cancelled",
            };
        default:
            return {
                badgeBg: "bg-gray-100",
                badgeText: "text-gray-800",
                border: "border-gray-500",
                text: "Unknown",
            };
    }
};

const Rides = ({ rides = [] }: PageProps) => {
    const { auth } = usePage<PageProps>().props;
    const [fromLocation, setFromLocation] = useState("");
    const [toLocation, setToLocation] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState<string>("");

    const filteredRides = rides.filter((ride) => {
        const matchesFrom =
            fromLocation === "" ||
            ride.start_location
                .toLowerCase()
                .includes(fromLocation.toLowerCase());
        const matchesTo =
            toLocation === "" ||
            ride.end_location.toLowerCase().includes(toLocation.toLowerCase());
        const matchesStatus =
            statusFilter === "all" || ride.status === statusFilter;

        return matchesFrom && matchesTo && matchesStatus;
    });

    const formatDateTime = (dateTime: string) => {
        const date = new Date(dateTime);
        return {
            date: date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            }),
            time: date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true, // Use AM/PM
            }),
        };
    };

    // Inside your component
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <Head title="Available Rides" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                        Available Rides
                    </h1>
                    {auth?.user && (
                        <Link
                            href="/rides/create"
                            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:border-blue-900 focus:ring focus:ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150"
                        >
                            <FaCar className="mr-2 -ml-1 h-4 w-4" /> Offer a
                            Ride
                        </Link>
                    )}
                </div>

                <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
                    <div className="relative w-full mb-4">
                        <Label
                            htmlFor="from-location"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                            From
                        </Label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaMapMarkerAlt className="h-5 w-5 text-red-500" />
                            </div>
                            <input
                                id="from-location"
                                type="text"
                                placeholder="Departure location..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
                                value={fromLocation}
                                onChange={(e) =>
                                    setFromLocation(e.target.value)
                                }
                            />
                        </div>
                    </div>

                    {/* Toggle button visible only on small screens */}
                    <button
                        type="button"
                        className="mb-4 text-blue-600 hover:underline text-sm md:hidden"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? "Less filters" : "More filters"}
                    </button>

                    {/* Filters container: always show on md+, toggle on smaller */}
                    <div
                        className={`grid grid-cols-1 gap-4 md:grid-cols-3 items-start ${
                            isExpanded ? "block" : "hidden"
                        } md:block`}
                    >
                        {/* To Location */}
                        <div className="relative w-full">
                            <Label
                                htmlFor="to-location"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                                To
                            </Label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaMapMarkerAlt className="h-5 w-5 text-green-500" />
                                </div>
                                <input
                                    id="to-location"
                                    type="text"
                                    placeholder="Destination location..."
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
                                    value={toLocation}
                                    onChange={(e) =>
                                        setToLocation(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        {/* Status Filter */}
                        <div className="relative w-full">
                            <Label
                                htmlFor="status-filter"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                                Status
                            </Label>
                            <select
                                id="status-filter"
                                className="block w-full appearance-none rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 pr-8 leading-tight text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                            >
                                <option value="all">All</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>

                {filteredRides.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredRides.map((ride) => {
                            const { date, time } = formatDateTime(
                                ride.departure_datetime,
                            );
                            const statusStyle = getStatusStyle(ride.status);

                            return (
                                <div
                                    key={ride.id}
                                    className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-l-4 ${statusStyle.border} flex flex-col transition hover:shadow-xl`}
                                >
                                    <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex-1 mr-2">
                                                <div className="flex items-center text-gray-700 dark:text-gray-300 mb-1">
                                                    <FaMapMarkerAlt className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" />
                                                    <span className="font-medium text-gray-800 dark:text-gray-100 truncate">
                                                        {ride.start_location}
                                                    </span>
                                                </div>
                                                <div className="flex items-center pl-1 mb-1">
                                                    <ArrowRight className="w-3 h-3 mx-1 text-gray-400 dark:text-gray-500" />
                                                </div>
                                                <div className="flex items-center text-gray-700 dark:text-gray-300">
                                                    <FaMapMarkerAlt className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                                                    <span className="font-medium text-gray-800 dark:text-gray-100 truncate">
                                                        {ride.end_location}
                                                    </span>
                                                </div>
                                            </div>

                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle.badgeBg} ${statusStyle.badgeText} capitalize`}
                                            >
                                                {statusStyle.text}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-5 flex-grow space-y-3 text-sm">
                                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                                            <FaCalendarAlt className="w-4 h-4 mr-2 text-blue-500" />
                                            <span>{date}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                                            <FaClock className="w-4 h-4 mr-2 text-blue-500" />
                                            <span>{time}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                                            <FaUser className="w-4 h-4 mr-2 text-blue-500" />
                                            <span className="mr-1">
                                                Driver:
                                            </span>
                                            <span className="font-medium text-gray-800 dark:text-gray-100 truncate">
                                                {ride.driver?.name || "Unknown"}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                                            <FaChair className="w-4 h-4 mr-2 text-blue-500" />
                                            <span>
                                                {ride.available_seats} seat
                                                {ride.available_seats !== 1
                                                    ? "s"
                                                    : ""}{" "}
                                                available
                                            </span>
                                        </div>
                                        {ride.distance_km && (
                                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                                                <FaRoad className="w-4 h-4 mr-2 text-blue-500" />
                                                <span>
                                                    {ride.distance_km} km
                                                </span>
                                            </div>
                                        )}
                                        {typeof ride.carbonSavingKg && (
                                            <div className="flex items-center text-green-600 dark:text-green-400 mt-1 font-semibold">
                                                <FaLeaf className="w-4 h-4 mr-2" />
                                                <span>
                                                    {ride.carbonSavingKg} kg CO₂
                                                    saved
                                                </span>
                                            </div>
                                        )}
                                        {ride.description && (
                                            <div className="flex items-start text-gray-600 dark:text-gray-400 pt-2">
                                                <FaInfoCircle className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
                                                <p className="text-gray-500 dark:text-gray-400 italic">
                                                    {ride.description}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 mt-auto">
                                        <div className="flex space-x-3">
                                            <Link
                                                href={`/rides/${ride.id}`}
                                                className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-200 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150"
                                            >
                                                View Details
                                            </Link>

                                            {auth?.user &&
                                                ride.status === "active" &&
                                                auth.user.id !==
                                                    ride.driver_id && (
                                                    <Link
                                                        href={`/rides/${ride.id}/book`}
                                                        method="post"
                                                        as="button"
                                                        className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 active:bg-green-800 focus:outline-none focus:border-green-900 focus:ring focus:ring-green-300 disabled:opacity-25 transition ease-in-out duration-150"
                                                    >
                                                        Book Ride
                                                    </Link>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center bg-white dark:bg-gray-800 rounded-xl shadow-md p-10 mt-8">
                        {/* No rides message */}
                    </div>
                )}
            </div>
        </>
    );
};

export default Rides;
