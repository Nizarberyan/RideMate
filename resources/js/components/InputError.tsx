import React from "react";

interface InputErrorProps {
    message?: string;
    className?: string;
}

export default function InputError({
    message,
    className = "",
}: InputErrorProps) {
    return message ? (
        <p className={`text-sm text-red-600 dark:text-red-400 ${className}`}>
            {message}
        </p>
    ) : null;
}
