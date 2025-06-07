import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaBell, FaMapMarkedAlt, FaCheckCircle, FaClock } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

import ios from '/src/assets/images/ios.png';
import android from '/src/assets/images/android.png';

gsap.registerPlugin(ScrollTrigger);

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
    const mockupsRef = useRef(null);
    const iosRef = useRef(null);
    const androidRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const featuresRef = useRef([]);
    const quoteRef = useRef(null);
    const storesRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Set initial states
            gsap.set([iosRef.current, androidRef.current], {
                opacity: 0,
                y: 100,
                rotation: 10
            });

            gsap.set([titleRef.current, subtitleRef.current, quoteRef.current, storesRef.current], {
                opacity: 0,
                x: 50
            });

            gsap.set(featuresRef.current, {
                opacity: 0,
                y: 30,
                scale: 0.9
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

            // Animate mockups with floating effect
            tl.to(iosRef.current, {
                opacity: 1,
                y: 0,
                rotation: 0,
                duration: 1.2,
                ease: "back.out(1.7)"
            })
            .to(androidRef.current, {
                opacity: 1,
                y: 0,
                rotation: 0,
                duration: 1.2,
                ease: "back.out(1.7)"
            }, "-=0.8")
            .to(titleRef.current, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.6")
            .to(subtitleRef.current, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.4")
            .to(featuresRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "back.out(1.7)"
            }, "-=0.4")
            .to(quoteRef.current, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.2")
            .to(storesRef.current, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.4");

            // Floating animation for mockups
            gsap.to(iosRef.current, {
                y: -10,
                duration: 2,
                ease: "power2.inOut",
                yoyo: true,
                repeat: -1
            });

            gsap.to(androidRef.current, {
                y: 10,
                duration: 2.5,
                ease: "power2.inOut",
                yoyo: true,
                repeat: -1,
                delay: 0.5
            });

            // Feature cards hover animations
            featuresRef.current.forEach((feature, index) => {
                if (feature) {
                    feature.addEventListener('mouseenter', () => {
                        gsap.to(feature, {
                            scale: 1.05,
                            y: -5,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    });

                    feature.addEventListener('mouseleave', () => {
                        gsap.to(feature, {
                            scale: 1,
                            y: 0,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    });
                }
            });

            // Store buttons hover animations
            const storeButtons = storesRef.current?.querySelectorAll('img');
            storeButtons?.forEach(button => {
                button.addEventListener('mouseenter', () => {
                    gsap.to(button, {
                        scale: 1.1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });

                button.addEventListener('mouseleave', () => {
                    gsap.to(button, {
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
            });

        }, sectionRef);

        return () => ctx.revert();
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
                <div ref={mockupsRef} className="relative w-full flex justify-center items-center min-h-[420px] sm:min-h-[480px]">
                    <div
                        ref={iosRef}
                        className="absolute"
                    >
                        <img
                            src={ios}
                            alt="Mockup atras"
                            className="w-40 sm:w-48 md:w-56 lg:w-64 relative z-0 sm:translate-x-3 translate-x-12"
                        />
                    </div>

                    <div
                        ref={androidRef}
                        className="absolute z-10"
                    >
                        <img
                            src={android}
                            alt="Mockup adelante"
                            className="w-40 sm:w-48 md:w-56 lg:w-64 mx-auto sm:-translate-x-32 sm:translate-y-16 -translate-x-10 translate-y-10"
                        />
                    </div>
                </div>

                <div className="text-center lg:text-left">
                    <h2
                        ref={titleRef}
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight"
                    >
                        {t('title')}
                    </h2>

                    <p
                        ref={subtitleRef}
                        className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 leading-relaxed"
                    >
                        {t('subtitle')}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                        {features.map((item, i) => (
                            <div
                                key={i}
                                ref={el => featuresRef.current[i] = el}
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

                    <p
                        ref={quoteRef}
                        className="text-base text-gray-600 italic mt-8 mb-8"
                    >
                        {t('quote')}
                    </p>

                    <div
                        ref={storesRef}
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/203px-Download_on_the_App_Store_Badge.svg.png?20170219160111"
                            alt="App Store"
                            className="h-12 sm:h-10 mx-auto sm:mx-0 cursor-pointer"
                        />
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                            alt="Google Play"
                            className="h-12 sm:h-10 mx-auto sm:mx-0 cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}