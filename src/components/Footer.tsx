import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { BRAND, NAV_LINKS } from "../data/content";

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour: "2-digit",
          minute: "2-digit",
        }) + " NYC"
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);

  return (
    <footer
      ref={containerRef}
      className="relative w-full bg-renaissance text-white overflow-hidden flex flex-col pt-16 md:pt-24 px-6 md:px-14 gap-24 md:gap-32"
    >

      {/* Top Section: Clean Editorial Links (Strictly White on Blue) */}
      <div className="relative z-20 grid grid-cols-2 md:grid-cols-4 gap-10 w-full max-w-[1600px] mx-auto">

        <div className="flex flex-col">
          <span className="font-sans text-[0.6rem] uppercase tracking-[0.4em] text-white/40 mb-4">Location</span>
          <p className="font-sans text-sm font-light leading-relaxed text-white max-w-[200px]">
            {BRAND.address}
          </p>
        </div>

        <div className="flex flex-col">
          <span className="font-sans text-[0.6rem] uppercase tracking-[0.4em] text-white/40 mb-4">Navigate</span>
          <ul className="space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="font-sans text-sm font-light text-white hover:opacity-50 transition-opacity cursor-pointer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <span className="font-sans text-[0.6rem] uppercase tracking-[0.4em] text-white/40 mb-4">Inquiries</span>
          <ul className="space-y-4">
            <li>
              <a href={`mailto:${BRAND.email}`} className="font-display text-xl md:text-2xl text-white hover:opacity-50 transition-opacity cursor-pointer block">
                {BRAND.email}
              </a>
            </li>
            <li>
              <a href="tel:+12125618955" className="font-display text-xl md:text-2xl text-white hover:opacity-50 transition-opacity cursor-pointer block">
                {BRAND.phone}
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-start md:items-end">
          <span className="font-sans text-[0.6rem] uppercase tracking-[0.4em] text-white/40 mb-4">Local Time</span>
          <p className="font-sans text-sm font-light tracking-widest text-white mb-8 tabular-nums">
            {time || "Loading..."}
          </p>

          <span className="font-sans text-[0.6rem] uppercase tracking-[0.4em] text-white/40 mb-4">Connect</span>
          <ul className="space-y-2 flex flex-col items-start md:items-end">
            <li>
              <a href="#" className="font-sans text-sm font-light uppercase tracking-widest text-white hover:opacity-50 cursor-pointer transition-opacity">Instagram</a>
            </li>
            <li>
              <a href="#" className="font-sans text-sm font-light uppercase tracking-widest text-white hover:opacity-50 cursor-pointer transition-opacity">LinkedIn</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Section: Huge Typography */}
      <div className="relative z-10 w-full flex justify-center items-center overflow-hidden pointer-events-none pb-4 md:pb-10">
        <motion.h1
          style={{ y }}
          className="text-[13vw] font-display font-medium text-white uppercase tracking-tight leading-none"
        >
          Renaissance
        </motion.h1>
      </div>

    </footer>
  );
}
