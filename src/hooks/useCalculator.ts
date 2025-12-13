import { useState, useCallback } from 'react';
import { calculateAnnualRent, calculateMonthlyRent, calculateYield } from '../utils/financial';
import { getVerdict } from '../utils/benchmarks';
import { useCountry } from '../context/CountryContext';

export function useCalculator() {
    const { countryCode } = useCountry();
    const [price, setPrice] = useState<number>(400000);
    const [monthlyRent, setMonthlyRent] = useState<number>(1667);
    const [yieldPercent, setYieldPercent] = useState<number>(5);

    const updateYield = useCallback((p: number, r: number) => {
        const y = calculateYield(p, r);
        setYieldPercent(Number(y.toFixed(2)));
    }, []);

    const updateRent = useCallback((p: number, y: number) => {
        const annual = calculateAnnualRent(p, y);
        const monthly = calculateMonthlyRent(annual);
        setMonthlyRent(Number(monthly.toFixed(0)));
    }, []);

    const handlePriceChange = (val: string) => {
        const p = parseFloat(val) || 0;
        setPrice(p);
        updateYield(p, monthlyRent);
    };

    const handleRentChange = (val: string) => {
        const r = parseFloat(val) || 0;
        setMonthlyRent(r);
        updateYield(price, r);
    };

    const handleYieldChange = (val: string) => {
        const y = parseFloat(val) || 0;
        setYieldPercent(y);
        updateRent(price, y);
    };

    const verdict = getVerdict(yieldPercent, countryCode);

    return {
        price,
        monthlyRent,
        yieldPercent,
        verdict,
        handlePriceChange,
        handleRentChange,
        handleYieldChange
    };
}
