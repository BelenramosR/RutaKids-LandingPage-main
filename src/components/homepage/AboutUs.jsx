import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import gsap from "gsap";
import { useTranslation } from "react-i18next";

const team = [
    {
        name: "Abel Ortega",
        role: "CEO / Team Leader",
        image: "https://i.postimg.cc/9fBF7473/Abel.jpg",
        videoTimestamp: 5,
        timezone: "UTC-5"
    },
    {
        name: "Alex Avila",
        role: "Backend Developer",
        image: "https://i.postimg.cc/qRbJ19wj/Alex.jpg",
        videoTimestamp: 97,
        timezone: "UTC-5"
    },
    {
        name: "Mateo Vilchez",
        role: "Frontend Developer",
        image: "https://i.postimg.cc/pr32Hzgj/Mateo.jpg",
        videoTimestamp: 175,
        timezone: "UTC-5"
    },
    {
        name: "Belen Ramos",
        role: "Frontend Developer",
        image: "https://i.postimg.cc/NFKgSpPY/Belen.jpg",
        videoTimestamp: 389,
        timezone: "UTC-5"
    }
];

// Posiciones en círculo para efecto de zona horaria
const getCirclePosition = (index, total, radius = 200) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2; // Start from top
    return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        angle: angle
    };
};

export default function AboutUs() {
    const { t } = useTranslation('aboutUs');
    const [order, setOrder] = useState(team);
    const [active, setActive] = useState(team[0]);
    const [player, setPlayer] = useState(null);

    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const videoRef = useRef(null);
    const expositorRef = useRef(null);
    const teamMembersRef = useRef([]);

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

            // Animate title with typewriter effect
            tl.fromTo(
                titleRef.current,
                { 
                    y: 60, 
                    opacity: 0, 
                    clipPath: "inset(0 0 100% 0)" 
                },
                { 
                    y: 0, 
                    opacity: 1, 
                    clipPath: "inset(0 0 0% 0)",
                    duration: 1.2
                }
            )
            
            // Video entrance with 3D effect
            .fromTo(
                videoRef.current,
                { 
                    opacity: 0, 
                    y: 50, 
                    scale: 0.8,
                    rotationX: 15
                },
                { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    rotationX: 0,
                    duration: 1.2
                },
                "-=0.8"
            )
            
            // Main expositor with dramatic entrance
            .fromTo(
                expositorRef.current,
                { 
                    opacity: 0, 
                    scale: 0.5, 
                    rotation: 10,
                    filter: "blur(10px)"
                },
                { 
                    opacity: 1, 
                    scale: 1, 
                    rotation: 0,
                    filter: "blur(0px)",
                    duration: 1.5,
                    ease: "back.out(1.7)"
                },
                "-=0.6"
            );

            // Animate team members in timezone-like pattern
            teamMembersRef.current.forEach((member, index) => {
                if (member && index > 0) { // Skip the active member
                    const position = getCirclePosition(index - 1, team.length - 1, 180);
                    
                    gsap.fromTo(member, {
                        opacity: 0,
                        scale: 0,
                        x: position.x * 2,
                        y: position.y * 2,
                        rotation: position.angle * (180 / Math.PI)
                    }, {
                        opacity: 1,
                        scale: 1,
                        x: position.x,
                        y: position.y,
                        rotation: 0,
                        duration: 1.2,
                        delay: index * 0.2,
                        ease: "back.out(1.7)"
                    });
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    };

    useEffect(() => {
        if (!player) return;

        const resetStyles = () => {
            gsap.set(titleRef.current, {
                opacity: 0,
                y: 60,
                clipPath: "inset(0 0 100% 0)"
            });
            gsap.set(videoRef.current, {
                opacity: 0,
                y: 50,
                scale: 0.8,
                rotationX: 15
            });
            gsap.set(expositorRef.current, {
                opacity: 0,
                scale: 0.5,
                rotation: 10,
                filter: "blur(10px)"
            });
            gsap.set(teamMembersRef.current, {
                opacity: 0,
                scale: 0
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

        // Animate active member change with smooth transition
        const tl = gsap.timeline();
        
        tl.to(expositorRef.current.querySelector("img"), {
            scale: 0.9,
            opacity: 0.7,
            duration: 0.3,
            ease: "power2.out"
        })
        .to(expositorRef.current.querySelector("img"), {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)"
        });

        // Animate info card
        const infoCard = expositorRef.current.querySelector('[style*="450px"]');
        if (infoCard) {
            gsap.fromTo(infoCard, {
                y: 20,
                opacity: 0,
                scale: 0.95
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)"
            });
        }

        // Mobile version animation
        if (window.innerWidth < 768) {
            gsap.fromTo(
                ".md\\:hidden .bg-blue-100",
                { opacity: 0, y: 30, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
            );
        }
    }, [active]);

    const updateActive = (name) => {
        const idx = order.findIndex((m) => m.name === name);
        const newOrder = [...order.slice(idx), ...order.slice(0, idx)];
        setOrder(newOrder);
        setActive(order[idx]);
        
        // Smooth transition animation
        const clickedMember = teamMembersRef.current.find(ref => 
            ref && ref.classList.contains(name.replace(/\s+/g, '-'))
        );
        
        if (clickedMember) {
            gsap.to(clickedMember, {
                scale: 1.2,
                duration: 0.2,
                ease: "power2.out",
                yoyo: true,
                repeat: 1
            });
        }
        
        if (player) {
            player.seekTo(order[idx].videoTimestamp, true);
        }
    };

    const centerX = 365;
    const centerY = 180;

    return (
        <section
            ref={sectionRef}
            className="min-h-screen w-full bg-gradient-to-br from-white via-blue-50 to-white flex flex-col justify-center items-center px-4 md:px-10 py-20 overflow-hidden"
            id="#about-us"
        >
            <h2
                ref={titleRef}
                className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent"
            >
                {t('title')} <span className="text-blue-600">RutaKids</span>
            </h2>

            <div className="flex flex-col lg:flex-row gap-12 justify-center items-center w-full max-w-7xl">
                <div ref={videoRef} className="w-full lg:w-[700px] max-w-full px-2">
                    <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
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
                    {/* Main active member */}
                    <div className="circle-img absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[320px] h-[320px] md:w-[380px] md:h-[380px] rounded-full overflow-hidden shadow-2xl border-4 border-white">
                        <div className="relative w-full h-full">
                            <img
                                src={active.image}
                                alt={active.name}
                                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-900/20 z-10" />
                        </div>
                    </div>

                    {/* Info card with enhanced styling */}
                    <div
                        className="absolute z-30 px-8 py-4 rounded-2xl backdrop-blur-lg text-center border border-white/30 shadow-xl"
                        style={{ 
                            top: "450px", 
                            left: "calc(50% - 160px)", 
                            width: "320px", 
                            background: "linear-gradient(135deg, rgba(37,99,235,0.9) 0%, rgba(59,130,246,0.8) 100%)"
                        }}
                    >
                        <p className="font-general text-white text-[24px] md:text-[32px] font-extrabold leading-tight mb-1" 
                           style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
                            {active.name}
                        </p>
                        <p className="font-general text-white/90 text-[16px] md:text-[20px] font-medium leading-tight mb-2" 
                           style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.4)" }}>
                            {active.role}
                        </p>
                        <div className="text-white/80 text-sm font-medium">
                            🌍 {active.timezone}
                        </div>
                    </div>

                    {/* Team members in timezone circle pattern */}
                    {order.map((member, idx) => {
                        if (member.name === active.name || idx >= team.length) return null;

                        const position = getCirclePosition(idx - 1, team.length - 1, 180);
                        const x = position.x;
                        const y = position.y;
                        const size = 120 - (idx * 15); // Decreasing size

                        return (
                            <div
                                key={member.name}
                                ref={el => teamMembersRef.current[idx] = el}
                                style={{
                                    transform: `translate(${centerX + x}px, ${centerY + y}px)`,
                                    width: `${size}px`,
                                    height: `${size}px`
                                }}
                                className={`absolute transition-all duration-700 rounded-full overflow-hidden shadow-lg border-3 border-white cursor-pointer group ${member.name.replace(/\s+/g, '-')} hover:z-40`}
                                onClick={() => updateActive(member.name)}
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover rounded-full transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110"
                                />
                                
                                {/* Timezone indicator */}
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                    {member.timezone}
                                </div>
                                
                                {/* Pulse effect */}
                                <div className="absolute inset-0 rounded-full border-2 border-blue-400 opacity-0 group-hover:opacity-100 animate-ping"></div>
                            </div>
                        );
                    })}
                </div>

                {/* Enhanced Mobile Version */}
                <div className="md:hidden w-full flex flex-col items-center">
                    <div className="flex justify-center gap-4 flex-wrap mb-8">
                        {team.map((member) => (
                            <div
                                key={member.name}
                                className={`relative w-20 h-20 rounded-full overflow-hidden border-3 transition-all cursor-pointer transform hover:scale-110 ${
                                    member.name === active.name 
                                        ? 'border-blue-500 shadow-lg scale-110' 
                                        : 'border-transparent grayscale hover:grayscale-0'
                                }`}
                                onClick={() => updateActive(member.name)}
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover rounded-full"
                                />
                                {member.name === active.name && (
                                    <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-pulse"></div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-br from-blue-100 to-white text-center p-6 rounded-2xl w-full max-w-md shadow-xl border border-blue-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{active.name}</h3>
                        <p className="text-blue-600 font-semibold text-lg mb-2">{active.role}</p>
                        <div className="text-gray-600 text-sm mb-3">🌍 Timezone: {active.timezone}</div>
                        <p className="text-gray-600 text-sm">{t('mobileNote')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}