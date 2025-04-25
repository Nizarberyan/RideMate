import React, { FormEvent, useEffect } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FaUser, FaEnvelope, FaLock, FaShieldAlt } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";
import { Inertia } from "@inertiajs/inertia";

const Register = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post("/register", {
            onSuccess: () => {
                Inertia.visit("/dashboard");
            },
        });
    };

    return (
        <>
            <Head title="Register" />
            <div className="flex items-center justify-center w-full h-full min-h-[80vh]">
                <div className="w-full max-w-5xl mx-auto px-4">
                    <div className="bg-white/50 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden lg:grid lg:grid-cols-2">
                        <div className="hidden lg:block bg-gradient-to-br from-purple-500 to-indigo-700 text-white p-12">
                            <div className="h-full flex flex-col justify-center">
                                <h2 className="text-4xl xl:text-5xl font-bold mb-8">
                                    Join RideMate
                                </h2>
                                <p className="text-xl xl:text-2xl mb-8">
                                    Create an account and experience seamless
                                    rides tailored to your needs
                                </p>
                                <ul className="space-y-4 mb-10">
                                    <li className="flex items-center">
                                        <div className="bg-white/20 p-2 rounded-full mr-3">
                                            <FaShieldAlt className="text-xl" />
                                        </div>
                                        <span className="text-lg">
                                            Secure and reliable service
                                        </span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="bg-white/20 p-2 rounded-full mr-3">
                                            <FaUser className="text-xl" />
                                        </div>
                                        <span className="text-lg">
                                            Personalized experience
                                        </span>
                                    </li>
                                </ul>
                                <div className="bg-white/20 p-6 rounded-xl mt-auto">
                                    <p className="text-xl italic">
                                        "Join thousands of satisfied riders
                                        today"
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Registration Form Section */}
                        <div className="p-8 lg:p-12 flex items-center justify-center">
                            <form
                                onSubmit={handleSubmit}
                                className="w-full space-y-6"
                            >
                                <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center text-indigo-600">
                                    Create Account
                                </h2>

                                <div className="space-y-3">
                                    <Label
                                        htmlFor="name"
                                        className="flex items-center text-lg"
                                    >
                                        <FaUser className="mr-3 text-xl text-indigo-500" />
                                        Full Name
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        placeholder="Enter your full name"
                                        className="py-3 text-lg"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <Label
                                        htmlFor="email"
                                        className="flex items-center text-lg"
                                    >
                                        <FaEnvelope className="mr-3 text-xl text-indigo-500" />
                                        Email Address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        placeholder="Enter your email address"
                                        className="py-3 text-lg"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <Label
                                        htmlFor="password"
                                        className="flex items-center text-lg"
                                    >
                                        <FaLock className="mr-3 text-xl text-indigo-500" />
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        placeholder="Create a strong password"
                                        className="py-3 text-lg"
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <Label
                                        htmlFor="password_confirmation"
                                        className="flex items-center text-lg"
                                    >
                                        <FaLock className="mr-3 text-xl text-indigo-500" />
                                        Confirm Password
                                    </Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Confirm your password"
                                        className="py-3 text-lg"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full p-4 text-xl bg-indigo-600 hover:bg-indigo-700 rounded-xl mt-8"
                                >
                                    {processing
                                        ? "Creating account..."
                                        : "Register"}
                                </Button>

                                <div className="text-center mt-6">
                                    <p className="text-lg text-gray-600">
                                        Already have an account?{" "}
                                        <Link
                                            href="/login"
                                            className="text-indigo-600 hover:underline font-semibold"
                                        >
                                            Sign in
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
