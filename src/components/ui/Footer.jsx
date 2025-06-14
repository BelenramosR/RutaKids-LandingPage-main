import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation('footer');
  const currentYear = new Date().getFullYear();

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
      <motion.footer
          className="w-full bg-blue-50 py-12 px-6 md:px-20 text-gray-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
      >
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Marca */}
          <div>
            <h3 className="text-xl font-bold text-blue-800 mb-2">RUTAKIDS</h3>
            <p className="text-sm text-gray-600">
              {t('description')}
            </p>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">{t('contact')}</h4>
            <ul className="text-sm space-y-2">
              <li>
                <a
                    href="https://wa.me/51989028007"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-blue-700 transition flex items-center gap-2"
                >
                  <Icon icon="mdi:phone" className="text-blue-600" />
                  +51 989 028 007
                </a>
              </li>
              <li>
                <a
                    href="mailto:llantatech.pe@gmail.com"
                    className="hover:text-blue-700 transition flex items-center gap-2"
                >
                  <Icon icon="mdi:email-outline" className="text-blue-600" />
                  llantatech.pe@gmail.com
                </a>
              </li>
              <li>
                <a
                    href="https://calendar.google.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-blue-700 transition flex items-center gap-2"
                >
                  <Icon icon="mdi:calendar-clock" className="text-blue-600" />
                  Monday to Friday, 8:00 AM - 6:00 PM
                </a>
              </li>
            </ul>
          </div>

          {/* Ubicación + redes */}
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">{t('location')}</h4>
            <p className="text-sm mb-3">
              Prolongación Primavera 2390, Santiago de Surco, Lima
            </p>
            <div className="flex gap-4 mt-2">
              {[
                { icon: 'mdi:twitter', label: 'Twitter' },
                { icon: 'mdi:linkedin', label: 'LinkedIn' },
                { icon: 'mdi:youtube', label: 'YouTube' },
                { icon: 'mdi:github', label: 'GitHub' }
              ].map((item, idx) => (
                  <a
                      key={idx}
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center space-x-1 text-gray-600 hover:text-blue-700 transition"
                  >
                    <Icon icon={item.icon} className="text-xl" />
                    <span className="relative text-sm">
                  {item.label}
                      <span className="absolute bottom-0 left-0 h-[0.10em] w-0 rounded-full bg-blue-700 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </span>
                  </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright + back to top */}
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center border-t border-gray-300 pt-6 text-sm">
          <p className="text-gray-500">
            &copy; {currentYear} LlantaTech. {t('rights')}
          </p>
          <button
              onClick={toTop}
              className="flex items-center gap-2 mt-4 md:mt-0 text-blue-700 hover:text-blue-900 transition group"
          >
          <span className="font-semibold uppercase tracking-wide group-hover:underline">
            {t('back')}
          </span>
            <Icon
                icon="mdi:arrow-up-bold"
                className="text-lg group-hover:-translate-y-1 transition-transform duration-300"
            />
          </button>
        </div>
      </motion.footer>
  );
}
