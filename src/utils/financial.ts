/**
 * Calculates the annual rent based on purchase price and yield percentage.
 * @param price Purchase price in MAD
 * @param yieldPercent Yield percentage (e.g., 5 for 5%)
 * @returns Annual rent in MAD
 */
export function calculateAnnualRent(price: number, yieldPercent: number): number {
    return price * (yieldPercent / 100);
}

/**
 * Calculates the monthly rent based on annual rent.
 * @param annualRent Annual rent in MAD
 * @returns Monthly rent in MAD
 */
export function calculateMonthlyRent(annualRent: number): number {
    return annualRent / 12;
}

/**
 * Calculates the yield percentage based on price and monthly rent.
 * @param price Purchase price in MAD
 * @param monthlyRent Monthly rent in MAD
 * @returns Yield percentage (e.g., 5.5 for 5.5%)
 */
export function calculateYield(price: number, monthlyRent: number): number {
    if (price === 0) return 0;
    const annualRent = monthlyRent * 12;
    return (annualRent / price) * 100;
}
