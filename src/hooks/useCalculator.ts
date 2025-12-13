import { useState, useCallback } from 'react';
import { calculateAnnualRent, calculateMonthlyRent, calculateYield } from '../utils/financial';
import { getVerdict } from '../utils/benchmarks';
import { useCountry } from '../context/CountryContext';

export function useCalculator() {
    const { countryCode } = useCountry();
    // Use strings to support intermediate input states (e.g. "5.")
    const [price, setPrice] = useState<string>('400000');
    const [monthlyRent, setMonthlyRent] = useState<string>('1667');
    const [yieldPercent, setYieldPercent] = useState<string>('5.00');

    // Helper to get numeric values safely
    const getN = (s: string) => parseFloat(s) || 0;

    const updateYield = useCallback((p: number, r: number) => {
        if (p === 0) return;
        const y = calculateYield(p, r);
        setYieldPercent(y.toFixed(2));
    }, []);

    const updateRent = useCallback((p: number, y: number) => {
        const annual = calculateAnnualRent(p, y);
        const monthly = calculateMonthlyRent(annual);
        setMonthlyRent(monthly.toFixed(0));
    }, []);

    const handlePriceChange = (val: string) => {
        setPrice(val);
        // Only update dependent values if valid number
        const p = parseFloat(val);
        const r = getN(monthlyRent);
        if (!isNaN(p)) {
            updateYield(p, r);
        }
    };

    const handleRentChange = (val: string) => {
        setMonthlyRent(val);
        const r = parseFloat(val);
        const p = getN(price);
        if (!isNaN(r)) {
            updateYield(p, r);
        }
    };

    const handleYieldChange = (val: string) => {
        setYieldPercent(val);
        const y = parseFloat(val);
        const p = getN(price);
        if (!isNaN(y)) {
            updateRent(p, y);
        }
    };

    // Calculate verdict based on current numeric yield
    const currentYield = getN(yieldPercent);
    const verdict = getVerdict(currentYield, countryCode);

    return {
        price,
        monthlyRent,
        yieldPercent,
        verdict,
        handlePriceChange,
        handleRentChange,
        handleYieldChange,
        // Expose numeric getters for components that need strict numbers
        numericPrice: getN(price),
        numericRent: getN(monthlyRent),
        numericYield: currentYield
    };
}
