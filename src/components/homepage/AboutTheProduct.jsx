import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation, Trans } from "react-i18next";

export default function AboutTheProduct() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });
    const { t } = useTranslation("aboutTheProduct");

    return (
        <section
            id="about-the-product"
            className="bg-blue-50  min-h-screen flex flex-col justify-center items-center px-6 py-16 sm:py-24 md:px-12 lg:px-24"
        >
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center w-full max-w-5xl"
            >
                {/* TITULO */}
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-snug">
                    <Trans i18nKey="title">
                        Conoce en 1 minuto por qué <span className="text-blue-600">RutaKids</span> es el futuro del transporte escolar
                    </Trans>
                </h2>

                {/* VIDEO */}
                <div className="mt-10 rounded-xl overflow-hidden shadow-xl border border-blue-200 w-full max-w-4xl mx-auto">
                    <iframe
                        src="https://www.youtube.com/embed/6hYBXKtwPBI?autoplay=1&mute=1&controls=1&loop=1"
                        title="Video RutaKids"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="w-full h-[220px] md:h-[420px]"
                    ></iframe>
                </div>

                {/* FRASE */}
                <p className="mt-8 text-gray-600 italic text-sm md:text-base px-4">
                    {t("quote")}
                </p>
            </motion.div>
        </section>
    );
}
