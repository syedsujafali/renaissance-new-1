import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "../data/content";

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

  const unlockedRef = useRef(false);
  const [hiddenAfterScroll, setHiddenAfterScroll] = useState(false);

  // Cookie banner state
  const [showCookieBanner, setShowCookieBanner] = useState(true);

  // Tagline state
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {

    const preventScroll = (e: Event) => {
      if (typeof window !== "undefined" && window.innerWidth < 768 && !unlockedRef.current) {
        e.preventDefault();
      }
    };

    const checkInitialScrollLock = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 768 && !unlockedRef.current) {
          applyScrollLock();
        } else {
          removeScrollLock();
        }
      }
    };

    checkInitialScrollLock();
    window.addEventListener("resize", checkInitialScrollLock);
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("wheel", preventScroll, { passive: false });

    const onRestoreHero = () => {
      setHiddenAfterScroll(false);
      if (typeof window !== "undefined" && window.innerWidth < 768) {
        unlockedRef.current = false;
        applyScrollLock();
      }
    };
    window.addEventListener("restore-hero", onRestoreHero);

    return () => {
      window.removeEventListener("resize", checkInitialScrollLock);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("restore-hero", onRestoreHero);
      removeScrollLock();
    };
  }, []);

  const applyScrollLock = () => {
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.body.classList.add("scroll-locked");
  };

  const removeScrollLock = () => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
    document.body.classList.remove("scroll-locked");
  };

  const handleMobileLinkClick = () => {
    // We let the native click propagate so useLenis can handle the smooth scroll
    unlockedRef.current = true;
    removeScrollLock();

    // After the smooth scroll completes (approx 1.6s), unmount this section
    setTimeout(() => {
      setHiddenAfterScroll(true);
      window.dispatchEvent(new CustomEvent("hero-removed"));
    }, 1600);
  };

  const handleAcceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setShowCookieBanner(false);
  };

  const handleDeclineCookies = () => {
    localStorage.setItem("cookie_consent", "declined");
    setShowCookieBanner(false);
  };

  if (hiddenAfterScroll) {
    return null;
  }

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100dvh] items-end overflow-hidden bg-renaissance"
      aria-label="Hero"
    >
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
        <motion.video
          src="/new hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
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
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        {/* Tagline */}
        <AnimatePresence>
          {showTagline && (
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
            >
              <h2 className="text-white font-display text-5xl md:text-7xl lg:text-8xl tracking-tight font-medium text-center px-4 drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                where creativity begins
              </h2>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Landing Links (Visible only on mobile) */}
        <div className="md:hidden absolute inset-0 flex flex-col justify-center px-6 pt-20 z-20 pointer-events-auto">
          <div className="flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={handleMobileLinkClick}
                className="font-display text-5xl sm:text-7xl font-medium tracking-tight text-white/60 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
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