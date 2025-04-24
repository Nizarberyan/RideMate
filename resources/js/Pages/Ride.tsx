import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaClock,
    FaUser,
    FaChair,
    FaRoad,
    FaInfoCircle,
    FaArrowLeft,
} from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { EditRideModal } from "@/components/EditRideModal"; // Adjust path
import { useState } from "react";
import { Button } from "@/components/ui/button"; // Import useState
import { router } from "@inertiajs/react";

// --- Interfaces ---
interface User {
    id: number;
    name: string;
    email: string;
}

interface Ride {
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

interface PageProps {
    auth: {
        user: User | null;
    };
    ride: Ride;
    flash: {
        error: string | null;
        success: string | null;
    };
    [key: string]: any;
}

// Helper function for status colors and text
const getStatusStyle = (status: Ride["status"]) => {
    switch (status) {
        case "active":
            return {
                badgeBg: "bg-green-100 dark:bg-green-900",
                badgeText: "text-green-800 dark:text-green-200",
                border: "border-green-500",
                text: "Active",
            };
        case "completed":
            return {
                badgeBg: "bg-blue-100 dark:bg-blue-900",
                badgeText: "text-blue-800 dark:text-blue-200",
                border: "border-blue-500",
                text: "Completed",
            };
        case "cancelled":
            return {
                badgeBg: "bg-red-100 dark:bg-red-900",
                badgeText: "text-red-800 dark:text-red-200",
                border: "border-red-500",
                text: "Cancelled",
            };
        default:
            return {
                badgeBg: "bg-gray-100 dark:bg-gray-700",
                badgeText: "text-gray-800 dark:text-gray-200",
                border: "border-gray-500",
                text: "Unknown",
            };
    }
};

// Format date and time
const formatDateTime = (dateTime: string) => {
    if (!dateTime) return { date: "N/A", time: "N/A" };
    try {
        const date = new Date(dateTime);
        if (isNaN(date.getTime())) {
            console.error("Invalid date format:", dateTime);
            return { date: "Invalid Date", time: "" };
        }
        return {
            date: date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            }),
            time: date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            }),
        };
    } catch (error) {
        console.error("Error formatting date:", error);
        return { date: "Error", time: "" };
    }
};

