import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaBusAlt, FaMobileAlt, FaChalkboardTeacher } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const icons = [FaBusAlt, FaMobileAlt, FaChalkboardTeacher];

export default function WhyRutaKids({ forwardedRef }) {
    const { t } = useTranslation('whyRutaKids');
    const features = t('features', { returnObjects: true });

    const sectionRef = useRef(null);
    const labelRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Set initial states
            gsap.set([labelRef.current, titleRef.current], {
                opacity: 0,
                y: 50
            });

            gsap.set(cardsRef.current, {
                opacity: 0,
                y: 80,
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

            tl.to(labelRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            })
            .to(titleRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.4")
            .to(cardsRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)",
                stagger: 0.2
            }, "-=0.4");

            // Add hover animations for cards
            cardsRef.current.forEach((card, index) => {
                if (card) {
                    const icon = card.querySelector('.icon-container');
                    const bullets = card.querySelectorAll('li');

                    card.addEventListener('mouseenter', () => {
                        gsap.to(card, {
                            y: -10,
                            scale: 1.02,
                            duration: 0.3,
                            ease: "power2.out"
                        });

                        gsap.to(icon, {
                            scale: 1.1,
                            rotation: 5,
                            duration: 0.3,
                            ease: "power2.out"
                        });

                        gsap.fromTo(bullets, {
                            x: -10,
                            opacity: 0.7
                        }, {
                            x: 0,
                            opacity: 1,
                            duration: 0.3,
                            stagger: 0.05,
                            ease: "power2.out"
                        });
                    });

                    card.addEventListener('mouseleave', () => {
                        gsap.to(card, {
                            y: 0,
                            scale: 1,
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

        }, sectionRef);

        return () => ctx.revert();
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
            <p
                ref={labelRef}
                className="text-lg sm:text-xl font-medium text-blue-600 uppercase tracking-wide mb-2 text-center"
            >
                {t('sectionLabel')}
            </p>

            <h2
                ref={titleRef}
                className="text-3xl sm:text-5xl font-semibold text-gray-900 mb-16 text-center"
            >
                {t('sectionTitle')}
            </h2>

            <div className="grid gap-16 md:grid-cols-3">
                {features.map((feature, index) => {
                    const IconComponent = icons[index];
                    return (
                        <div
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            className="text-left group will-change-transform bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="icon-container p-4 rounded-full w-fit mb-4 text-blue-600 bg-blue-100">
                                <IconComponent size={48} />
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-base sm:text-xl text-gray-600 mb-4">
                                {feature.description}
                            </p>
                            <ul className="text-sm sm:text-base list-disc text-gray-700 space-y-2 pl-6">
                                {feature.bullets.map((bullet, i) => (
                                    <li key={i}>
                                        {bullet}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}