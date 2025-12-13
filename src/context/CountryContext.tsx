import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CountryConfig, COUNTRIES, DEFAULT_COUNTRY } from '../utils/countries';

interface CountryContextType {
    country: CountryConfig;
    countryCode: string;
    setCountryCode: (code: string) => void;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export function CountryProvider({ children }: { children: ReactNode }) {
    const [countryCode, setCountryCodeState] = useState<string>(() => {
        return localStorage.getItem('selectedCountry') || DEFAULT_COUNTRY;
    });

    const country = COUNTRIES[countryCode] || COUNTRIES[DEFAULT_COUNTRY];

    const setCountryCode = (code: string) => {
        setCountryCodeState(code);
        localStorage.setItem('selectedCountry', code);
    };

    return (
        <CountryContext.Provider value={{ country, countryCode, setCountryCode }}>
            {children}
        </CountryContext.Provider>
    );
}

export function useCountry() {
    const context = useContext(CountryContext);
    if (!context) {
        throw new Error('useCountry must be used within CountryProvider');
    }
    return context;
}
