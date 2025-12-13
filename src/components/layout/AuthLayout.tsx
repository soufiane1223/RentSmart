import React from 'react';

export const AuthLayout: React.FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
            <div className="absolute inset-0 bg-grid-slate-200/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] -z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-emerald-50/50 dark:from-blue-950/30 dark:to-emerald-950/30 -z-10 pointer-events-none" />

            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
                <img src="/logo.png" alt="RentSmart" className="mx-auto h-24 w-auto" />
                <h2 className="mt-6 text-3xl font-extrabold text-slate-900 dark:text-white">
                    {title}
                </h2>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg py-8 px-4 shadow-xl border border-white/20 dark:border-slate-700 sm:rounded-2xl sm:px-10">
                    {children}
                </div>
            </div>
        </div>
    );
};
