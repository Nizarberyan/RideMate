import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"; // Assuming you have Shadcn UI Dialog
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import InputError from "@/components/InputError"; // Your InputError component

// --- Interface matching RideDetail ---
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
    // driver: User; // Driver info not needed for the form itself
}

interface EditRideModalProps {
    ride: Ride;
    isOpen: boolean;
    onClose: () => void;
}

// Helper to format datetime for the input field
const formatDateTimeForInput = (dateTime: string): string => {
    if (!dateTime) return "";
    try {
        // Assuming dateTime is in ISO format like '2024-07-28T10:00:00.000000Z' or similar
        const date = new Date(dateTime);
        // Adjust for local timezone offset before formatting
        const timezoneOffset = date.getTimezoneOffset() * 60000; // offset in milliseconds
        const localISOTime = new Date(date.getTime() - timezoneOffset)
            .toISOString()
            .slice(0, 16); // Get YYYY-MM-DDTHH:mm
        return localISOTime;
    } catch (e) {
        console.error("Error formatting date for input:", e);
        return "";
    }
};

export function EditRideModal({ ride, isOpen, onClose }: EditRideModalProps) {
    const { data, setData, put, processing, errors, reset, wasSuccessful } =
        useForm({
            start_location: ride.start_location || "",
            end_location: ride.end_location || "",
            departure_datetime: formatDateTimeForInput(ride.departure_datetime),
            available_seats: ride.available_seats || 1,
            description: ride.description || "",
            distance_km: ride.distance_km || "", // Keep as string for input, backend converts
        });

    // Reset form and close modal on successful submission
    useEffect(() => {
        if (wasSuccessful && isOpen) {
            reset(); // Optional: Reset form fields if needed after success
            onClose(); // Close the modal
        }
    }, [wasSuccessful, isOpen, onClose, reset]);

    // Update form data if the ride prop changes while modal is open
    useEffect(() => {
        if (ride) {
            setData({
                start_location: ride.start_location || "",
                end_location: ride.end_location || "",
                departure_datetime: formatDateTimeForInput(
                    ride.departure_datetime,
                ),
                available_seats: ride.available_seats || 1,
                description: ride.description || "",
                distance_km: ride.distance_km || "",
            });
        }
    }, [ride]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/rides/${ride.id}`, {
            preserveScroll: true,
            onError: (errors) => {
                if (errors.message) {
                    console.error(errors.message);
                }
            },
        });
    };

    // Handle modal state change (e.g., clicking overlay)
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            onClose();
            // Optionally reset form errors when closing manually
            // reset('errors'); // If you want errors to clear on close
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-800">
                <DialogHeader>
                    <DialogTitle className="text-gray-900 dark:text-gray-100">
                        Edit Ride Details
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    {/* Start Location */}
                    <div>
                        <Label
                            htmlFor="start_location"
                            className="text-gray-700 dark:text-gray-300"
                        >
                            Start Location
                        </Label>
                        <Input
                            id="start_location"
                            name="start_location"
                            value={data.start_location}
                            onChange={(e) =>
                                setData("start_location", e.target.value)
                            }
                            className="mt-1 block w-full dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                            required
                        />
                        <InputError
                            message={errors.start_location}
                            className="mt-1"
                        />
                    </div>

                    {/* End Location */}
                    <div>
                        <Label
                            htmlFor="end_location"
                            className="text-gray-700 dark:text-gray-300"
                        >
                            End Location
                        </Label>
                        <Input
                            id="end_location"
                            name="end_location"
                            value={data.end_location}
                            onChange={(e) =>
                                setData("end_location", e.target.value)
                            }
                            className="mt-1 block w-full dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                            required
                        />
                        <InputError
                            message={errors.end_location}
                            className="mt-1"
                        />
                    </div>

                    {/* Departure Date/Time */}
                    <div>
                        <Label
                            htmlFor="departure_datetime"
                            className="text-gray-700 dark:text-gray-300"
                        >
                            Departure Date & Time
                        </Label>
                        <Input
                            id="departure_datetime"
                            name="departure_datetime"
                            type="datetime-local"
                            value={data.departure_datetime}
                            onChange={(e) =>
                                setData("departure_datetime", e.target.value)
                            }
                            className="mt-1 block w-full dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:[color-scheme:dark]" // Apply dark scheme for calendar picker
                            required
                        />
                        <InputError
                            message={errors.departure_datetime}
                            className="mt-1"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Available Seats */}
                        <div>
                            <Label
                                htmlFor="available_seats"
                                className="text-gray-700 dark:text-gray-300"
                            >
                                Available Seats
                            </Label>
                            <Input
                                id="available_seats"
                                name="available_seats"
                                type="number"
                                min="0" // Or 1 if you require at least one seat
                                value={data.available_seats}
                                onChange={(e) =>
                                    setData(
                                        "available_seats",
                                        parseInt(e.target.value) || 0,
                                    )
                                }
                                className="mt-1 block w-full dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                                required
                            />
                            <InputError
                                message={errors.available_seats}
                                className="mt-1"
                            />
                        </div>

                        {/* Distance (Optional) */}
                        <div>
                            <Label
                                htmlFor="distance_km"
                                className="text-gray-700 dark:text-gray-300"
                            >
                                Approx. Distance (km)
                            </Label>
                            <Input
                                id="distance_km"
                                name="distance_km"
                                type="number"
                                step="0.1"
                                min="0"
                                value={data.distance_km}
                                onChange={(e) =>
                                    setData("distance_km", e.target.value)
                                } // Keep as string, let backend handle null/float
                                placeholder="e.g., 120.5"
                                className="mt-1 block w-full dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                            />
                            <InputError
                                message={errors.distance_km}
                                className="mt-1"
                            />
                        </div>
                    </div>

                    {/* Description (Optional) */}
                    <div>
                        <Label
                            htmlFor="description"
                            className="text-gray-700 dark:text-gray-300"
                        >
                            Description (Optional)
                        </Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            rows={3}
                            placeholder="Any extra details, e.g., meeting point, luggage space..."
                            className="mt-1 block w-full dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                        />
                        <InputError
                            message={errors.description}
                            className="mt-1"
                        />
                    </div>

                    <DialogFooter className="pt-4">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                className="dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {processing ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
