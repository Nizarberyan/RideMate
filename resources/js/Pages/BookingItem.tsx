import React from "react";
import {
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaClock,
    FaUser,
    FaChair,
    FaRoad,
} from "react-icons/fa";
import { useRideStatus } from "@/hooks/useRideStatus";
import type { Ride } from "@/Pages/Rides";
interface User {
    id: number;
    name: string;
}

interface Booking {
    id: number;
    user: User | null;
    created_at: string;
}

interface Props {
    booking: Booking;
    ride: Ride;
    currentUserId: number;
    onConfirm: (bookingId: number) => void;
    onCancel: (bookingId: number) => void;
}

function formatDateTime(datetime: string) {
    const d = new Date(datetime);
    return {
        date: d.toLocaleDateString(),
        time: d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
}

export default function BookingItem({
    booking,
    ride,
    currentUserId,
    onConfirm,
    onCancel,
}: Props) {
    // Debugging logs to inspect the booking, ride and their nested properties
    console.debug("BookingItem debug - booking:", booking);
    console.debug("BookingItem debug - booking.user:", booking.user);
    console.debug("BookingItem debug - ride:", ride);
    console.debug("BookingItem debug - ride.driver:", ride.driver);

    const { date, time } = formatDateTime(ride.departure_datetime);
    const { statusStyle, seatsMessage } = useRideStatus(ride, currentUserId);

    return (
        <div
            key={booking.id}
            className={`bg-white rounded-xl shadow-lg border-l-4 ${statusStyle.border} p-5 flex flex-col transition hover:shadow-xl`}
        >
            <div className="flex justify-between items-start mb-3">
                <div className="flex-1 mr-4">
                    <div className="flex items-center text-gray-700 mb-1">
                        <FaMapMarkerAlt className="w-4 h-4 mr-2 text-red-500" />
                        <span className="font-medium text-gray-800 truncate">
                            {ride.start_location}
                        </span>
                    </div>
                    <div className="flex items-center pl-1 mb-1">
                        <span className="mx-1 text-gray-400">&#8594;</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                        <FaMapMarkerAlt className="w-4 h-4 mr-2 text-green-500" />
                        <span className="font-medium text-gray-800 truncate">
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

            <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                    <FaCalendarAlt className="w-4 h-4 mr-2 text-blue-500" />
                    <span>{date}</span>
                </div>
                <div className="flex items-center">
                    <FaClock className="w-4 h-4 mr-2 text-blue-500" />
                    <span>{time}</span>
                </div>
                <div className="flex items-center">
                    <FaUser className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="mr-1">Driver:</span>
                    <span className="font-medium truncate">
                        {ride.driver?.name || "Unknown"}
                    </span>
                </div>
                <div className="flex items-center">
                    <FaUser className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="mr-1">Passenger:</span>
                    <span className="font-medium truncate">
                        {booking.user?.name || "Unknown"}
                    </span>
                </div>
                <div className="flex items-center">
                    <FaChair className="w-4 h-4 mr-2 text-blue-500" />
                    <span>{seatsMessage}</span>
                </div>
                {ride.distance_km && (
                    <div className="flex items-center">
                        <FaRoad className="w-4 h-4 mr-2 text-blue-500" />
                        <span>{ride.distance_km.toFixed(1)} km</span>
                    </div>
                )}
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => onConfirm(booking.id)}
                    className="self-start px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                    type="button"
                >
                    Confirm Booking
                </button>
                <button
                    onClick={() => onCancel(booking.id)}
                    className="self-start px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                    type="button"
                >
                    Cancel Booking
                </button>
            </div>
        </div>
    );
}
