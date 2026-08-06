import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

type HeroProps = {
  ready: boolean;
};

export function Hero({ ready }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  // Cookie banner state
  const [showCookieBanner, setShowCookieBanner] = useState(true);

  // Tagline state
  const [showTagline, setShowTagline] = useState(false);



  const handleAcceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setShowCookieBanner(false);
  };

  const handleDeclineCookies = () => {
    localStorage.setItem("cookie_consent", "declined");
    setShowCookieBanner(false);
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100dvh] items-end overflow-hidden bg-renaissance"
      aria-label="Hero"
    >
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
        {/* Mobile Background: Pristine Luxury Dark Canvas (Phone Only) */}
        <div className="block md:hidden absolute inset-0 overflow-hidden bg-[#070c16]">
          {/* Subtle Ambient Radial Glows */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.65, 0.4],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-blue-600/35 via-indigo-600/25 to-transparent blur-3xl pointer-events-none"
          />

          {/* Clean Subtle Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] opacity-50" />
        </div>

        {/* Desktop Video (Hidden on Phone) */}
        <motion.video
          src="/new hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="hidden md:block h-full w-full object-cover"
          initial={{ clipPath: "circle(0% at 50% 50%)", scale: 1.1, opacity: 0 }}
          animate={ready ? { clipPath: "circle(150% at 50% 50%)", scale: 1, opacity: 1 } : {}}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          onTimeUpdate={(e) => {
            const video = e.currentTarget;
            // Show after 3 seconds, and hide after 16 seconds
            if (video.currentTime >= 3 && video.currentTime < 16) {
              if (!showTagline) setShowTagline(true);
            } else {
              if (showTagline) setShowTagline(false);
            }
          }}
        />

        {/* Subtle Dark Overlay for contrast */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />

        {/* Tagline */}
        <AnimatePresence>
          {(showTagline || (typeof window !== "undefined" && window.innerWidth < 768)) && (
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-6 md:mt-0 text-center"
            >
              <h2 className="text-white font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight font-medium drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] leading-[1.15]">
                Where <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-100 to-purple-200">Creativity</span> Begins
              </h2>

              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent mt-5 md:hidden origin-center" 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Cookie Consent Banner */}
      <AnimatePresence>
        {showCookieBanner && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50 p-4 md:p-5 rounded-2xl bg-blue/80 backdrop-blur-md border border-white/10 text-white shadow-2xl pointer-events-auto"
          >
            <div className="flex flex-col gap-3">
              <div>
                <h3 className="text-base font-semibold tracking-wide">Cookie Preferences</h3>
                <p className="text-[11px] text-white/70 mt-1 leading-relaxed">
                  We use cookies to improve your browsing experience and analyze site traffic. By clicking &quot;Accept&quot;, you consent to our use of cookies.
                </p>
              </div>
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  onClick={handleDeclineCookies}
                  className="px-3 py-1.5 text-[11px] font-medium text-white/70 hover:text-white transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={handleAcceptCookies}
                  className="px-4 py-1.5 text-[11px] font-semibold text-black bg-white rounded-lg hover:bg-white/90 transition-all active:scale-95"
                >
                  Accept
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}