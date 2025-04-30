import React from "react";
import { Link } from "@inertiajs/react";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

interface Ride {
    id: number;
    driver_id: number;
    start_location: string;
    end_location: string;
    departure_datetime: string;
    available_seats: number;
    status: string;
    description: string | null;
    distance_km: number | null;
    driver?: { name: string };
}

interface SocialProfileProps {
    user: {
        name: string;
        email: string;
        bio?: string;
        photo?: string | null;
    };
    rides: Ride[];
}

const statusColors: Record<string, string> = {
    active: "bg-green-100 text-green-800",
    completed: "bg-gray-200 text-gray-600",
    cancelled: "bg-red-100 text-red-800",
};

const SocialProfile: React.FC<SocialProfileProps> = ({ user, rides }) => {
    return (
        <div className="max-w-4xl mx-auto my-12 p-8 bg-white rounded-xl shadow-md border border-gray-200">
            <div className="flex flex-col items-center md:flex-row md:items-start gap-8">
                {/* Avatar */}
                {user.photo ? (
                    <img
                        src={`/storage/${user.photo}`}
                        alt={`${user.name}'s avatar`}
                        className="w-40 h-40 rounded-full object-cover border-4 border-gray-300 shadow-md"
                    />
                ) : (
                    <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-6xl font-light">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                )}

                {/* Profile info */}
                <div className="flex flex-col flex-grow space-y-4">
                    <h1 className="text-4xl font-bold text-gray-800">
                        {user.name}
                    </h1>
                    <p className="text-gray-600 text-lg">{user.email}</p>
                    {user.bio ? (
                        <p className="text-gray-700 whitespace-pre-line">
                            {user.bio}
                        </p>
                    ) : (
                        <p className="italic text-gray-400">
                            This user has no bio yet.
                        </p>
                    )}

                    {/* Rides List */}
                    <div className="mt-8 w-full">
                        <h2 className="text-2xl font-semibold mb-4">
                            Active Rides
                        </h2>
                        {rides.length > 0 ? (
                            <ul className="space-y-4">
                                {rides.map((ride) => (
                                    <li
                                        key={ride.id}
                                        className="p-6 border rounded-xl shadow-sm hover:shadow-lg transition-shadow bg-white"
                                    >
                                        <Link
                                            href={`/rides/${ride.id}`}
                                            className="block text-inherit no-underline"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                                    <FaMapMarkerAlt className="text-green-500" />
                                                    <span>
                                                        {ride.start_location}
                                                    </span>
                                                    <FaArrowRight className="mx-2 text-gray-400" />
                                                    <FaMapMarkerAlt className="text-red-500" />
                                                    <span>
                                                        {ride.end_location}
                                                    </span>
                                                </div>
                                                <span
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                                        statusColors[
                                                            ride.status
                                                        ] ||
                                                        "bg-gray-100 text-gray-800"
                                                    }`}
                                                >
                                                    {ride.status
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        ride.status.slice(1)}
                                                </span>
                                            </div>
                                            <div className="mt-1 text-gray-600 text-sm flex flex-wrap gap-4">
                                                <div>
                                                    <strong>Departure:</strong>{" "}
                                                    {new Date(
                                                        ride.departure_datetime,
                                                    ).toLocaleString(
                                                        undefined,
                                                        {
                                                            weekday: "short",
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        },
                                                    )}
                                                </div>
                                                <div>
                                                    <strong>Seats:</strong>{" "}
                                                    {ride.available_seats}
                                                </div>
                                                <div>
                                                    <strong>Distance:</strong>{" "}
                                                    {ride.distance_km
                                                        ? `${ride.distance_km} km`
                                                        : "N/A"}
                                                </div>
                                                {ride.driver && (
                                                    <div>
                                                        <strong>Driver:</strong>{" "}
                                                        {ride.driver.name}
                                                    </div>
                                                )}
                                            </div>
                                            {ride.description && (
                                                <p className="mt-3 text-gray-700 whitespace-pre-line">
                                                    {ride.description}
                                                </p>
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="italic text-gray-500">
                                No active rides found.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SocialProfile;
