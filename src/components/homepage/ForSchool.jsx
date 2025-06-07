import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaChartLine, FaRoute, FaExclamationTriangle, FaDownload } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import web from '/src/assets/images/web.png';

gsap.registerPlugin(ScrollTrigger);

export default function ForSchool({ forwardedRef }) {
    const { t } = useTranslation('forSchool');
    const features = t('features', { returnObjects: true });

    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const featuresRef = useRef([]);
    const imageRef = useRef(null);

    const icons = [
        <FaChartLine />,
        <FaRoute />,
        <FaExclamationTriangle />,
        <FaDownload />
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Set initial states
            gsap.set([titleRef.current, descriptionRef.current], {
                opacity: 0,
                x: -50
            });

            gsap.set(featuresRef.current, {
                opacity: 0,
                x: -30,
                scale: 0.9
            });

            gsap.set(imageRef.current, {
                opacity: 0,
                scale: 0.8,
                rotation: 5
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
                x: 0,
                duration: 0.8,
                ease: "power3.out"
            })
            .to(descriptionRef.current, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.4")
            .to(featuresRef.current, {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "back.out(1.7)"
            }, "-=0.4")
            .to(imageRef.current, {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 1.2,
                ease: "back.out(1.7)"
            }, "-=0.8");

            // Feature hover animations
            featuresRef.current.forEach((feature, index) => {
                if (feature) {
                    const icon = feature.querySelector('.feature-icon');
                    
                    feature.addEventListener('mouseenter', () => {
                        gsap.to(feature, {
                            scale: 1.05,
                            y: -5,
                            duration: 0.3,
                            ease: "power2.out"
                        });

                        gsap.to(icon, {
                            scale: 1.2,
                            rotation: 10,
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

                        gsap.to(icon, {
                            scale: 1,
                            rotation: 0,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    });
                }
            });

            // Image parallax effect
            gsap.to(imageRef.current, {
                y: -30,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="colegios"
            className="w-full min-h-screen bg-gradient-to-r from-white to-blue-50 py-24 px-6 sm:px-10 md:px-20 flex items-center justify-center overflow-hidden"
            ref={(el) => {
                sectionRef.current = el;
                if (forwardedRef) forwardedRef.current = el;
            }}
        >
            <div className="max-w-screen-xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Texto */}
                <div className="text-center lg:text-left">
                    <h2
                        ref={titleRef}
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6"
                    >
                        {t('title')}
                    </h2>

                    <p
                        ref={descriptionRef}
                        className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6"
                    >
                        {t('description')}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                ref={el => featuresRef.current[index] = el}
                                className="flex items-start gap-4 bg-white p-4 rounded-xl shadow hover:shadow-lg transition-all cursor-pointer"
                            >
                                <div className="feature-icon text-blue-600 text-xl">{icons[index]}</div>
                                <p className="text-gray-700 font-medium">{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Imagen dashboard */}
                <div className="flex justify-center w-full">
                    <img
                        ref={imageRef}
                        src={web}
                        alt="Dashboard plataforma web"
                        className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px]"
                    />
                </div>
            </div>
        </section>
    );
}