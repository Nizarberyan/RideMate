import React from "react";
import { Button } from "@/components/ui/button";
import {
    ArrowRight,
    Car,
    Leaf,
    Shield,
    Users,
    Timer,
    DollarSign,
    MapPin,
    Star,
    ChevronRight,
} from "lucide-react";

const Home: React.FC = () => {
    return (
        <div className="bg-white">
            {/* Hero Section with improved visual hierarchy */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50/70 to-white pointer-events-none" />
                <div className="relative px-4 sm:px-6 lg:px-8 py-32 md:py-48">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full mb-6 animate-bounce">
                            <Car className="h-8 w-8 text-green-600 mr-2" />
                            <Leaf className="h-8 w-8 text-green-600" />
                        </div>
                        <h1 className="text-5xl sm:text-7xl font-bold text-gray-900 tracking-tight leading-none mb-6">
                            Share Rides,{" "}
                            <span className="text-green-600 relative">
                                Save the Planet
                                <span className="absolute bottom-0 left-0 w-full h-2 bg-green-200/50 -z-10 transform -rotate-1" />
                            </span>
                        </h1>
                        <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Join RideMate and be part of the sustainable
                            transportation revolution. Connect with
                            eco-conscious travelers and reduce your carbon
                            footprint.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                            <a href="/register">
                                <Button
                                    size="lg"
                                    className="bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/20 transform transition-all duration-200 hover:scale-105 text-lg px-8 py-6"
                                >
                                    Find a Ride <Car className="ml-2 h-5 w-5" />
                                </Button>
                            </a>
                            <a href="/register">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-2 border-green-600 text-green-600 hover:bg-green-50 transform transition-all duration-200 hover:scale-105 text-lg px-8 py-6"
                                >
                                    Offer a Ride{" "}
                                    <Users className="ml-2 h-5 w-5" />
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section with improved visualization */}
            <section className="relative py-24 bg-gradient-to-b from-white to-green-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                number: "1000+",
                                label: "Active Riders",
                                icon: Users,
                            },
                            {
                                number: "5000+",
                                label: "CO₂ Kg Saved",
                                icon: Leaf,
                            },
                            {
                                number: "15000+",
                                label: "Shared Rides",
                                icon: Car,
                            },
                        ].map((stat, index) => (
                            <div key={index} className="relative group">
                                <div className="absolute inset-0 bg-green-100 rounded-2xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-300" />
                                <div className="relative p-8 bg-white rounded-2xl shadow-sm group-hover:translate-y-1 transition-transform duration-300">
                                    <stat.icon className="h-10 w-10 text-green-600 mb-4" />
                                    <p className="text-5xl font-bold text-green-600 mb-2">
                                        {stat.number}
                                    </p>
                                    <p className="text-lg text-gray-600">
                                        {stat.label}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section with enhanced cards */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                            Why Choose RideMate
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Experience sustainable, safe, and cost-effective
                            travel with our comprehensive platform
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Leaf,
                                title: "Eco-Friendly",
                                description:
                                    "Track your carbon savings with every shared ride",
                                color: "green",
                            },
                            // ... other features ...
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200"
                            >
                                <div className="p-4 rounded-2xl bg-green-50 inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="h-8 w-8 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section with enhanced design */}
            <section className="relative py-24">
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-50" />
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
                        Ready to Start Your{" "}
                        <span className="text-green-600">
                            Eco-Friendly Journey
                        </span>
                        ?
                    </h2>
                    <a href="/register">
                        <Button
                            size="lg"
                            className="bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/20 transform transition-all duration-200 hover:scale-105 text-xl px-10 py-7"
                        >
                            Join RideMate Now{" "}
                            <ChevronRight className="ml-2 h-6 w-6" />
                        </Button>
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Home;
