import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBell, FaMapMarkedAlt, FaCheckCircle, FaClock } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

import ios from '/src/assets/images/ios.png';
import android from '/src/assets/images/android.png';

const icons = [
    <FaBell className="text-blue-600 text-xl" />,
    <FaMapMarkedAlt className="text-blue-600 text-xl" />,
    <FaCheckCircle className="text-blue-600 text-xl" />,
    <FaClock className="text-blue-600 text-xl" />
];

export default function ParentsSection({ forwardedRef }) {
    const { t } = useTranslation('forParents');
    const features = t('features', { returnObjects: true });

    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="padres"
            className="w-full min-h-screen bg-gradient-to-r from-white to-blue-50 py-24 px-6 md:px-20 flex items-center justify-center overflow-hidden"
            ref={(el) => {
                sectionRef.current = el;
                if (forwardedRef) forwardedRef.current = el;
            }}
        >
            <div className="max-w-screen-xl w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
                {/* Mockups animados */}
                <div className="relative w-full flex justify-center items-center min-h-[420px] sm:min-h-[480px]">
                    <motion.div
                        className="absolute"
                        initial={{ opacity: 0, y: -50 }}
                        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    >
                        <img
                            src={ios}
                            alt="Mockup atras"
                            className="w-40 sm:w-48 md:w-56 lg:w-64 relative z-0 sm:translate-x-3 translate-x-12"
                        />
                    </motion.div>

                    <motion.div
                        className="absolute z-10"
                        initial={{ opacity: 0, y: 50 }}
                        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                    >
                        <img
                            src={android}
                            alt="Mockup adelante"
                            className="w-40 sm:w-48 md:w-56 lg:w-64 mx-auto sm:-translate-x-32 sm:translate-y-16 -translate-x-10 translate-y-10"
                        />
                    </motion.div>
                </div>

                <div className="text-center lg:text-left">
                    <motion.h2
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight"
                        initial={{ opacity: 0, x: 50 }}
                        animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.8 }}
                    >
                        {t('title')}
                    </motion.h2>

                    <motion.p
                        className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 leading-relaxed"
                        initial={{ opacity: 0, x: -50 }}
                        animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {t('subtitle')}
                    </motion.p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                        {features.map((item, i) => (
                            <div
                                key={i}
                                className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="mt-1">{icons[i]}</div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-base mb-1">{item.title}</h4>
                                        <p className="text-sm text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <motion.p
                        className="text-base text-gray-600 italic mt-8 mb-8"
                        initial={{ opacity: 0 }}
                        animate={visible ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        {t('quote')}
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/203px-Download_on_the_App_Store_Badge.svg.png?20170219160111"
                            alt="App Store"
                            className="h-12 sm:h-10 mx-auto sm:mx-0"
                        />
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                            alt="Google Play"
                            className="h-12 sm:h-10 mx-auto sm:mx-0"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
