import React from 'react';
import { Calculator } from './components/calculator/Calculator';
import { LanguageSwitcher } from './components/ui/LanguageSwitcher';
import { CountrySelector } from './components/ui/CountrySelector';
import { CountryProvider } from './context/CountryContext';
import { useTranslation } from 'react-i18next';

function AppContent() {
    const { t, i18n } = useTranslation();

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans" dir={i18n.dir()}>
            {/* Header with Language and Country Selectors */}
            <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="RentSmart Logo" className="h-12 w-auto" />
                </div>
                <div className="flex gap-3">
                    <CountrySelector />
                    <LanguageSwitcher />
                </div>
            </div>

            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">{t('app.title')}</h1>
                <p className="text-lg text-slate-500">{t('app.subtitle')}</p>
            </div>

            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start justify-center">
                {/* Main Content */}
                <div className="flex-1 w-full max-w-4xl">
                    <Calculator />

                    {/* Affiliate Banner */}
                    <div className="mt-8 overflow-hidden rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-shadow">
                        <img src="/banner-mortgage.png" alt="Get Best Mortgage Rates" className="w-full h-auto object-cover" />
                    </div>
                </div>

                {/* Sidebar AdSense */}
                <div className="hidden xl:block w-[300px] shrink-0 space-y-6">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                        <span className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Advertisement</span>
                        <img src="/ads-placeholder.png" alt="Advertisement" className="w-full h-auto rounded" />
                    </div>

                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <h3 className="font-bold text-blue-900 mb-2">Need Help?</h3>
                        <p className="text-sm text-blue-700 mb-4">Talk to our real estate experts today.</p>
                        <button className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Contact Us</button>
                    </div>
                </div>
            </div>

            <div className="mt-12 text-center text-sm text-slate-400">
                <p>{t('app.footer')}</p>
            </div>
        </div>
    );
}

function App() {
    return (
        <CountryProvider>
            <AppContent />
        </CountryProvider>
    );
}

export default App;
