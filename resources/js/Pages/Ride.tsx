import React, { useState } from "react";
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
import { EditRideModal } from "@/components/EditRideModal";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { useRideStatus } from "@/hooks/useRideStatus";
import type { Ride } from "./Rides";

interface PageProps {
    [key: string]: unknown;
    ride: Ride;
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        } | null;
    };
    flash: {
        error?: string;
        success?: string;
    };
}

const formatDateTime = (dateTime: string) => {
    if (!dateTime) return { date: "N/A", time: "N/A" };
    try {
        const date = new Date(dateTime);
        if (isNaN(date.getTime())) {
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
    } catch {
        return { date: "Error", time: "" };
    }
};

const RideDetail = () => {
    const { ride, auth, flash } = usePage<PageProps>().props;
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { date, time } = formatDateTime(ride.departure_datetime);
    const { canBook, isDriver, statusStyle, bookingStatusMessage } =
        useRideStatus(ride, auth.user?.id);
    console.log(ride);

    return (
        <>
            <Head
                title={`Ride from ${ride.start_location} to ${ride.end_location}`}
            />

            {/* Flash Messages */}
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

            {/* Top Header */}
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Ride Details
                </h2>
                <Link
                    href="/rides"
                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    <FaArrowLeft className="mr-1.5 h-3 w-3" />
                    Back to Rides
                </Link>
            </div>

            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                <div
                    className={`bg-white dark:bg-gray-800 shadow-xl rounded-lg border-t-4 ${statusStyle.border}`}
                >
                    {/* Header Locations & Status */}
                    <div className="p-6 sm:px-10 border-b border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center flex-wrap gap-2">
                            <div className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-100">
                                <FaMapMarkerAlt className="w-5 h-5 mr-2 text-red-500" />
                                <span className="truncate max-w-xs sm:max-w-md">
                                    {ride.start_location}
                                </span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500 mx-3" />
                            <div className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-100">
                                <FaMapMarkerAlt className="w-5 h-5 mr-2 text-green-500" />
                                <span className="truncate max-w-xs sm:max-w-md">
                                    {ride.end_location}
                                </span>
                            </div>
                        </div>
                        {ride.distance_km && (
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                <FaRoad className="w-4 h-4 mr-1.5" />
                                Approx. {ride.distance_km} km
                            </div>
                        )}
                        <span
                            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium capitalize ${statusStyle.badgeBg} ${statusStyle.badgeText}`}
                        >
                            {statusStyle.text}
                        </span>
                    </div>

                    {/* Details Grid */}
                    <div className="p-6 sm:px-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
                        <div className="flex items-center space-x-3">
                            <FaCalendarAlt className="w-5 h-5 text-blue-500" />
                            <div>
                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                    Date:
                                </span>{" "}
                                {date}
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaClock className="w-5 h-5 text-blue-500" />
                            <div>
                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                    Time:
                                </span>{" "}
                                {time}
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <FaUser className="w-5 h-5 text-purple-500" />
                            <div className="flex items-center space-x-2">
                                {ride.driver?.photo ? (
                                    <img
                                        src={`/storage/${ride.driver.photo}`}
                                        alt={`${ride.driver.name}'s profile`}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-semibold">
                                        {ride.driver?.name
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>
                                )}
                                <Link
                                    href={`/profile/${ride.driver?.id}`}
                                    className="truncate max-w-[200px] text-purple-700 hover:underline dark:text-purple-300"
                                >
                                    {ride.driver?.name ?? "Unknown"}
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <FaChair className="w-5 h-5 text-orange-500" />
                            <div>
                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                    Seats Available:
                                </span>{" "}
                                {ride.available_seats}
                            </div>
                        </div>

                        {ride.description && (
                            <div className="md:col-span-2 flex items-start space-x-3 pt-2">
                                <FaInfoCircle className="w-5 h-5 mt-1 text-gray-400 dark:text-gray-500" />
                                <div>
                                    <span className="font-medium text-gray-900 dark:text-gray-100 block mb-1">
                                        Description:
                                    </span>
                                    <p className="italic text-gray-600 dark:text-gray-400 break-words">
                                        {ride.description}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer Buttons */}
                    <div className="p-6 sm:px-10 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-end items-center gap-3">
                        {canBook && (
                            <Link
                                href={`/rides/${ride.id}/book`}
                                method="post"
                                as="button"
                                className="w-full sm:w-auto inline-flex justify-center px-6 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800 disabled:opacity-50"
                                disabled={ride.available_seats <= 0}
                            >
                                {ride.available_seats > 0
                                    ? "Book This Ride"
                                    : "Ride Full"}
                            </Link>
                        )}

                        {isDriver && ride.status === "active" && (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsEditModalOpen(true)}
                                    className="w-full sm:w-auto dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                                >
                                    Edit Ride
                                </Button>
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

                        {!canBook && bookingStatusMessage && (
                            <p className="text-sm max-w-xs text-gray-500 dark:text-gray-400 text-center sm:text-left">
                                {bookingStatusMessage}
                            </p>
                        )}

                        {ride.status !== "active" && (
                            <p className="text-sm max-w-xs text-gray-500 dark:text-gray-400 text-center sm:text-left">
                                This ride is {ride.status} and cannot be booked
                                or modified.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <EditRideModal
                ride={ride}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
            />
        </>
    );
};

export default RideDetail;
