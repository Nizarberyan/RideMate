// resources/js/Pages/auth/Login.tsx
import React, { FormEvent } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post("/login");
    };

    return (
        <>
            <Head title="Login" />
            <div className="flex items-center justify-center w-full h-full min-h-[80vh]">
                <div className="w-full max-w-5xl mx-auto px-4">
                    <div className="bg-white/50 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden lg:grid lg:grid-cols-2 ">
                        <div className="hidden lg:block bg-gradient-to-br from-blue-500 to-blue-700 text-white p-12">
                            <div className="h-full flex flex-col justify-center">
                                <h2 className="text-4xl xl:text-5xl font-bold mb-8">
                                    Welcome Back!
                                </h2>
                                <p className="text-xl xl:text-2xl mb-10">
                                    Log in to continue your journey with
                                    RideMate
                                </p>
                                <div className="bg-white/20 p-8 rounded-xl mt-auto">
                                    <p className="text-xl italic">
                                        "Your ride, your way, every day"
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Login Form Section */}
                        <div className="p-8 lg:p-12 flex items-center justify-center">
                            <form
                                onSubmit={handleSubmit}
                                className="w-full space-y-8"
                            >
                                <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center text-blue-600">
                                    Login
                                </h2>

                                <div className="space-y-3">
                                    <Label
                                        htmlFor="email"
                                        className="flex items-center text-lg lg:text-xl"
                                    >
                                        <FaEnvelope className="mr-3 text-2xl text-blue-500" />
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
                                        className="flex items-center text-lg lg:text-xl"
                                    >
                                        <FaLock className="mr-3 text-2xl text-blue-500" />
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
                                        className="py-3 text-lg"
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-between items-center mt-6">
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
                                            className="mr-3 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                                        />
                                        <Label
                                            htmlFor="remember"
                                            className="text-gray-700 text-lg"
                                        >
                                            Remember me
                                        </Label>
                                    </div>
                                    <Link
                                        href="/forgot-password"
                                        className="text-blue-600 hover:underline text-lg"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full p-4 text-xl bg-blue-600 hover:bg-blue-700 rounded-xl mt-8"
                                >
                                    {processing ? "Logging in..." : "Login"}
                                </Button>

                                <div className="text-center mt-6">
                                    <p className="text-lg text-gray-600">
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
