import GuestLayout from "@/Layouts/GuestLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { usePage } from "@inertiajs/react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage().props as any;

    if (auth?.user) {
        return (
            <AuthenticatedLayout auth={auth}>{children}</AuthenticatedLayout>
        );
    } else {
        return <GuestLayout>{children}</GuestLayout>;
    }
}
