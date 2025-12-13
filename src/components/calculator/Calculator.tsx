import { useState } from 'react';
import { useCalculator } from '../../hooks/useCalculator';
import { GlassCard } from '../ui/GlassCard';
import { InputGroup } from '../ui/InputGroup';
import { VerdictBadge, Verdict } from '../ui/VerdictBadge';
import { Calculator as CalcIcon, FileText, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCountry } from '../../context/CountryContext';
import { LeadGenModal } from './LeadGenModal';

const verdictColors: Record<Verdict, string> = {
    bad: 'text-red-400',
    average: 'text-yellow-400',
    good: 'text-emerald-400',
    excellent: 'text-indigo-400',
};

export function Calculator() {
    const { t } = useTranslation();
    const { country } = useCountry();
    const {
        price, monthlyRent, yieldPercent, verdict,
        handlePriceChange, handleRentChange, handleYieldChange
    } = useCalculator();

    const [modalType, setModalType] = useState<'list' | 'report' | null>(null);

    return (
        <>
            <div className="w-full max-w-4xl mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-6">

                {/* Input Section */}
                <GlassCard className="flex-1">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                            <CalcIcon size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white">{t('calculator.propertyDetails')}</h2>
                    </div>

                    <InputGroup
                        label={t('calculator.purchasePrice')}
                        suffix={country.currencySymbol}
                        value={price}
                        onChange={handlePriceChange}
                        type="number"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputGroup
                            label={t('calculator.monthlyRent')}
                            suffix={country.currencySymbol}
                            value={monthlyRent}
                            onChange={handleRentChange}
                            type="number"
                        />
                        <InputGroup
                            label={t('calculator.grossYield')}
                            suffix="%"
                            value={yieldPercent}
                            onChange={handleYieldChange}
                            type="number"
                        />
                    </div>
                </GlassCard>

                {/* Result Section */}
                <GlassCard className="flex-1 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-slate-700 transition-all duration-500 flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold mb-6 text-slate-100">{t('calculator.investmentAnalysis')}</h2>

                        <div className="space-y-6">
                            <div>
                                <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">{t('calculator.annualYield')}</span>
                                <div className="flex items-center gap-4 mt-1">
                                    <span className={`text-5xl font-bold ${verdictColors[verdict.verdict]}`}>
                                        {yieldPercent}%
                                    </span>
                                    <VerdictBadge verdict={verdict.verdict} />
                                </div>
                                <p className="mt-2 text-slate-300 text-sm">{t(verdict.description)}</p>
                            </div>

                            <div className="pt-6 border-t border-slate-700/50 grid grid-cols-2 gap-4">
                                <div>
                                    <span className="text-slate-400 text-xs uppercase block mb-1">{t('calculator.annualRevenue')}</span>
                                    <span className="text-xl font-semibold text-white">
                                        {(Number(monthlyRent) * 12).toLocaleString()} <span className="text-xs text-slate-500">{country.currencySymbol}</span>
                                    </span>
                                </div>
                                <div>
                                    <span className="text-slate-400 text-xs uppercase block mb-1">{t('calculator.monthly')}</span>
                                    <span className="text-xl font-semibold text-white">
                                        {Number(monthlyRent).toLocaleString()} <span className="text-xs text-slate-500">{country.currencySymbol}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Monetization Actions */}
                    <div className="mt-6 pt-4 border-t border-slate-700/50 flex gap-3">
                        <button
                            onClick={() => setModalType('list')}
                            className="flex-1 py-2.5 px-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 border border-white/10"
                        >
                            <Briefcase size={14} />
                            {t('monetization.listProperty')}
                        </button>
                        <button
                            onClick={() => setModalType('report')}
                            className="flex-1 py-2.5 px-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-200 text-xs font-semibold rounded-lg transition-all border border-amber-500/30 flex items-center justify-center gap-2"
                        >
                            <FileText size={14} />
                            {t('monetization.getReport')}
                        </button>
                    </div>
                </GlassCard>

            </div>
            <LeadGenModal
                isOpen={!!modalType}
                onClose={() => setModalType(null)}
                type={modalType || 'list'}
                data={{ price: Number(price) || 0, rent: Number(monthlyRent) || 0, yield: Number(yieldPercent) || 0 }}
            />
        </>
    );
}
