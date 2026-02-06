import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import useLenis from './hooks/useLenis';
import Preloader from './components/portfolio/Preloader';

// Lazy load the page not found component
const PageNotFound = lazy(() => import('./lib/PageNotFound'));

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

// Ultra-premium loading spinner
const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-black flex items-center justify-center">
    <div className="relative">
      {/* Outer glow ring */}
      <div className="absolute inset-[-8px] rounded-full bg-gradient-to-r from-amber-500/20 to-red-500/20 blur-xl animate-pulse" />
      {/* Main spinner */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-white/5" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber-500 animate-spin" />
        <div className="absolute inset-[4px] rounded-full border-2 border-transparent border-r-orange-500/70 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }} />
        <div className="absolute inset-[8px] rounded-full border-2 border-transparent border-b-red-500/50 animate-spin" style={{ animationDuration: '1.8s' }} />
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-red-500 animate-pulse" />
        </div>
      </div>
      {/* Loading text */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] text-white/30 uppercase">
        Loading
      </div>
    </div>
  </div>
);

// Scroll Progress Indicator Component
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #f59e0b, #ea580c, #ef4444)',
      }}
    />
  );
};

// Custom cursor component for desktop
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const updatePointer = () => {
      const hoveredEl = document.elementFromPoint(position.x, position.y);
      const isClickable = hoveredEl?.closest('a, button, [role="button"], input, textarea, [onclick]');
      setIsPointer(!!isClickable);
    };

    const hideOnLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', updatePointer);
    document.addEventListener('mouseleave', hideOnLeave);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updatePointer);
      document.removeEventListener('mouseleave', hideOnLeave);
    };
  }, [position.x, position.y]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-amber-500/30 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-amber-400 pointer-events-none z-[9999]"
        animate={{
          x: position.x - 3,
          y: position.y - 3,
          scale: isPointer ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 28 }}
      />
    </>
  );
};

// Main App with Lenis wrapper
function AppContent() {
  useLenis(); // Initialize smooth scroll
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <ScrollProgress />
      <CustomCursor />

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={
                <LayoutWrapper currentPageName={mainPageKey}>
                  <MainPage />
                </LayoutWrapper>
              } />
              {Object.entries(Pages).map(([path, Page]) => (
                <Route
                  key={path}
                  path={`/${path}`}
                  element={
                    <LayoutWrapper currentPageName={path}>
                      <Page />
                    </LayoutWrapper>
                  }
                />
              ))}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </motion.div>
      )}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <AppContent />
      </Router>
      <Toaster />
      <SpeedInsights />
    </QueryClientProvider>
  )
}

export default App
