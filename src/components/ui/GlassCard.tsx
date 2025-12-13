import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
    return (
        <div
            className={twMerge(
                "bg-white/80 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
