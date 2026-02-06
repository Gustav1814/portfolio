import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';

// Global lenis instance for external access
let lenisInstance = null;

export const getLenis = () => lenisInstance;

export const scrollTo = (target, options = {}) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: 0,
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      ...options,
    });
  } else {
    // Fallback for mobile - use native scroll
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

export default function useLenis() {
  const lenisRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile/touch device
    const checkMobile = () => {
      return window.innerWidth < 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };

    const mobile = checkMobile();
    setIsMobile(mobile);

    // Skip Lenis entirely on mobile for native smooth scroll
    if (mobile) {
      return;
    }

    // Initialize Lenis only on desktop
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    lenisInstance = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return lenisRef.current;
}
