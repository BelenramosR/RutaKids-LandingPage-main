import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation, Trans } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export default function AboutTheProduct() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const videoRef = useRef(null);
    const quoteRef = useRef(null);
    const { t } = useTranslation("aboutTheProduct");

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Set initial states
            gsap.set([titleRef.current, videoRef.current, quoteRef.current], {
                opacity: 0,
                y: 50
            });

            gsap.set(videoRef.current, {
                scale: 0.9,
                rotation: 2
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
            .to(videoRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                rotation: 0,
                duration: 1.2,
                ease: "back.out(1.7)"
            }, "-=0.4")
            .to(quoteRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.6");

            // Video hover animation
            const videoContainer = videoRef.current;
            if (videoContainer) {
                videoContainer.addEventListener('mouseenter', () => {
                    gsap.to(videoContainer, {
                        scale: 1.02,
                        y: -5,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });

                videoContainer.addEventListener('mouseleave', () => {
                    gsap.to(videoContainer, {
                        scale: 1,
                        y: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about-the-product"
            className="bg-blue-50 min-h-screen flex flex-col justify-center items-center px-6 py-16 sm:py-24 md:px-12 lg:px-24"
        >
            <div className="text-center w-full max-w-5xl">
                {/* TITULO */}
                <h2 
                    ref={titleRef}
                    className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-snug"
                >
                    <Trans i18nKey="title">
                        Conoce en 1 minuto por qué <span className="text-blue-600">RutaKids</span> es el futuro del transporte escolar
                    </Trans>
                </h2>

                {/* VIDEO */}
                <div 
                    ref={videoRef}
                    className="mt-10 rounded-xl overflow-hidden shadow-xl border border-blue-200 w-full max-w-4xl mx-auto"
                >
                    <iframe
                        src="https://www.youtube.com/embed/6hYBXKtwPBI?autoplay=1&mute=1&controls=1&loop=1"
                        title="Video RutaKids"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="w-full h-[220px] md:h-[420px]"
                    ></iframe>
                </div>

                {/* FRASE */}
                <p 
                    ref={quoteRef}
                    className="mt-8 text-gray-600 italic text-sm md:text-base px-4"
                >
                    {t("quote")}
                </p>
            </div>
        </section>
    );
}