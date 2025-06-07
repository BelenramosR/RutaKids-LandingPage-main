import React from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaRoute, FaExclamationTriangle, FaDownload } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import web from '/src/assets/images/web.png';


export default function ForSchool({ forwardedRef }) {
    const { t } = useTranslation('forSchool');
    const features = t('features', { returnObjects: true });

    const icons = [
        <FaChartLine />,
        <FaRoute />,
        <FaExclamationTriangle />,
        <FaDownload />
    ];

    return (
        <section
            id="colegios"
            className="w-full min-h-screen bg-gradient-to-r from-white to-blue-50 py-24 px-6 sm:px-10 md:px-20 flex items-center justify-center overflow-hidden"
            ref={forwardedRef}
        >
            <div className="max-w-screen-xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Texto */}
                <div className="text-center lg:text-left">
                    <motion.h2
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {t('title')}
                    </motion.h2>

                    <motion.p
                        className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {t('description')}
                    </motion.p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-4 bg-white p-4 rounded-xl shadow hover:shadow-lg transition-all"

                            >
                                <div className="text-blue-600 text-xl">{icons[index]}</div>
                                <p className="text-gray-700 font-medium">{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Imagen dashboard */}
                <motion.div
                    className="flex justify-center w-full"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <img
                        src={web}
                        alt="Dashboard plataforma web"
                        className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px]"
                    />
                </motion.div>
            </div>
        </section>
    );
};
