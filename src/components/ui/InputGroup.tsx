import { useTranslation } from 'react-i18next';

interface InputGroupProps {
    label: string;
    suffix?: string;
    value: number | string;
    onChange: (value: string) => void;
    type?: "text" | "number";
    placeholder?: string;
    disabled?: boolean;
}

export function InputGroup({ label, suffix, value, onChange, type = "text", placeholder, disabled }: InputGroupProps) {
    const { i18n } = useTranslation();
    const isRTL = i18n.dir() === 'rtl';

    // Add inline style for specific padding adjustment in RTL
    const rtlStyle = isRTL ? { paddingRight: '5%' } : {};

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
            <div className="relative">
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                    dir="ltr"
                    style={rtlStyle}
                    className={`w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 dark:text-white font-medium disabled:bg-slate-100 disabled:text-slate-500 disabled:dark:bg-slate-800 disabled:dark:text-slate-400 ${isRTL ? 'text-right' : 'text-left'}`}
                />
                {suffix && (
                    <div className={`absolute inset-y-0 ${isRTL ? 'left-0 pl-4' : 'right-0 pr-4'} flex items-center pointer-events-none`}>
                        <span className="text-slate-400 font-medium">{suffix}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
