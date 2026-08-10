import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Clear legacy cookie flags from previous testing so banner shows up on reload
    localStorage.removeItem('cookie_consent');
    localStorage.removeItem('renaissance-cookie-consent-v1');

    const consent = localStorage.getItem('renaissance_cookie_consent_v2');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 300);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    localStorage.setItem('renaissance_cookie_consent_v2', accepted ? 'accepted' : 'declined');
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
          <div className="relative overflow-hidden bg-blue-950/75 backdrop-blur-2xl border border-blue-400/30 p-6 rounded-3xl shadow-[0_20px_60px_rgba(10,31,68,0.6)] flex flex-col gap-5 text-white">
            {/* Ambient Blue Glow */}
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-blue-500/20 blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3 relative z-10">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-blue-100">
                Privacy & Cookies
              </h4>
            </div>
            
            <p className="font-sans text-xs text-blue-100/80 leading-relaxed font-light relative z-10">
              We use cookies to elevate your experience on our site, analyze site usage, and assist in our marketing efforts. By clicking Accept, you agree to our use of cookies.
            </p>
            
            <div className="flex items-center gap-3 mt-1 relative z-10">
              <button
                onClick={() => handleConsent(true)}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-sans text-[0.65rem] uppercase tracking-widest font-semibold rounded-full shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
              >
                Accept All
              </button>
              <button
                onClick={() => handleConsent(false)}
                className="px-6 py-2.5 border border-blue-300/30 text-blue-100 hover:text-white font-sans text-[0.65rem] uppercase tracking-widest rounded-full hover:bg-blue-500/20 transition-all active:scale-95"
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
