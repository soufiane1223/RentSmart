import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useCountry } from '../../context/CountryContext';

const GEO_DATA: Record<string, { lat: string; long: string; region: string, placename: string }> = {
    MA: { lat: '31.7917', long: '-7.0926', region: 'MA', placename: 'Morocco' },
    FR: { lat: '46.2276', long: '2.2137', region: 'FR', placename: 'France' },
    US: { lat: '37.0902', long: '-95.7129', region: 'US', placename: 'United States' },
    GB: { lat: '55.3781', long: '-3.4360', region: 'GB', placename: 'United Kingdom' },
    AE: { lat: '23.4241', long: '53.8478', region: 'AE', placename: 'United Arab Emirates' },
};

export function SEO() {
    const { t, i18n } = useTranslation();
    const { countryCode } = useCountry();
    const geo = GEO_DATA[countryCode] || GEO_DATA['MA'];
    const lang = i18n.language;

    // Generate dynamic keywords based on country and language
    const getKeywords = () => {
        const base = 'real estate investment, rental yield calculator, property roi, cash flow';
        const localized = {
            en: 'investment property calculator, rental income, cap rate',
            fr: 'rendement locatif, investissement immobilier, calcul rentabilité, cash flow',
            ar: 'حاسبة العائد الإيجاري, استثمار عقاري, عائد الاستثمار, عقارات'
        };

        // Add country specific keywords
        const countryKeywords = `${geo.placename} real estate, ${geo.placename} property market`;

        return `${base}, ${localized[lang as keyof typeof localized] || localized.en}, ${countryKeywords}`;
    };

    const title = `${t('app.title')} - ${t('app.subtitle')} | ${geo.placename}`;
    const description = t('app.subtitle') + ` - ${t('calculator.investmentAnalysis')} for properties in ${geo.placename}. Calculate ROI, Yield, and Cash Flow instantly.`;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <html lang={lang} />
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={getKeywords()} />
            <meta name="author" content="RentSmart" />

            {/* Geography Tags (for Local SEO) */}
            <meta name="geo.region" content={geo.region} />
            <meta name="geo.placename" content={geo.placename} />
            <meta name="geo.position" content={`${geo.lat};${geo.long}`} />
            <meta name="ICBM" content={`${geo.lat}, ${geo.long}`} />

            {/* Open Graph / Facebook / LinkedIn */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content="/logo.png" />
            <meta property="og:locale" content={lang} />
            <meta property="og:site_name" content="RentSmart" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={window.location.href} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content="/logo.png" />

            {/* Mobile */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="theme-color" content="#2563eb" />

            {/* Canonical */}
            <link rel="canonical" href={window.location.href} />
        </Helmet>
    );
}
