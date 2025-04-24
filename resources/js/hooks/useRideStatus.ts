import { useMemo } from "react";

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

interface RideStatusReturn {
    isRideFull: boolean;
    canBook: boolean;
    isDriver: boolean;
    seatsMessage: string;
    statusStyle: {
        badgeBg: string;
        badgeText: string;
        border: string;
        text: string;
    };
    bookingStatusMessage: string | null;
}

export const useRideStatus = (
    ride: Ride,
    currentUserId: number | undefined,
): RideStatusReturn => {
    const statusStyle = useMemo(() => {
        switch (ride.status) {
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
    }, [ride.status]);

    const isRideFull = useMemo(
        () => ride.available_seats <= 0,
        [ride.available_seats],
    );
    const isDriver = currentUserId === ride.driver_id;
    const canBook =
        Boolean(currentUserId) &&
        !isDriver &&
        ride.status === "active" &&
        !isRideFull;

    const seatsMessage = useMemo(() => {
        if (isRideFull) return "No seats available";
        return `${ride.available_seats} seat${ride.available_seats !== 1 ? "s" : ""} available`;
    }, [ride.available_seats, isRideFull]);

    const bookingStatusMessage = useMemo(() => {
        if (!currentUserId) return null;
        if (isDriver) return "You cannot book your own ride.";
        if (isRideFull) return "This ride is full.";
        if (ride.status !== "active")
            return `This ride is ${ride.status.toLowerCase()}.`;
        return null;
    }, [currentUserId, isDriver, isRideFull, ride.status]);

    return {
        isRideFull,
        canBook,
        isDriver,
        seatsMessage,
        statusStyle,
        bookingStatusMessage,
    };
};
