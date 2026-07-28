import { motion, useScroll, useTransform } from "framer-motion";
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

  const handleMobileLinkClick = (e: React.MouseEvent, id: string) => {
    // We let the native click propagate so useLenis can handle the smooth scroll
    unlockedRef.current = true;
    removeScrollLock();

    // After the smooth scroll completes (approx 1.6s), unmount this section
    setTimeout(() => {
      setHiddenAfterScroll(true);
      window.dispatchEvent(new CustomEvent("hero-removed"));
    }, 1600);
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
          src="/24-7-26.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="hidden md:block h-full w-full object-cover"
          initial={{ clipPath: "circle(0% at 50% 50%)", scale: 1.1, opacity: 0 }}
          animate={ready ? { clipPath: "circle(150% at 50% 50%)", scale: 1, opacity: 1 } : {}}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
        
        {/* Mobile Landing Links (Visible only on mobile) */}
        <div className="md:hidden absolute inset-0 flex flex-col justify-center px-6 pt-20">
          <div className="flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleMobileLinkClick(e, link.id)}
                className="font-display text-5xl sm:text-7xl font-medium tracking-tight text-white/60 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </motion.div>


    </section>
  );
}
