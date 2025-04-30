import React from "react";
import { useForm } from "@inertiajs/react";

interface UserProfileProps {
    user: {
        name: string;
        email: string;
        bio?: string;
        photo?: string | null;
    };
}

const Profile: React.FC<UserProfileProps> = ({ user }) => {
    const { data, setData, post, processing, errors } = useForm({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
        avatar: null as File | null,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setData("avatar", e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("bio", data.bio ?? "");

        if (data.avatar instanceof File) {
            formData.append("avatar", data.avatar);
        }

        post("/profile", {
            data: formData,
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <div className="max-w-5xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
            <h1 className="text-3xl font-semibold mb-8 text-center text-gray-800">
                Edit Profile
            </h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col lg:flex-row gap-12"
            >
                {/* Avatar section */}
                <div className="flex flex-col items-center lg:w-1/3">
                    {data.avatar ? (
                        <img
                            src={URL.createObjectURL(data.avatar)}
                            alt="Preview Avatar"
                            className="mb-6 w-40 h-40 rounded-full object-cover border-4 border-blue-600 shadow"
                        />
                    ) : user.photo ? (
                        <img
                            src={`/storage/${user.photo}`}
                            alt="Current Avatar"
                            className="mb-6 w-40 h-40 rounded-full object-cover border-4 border-gray-300 shadow"
                        />
                    ) : (
                        <div className="mb-6 w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-3xl font-light">
                            No Avatar
                        </div>
                    )}
                    <label className="cursor-pointer text-blue-600 hover:text-blue-800 font-semibold">
                        Change Avatar
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>
                    {errors.avatar && (
                        <p className="text-red-600 mt-2 text-sm">
                            {errors.avatar}
                        </p>
                    )}
                </div>

                {/* Form fields section */}
                <div className="flex flex-col lg:w-2/3 space-y-6">
                    {/* Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-2 font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className={`w-full p-4 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.name
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                            required
                        />
                        {errors.name && (
                            <p className="text-red-600 mt-1 text-sm">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className={`w-full p-4 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.email
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                            required
                        />
                        {errors.email && (
                            <p className="text-red-600 mt-1 text-sm">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Bio */}
                    <div>
                        <label
                            htmlFor="bio"
                            className="block mb-2 font-medium text-gray-700"
                        >
                            Bio
                        </label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={data.bio}
                            onChange={handleChange}
                            placeholder="Tell us about yourself"
                            rows={6}
                            className={`w-full p-4 border rounded-md text-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.bio
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                        {errors.bio && (
                            <p className="text-red-600 mt-1 text-sm">
                                {errors.bio}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="self-start bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-3 px-8 rounded-md font-semibold transition-colors disabled:opacity-50"
                    >
                        {processing ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
