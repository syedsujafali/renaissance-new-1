import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NAV_LINKS } from "../data/content";
import { useScrollY } from "../hooks/useScrollProgress";
import { cn } from "../utils/cn";
import { Logo } from "./Logo";

type NavigationProps = {
  ready: boolean;
};

export function Navigation({ ready }: NavigationProps) {
  const y = useScrollY();
  const scrolled = y > 40;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [heroRemoved, setHeroRemoved] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onHeroRemoved = () => setHeroRemoved(true);
    const onHeroRestored = () => setHeroRemoved(false);
    window.addEventListener("hero-removed", onHeroRemoved);
    window.addEventListener("restore-hero", onHeroRestored);
    return () => {
      window.removeEventListener("hero-removed", onHeroRemoved);
      window.removeEventListener("restore-hero", onHeroRestored);
    };
  }, []);

  const effectivelyScrolled = scrolled || heroRemoved || location.pathname !== "/";

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === "/portfolio") {
        if (active !== "portfolio") setActive("portfolio");
        return;
      }
      if (location.pathname === "/about") {
        if (active !== "about") setActive("about");
        return;
      }
      if (location.pathname === "/contact") {
        if (active !== "contact") setActive("contact");
        return;
      }

      let currentActive = "home";
      for (const link of NAV_LINKS) {
        if (link.id === "portfolio" || link.id === "about" || link.id === "contact") continue;
        const el = document.getElementById(link.id);
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          // Check if the center of the viewport is within this section
          if (top <= window.innerHeight / 3 && bottom > window.innerHeight / 3) {
            currentActive = link.id;
          }
        }
      }
      
      if (currentActive !== active) {
        setActive(currentActive);
      }
    };

    // Run once on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [active, ready, location.pathname]);

  // Handle hash navigation when loading a new page
  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      setTimeout(() => {
        const id = location.hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
        }
      }, 100);
    } else if (location.pathname === "/" && !location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollTo = (id: string) => {
    setOpen(false);
    
    if (id === "portfolio") {
      if (location.pathname !== "/portfolio") {
         navigate("/portfolio");
      }
      setTimeout(() => window.scrollTo(0, 0), 10);
      return;
    }

    if (id === "about") {
      if (location.pathname !== "/about") {
         navigate("/about");
      }
      setTimeout(() => window.scrollTo(0, 0), 10);
      return;
    }

    if (id === "contact") {
      if (location.pathname !== "/contact") {
         navigate("/contact");
      }
      setTimeout(() => window.scrollTo(0, 0), 10);
      return;
    }

    if (location.pathname !== "/") {
      navigate(id === "home" ? "/" : `/#${id}`);
      return;
    }
    
    if (id === "home" && typeof window !== "undefined" && window.innerWidth < 768) {
      window.dispatchEvent(new CustomEvent("restore-hero"));
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 10);
      return;
    }

    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) {
        if (id === "home") window.scrollTo(0, 0);
        return;
      }
      const a = document.createElement("a");
      a.href = `#${id}`;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }, 10);
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }}
        transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700",
          effectivelyScrolled ? "bg-renaissance py-4 shadow-xl" : "bg-transparent py-6 md:py-10"
        )}
      >
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 lg:grid-cols-3 items-center px-6 md:px-10 lg:px-14">
          <div className="flex items-center justify-start">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("home");
              }}
              className="relative z-50 transition-transform duration-500 hover:scale-105"
              data-cursor="hover"
              aria-label="Renaissance home"
            >
              <Logo inverted={true} />
            </a>
          </div>

          {/* Nav Links (Appear on scroll) */}
          <div className="hidden lg:flex items-center justify-center">
            <AnimatePresence>
              {effectivelyScrolled && (
                <motion.nav
                  initial={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-8"
                >
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(link.id);
                      }}
                      className={cn(
                        "relative font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300",
                        active === link.id ? "text-white" : "text-white/60 hover:text-white"
                      )}
                      data-cursor="hover"
                    >
                      {link.label}
                      {active === link.id && (
                        <motion.span
                          layoutId="header-active-nav"
                          className="absolute -bottom-2 left-0 h-[2px] w-full bg-white"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </a>
                  ))}
                </motion.nav>
              )}
            </AnimatePresence>
          </div>

          {/* Big Menu Button */}
          <div
            className={cn(
              "flex items-center justify-end transition-all duration-500",
              effectivelyScrolled 
                ? "opacity-100 translate-y-0 lg:opacity-0 lg:pointer-events-none lg:-translate-y-4" 
                : "opacity-0 pointer-events-none -translate-y-4 lg:opacity-100 lg:pointer-events-auto lg:translate-y-0"
            )}
          >
            <button
              type="button"
              className="group flex items-center gap-4 rounded-full border border-white/20 bg-white/5 px-6 py-3 backdrop-blur-md transition-all duration-500 hover:scale-105 hover:bg-white hover:border-white"
              onClick={() => setOpen(true)}
              data-cursor="hover"
            >
              <span className="font-sans text-[0.7rem] font-bold uppercase tracking-[0.25em] text-white transition-colors duration-500 group-hover:text-renaissance">
                Menu
              </span>
              <div className="flex w-6 flex-col gap-1.5">
                <span className="block h-[2px] w-full bg-white transition-colors duration-500 group-hover:bg-renaissance" />
                <span className="block h-[2px] w-4 self-end bg-white transition-all duration-500 group-hover:w-full group-hover:bg-renaissance" />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full Screen Overlay Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col bg-renaissance px-6 pt-6 md:px-10 md:pt-10 lg:px-14 lg:pt-14"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Menu Header */}
            <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("home");
                }}
              >
                <Logo inverted={true} />
              </a>
              <button
                type="button"
                className="group flex items-center gap-4 rounded-full border border-white/20 bg-white/5 px-6 py-3 backdrop-blur-md transition-all duration-500 hover:scale-105 hover:bg-white hover:border-white"
                onClick={() => setOpen(false)}
                data-cursor="hover"
              >
                <span className="font-sans text-[0.7rem] font-bold uppercase tracking-[0.25em] text-white transition-colors duration-500 group-hover:text-renaissance">
                  Close
                </span>
                <div className="flex h-5 w-5 items-center justify-center relative">
                  <span className="absolute block h-[2px] w-full rotate-45 bg-white transition-colors duration-500 group-hover:bg-renaissance" />
                  <span className="absolute block h-[2px] w-full -rotate-45 bg-white transition-colors duration-500 group-hover:bg-renaissance" />
                </div>
              </button>
            </div>

            {/* Menu Links */}
            <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center gap-4 sm:gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.id);
                  }}
                  initial={{ opacity: 0, x: -40, rotate: -2 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.3 + 0.1 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "font-display text-5xl sm:text-7xl md:text-7xl lg:text-8xl font-medium tracking-tight transition-all duration-500",
                    active === link.id ? "text-white ml-4" : "text-white/40 hover:text-white/80 hover:ml-4"
                  )}
                  data-cursor="hover"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mx-auto w-full max-w-[1600px] pb-8 md:pb-12 font-sans text-xs uppercase tracking-[0.3em] text-white/40"
            >
              Premium Event Production
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

