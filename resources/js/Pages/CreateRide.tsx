import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaChair, FaRoad, FaInfoCircle } from 'react-icons/fa';
import { Label } from '@/components/ui/label';

const CreateRide = () => {
    const { data, setData, post, processing, errors } = useForm({
        start_location: '',
        end_location: '',
        departure_date: '',
        departure_time: '',
        available_seats: '',
        distance_km: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/rides');
    };

    return (
        <>
            <Head title="Create Ride" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">
                        Offer a New Ride
                    </h1>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Start Location */}
                            <div>
                                <Label htmlFor="start_location" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <FaMapMarkerAlt className="text-red-500" />
                                    Departure Location
                                </Label>
                                <input
                                    id="start_location"
                                    type="text"
                                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                                    value={data.start_location}
                                    onChange={e => setData('start_location', e.target.value)}
                                />
                                {errors.start_location && (
                                    <p className="mt-1 text-sm text-red-600">{errors.start_location}</p>
                                )}
                            </div>

                            {/* End Location */}
                            <div>
                                <Label htmlFor="end_location" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <FaMapMarkerAlt className="text-green-500" />
                                    Destination Location
                                </Label>
                                <input
                                    id="end_location"
                                    type="text"
                                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                                    value={data.end_location}
                                    onChange={e => setData('end_location', e.target.value)}
                                />
                                {errors.end_location && (
                                    <p className="mt-1 text-sm text-red-600">{errors.end_location}</p>
                                )}
                            </div>

                            {/* Date and Time */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="departure_date" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                        <FaCalendarAlt className="text-blue-500" />
                                        Departure Date
                                    </Label>
                                    <input
                                        id="departure_date"
                                        type="date"
                                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                                        value={data.departure_date}
                                        onChange={e => setData('departure_date', e.target.value)}
                                    />
                                    {errors.departure_date && (
                                        <p className="mt-1 text-sm text-red-600">{errors.departure_date}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="departure_time" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                        <FaClock className="text-blue-500" />
                                        Departure Time
                                    </Label>
                                    <input
                                        id="departure_time"
                                        type="time"
                                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                                        value={data.departure_time}
                                        onChange={e => setData('departure_time', e.target.value)}
                                    />
                                    {errors.departure_time && (
                                        <p className="mt-1 text-sm text-red-600">{errors.departure_time}</p>
                                    )}
                                </div>
                            </div>

                            {/* Available Seats and Distance */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="available_seats" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                        <FaChair className="text-blue-500" />
                                        Available Seats
                                    </Label>
                                    <input
                                        id="available_seats"
                                        type="number"
                                        min="1"
                                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                                        value={data.available_seats}
                                        onChange={e => setData('available_seats', e.target.value)}
                                    />
                                    {errors.available_seats && (
                                        <p className="mt-1 text-sm text-red-600">{errors.available_seats}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="distance_km" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                        <FaRoad className="text-blue-500" />
                                        Distance (km)
                                    </Label>
                                    <input
                                        id="distance_km"
                                        type="number"
                                        min="0"
                                        step="0.1"
                                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                                        value={data.distance_km}
                                        onChange={e => setData('distance_km', e.target.value)}
                                    />
                                    {errors.distance_km && (
                                        <p className="mt-1 text-sm text-red-600">{errors.distance_km}</p>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <Label htmlFor="description" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <FaInfoCircle className="text-blue-500" />
                                    Description (Optional)
                                </Label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    placeholder="Add any additional information about the ride..."
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:border-blue-900 focus:ring focus:ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150"
                                >
                                    {processing ? 'Creating...' : 'Create Ride'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateRide;
