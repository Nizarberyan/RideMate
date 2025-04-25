import GuestLayout from "@/Layouts/GuestLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { user, isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return (
            <AuthenticatedLayout auth={{ user }}>
                {children}
            </AuthenticatedLayout>
        );
    } else {
        return <GuestLayout>{children}</GuestLayout>;
    }
}
