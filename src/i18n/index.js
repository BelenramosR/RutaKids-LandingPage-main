import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations by namespace

import enNavbar from './locals/en/navbar.json';
import enHero from './locals/en/hero.json';
import enWhyRutaKids from './locals/en/whyRutaKids.json';
import enHowItWorks from './locals/en/howItWorks.json';
import enForParents from './locals/en/forParents.json';
import enForSchool from './locals/en/forSchool.json';
import enAboutUs from './locals/en/aboutUs.json';
import enAboutTheProduct from './locals/en/aboutTheProduct.json';
import enContact from './locals/en/contact.json';
import enFooter from './locals/en/footer.json';

import esNavbar from './locals/es/navbar.json';
import esHero   from './locals/es/hero.json';
import esWhyRutaKids from './locals/es/whyRutaKids.json';
import esHowItWorks from './locals/es/howItWorks.json';
import esForParents from './locals/es/forParents.json';
import esForSchool from './locals/es/forSchool.json';
import esAboutUs from './locals/es/aboutUs.json';
import esAboutTheProduct from './locals/es/aboutTheProduct.json';
import esContact from './locals/es/contact.json';
import esFooter from './locals/es/footer.json';

i18n
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: true,
        ns: ['navbar', 'hero','whyRutaKids','footer', 'howItWorks', 'forParents', 'forSchool', 'aboutUs', 'aboutTheProduct', 'contact'],
        defaultNS: 'hero',
        resources: {
            en: {
                navbar: enNavbar,
                hero: enHero,
                whyRutaKids: enWhyRutaKids,
                howItWorks: enHowItWorks,
                forParents: enForParents,
                forSchool: enForSchool,
                aboutUs: enAboutUs,
                aboutTheProduct: enAboutTheProduct,
                contact: enContact,
                footer: enFooter,

            },
            es: {
                navbar: esNavbar,
                hero:esHero,
                whyRutaKids: esWhyRutaKids,
                howItWorks: esHowItWorks,
                forParents: esForParents,
                forSchool: esForSchool,
                aboutUs: esAboutUs,
                aboutTheProduct: esAboutTheProduct,
                contact: esContact,
                footer: esFooter,
            }
        },
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
