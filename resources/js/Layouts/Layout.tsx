import GuestLayout from "@/Layouts/GuestLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { usePage } from "@inertiajs/react";
import { useAuth } from "@/hooks/useAuth";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage().props as any;
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return (
            <AuthenticatedLayout auth={auth}>{children}</AuthenticatedLayout>
        );
    } else {
        return <GuestLayout>{children}</GuestLayout>;
    }
}
