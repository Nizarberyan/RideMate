import React from 'react';
import { Head, Link, usePage } from "@inertiajs/react";
import {
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaClock,
    FaUser,
    FaChair,
    FaRoad,
} from "react-icons/fa";
import { ArrowRight } from "lucide-react";

interface User {
    id: number;
    name: string;
    email: string;
}

interface Booking {
    id: number;
    user_id: number;
    ride_id: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    created_at: string;
    ride: {
        id: number;
        driver_id: number;
        start_location: string;
        end_location: string;
        departure_datetime: string;
        available_seats: number;
        status: 'active' | 'completed' | 'cancelled';
        description: string | null;
        distance_km: number | null;
        driver: User;
    };
}

interface PageProps {
    auth: {
        user: User | null;
    };
    bookings: Booking[];
}

const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return {
        date: date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }),
        time: date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    };
};

const getStatusStyle = (status: Booking['status']) => {
    switch (status) {
        case 'confirmed':
            return {
                bgColor: 'bg-green-100',
                textColor: 'text-green-800',
                borderColor: 'border-green-500',
                text: 'Confirmed'
            };
        case 'pending':
            return {
                bgColor: 'bg-yellow-100',
                textColor: 'text-yellow-800',
                borderColor: 'border-yellow-500',
                text: 'Pending'
            };
        case 'cancelled':
            return {
                bgColor: 'bg-red-100',
                textColor: 'text-red-800',
                borderColor: 'border-red-500',
                text: 'Cancelled'
            };
        default:
            return {
                bgColor: 'bg-gray-100',
                textColor: 'text-gray-800',
                borderColor: 'border-gray-500',
                text: status
            };
    }
};

const Bookings = () => {
    const { bookings, auth } = usePage<PageProps>().props;

    return (
        <>
            <Head title="My Bookings" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        My Bookings
                    </h1>
                    <Link
                        href="/rides"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700"
                    >
                        Find New Rides
                    </Link>
                </div>

                {bookings.length === 0 ? (
                    <div className="text-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <p className="text-gray-600 dark:text-gray-400">
                            You haven't made any bookings yet.
                        </p>
                        <Link
                            href="/rides"
                            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Browse Available Rides
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {bookings.map((booking) => {
                            const { date, time } = formatDateTime(booking.ride.departure_datetime);
                            const statusStyle = getStatusStyle(booking.status);

                            return (
                                <div
                                    key={booking.id}
                                    className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border-t-4 ${statusStyle.borderColor}`}
                                >
                                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                    <FaMapMarkerAlt className="w-4 h-4 mr-2 text-red-500" />
                                                    <span className="font-medium">
                                                        {booking.ride.start_location}
                                                    </span>
                                                </div>
                                                <div className="flex items-center my-1">
                                                    <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                    <FaMapMarkerAlt className="w-4 h-4 mr-2 text-green-500" />
                                                    <span className="font-medium">
                                                        {booking.ride.end_location}
                                                    </span>
                                                </div>
                                            </div>
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle.bgColor} ${statusStyle.textColor}`}
                                            >
                                                {statusStyle.text}
                                            </span>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                <FaCalendarAlt className="w-4 h-4 mr-2 text-blue-500" />
                                                {date}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                <FaClock className="w-4 h-4 mr-2 text-blue-500" />
                                                {time}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                <FaUser className="w-4 h-4 mr-2 text-blue-500" />
                                                Driver: {booking.ride.driver.name}
                                            </div>
                                            {booking.ride.distance_km && (
                                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                    <FaRoad className="w-4 h-4 mr-2 text-blue-500" />
                                                    {booking.ride.distance_km} km
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
                                        {booking.status === 'pending' && (
                                            <div className="flex space-x-2">
                                                <Link
                                                    href={`/bookings/${booking.id}/cancel`}
                                                    method="patch"
                                                    as="button"
                                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium"
                                                    onClick={(e) => {
                                                        if (!confirm('Are you sure you want to cancel this booking?')) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                >
                                                    Cancel Booking
                                                </Link>
                                            </div>
                                        )}
                                        {booking.status === 'confirmed' && (
                                            <div className="text-sm text-green-600 font-medium">
                                                Your booking is confirmed!
                                            </div>
                                        )}
                                        {booking.status === 'cancelled' && (
                                            <div className="text-sm text-red-600 font-medium">
                                                This booking was cancelled
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
};

export default Bookings;
