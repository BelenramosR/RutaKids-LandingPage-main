import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import gsap from "gsap";
import { useTranslation } from "react-i18next";

const team = [
    {
        name: "Abel Ortega",
        role: "CEO / Team Leader",
        image: "https://i.postimg.cc/9fBF7473/Abel.jpg",
        videoTimestamp: 5
    },
    {
        name: "Alex Avila",
        role: "Backend Developer",
        image: "https://i.postimg.cc/qRbJ19wj/Alex.jpg",
        videoTimestamp: 97
    },
    {
        name: "Mateo Vilchez",
        role: "Frontend Developer",
        image: "https://i.postimg.cc/pr32Hzgj/Mateo.jpg",
        videoTimestamp: 175
    },
    {
        name: "Belen Ramos",
        role: "Frontend Developer",
        image: "https://i.postimg.cc/NFKgSpPY/Belen.jpg",
        videoTimestamp: 389
    }
];

const positions = [
    { angle: 0, distance: 200, size: 300 },
    { angle: -1.28, distance: 170, size: 160 },
    { angle: 0.01, distance: 130, size: 110 },
    { angle: 0.83, distance: 170, size: 90 }
];

export default function AboutUs() {
    const { t } = useTranslation('aboutUs');
    const [order, setOrder] = useState(team);
    const [active, setActive] = useState(team[0]);
    const [player, setPlayer] = useState(null);

    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const videoRef = useRef(null);
    const expositorRef = useRef(null);

    useEffect(() => {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);

        window.onYouTubeIframeAPIReady = () => {
            const ytPlayer = new window.YT.Player("team-video", {
                events: {
                    onReady: () => setPlayer(ytPlayer)
                }
            });
        };
    }, []);

    const animateSection = () => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { duration: 1, ease: "power3.out" }
            });

            tl.fromTo(
                titleRef.current,
                { y: 40, opacity: 0, clipPath: "inset(0 0 100% 0)" },
                { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)" }
            )
                .fromTo(
                    videoRef.current,
                    { opacity: 0, y: 30, scale: 0.95 },
                    { opacity: 1, y: 0, scale: 1 },
                    "-=0.6"
                )
                .fromTo(
                    expositorRef.current,
                    { opacity: 0, y: 40, scale: 0.9 },
                    { opacity: 1, y: 0, scale: 1 },
                    "-=0.7"
                );
        }, sectionRef);

        return () => ctx.revert();
    };

    useEffect(() => {
        if (!player) return;

        const resetStyles = () => {
            gsap.set(titleRef.current, {
                opacity: 0,
                y: 40,
                clipPath: "inset(0 0 100% 0)"
            });
            gsap.set(videoRef.current, {
                opacity: 0,
                y: 30,
                scale: 0.95
            });
            gsap.set(expositorRef.current, {
                opacity: 0,
                y: 40,
                scale: 0.9
            });
        };

        let lastVisible = false;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const isVisible = entry.isIntersecting;

                if (!lastVisible && isVisible) {
                    animateSection();
                    player.playVideo();
                } else if (lastVisible && !isVisible) {
                    resetStyles();
                    player.pauseVideo();
                }

                lastVisible = isVisible;
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [player]);

    useEffect(() => {
        if (!player) return;
        const interval = setInterval(() => {
            const time = player.getCurrentTime();
            const next = [...team].reverse().find((m) => time >= m.videoTimestamp);
            if (next && next.name !== active.name) {
                const idx = order.findIndex((m) => m.name === next.name);
                const newOrder = [...order.slice(idx), ...order.slice(0, idx)];
                setOrder(newOrder);
                setActive(order[idx]);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [player, active]);

    useEffect(() => {
        if (!expositorRef.current) return;

        gsap.fromTo(
            expositorRef.current.querySelector("img"),
            { scale: 0.9, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" }
        );

        if (window.innerWidth < 768) {
            gsap.fromTo(
                ".md\\:hidden .bg-blue-100",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
            );
        }
    }, [active]);

    const updateActive = (name) => {
        const idx = order.findIndex((m) => m.name === name);
        const newOrder = [...order.slice(idx), ...order.slice(0, idx)];
        setOrder(newOrder);
        setActive(order[idx]);
        if (player) {
            player.seekTo(order[idx].videoTimestamp, true);
        }
    };

    const centerX = 365;
    const centerY = 180;

    return (
        <section
            ref={sectionRef}
            className="min-h-screen w-full bg-white flex flex-col justify-center items-center px-4 md:px-10 py-20"
            id="#about-us"
        >
            <h2
                ref={titleRef}
                className="text-3xl md:text-4xl font-bold text-center mb-10"
            >
                {t('title')} <span className="text-blue-600">RutaKids</span>
            </h2>

            <div className="flex flex-col lg:flex-row gap-12 justify-center items-center w-full max-w-7xl">
                <div ref={videoRef} className="w-full lg:w-[700px] max-w-full px-2">
                    <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                        <iframe
                            id="team-video"
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/OK4mNu6CAqc?enablejsapi=1&version=3"
                            title="RutaKids Team"
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>

                <div
                    ref={expositorRef}
                    className="relative w-full max-w-[580px] h-[580px] hidden md:block"
                >
                    <div className="circle-img absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[320px] h-[320px] md:w-[380px] md:h-[380px] rounded-full overflow-hidden">
                        <div className="relative w-full h-full">
                            <img
                                src={active.image}
                                alt={active.name}
                                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-blue-10 to-blue-50 z-10" />
                        </div>
                    </div>

                    <div
                        className="absolute z-20 px-6 py-3 rounded-xl backdrop-blur-md text-center"
                        style={{ top: "450px", left: "calc(50% - 150px)", width: "300px", background: "rgba(0,77,255,0.49)" }}
                    >
                        <p className="font-general italic text-white text-[24px] md:text-[36px] font-extrabold leading-tight" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}>
                            {active.name}
                        </p>
                        <p className="font-general italic text-white/80 text-[18px] md:text-[26px] font-medium leading-tight" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.4)" }}>
                            {active.role}
                        </p>
                    </div>

                    {order.map((member, idx) => {
                        if (member.name === active.name || idx >= positions.length) return null;

                        const { angle, distance, size } = positions[idx];
                        const x = Math.cos(angle) * distance;
                        const y = Math.sin(angle) * distance;

                        return (
                            <div
                                key={member.name}
                                style={{
                                    transform: `translate(${centerX + x}px, ${centerY + y}px)`,
                                    width: `${size}px`,
                                    height: `${size}px`
                                }}
                                className={`absolute transition-all duration-700 rounded-full overflow-hidden shadow-md border-2 border-white cursor-pointer group ${member.name}`}
                                onClick={() => updateActive(member.name)}
                                onMouseEnter={() => gsap.to(`.${member.name}`, { scale: 1.05, duration: 0.3 })}
                                onMouseLeave={() => gsap.to(`.${member.name}`, { scale: 1, duration: 0.3 })}
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover rounded-full transition duration-300 grayscale group-hover:grayscale-0"
                                />
                            </div>
                        );
                    })}
                </div>

                {/* MODO MÓVIL */}
                <div className="md:hidden w-full flex flex-col items-center">
                    <div className="flex justify-center gap-4 flex-wrap mb-6">
                        {team.map((member) => (
                            <div
                                key={member.name}
                                className={`w-16 h-16 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${member.name === active.name ? 'border-blue-500' : 'border-transparent grayscale hover:grayscale-0'}`}
                                onClick={() => updateActive(member.name)}
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="bg-blue-100 text-center p-4 rounded-xl w-full max-w-md shadow-md">
                        <h3 className="text-xl font-bold text-gray-900">{active.name}</h3>
                        <p className="text-blue-600 font-medium">{active.role}</p>
                        <p className="text-gray-600 text-sm mt-1">{t('mobileNote')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}