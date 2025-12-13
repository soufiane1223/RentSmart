import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';

export type Verdict = 'bad' | 'average' | 'good' | 'excellent';

interface VerdictBadgeProps {
    verdict: Verdict;
}

const styles: Record<Verdict, string> = {
    bad: 'bg-red-100 text-red-700 border-red-200',
    average: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    good: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    excellent: 'bg-indigo-100 text-indigo-700 border-indigo-200',
};

export function VerdictBadge({ verdict }: VerdictBadgeProps) {
    const { t } = useTranslation();

    return (
        <span className={clsx(
            "px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider",
            styles[verdict]
        )}>
            {t(`verdict.${verdict}`)}
        </span>
    );
}
