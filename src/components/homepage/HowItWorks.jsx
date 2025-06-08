import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaUserCheck, FaMapMarkedAlt, FaBell, FaSchool } from "react-icons/fa";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

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
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const containerRef = useRef(null);
    const stepsRef = useRef([]);
    const contentRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Set initial states
            gsap.set([titleRef.current, subtitleRef.current], {
                opacity: 0,
                y: 50
            });

            gsap.set(containerRef.current, {
                opacity: 0,
                y: 80,
                scale: 0.95
            });

            // Create scroll trigger animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.to(titleRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            })
            .to(subtitleRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.4")
            .to(containerRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "back.out(1.7)"
            }, "-=0.4");

            // Animate steps on load
            gsap.fromTo(stepsRef.current, {
                scale: 0,
                opacity: 0
            }, {
                scale: 1,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "back.out(1.7)",
                delay: 1
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        // Auto-advance steps
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % steps.length);
        }, 7000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Animate content change
        if (contentRef.current && videoRef.current) {
            gsap.fromTo(contentRef.current, {
                opacity: 0,
                x: -30
            }, {
                opacity: 1,
                x: 0,
                duration: 0.6,
                ease: "power2.out"
            });

            gsap.fromTo(videoRef.current, {
                opacity: 0,
                scale: 0.9,
                rotation: 2
            }, {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.8,
                ease: "back.out(1.7)"
            });
        }
    }, [activeIndex]);

    const handleStepClick = (index) => {
        setActiveIndex(index);
        
        // Animate clicked step
        gsap.to(stepsRef.current[index], {
            scale: 1.1,
            duration: 0.2,
            ease: "power2.out",
            yoyo: true,
            repeat: 1
        });
    };

    return (
        <section
            className="bg-white min-h-screen flex flex-col justify-center items-center px-6 py-16 sm:py-24 md:px-12 lg:px-24"
            id="¿Cómo_funciona?"
            ref={(el) => {
                sectionRef.current = el;
                if (forwardedRef) forwardedRef.current = el;
            }}
        >
            <h2
                ref={titleRef}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-2 z-10 relative"
            >
                {t("sectionTitle")}
            </h2>

            <p
                ref={subtitleRef}
                className="text-lg sm:text-xl md:text-2xl pb-10 text-gray-600 mt-2 text-center max-w-2xl z-10 relative mb-10"
            >
                {t("sectionSubtitle")}
            </p>

            <div 
                ref={containerRef}
                className="backdrop-blur-xl bg-white/60 border border-white/30 rounded-3xl shadow-2xl w-full max-w-screen-xl px-4 sm:px-6 md:p-14 py-10 transition-all duration-700 ease-in-out z-10 relative"
            >
                <div className="flex flex-wrap justify-center sm:gap-8 md:gap-16 mb-12 sm:mb-16 relative">
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            ref={el => stepsRef.current[idx] = el}
                            onClick={() => handleStepClick(idx)}
                            className={`relative cursor-pointer transition-all duration-500 flex items-center justify-center ${
                                activeIndex === idx
                                    ? "scale-130 z-20"
                                    : "opacity-50 hover:opacity-100"
                            }`}
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
                        </div>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-14">
                    <div ref={contentRef} className="w-full md:w-1/2">
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
                        <div 
                            ref={videoRef}
                            className="bg-black w-full max-w-lg h-56 md:h-64 rounded-2xl shadow-xl overflow-hidden"
                        >
                            <img
                                src={steps[activeIndex].video}
                                alt="Paso visual"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
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