import { Verdict } from '../components/ui/VerdictBadge';
import { COUNTRIES } from './countries';

interface BenchmarkResult {
    verdict: Verdict;
    description: string;
}

export function getVerdict(yieldPercent: number, countryCode: string = 'MA'): BenchmarkResult {
    const country = COUNTRIES[countryCode] || COUNTRIES['MA'];
    const { benchmarks } = country;

    if (yieldPercent < benchmarks.bad) {
        return {
            verdict: 'bad',
            description: 'verdictDescription.tooLow'
        };
    }

    if (yieldPercent < benchmarks.average) {
        return {
            verdict: 'average',
            description: 'verdictDescription.safeLow'
        };
    }

    if (yieldPercent < benchmarks.good) {
        return {
            verdict: 'average',
            description: 'verdictDescription.standard'
        };
    }

    if (yieldPercent <= benchmarks.excellent) {
        return {
            verdict: 'good',
            description: 'verdictDescription.profitable'
        };
    }

    return {
        verdict: 'excellent',
        description: 'verdictDescription.highProfit'
    };
}