const RideDetail = () => {
    const { ride, auth, flash } = usePage<PageProps>().props;
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Add state for modal
    const { date, time } = formatDateTime(ride.departure_datetime);
    const statusStyle = getStatusStyle(ride.status);
    const isDriver = auth.user?.id === ride.driver_id;
    const canBook = auth.user && !isDriver && ride.status === "active";

    const handleOpenEditModal = () => setIsEditModalOpen(true);
    const handleCloseEditModal = () => setIsEditModalOpen(false);

    return (
        <>
            {flash?.error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                    {flash.error}
                </div>
            )}
            {flash?.success && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                    {flash.success}
                </div>
            )}

            <Head
                title={`Ride from ${ride.start_location} to ${ride.end_location}`}
            />
            {/* Page Header - You might render this differently based on your layout */}
            <div className="mb-6 flex items-center justify-between">
                {/* This title might be rendered via a layout slot */}
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Ride Details
                </h2>
                <Link
                    href="/rides" // Link back to the rides list
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    <FaArrowLeft className="mr-1.5 h-3 w-3" />
                    Back to Rides
                </Link>
            </div>
            {/* Main content container */}
            <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                <div
                    className={`bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg border-t-4 ${statusStyle.border}`}
                >
                    {/* Ride Header: Locations & Status */}
                    <div className="p-6 sm:px-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                            <div className="mb-4 sm:mb-0">
                                <div className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                                    <FaMapMarkerAlt className="w-5 h-5 mr-2 text-red-500 flex-shrink-0" />
                                    <span>{ride.start_location}</span>
                                    <ArrowRight className="w-4 h-4 mx-3 text-gray-400 dark:text-gray-500" />
                                    <FaMapMarkerAlt className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" />
                                    <span>{ride.end_location}</span>
                                </div>
                                {ride.distance_km && (
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 ml-1">
                                        <FaRoad className="w-4 h-4 mr-1.5 text-gray-400 dark:text-gray-500" />
                                        <span>
                                            Approx. {ride.distance_km} km
                                        </span>
                                    </div>
                                )}
                            </div>
                            <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusStyle.badgeBg} ${statusStyle.badgeText} capitalize`}
                            >
                                {statusStyle.text}
                            </span>
                        </div>
                    </div>

                    {/* Ride Details Body */}
                    <div className="p-6 sm:px-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-gray-700 dark:text-gray-300">
                        {/* Date & Time */}
                        <div className="flex items-center">
                            <FaCalendarAlt className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" />
                            <div>
                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                    Date:
                                </span>{" "}
                                {date}
                            </div>
                        </div>
                        <div className="flex items-center">
                            <FaClock className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" />
                            <div>
                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                    Time:
                                </span>{" "}
                                {time}
                            </div>
                        </div>

                        {/* Driver Info */}
                        <div className="flex items-center">
                            <FaUser className="w-5 h-5 mr-3 text-purple-500 flex-shrink-0" />
                            <div>
                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                    Driver:
                                </span>{" "}
                                {ride.driver?.name ?? "Unknown"}
                            </div>
                        </div>

                        {/* Seats Info */}
                        <div className="flex items-center">
                            <FaChair className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0" />
                            <div>
                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                    Seats Available:
                                </span>{" "}
                                {ride.available_seats}
                            </div>
                        </div>

                        {/* Description */}
                        {ride.description && (
                            <div className="md:col-span-2 flex items-start pt-2">
                                <FaInfoCircle className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-500 mt-1 flex-shrink-0" />
                                <div>
                                    <span className="font-medium text-gray-900 dark:text-gray-100 block mb-1">
                                        Description:
                                    </span>
                                    <p className="text-gray-600 dark:text-gray-400 italic">
                                        {ride.description}
                                    </p>
                                </div>
                            </div>
                        )}
                        {/* Add other details like price if available */}
                    </div>

                    {/* Action Buttons Footer */}
                    <div className="p-6 sm:px-10 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                        {canBook && (
                            <Link
                                href={`/rides/${ride.id}/book`}
                                method="post"
                                as="button"
                                className="w-full sm:w-auto inline-flex justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800 disabled:opacity-50"
                                disabled={ride.available_seats <= 0}
                            >
                                {ride.available_seats > 0
                                    ? "Book This Ride"
                                    : "Ride Full"}
                            </Link>
                        )}

                        {/* Replace the Edit Ride Link with a Button that opens the modal */}
                        {isDriver && ride.status === "active" && (
                            <>
                                <Button
                                    // Remove Link component props like href
                                    variant="outline" // Example variant using Shadcn UI Button
                                    onClick={handleOpenEditModal}
                                    className="w-full sm:w-auto dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                                >
                                    Edit Ride
                                </Button>
                                {/* Keep Cancel Ride Link/Button as is */}
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        if (
                                            confirm(
                                                "Are you sure you want to cancel this ride?",
                                            )
                                        ) {
                                            router.patch(
                                                `/rides/${ride.id}/cancel`,
                                            );
                                        }
                                    }}
                                    className="w-full sm:w-auto"
                                >
                                    Cancel Ride
                                </Button>
                            </>
                        )}

                        {!canBook && !isDriver && ride.status === "active" && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                You cannot book your own ride.
                            </p>
                        )}
                        {ride.status !== "active" && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                This ride is {ride.status} and cannot be booked
                                or modified.
                            </p>
                        )}
                    </div>
                </div>
            </div>
            {/* Add the Modal component at the end (or anywhere suitable) */}
            <EditRideModal
                ride={ride}
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
            />
        </> // Close React Fragment
    );
};

export default RideDetail;
