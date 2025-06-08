import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroImg from '/src/assets/images/heroLlanta.webp';
import { useTranslation, Trans } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const { t } = useTranslation('hero');
    const heroRef = useRef(null);
    const imageRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const quoteRef = useRef(null);
    const buttonsRef = useRef(null);
    const trustedRef = useRef(null);
    const logosRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Set initial states
            gsap.set([titleRef.current, subtitleRef.current, quoteRef.current, buttonsRef.current], {
                opacity: 0,
                y: 60
            });
            
            gsap.set(imageRef.current, {
                opacity: 0,
                scale: 0.8,
                rotation: -5
            });

            gsap.set([trustedRef.current, logosRef.current], {
                opacity: 0,
                y: 40
            });

            // Main animation timeline
            const tl = gsap.timeline({
                delay: 0.5
            });

            tl.to(imageRef.current, {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 1.2,
                ease: "back.out(1.7)"
            })
            .to(titleRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.6")
            .to(subtitleRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.4")
            .to(quoteRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.4")
            .to(buttonsRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.4")
            .to(trustedRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.2")
            .to(logosRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.4");

            // Hover animations for buttons
            const buttons = buttonsRef.current?.querySelectorAll('a');
            buttons?.forEach(button => {
                button.addEventListener('mouseenter', () => {
                    gsap.to(button, {
                        scale: 1.05,
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

            // Logo hover animations
            const logos = logosRef.current?.querySelectorAll('img');
            logos?.forEach(logo => {
                logo.addEventListener('mouseenter', () => {
                    gsap.to(logo, {
                        scale: 1.1,
                        filter: "grayscale(0%)",
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });

                logo.addEventListener('mouseleave', () => {
                    gsap.to(logo, {
                        scale: 1,
                        filter: "grayscale(100%)",
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
            });

            // Parallax effect for image
            gsap.to(imageRef.current, {
                y: -50,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            id="hero"
            className="min-h-screen w-full bg-white flex items-center justify-center px-4 pt-32 pb-24 sm:py-24 md:px-12 lg:px-24 overflow-x-hidden"
        >
            <div className="max-w-screen-xl w-full flex flex-col items-center justify-center text-center">
                <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full">
                    <div
                        ref={imageRef}
                        className="w-full md:w-1/2 flex justify-center"
                    >
                        <img
                            src={heroImg}
                            alt="RutaKids plataforma"
                            className="max-w-lg w-full rounded-2xl shadow-xl"
                        />
                    </div>

                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <h1
                            ref={titleRef}
                            className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6"
                        >
                            <Trans i18nKey="title" t={t} components={{ 1: <span className="text-blue-600" /> }} />
                        </h1>

                        <p
                            ref={subtitleRef}
                            className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-4"
                        >
                            {t('subtitle')}
                        </p>

                        <p
                            ref={quoteRef}
                            className="italic text-sm sm:text-base text-gray-500 mb-6"
                        >
                            {t('quote')}
                        </p>

                        <div
                            ref={buttonsRef}
                            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                        >
                            <a
                                href="#contactanos"
                                className="bg-blue-600 text-white font-medium px-8 py-3 rounded-xl hover:bg-blue-700 transition-all"
                            >
                                {t('demo')}
                            </a>
                            <a href="#about-the-product" className="text-blue-600 font-medium hover:underline px-6 py-3">
                                {t('how')}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Trusted By */}
                <section className="w-full mt-16 px-4 md:px-0">
                    <p
                        ref={trustedRef}
                        className="uppercase text-sm text-gray-400 tracking-widest font-medium text-center"
                    >
                        {t('trusted')}
                    </p>

                    <div
                        ref={logosRef}
                        className="mt-10 flex flex-wrap items-center justify-center gap-8 md:gap-24"
                    >
                        <img
                            src="https://i.ibb.co/xtvJMd4v/5.png"
                            alt="Despertares"
                            className="h-10 md:h-14 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transform hover:scale-105 transition duration-300"
                        />
                        <img
                            src="https://www.trilcelm.edu.pe/trujillo/images/LOGO-TRILCE-FONDO-BLANCO--01.png"
                            alt="Trilce"
                            className="h-10 md:h-14 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transform hover:scale-105 transition duration-300"
                        />
                        <img
                            src="https://i.ibb.co/PGDTMwSg/4.png"
                            alt="Fleming"
                            className="h-10 md:h-14 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transform hover:scale-105 transition duration-300"
                        />
                        <img
                            src="https://mlp.edu.pe/wp-content/uploads/2023/06/LOGO-Y-ESCUDO-COLEGIO-MAX-PLANCK-1.jpeg"
                            alt="Max Planck"
                            className="h-10 md:h-14 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transform hover:scale-105 transition duration-300"
                        />
                    </div>
                </section>
            </div>
        </section>
    );
};

export default Hero;