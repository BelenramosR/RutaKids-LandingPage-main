import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBusAlt, FaMobileAlt, FaChalkboardTeacher } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const iconHover = {
    hover: {
        scale: 1.05,
        transition: { duration: 0.3, ease: 'easeOut' },
    },
};

const listItem = {
    hidden: { opacity: 0, y: 10 },
    show: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, delay: i * 0.1 },
    }),
};

const icons = [FaBusAlt, FaMobileAlt, FaChalkboardTeacher];

export default function WhyRutaKids({ forwardedRef }) {
    const { t } = useTranslation('whyRutaKids');
    const features = t('features', { returnObjects: true });

    const sectionRef = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.3 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="¿Por_qué_elegirnos?"
            ref={(el) => {
                sectionRef.current = el;
                if (forwardedRef) forwardedRef.current = el;
            }}
            className="bg-blue-50 min-h-screen flex flex-col justify-center items-center px-6 py-16 sm:py-24 md:px-12 lg:px-24"
        >
            <motion.p
                key={`label-${inView}`}
                className="text-lg sm:text-xl font-medium text-blue-600 uppercase tracking-wide mb-2 text-center"
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                {t('sectionLabel')}
            </motion.p>

            <motion.h2
                key={`title-${inView}`}
                className="text-3xl sm:text-5xl font-semibold text-gray-900 mb-16 text-center"
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            >
                {t('sectionTitle')}
            </motion.h2>

            <div className="grid gap-16 md:grid-cols-3">
                {features.map((feature, index) => {
                    const IconComponent = icons[index];
                    return (
                        <motion.div
                            key={`card-${index}-${inView}`}
                            className="text-left group will-change-transform"
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.6, delay: index * 0.2, ease: 'easeOut' }}
                            whileHover="hover"
                        >
                            <motion.div
                                variants={iconHover}
                                whileHover="hover"
                                className="p-4 rounded-full w-fit mb-4 text-blue-600"
                            >
                                <IconComponent size={48} />
                            </motion.div>
                            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-base sm:text-xl text-gray-600 mb-4">
                                {feature.description}
                            </p>
                            <ul className="text-sm sm:text-base list-disc text-gray-700 space-y-2 pl-6">
                                {feature.bullets.map((bullet, i) => (
                                    <motion.li
                                        key={`bullet-${index}-${i}-${inView}`}
                                        custom={i}
                                        initial="hidden"
                                        animate="show"
                                        variants={listItem}
                                    >
                                        {bullet}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
