export interface YieldBenchmarks {
    bad: number;      // Below this = bad
    average: number;  // Below this = average
    good: number;     // Below this = good
    excellent: number; // Above good = excellent
}

export interface CountryConfig {
    code: string;
    name: string;
    flag: string;
    currency: string;
    currencySymbol: string;
    defaultLanguage: 'en' | 'fr' | 'ar';
    benchmarks: YieldBenchmarks;
}

export const COUNTRIES: Record<string, CountryConfig> = {
    MA: {
        code: 'MA',
        name: 'Morocco',
        flag: '🇲🇦',
        currency: 'MAD',
        currencySymbol: 'MAD',
        defaultLanguage: 'fr',
        benchmarks: {
            bad: 4,
            average: 6,
            good: 7,
            excellent: 7,
        },
    },
    FR: {
        code: 'FR',
        name: 'France',
        flag: '🇫🇷',
        currency: 'EUR',
        currencySymbol: '€',
        defaultLanguage: 'fr',
        benchmarks: {
            bad: 3,
            average: 5,
            good: 6,
            excellent: 6,
        },
    },
    US: {
        code: 'US',
        name: 'United States',
        flag: '🇺🇸',
        currency: 'USD',
        currencySymbol: '$',
        defaultLanguage: 'en',
        benchmarks: {
            bad: 5,
            average: 7,
            good: 10,
            excellent: 10,
        },
    },
    GB: {
        code: 'GB',
        name: 'United Kingdom',
        flag: '🇬🇧',
        currency: 'GBP',
        currencySymbol: '£',
        defaultLanguage: 'en',
        benchmarks: {
            bad: 4,
            average: 6,
            good: 8,
            excellent: 8,
        },
    },
    AE: {
        code: 'AE',
        name: 'United Arab Emirates',
        flag: '🇦🇪',
        currency: 'AED',
        currencySymbol: 'AED',
        defaultLanguage: 'ar',
        benchmarks: {
            bad: 5,
            average: 7,
            good: 9,
            excellent: 9,
        },
    },
};

export const DEFAULT_COUNTRY = 'MA';
