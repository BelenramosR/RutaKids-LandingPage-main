import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
    FaBuilding, FaEnvelope, FaUser, FaPhoneAlt, FaGlobe, FaCar, FaMapMarkerAlt
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import departamentos from '../../data/departamentos.json';
import provincias from '../../data/provincias.json';
import distritos from '../../data/distritos.json';

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: 'easeOut',
            delay
        }
    })
};

export default function Contact() {
    const { t } = useTranslation('contact');
    const [formData, setFormData] = useState({
        school: '', name: '', position: '', email: '',
        vehicles: '', country: '', departamento: '', provincia: '', distrito: '', address: ''
    });

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
        <section id="contactanos" className="w-full min-h-screen bg-white py-24 px-6 md:px-20 flex flex-col justify-center items-center overflow-hidden">
            <div className="max-w-screen-xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <motion.div className="space-y-6" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={fadeInUp}>
                    <motion.h2 className="text-4xl font-extrabold text-gray-900" variants={fadeInUp} custom={0}>
                        {t('title')}
                    </motion.h2>
                    <motion.p className="text-gray-700 text-sm" variants={fadeInUp} custom={0.1}>
                        {t('subtitle')}
                    </motion.p>

                    <motion.form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="relative">
                                <FaBuilding className="absolute top-3 left-3 text-gray-400"/>
                                <input type="text" name="school" placeholder={t('form.school')} value={formData.school} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-blue-500 focus:outline-none" required />
                            </div>
                            <div className="relative">
                                <FaUser className="absolute top-3 left-3 text-gray-400"/>
                                <input type="text" name="name" placeholder={t('form.name')} value={formData.name} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-blue-500 focus:outline-none" required />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="relative">
                                <FaUser className="absolute top-3 left-3 text-gray-400"/>
                                <select name="position" value={formData.position} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-blue-500 focus:outline-none" required>
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
                                <input type="email" name="email" placeholder={t('form.email')} value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-blue-500 focus:outline-none" required />
                            </div>
                        </div>

                        <div className="relative">
                            <FaCar className="absolute top-3 left-3 text-gray-400"/>
                            <input type="number" name="vehicles" placeholder={t('form.vehicles')} value={formData.vehicles} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-blue-500 focus:outline-none" />
                        </div>

                        <div className="relative">
                            <FaGlobe className="absolute top-3 left-3 text-gray-400"/>
                            <select name="country" value={formData.country} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-blue-500 focus:outline-none">
                                <option value="">{t('form.country')}</option>
                                <option>Perú</option>
                                <option>Argentina</option>
                                <option>Otro</option>
                            </select>
                        </div>

                        {formData.country === 'Perú' && (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <select name="departamento" value={formData.departamento} onChange={handleChange} className="w-full px-4 py-2 border rounded">
                                        <option value="">{t('form.departamento')}</option>
                                        {departamentos.map(dep => (
                                            <option key={`dep-${dep.id}`} value={dep.id}>{dep.name}</option>
                                        ))}
                                    </select>
                                    <select name="provincia" value={formData.provincia} onChange={handleChange} disabled={!formData.departamento} className="w-full px-4 py-2 border rounded">
                                        <option value="">{t('form.provincia')}</option>
                                        {provinciasFiltradas.map(prov => (
                                            <option key={`prov-${prov.id}`} value={prov.id}>{prov.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <select name="distrito" value={formData.distrito} onChange={handleChange} disabled={!formData.provincia} className="w-full px-4 py-2 border rounded">
                                        <option value="">{t('form.distrito')}</option>
                                        {distritosFiltrados.map(dist => (
                                            <option key={`dist-${dist.id}`} value={dist.name}>{dist.name}</option>
                                        ))}
                                    </select>
                                    <input type="text" name="address" placeholder={t('form.address')} value={formData.address} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:outline-none" />
                                </div>
                            </>
                        )}

                        <motion.button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all" variants={fadeInUp} custom={0.45}>
                            {t('form.submit')}
                        </motion.button>
                    </motion.form>
                </motion.div>

                <motion.div className="w-full max-w-full" initial={{opacity: 0, x: 40}} whileInView={{opacity: 1, x: 0}} transition={{duration: 0.8, delay: 0.3}} viewport={{once: false, amount: 0.3}}>
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
                </motion.div>
            </div>
        </section>
    );
}
