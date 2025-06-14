import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCheck, FaMapMarkedAlt, FaBell, FaSchool } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const steps = [
    {
        icon: <FaUserCheck size={36} className="text-blue-600" />,
        video: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmxjNWNnMTZ2bGY0bnVkYTQ4amNlcnNpMXIwMTlzY2hnZXJpMnVmNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4FGEfO2es6g8w4AU/giphy.gif"
    },
    {
        icon: <FaMapMarkedAlt size={36} className="text-blue-600" />,
        video: "https://media.giphy.com/media/QBd2kLB5qDmysEXre9/giphy.gif"
    },
    {
        icon: <FaBell size={36} className="text-blue-600" />,
        video: "https://i.gifer.com/7SPR.gif"
    },
    {
        icon: <FaSchool size={36} className="text-blue-600" />,
        video: "https://i.gifer.com/TngS.gif"
    }
];

export default function HowItWorks({ forwardedRef }) {
    const { t } = useTranslation("howItWorks");
    const stepTexts = t("steps", { returnObjects: true });

    const [activeIndex, setActiveIndex] = useState(0);
    const [fadeIn, setFadeIn] = useState(true);
    const [inView, setInView] = useState(false);

    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.4 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setFadeIn(false);
            setTimeout(() => {
                setActiveIndex((prev) => (prev + 1) % steps.length);
                setFadeIn(true);
            }, 300);
        }, 7000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            className="bg-white min-h-screen flex flex-col justify-center items-center px-6 py-16 sm:py-24 md:px-12 lg:px-24"
            id="¿Cómo_funciona?"
            ref={(el) => {
                sectionRef.current = el;
                if (forwardedRef) forwardedRef.current = el;
            }}
        >
            <motion.h2
                key={`title-${inView}`}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-2 z-10 relative"
                initial={{ opacity: 0, y: -40 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {t("sectionTitle")}
            </motion.h2>

            <motion.p
                key={`subtitle-${inView}`}
                className="text-lg sm:text-xl md:text-2xl pb-10 text-gray-600 mt-2 text-center max-w-2xl z-10 relative mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
                {t("sectionSubtitle")}
            </motion.p>

            <div className="backdrop-blur-xl bg-white/60 border border-white/30 rounded-3xl shadow-2xl w-full max-w-screen-xl px-4 sm:px-6 md:p-14 py-10 transition-all duration-700 ease-in-out z-10 relative">
                <div className="flex flex-wrap justify-center sm:gap-8 md:gap-16 mb-12 sm:mb-16 relative">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            onClick={() => {
                                setFadeIn(false);
                                setTimeout(() => {
                                    setActiveIndex(idx);
                                    setFadeIn(true);
                                }, 300);
                            }}
                            className={`relative cursor-pointer transition-all duration-500 flex items-center justify-center ${
                                activeIndex === idx
                                    ? "scale-130 z-20"
                                    : "opacity-50 hover:opacity-100"
                            }`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                        >
                            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 shadow-[0_0_14px_4px_rgba(37,99,235,0.3)] transition-all duration-300 z-auto">
                                {step.icon}
                            </div>
                            {activeIndex === idx && (
                                <svg
                                    key={`circle-${activeIndex}`}
                                    className="absolute top-0 left-0 w-22 h-22 z-0 rotate-[-90deg]"
                                    viewBox="0 0 64 64"
                                >
                                    <circle
                                        cx="32"
                                        cy="32"
                                        r="30"
                                        fill="none"
                                        stroke="#2563eb"
                                        strokeWidth="1.5"
                                        strokeDasharray="188"
                                        strokeDashoffset="0"
                                        strokeLinecap="round"
                                        className="animate-circle-timer"
                                    />
                                </svg>
                            )}
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        className="flex flex-col md:flex-row justify-between items-center gap-14"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="w-full md:w-1/2">
                            <p className="uppercase text-sm text-blue-500 font-semibold mb-2 tracking-wide">
                                {t("stepCounter", {
                                    current: activeIndex + 1,
                                    total: steps.length
                                })}
                            </p>
                            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                                {stepTexts[activeIndex].title}
                            </h3>
                            <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
                                {stepTexts[activeIndex].description}
                            </p>
                        </div>

                        <div className="w-full md:w-1/2 flex justify-center">
                            <div className="bg-black w-full max-w-lg h-56 md:h-64 rounded-2xl shadow-xl overflow-hidden">
                                <img
                                    src={steps[activeIndex].video}
                                    alt="Paso visual"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <style>{`
        .animate-circle-timer {
          animation: countdownCircle 7s linear forwards;
        }

        @keyframes countdownCircle {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: 188;
          }
        }
      `}</style>
        </section>
    );
}
