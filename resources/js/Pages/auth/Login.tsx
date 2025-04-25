// resources/js/Pages/auth/Login.tsx
import React, { FormEvent, useEffect } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false as boolean,
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post("/login");
    };
    const { isAuthenticated } = useAuth();
    useEffect(() => {
        if (isAuthenticated) {
            Inertia.visit("/dashboard");
        }
    }, []);

    return (
        <>
            <Head title="Login" />
            <div className="flex items-center justify-center w-full min-h-screen bg-gray-50 px-4 py-8">
                <div className="max-w-5xl w-full">
                    <div className="bg-white/50 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
                        {/* Welcome Section */}
                        <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-8 lg:p-12 flex flex-col justify-center">
                            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold mb-6 sm:mb-8">
                                Welcome Back!
                            </h2>
                            <p className="text-lg sm:text-xl xl:text-2xl mb-8">
                                Log in to continue your journey with RideMate
                            </p>
                            <div className="bg-white/20 p-6 rounded-xl mt-auto">
                                <p className="text-lg sm:text-xl italic leading-relaxed">
                                    "Your ride, your way, every day"
                                </p>
                            </div>
                        </div>

                        {/* Login Form Section */}
                        <div className="p-6 sm:p-8 lg:p-12 flex items-center justify-center">
                            <form
                                onSubmit={handleSubmit}
                                className="w-full space-y-6 sm:space-y-8"
                            >
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-blue-600 mb-6 sm:mb-8">
                                    Login
                                </h2>

                                <div className="space-y-3">
                                    <Label
                                        htmlFor="email"
                                        className="flex items-center text-base sm:text-lg lg:text-xl"
                                    >
                                        <FaEnvelope className="mr-3 text-xl sm:text-2xl text-blue-500" />
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        placeholder="Enter your email"
                                        className="py-2 sm:py-3 text-base sm:text-lg"
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
                                        className="flex items-center text-base sm:text-lg lg:text-xl"
                                    >
                                        <FaLock className="mr-3 text-xl sm:text-2xl text-blue-500" />
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        placeholder="Enter your password"
                                        className="py-2 sm:py-3 text-base sm:text-lg"
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-6 space-y-3 sm:space-y-0">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="remember"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    "remember",
                                                    e.target.checked,
                                                )
                                            }
                                            className="mr-3 w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded focus:ring-blue-500"
                                        />
                                        <Label
                                            htmlFor="remember"
                                            className="text-gray-700 text-sm sm:text-lg"
                                        >
                                            Remember me
                                        </Label>
                                    </div>
                                    <Link
                                        href="/forgot-password"
                                        className="text-blue-600 hover:underline text-sm sm:text-lg"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-3 sm:py-4 text-lg sm:text-xl bg-blue-600 hover:bg-blue-700 rounded-xl mt-6 sm:mt-8"
                                >
                                    {processing ? "Logging in..." : "Login"}
                                </Button>

                                <div className="text-center mt-6">
                                    <p className="text-sm sm:text-lg text-gray-600">
                                        Don't have an account?{" "}
                                        <Link
                                            href="/register"
                                            className="text-blue-600 hover:underline font-semibold"
                                        >
                                            Sign up
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
}
