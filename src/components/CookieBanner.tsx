import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('renaissance-cookie-consent-v1');
    if (!consent) {
      // Very small delay to ensure it pops up immediately on refresh
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    localStorage.setItem('renaissance-cookie-consent-v1', accepted ? 'true' : 'false');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-6 right-6 md:left-8 md:right-auto md:w-[26rem] z-[9999]"
        >
          <div className="bg-renaissance-deep/95 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-2xl flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h4 className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white">
                Privacy Matters
              </h4>
            </div>
            
            <p className="font-sans text-xs text-white/60 leading-relaxed font-light">
              We use cookies to elevate your experience on our site, analyze site usage, and assist in our marketing efforts. By clicking Accept, you agree to our use of cookies.
            </p>
            
            <div className="flex items-center gap-3 mt-1">
              <button
                onClick={() => handleConsent(true)}
                className="px-6 py-2.5 bg-white text-renaissance-deep font-sans text-[0.65rem] uppercase tracking-widest font-semibold rounded-full hover:bg-white/90 transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={() => handleConsent(false)}
                className="px-6 py-2.5 border border-white/20 text-white font-sans text-[0.65rem] uppercase tracking-widest rounded-full hover:bg-white/10 transition-colors"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
