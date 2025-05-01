import React, { useState, useRef } from "react";
import { Head, router, useForm } from "@inertiajs/react";
import { FiSave, FiX } from "react-icons/fi";

export default function NotificationPreferences({
    auth,
    notificationPreferences = [],
}: {
    auth: { user: { id: number; name: string; email: string; photo: string } };
    notificationPreferences?: string[];
}) {
    const [cities, setCities] = useState<string[]>(notificationPreferences);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const { processing, errors } = useForm();

    const addCity = (city: string) => {
        const trimmed = city.trim();
        if (
            trimmed.length > 0 &&
            !cities.includes(trimmed) &&
            trimmed.length <= 255
        ) {
            setCities([...cities, trimmed]);
        }
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            if (inputValue) {
                addCity(inputValue);
                setInputValue("");
            }
        } else if (
            e.key === "Backspace" &&
            inputValue === "" &&
            cities.length
        ) {
            removeCity(cities.length - 1);
        }
    };

    const removeCity = (index: number) => {
        setCities(cities.filter((_, i) => i !== index));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        router.post("/notification-preferences", {
            cities: cities.join(","),
        });
    };

    return (
        <>
            <Head title="Notification Preferences" />
            <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg my-8">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
                    Notification Preferences
                </h2>

                <form onSubmit={submit} className="space-y-8">
                    <div>
                        <label
                            htmlFor="citiesInput"
                            className="block text-lg font-semibold text-gray-700 mb-3"
                        >
                            Cities to Receive Notifications About
                        </label>

                        <div
                            onClick={() => inputRef.current?.focus()}
                            className="flex flex-wrap gap-2 min-h-[48px] px-3 py-2 border border-gray-300 rounded-md cursor-text focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-500"
                        >
                            {cities.map((city, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-1 bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm select-none"
                                >
                                    <span>{city}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeCity(index)}
                                        className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        aria-label={`Remove city ${city}`}
                                    >
                                        <FiX className="stroke-current" />
                                    </button>
                                </div>
                            ))}

                            <input
                                ref={inputRef}
                                id="citiesInput"
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={onKeyDown}
                                placeholder="Type to add city and press Enter"
                                className="flex-grow min-w-[140px] border-none p-1 text-gray-900 placeholder-gray-400 focus:ring-0 focus:outline-none"
                            />
                        </div>

                        {errors.cities && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.cities}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded-md bg-blue-600 py-3 text-white font-semibold shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 transition flex items-center justify-center gap-2"
                    >
                        {processing ? (
                            <>
                                <FiSave className="animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <FiSave />
                                Save Changes
                            </>
                        )}
                    </button>
                </form>
            </div>
        </>
    );
}
