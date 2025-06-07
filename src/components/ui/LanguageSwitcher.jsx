import { useState, useEffect, useRef } from 'react';
import i18n from '../../i18n';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGlobeAmericas } from 'react-icons/fa';

const LANGUAGES = [
    { code: 'es', label: 'Español', flag: '🇵🇪' },
    { code: 'en', label: 'English', flag: '🇺🇸' }
];

export default function LanguageSwitcher() {
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(i18n.language || 'es');
    const ref = useRef();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("lng", lng);
        setCurrent(lng);
        setOpen(false);
    };

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selected = LANGUAGES.find(l => l.code === current);

    return (
        <div ref={ref} className="fixed bottom-6 left-6 z-50">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg transition-all"
            >
                <FaGlobeAmericas className="text-blue-600" />
                <span className="font-medium text-gray-700">{selected?.label}</span>
                <span>{selected?.flag}</span>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-16 left-0 bg-white rounded-xl shadow-xl border border-gray-200 py-2 px-4 w-40"
                    >
                        {LANGUAGES.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => changeLanguage(lang.code)}
                                className={`flex items-center w-full justify-between px-3 py-2 text-sm rounded-md hover:bg-blue-50 ${
                                    current === lang.code ? 'font-semibold text-blue-700' : 'text-gray-700'
                                }`}
                            >
                                <span>{lang.label}</span>
                                <span>{lang.flag}</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
