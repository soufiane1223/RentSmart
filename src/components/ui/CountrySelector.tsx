import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';
import { useCountry } from '../../context/CountryContext';
import { COUNTRIES } from '../../utils/countries';

export function CountrySelector() {
    const { countryCode, setCountryCode } = useCountry();
    const { i18n } = useTranslation();

    const handleCountryChange = (code: string) => {
        setCountryCode(code);
        // Auto-switch language based on country default
        const newCountry = COUNTRIES[code];
        if (newCountry) {
            i18n.changeLanguage(newCountry.defaultLanguage);
            document.documentElement.lang = newCountry.defaultLanguage;
            document.documentElement.dir = newCountry.defaultLanguage === 'ar' ? 'rtl' : 'ltr';
        }
    };

    return (
        <div className="relative inline-block">
            <select
                value={countryCode}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="appearance-none bg-white border border-slate-200 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-slate-700 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
                {Object.values(COUNTRIES).map((country) => (
                    <option key={country.code} value={country.code}>
                        {country.flag} {country.name}
                    </option>
                ))}
            </select>
            <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
    );
}
