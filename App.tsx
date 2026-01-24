import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { LazyMotion, domAnimation, m, useScroll, useSpring } from 'framer-motion';
import ContourBackground from './components/ContourBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import { TRANSLATIONS } from './i18n';
import { Language } from './types';

// Wrapper to use Router hooks
const AppLayout = () => {
  const [lang, setLang] = useState<Language>('zh');
  const t = TRANSLATIONS[lang];
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Basic scroll function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Smart navigation: If on another page, go home first
  const handleNavigation = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { targetId: id } });
    } else {
      scrollToSection(id);
    }
  };

  // Handle cross-page scrolling and top scroll
  useEffect(() => {
    if (location.pathname === '/' && location.state && (location.state as any).targetId) {
      const targetId = (location.state as any).targetId;
      // Small timeout to ensure DOM is ready
      setTimeout(() => {
        scrollToSection(targetId);
        // Clear state to prevent unwanted scrolling on reload
        window.history.replaceState({}, document.title); 
      }, 100);
    } else {
        // Scroll to top on route change if not targeting a section
        window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-brand">
        <m.div
          className="fixed top-0 left-0 right-0 h-1 bg-brand z-50 origin-left"
          style={{ scaleX }}
        />
        <ContourBackground />

        <Navbar 
          lang={lang} 
          setLang={setLang} 
          content={t.nav} 
          scrollToSection={handleNavigation} 
        />

        <Routes>
            <Route path="/" element={<Home content={t} scrollToSection={scrollToSection} />} />
            <Route path="/blog" element={<BlogList content={t.blog} />} />
        </Routes>

        <Footer 
          content={t.footer} 
          navLabels={t.nav}
          scrollToSection={handleNavigation}
        />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
        <LazyMotion features={domAnimation}>
            <AppLayout />
        </LazyMotion>
    </BrowserRouter>
  );
}

export default App;