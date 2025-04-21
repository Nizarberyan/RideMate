import React from "react";
import { Head, usePage } from "@inertiajs/react";

interface PageProps {
    auth?: {
        user?: {
            id?: number;
            name?: string;
            email?: string;
        };
    };
}

const Dashboard: React.FC = ({ auth }: any) => {
    console.log("Full page props:", usePage().props); // Detailed logging
    console.log("Auth object:", auth); // Specific auth logging

    return (
        <div>
            <Head title="Dashboard" />
            <h1>Dashboard</h1>
            {auth?.user ? (
                <div>
                    <p>Name: {auth.user.name || "N/A"}</p>
                    <p>Email: {auth.user.email || "N/A"}</p>
                </div>
            ) : (
                <p>No user information available</p>
            )}
        </div>
    );
};

export default Dashboard;
