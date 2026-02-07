import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { LazyMotion, domAnimation, m, useScroll, useSpring } from 'framer-motion';
import ContourBackground from './components/ContourBackground';
import Footer from './components/Footer';
import { TRANSLATIONS } from './i18n';
import { Language, ContentData } from './types';

// 懒加载页面组件
const Home = React.lazy(() => import('./pages/Home'));
const BlogList = React.lazy(() => import('./pages/BlogList'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// 加载占位组件
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-2 border-black border-t-transparent rounded-full animate-spin" />
      <span className="font-mono text-sm text-gray-500">LOADING...</span>
    </div>
  </div>
);

// Layout component with shared UI elements
const MainLayout = ({ content, navLabels, scrollToSection }: { 
  content: ContentData['footer']; 
  navLabels: ContentData['nav']; 
  scrollToSection: (id: string) => void;
}) => {
  return (
    <>
      <ContourBackground />
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
      <Footer 
        content={content} 
        navLabels={navLabels} 
        scrollToSection={scrollToSection}
      />
    </>
  );
};

// 语言持久化 key
const LANG_STORAGE_KEY = 'eihr-lang';

// Wrapper to use Router hooks
const AppLayout = () => {
  const [lang, setLang] = useState<Language>(() => {
    // 从 localStorage 读取保存的语言设置
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    return (saved === 'en' || saved === 'zh') ? saved : 'zh';
  });
  const t = TRANSLATIONS[lang];
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Basic scroll function - 使用 useCallback 避免重复创建
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Smart navigation: If on another page, go home first
  const handleNavigation = useCallback((id: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { targetId: id } });
    } else {
      scrollToSection(id);
    }
  }, [location.pathname, navigate, scrollToSection]);

  // Handle cross-page scrolling and top scroll
  useEffect(() => {
    const state = location.state as { targetId?: string } | null;
    if (location.pathname === '/' && state?.targetId) {
      const targetId = state.targetId;
      // Small timeout to ensure DOM is ready
      const timer = setTimeout(() => {
        scrollToSection(targetId);
        // Clear state to prevent unwanted scrolling on reload
        window.history.replaceState({}, document.title); 
      }, 100);
      return () => clearTimeout(timer);
    } else {
        // Scroll to top on route change if not targeting a section
        window.scrollTo(0, 0);
    }
  }, [location, scrollToSection]);

  // 保存语言设置到 localStorage
  useEffect(() => {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-brand">
        <m.div
          className="fixed top-0 left-0 right-0 h-1 bg-brand z-50 origin-left print:hidden"
          style={{ scaleX }}
        />

        <Routes>
            <Route element={
                <>
                  <div className="print:hidden"><ContourBackground /></div>
                  <Suspense fallback={<div className="print:hidden"><PageLoader /></div>}>
                    <Outlet />
                  </Suspense>
                  <div className="print:hidden">
                    <Footer 
                        content={t.footer} 
                        navLabels={t.nav} 
                        scrollToSection={handleNavigation}
                    />
                  </div>
                </>
            }>
                <Route 
                  path="/" 
                  element={
                    <Home 
                      content={t} 
                      lang={lang}
                      setLang={setLang}
                      scrollToSection={scrollToSection} 
                    />
                  } 
                />
                <Route 
                  path="/blog" 
                  element={
                    <BlogList 
                      content={t.blog} 
                      navContent={t.nav}
                      lang={lang}
                      setLang={setLang}
                      scrollToSection={handleNavigation} 
                    />
                  } 
                />
                <Route 
                  path="/blog/:id" 
                  element={
                    <BlogPost content={t.blog} lang={lang} />
                  } 
                />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
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
