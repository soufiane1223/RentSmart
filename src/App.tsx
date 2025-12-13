import { Calculator } from './components/calculator/Calculator';
import { LanguageSwitcher } from './components/ui/LanguageSwitcher';
import { CountrySelector } from './components/ui/CountrySelector';
import { CountryProvider } from './context/CountryContext';
import { ThemeProvider } from './context/ThemeContext';
import { ModeToggle } from './components/ui/ModeToggle';
import { useTranslation } from 'react-i18next';

function AppContent() {
    const { t, i18n } = useTranslation();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300" dir={i18n.dir()}>
            <div className="absolute inset-0 bg-grid-slate-200/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] -z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-emerald-50/50 dark:from-blue-950/30 dark:to-emerald-950/30 -z-10 pointer-events-none" />

            {/* Header with Language and Country Selectors */}
            <div className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    {/* Logo updated to be larger ("h-16" instead of "h-12") */}
                    <img src="/logo.png" alt="RentSmart Logo" className="h-[9rem] w-auto" />
                </div>
                <div className="flex gap-3 items-center">
                    <ModeToggle />
                    <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1" />
                    <CountrySelector />
                    <LanguageSwitcher />
                </div>
            </div>

            <div className="text-center mb-12 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-blue-400/20 blur-[100px] rounded-full -z-10" />
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400 mb-3 tracking-tight">
                    {t('app.title')}
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 font-light">{t('app.subtitle')}</p>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start justify-center px-4">
                {/* Main Content */}
                <div className="flex-1 w-full max-w-4xl">
                    <Calculator />

                    {/* Affiliate Banner */}
                    <div className="mt-8 overflow-hidden rounded-xl shadow-lg cursor-pointer hover:shadow-xl hover:scale-[1.01] transition-all bg-white dark:bg-slate-900">
                        <img src="/banner-mortgage.png" alt="Get Best Mortgage Rates" className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity" />
                    </div>
                </div>

                {/* Sidebar AdSense */}
                <div className="hidden xl:block w-[300px] shrink-0 space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                        <span className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Advertisement</span>
                        <img src="/ads-placeholder.png" alt="Advertisement" className="w-full h-auto rounded opacity-80" />
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800/50">
                        <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">Need Help?</h3>
                        <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">Talk to our real estate experts today for personalized advice.</p>
                        <button className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all">Contact Us</button>
                    </div>
                </div>
            </div>

            <div className="mt-16 text-center text-sm text-slate-400 dark:text-slate-600">
                <p>{t('app.footer')}</p>
            </div>
        </div>
    );
}

function App() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="rentsmart-theme">
            <CountryProvider>
                <AppContent />
            </CountryProvider>
        </ThemeProvider>
    );
}

export default App;
