import { useState } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { X, CheckCircle, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCountry } from '../../context/CountryContext';
import { submitLead } from '../../services/leads';
import { analytics } from '../../services/analytics';
// The useCalculator hook is no longer needed as data will be passed via props.

interface LeadGenModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'list' | 'report';
    data?: {
        price: number;
        rent: number;
        yield: number;
    };
}

export function LeadGenModal({ isOpen, onClose, type, data }: LeadGenModalProps) {
    const { t } = useTranslation();
    const { country } = useCountry();
    // The useCalculator hook and its derived values (price, monthlyRent, yieldPercent) are removed.

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        analytics.trackLeadGen(type, 'start');

        try {
            await submitLead({
                ...formData,
                type,
                propertyDetails: data ? { ...data, country: country.name } : undefined
            });
            setSubmitted(true);
            analytics.trackLeadGen(type, 'success');
        } catch (err) {
            console.error(err);
            analytics.trackLeadGen(type, 'fail');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative w-full max-w-md z-10">
                <GlassCard className="border border-white/20 dark:border-slate-700 shadow-2xl">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                        <X size={20} />
                    </button>

                    {submitted ? (
                        <div className="py-12 text-center">
                            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t('monetization.success')}</h3>
                            <p className="text-slate-500 dark:text-slate-400">
                                {type === 'report' ? 'Check your email for the report.' : 'An expert will call you within 24 hours.'}
                            </p>
                            <button
                                onClick={onClose}
                                className="mt-6 px-6 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium"
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <div className="p-2">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                {type === 'report' ? t('monetization.premiumTitle') : t('monetization.modalTitle')}
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-6 font-light leading-relaxed">
                                {type === 'report' ? t('monetization.premiumDesc') : t('monetization.modalSubtitle')}
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('monetization.name')}</label>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('monetization.email')}</label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white transition-all"
                                    />
                                </div>
                                {type === 'list' && (
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('monetization.phone')}</label>
                                        <input
                                            required
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white transition-all"
                                        />
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full mt-2 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 group"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            {type === 'report' ?
                                                `${t('monetization.unlock')} 99 ${country.currencySymbol}` :
                                                t('monetization.submit')
                                            }
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    )}
                </GlassCard>
            </div>
        </div>
    );
}
