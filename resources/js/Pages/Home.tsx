import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Truck, Clock } from "lucide-react";

interface HomeProps {
    message: string;
    title?: string;
    description?: string;
}

const Home: React.FC<HomeProps> = ({
    message,
    title = "Welcome to RideMate",
    description = "Your Ride, Your Way, Everyday",
}) => {
    return (
        <main className="flex-1 relative flex flex-col w-full min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Hero Section - Make it full width */}
            <section className="w-full flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-32 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight">
                        {title}
                    </h1>
                    <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto">
                        {description}
                    </p>
                    <div className="mt-10">
                        <Button
                            size="lg"
                            className="bg-blue-600 hover:bg-blue-700 transform transition-all duration-200 hover:scale-105 text-lg px-8 py-6"
                        >
                            Get Started <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section - Make it full width */}
            <section className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose Us
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Experience the best service with our dedicated team
                            and cutting-edge solutions
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        {[
                            {
                                icon: Shield,
                                title: "Secure Delivery",
                                description:
                                    "Your packages are protected with state-of-the-art security measures",
                                color: "blue",
                            },
                            {
                                icon: Truck,
                                title: "Fast Shipping",
                                description:
                                    "Lightning-fast delivery to your destination, guaranteed",
                                color: "indigo",
                            },
                            {
                                icon: Clock,
                                title: "24/7 Support",
                                description:
                                    "Round-the-clock customer service to assist you anytime",
                                color: "purple",
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100"
                            >
                                <div
                                    className={`p-4 rounded-xl bg-${feature.color}-50 inline-block mb-6 group-hover:scale-110 transition-transform duration-300`}
                                >
                                    <feature.icon
                                        className={`h-8 w-8 text-${feature.color}-600`}
                                    />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer - Make it full width */}
            <footer className="w-full bg-gray-50 border-t border-gray-200">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-gray-600">
                            &copy; {new Date().getFullYear()} Your Company. All
                            rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </main>
    );
};

export default Home;
