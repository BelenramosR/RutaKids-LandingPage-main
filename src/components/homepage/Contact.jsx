import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import {
    FaBuilding, FaEnvelope, FaUser, FaPhoneAlt, FaGlobe, FaCar, FaMapMarkerAlt
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import departamentos from '../../data/departamentos.json';
import provincias from '../../data/provincias.json';
import distritos from '../../data/distritos.json';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const { t } = useTranslation('contact');
    const [formData, setFormData] = useState({
        school: '', name: '', position: '', email: '',
        vehicles: '', country: '', departamento: '', provincia: '', distrito: '', address: ''
    });

    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const formRef = useRef(null);
    const mapRef = useRef(null);
    const inputRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Set initial states
            gsap.set([titleRef.current, subtitleRef.current], {
                opacity: 0,
                y: 50
            });

            gsap.set(formRef.current, {
                opacity: 0,
                x: -50
            });

            gsap.set(mapRef.current, {
                opacity: 0,
                x: 50,
                scale: 0.95
            });

            gsap.set(inputRefs.current, {
                opacity: 0,
                y: 20
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
            .to(formRef.current, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.4")
            .to(mapRef.current, {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 1,
                ease: "back.out(1.7)"
            }, "-=0.6")
            .to(inputRefs.current, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out"
            }, "-=0.4");

            // Input focus animations
            inputRefs.current.forEach(input => {
                if (input) {
                    input.addEventListener('focus', () => {
                        gsap.to(input, {
                            scale: 1.02,
                            duration: 0.2,
                            ease: "power2.out"
                        });
                    });

                    input.addEventListener('blur', () => {
                        gsap.to(input, {
                            scale: 1,
                            duration: 0.2,
                            ease: "power2.out"
                        });
                    });
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'departamento' && { provincia: '', distrito: '' }),
            ...(name === 'provincia' && { distrito: '' }),
            ...(name === 'country' && value !== 'Perú' ? { departamento: '', provincia: '', distrito: '' } : {})
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();

        // Animate submit button
        const submitButton = e.target.querySelector('button[type="submit"]');
        gsap.to(submitButton, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.out"
        });

        const departamentoName = departamentos.find(dep => dep.id === formData.departamento)?.name || '';
        const provinciaName = provincias.find(prov => prov.id === formData.provincia)?.name || '';
        const distritoName = formData.distrito;

        emailjs.send('service_do1sq5q', 'template_m1hn9fg', {
            school: formData.school,
            name: formData.name,
            position: formData.position,
            email: formData.email,
            vehicles: formData.vehicles,
            country: formData.country,
            departamento: departamentoName,
            provincia: provinciaName,
            distrito: distritoName,
            address: formData.address,
        }, '8O_p0Laef3lHf_VNB')
            .then(() => {
                emailjs.send('service_do1sq5q', 'template_82sv3wp', {
                    name: formData.name,
                    email: formData.email,
                }, '8O_p0Laef3lHf_VNB');

                alert(t('success'));
            })
            .catch(() => {
                alert(t('error'));
            });
    };

    const provinciasFiltradas = provincias.filter(p => p.department_id === formData.departamento);
    const distritosFiltrados = distritos.filter(d => d.province_id === formData.provincia);

    const departamentoName = departamentos.find(dep => dep.id === formData.departamento)?.name || '';
    const provinciaName = provincias.find(prov => prov.id === formData.provincia)?.name || '';
    const distritoName = formData.distrito;
    const fullAddress = `${formData.address}, ${distritoName}, ${provinciaName}, ${departamentoName}, Perú`.replace(/\s/g, '+');

    const defaultMap =
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.118359642551!2d-76.96548062512989!3d-12.104048942969593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c70ab77498c1%3A0xcce9f50642e7c684!2sUniversidad%20Peruana%20de%20Ciencias%20Aplicadas!5e0!3m2!1ses-419!2spe!4v1743938800464!5m2!1ses-419!2spe';

    return (
        <section 
            ref={sectionRef}
            id="contactanos" 
            className="w-full min-h-screen bg-white py-24 px-6 md:px-20 flex flex-col justify-center items-center overflow-hidden"
        >
            <div className="max-w-screen-xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div ref={formRef} className="space-y-6">
                    <h2 ref={titleRef} className="text-4xl font-extrabold text-gray-900">
                        {t('title')}
                    </h2>
                    <p ref={subtitleRef} className="text-gray-700 text-sm">
                        {t('subtitle')}
                    </p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="relative">
                                <FaBuilding className="absolute top-3 left-3 text-gray-400"/>
                                <input 
                                    ref={el => inputRefs.current[0] = el}
                                    type="text" 
                                    name="school" 
                                    placeholder={t('form.school')} 
                                    value={formData.school} 
                                    onChange={handleChange} 
                                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-blue-500 focus:outline-none transition-all" 
                                    required 
                                />
                            </div>
                            <div className="relative">
                                <FaUser className="absolute top-3 left-3 text-gray-400"/>
                                <input 
                                    ref={el => inputRefs.current[1] = el}
                                    type="text" 
                                    name="name" 
                                    placeholder={t('form.name')} 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-blue-500 focus:outline-none transition-all" 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="relative">
                                <FaUser className="absolute top-3 left-3 text-gray-400"/>
                                <select 
                                    ref={el => inputRefs.current[2] = el}
                                    name="position" 
                                    value={formData.position} 
                                    onChange={handleChange} 
                                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-blue-500 focus:outline-none transition-all" 
                                    required
                                >
                                    <option value="">{t('form.position')}</option>
                                    <option>{t('form.roles.director')}</option>
                                    <option>{t('form.roles.coordinator')}</option>
                                    <option>{t('form.roles.transport')}</option>
                                    <option>{t('form.roles.admin')}</option>
                                    <option>{t('form.roles.other')}</option>
                                </select>
                            </div>
                            <div className="relative">
                                <FaEnvelope className="absolute top-3 left-3 text-gray-400"/>
                                <input 
                                    ref={el => inputRefs.current[3] = el}
                                    type="email" 
                                    name="email" 
                                    placeholder={t('form.email')} 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-blue-500 focus:outline-none transition-all" 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <FaCar className="absolute top-3 left-3 text-gray-400"/>
                            <input 
                                ref={el => inputRefs.current[4] = el}
                                type="number" 
                                name="vehicles" 
                                placeholder={t('form.vehicles')} 
                                value={formData.vehicles} 
                                onChange={handleChange} 
                                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-blue-500 focus:outline-none transition-all" 
                            />
                        </div>

                        <div className="relative">
                            <FaGlobe className="absolute top-3 left-3 text-gray-400"/>
                            <select 
                                ref={el => inputRefs.current[5] = el}
                                name="country" 
                                value={formData.country} 
                                onChange={handleChange} 
                                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-blue-500 focus:outline-none transition-all"
                            >
                                <option value="">{t('form.country')}</option>
                                <option>Perú</option>
                                <option>Argentina</option>
                                <option>Otro</option>
                            </select>
                        </div>

                        {formData.country === 'Perú' && (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <select 
                                        ref={el => inputRefs.current[6] = el}
                                        name="departamento" 
                                        value={formData.departamento} 
                                        onChange={handleChange} 
                                        className="w-full px-4 py-2 border rounded transition-all"
                                    >
                                        <option value="">{t('form.departamento')}</option>
                                        {departamentos.map(dep => (
                                            <option key={`dep-${dep.id}`} value={dep.id}>{dep.name}</option>
                                        ))}
                                    </select>
                                    <select 
                                        ref={el => inputRefs.current[7] = el}
                                        name="provincia" 
                                        value={formData.provincia} 
                                        onChange={handleChange} 
                                        disabled={!formData.departamento} 
                                        className="w-full px-4 py-2 border rounded transition-all"
                                    >
                                        <option value="">{t('form.provincia')}</option>
                                        {provinciasFiltradas.map(prov => (
                                            <option key={`prov-${prov.id}`} value={prov.id}>{prov.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <select 
                                        ref={el => inputRefs.current[8] = el}
                                        name="distrito" 
                                        value={formData.distrito} 
                                        onChange={handleChange} 
                                        disabled={!formData.provincia} 
                                        className="w-full px-4 py-2 border rounded transition-all"
                                    >
                                        <option value="">{t('form.distrito')}</option>
                                        {distritosFiltrados.map(dist => (
                                            <option key={`dist-${dist.id}`} value={dist.name}>{dist.name}</option>
                                        ))}
                                    </select>
                                    <input 
                                        ref={el => inputRefs.current[9] = el}
                                        type="text" 
                                        name="address" 
                                        placeholder={t('form.address')} 
                                        value={formData.address} 
                                        onChange={handleChange} 
                                        className="w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:outline-none transition-all" 
                                    />
                                </div>
                            </>
                        )}

                        <button 
                            type="submit" 
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105"
                        >
                            {t('form.submit')}
                        </button>
                    </form>
                </div>

                <div ref={mapRef} className="w-full max-w-full">
                    <div className="w-full h-[400px] sm:h-[450px] shadow-xl rounded-xl overflow-hidden border">
                        <iframe
                            src={formData.distrito ? `https://www.google.com/maps?q=${fullAddress}&output=embed` : defaultMap}
                            width="100%"
                            height="100%"
                            allowFullScreen
                            loading="lazy"
                            title="Mapa de ubicación"
                            style={{ border: 0 }}
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}