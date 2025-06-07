import React, { Suspense } from 'react';
import { useInView } from 'react-intersection-observer';

import NavBar from './components/ui/NavBar';
import Footer from './components/ui/Footer';
import LanguageSwitcher from './components/ui/LanguageSwitcher';

const Hero = React.lazy(() => import('./components/homepage/Hero'));
const WhyRutaKids = React.lazy(() => import('./components/homepage/WhyRutaKids'));
const HowItWorks = React.lazy(() => import('./components/homepage/HowItWorks'));
const ForParents = React.lazy(() => import('./components/homepage/ForParents'));
const ForSchool = React.lazy(() => import('./components/homepage/ForSchool'));
const AboutUs = React.lazy(() => import('./components/homepage/AboutUs'));
const AboutTheProduct = React.lazy(() => import('./components/homepage/AboutTheProduct'));
const Contact = React.lazy(() => import('./components/homepage/Contact'));


const LazySection = ({ Component }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
    return (
        <div ref={ref}>
            {inView && (
                <Suspense fallback={<div style={{ height: '100vh' }}>Cargando...</div>}>
                    <Component />
                </Suspense>
            )}
        </div>
    );
};

const App = () => {
    return (
        <main>
            <NavBar />
            <Suspense fallback={<div style={{ height: '100vh' }}>Cargando...</div>}>
                <Hero />
            </Suspense>
            <LazySection Component={WhyRutaKids} />
            <LazySection Component={HowItWorks} />
            <LazySection Component={ForParents} />
            <LazySection Component={ForSchool} />
            <AboutUs />
            <LazySection Component={AboutTheProduct} />
            <LazySection Component={Contact} />
            <Footer />
            <LanguageSwitcher />
        </main>
    );
};

export default App;
