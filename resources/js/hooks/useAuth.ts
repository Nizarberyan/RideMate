import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export function useAuth() {
    const [user, setUser] = useState<any>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { auth } = usePage().props as any;

    useEffect(() => {
        setUser(auth.user);
        setIsAuthenticated(!!auth.user);
    }, [auth.user]);

    return {
        user,
        isAuthenticated,
    };
}
