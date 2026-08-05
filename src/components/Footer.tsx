import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BRAND, NAV_LINKS } from "../data/content";

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "0%"]);

  return (
    <footer
      ref={containerRef}
      className="relative w-full bg-renaissance-deep text-white flex flex-col justify-between px-6 py-8 md:px-16 md:py-8 lg:px-20 lg:py-10 overflow-hidden"
    >
      <div className="w-full max-w-[1920px] mx-auto flex flex-col flex-grow">
        
        {/* Top Row: Framed Info */}
        <div className="flex flex-col sm:flex-row justify-between items-start w-full gap-8 z-10">
          
          <div className="flex flex-col">
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.4em] text-white/40 mb-4">
              Navigate
            </span>
            <ul className="flex flex-col gap-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="font-sans text-sm md:text-base font-light text-white hover:text-white/60 transition-colors cursor-pointer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:items-end sm:text-right">
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.4em] text-white/40 mb-4">
              Inquiries
            </span>
            <ul className="flex flex-col gap-y-2 sm:items-end">
              <li>
                <a href="mailto:info@renaissanceevents.com" className="font-display text-lg sm:text-xl text-white hover:text-white/60 transition-colors cursor-pointer">
                  info@renaissanceevents.com
                </a>
              </li>
              <li>
                <a href="mailto:info@specialeventschannel.com" className="font-display text-lg sm:text-xl text-white hover:text-white/60 transition-colors cursor-pointer">
                  info@specialeventschannel.com
                </a>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Center: Unified Hero Logo Block with Lines */}
        <motion.div 
          style={{ y }}
          className="flex flex-col items-center justify-center flex-grow py-6 md:py-8 select-none z-0"
        >
          <div className="flex flex-col items-center w-full max-w-full">
            <div className="w-full h-[1px] bg-white/20 mb-4 md:mb-5" />
            
            <span className="font-display text-[9vw] md:text-[6.5vw] tracking-[0.12em] uppercase leading-none pl-[0.12em] text-white">
              RENAISSANCE
            </span>
            
            <div className="w-full h-[1px] bg-white/10 mt-4 md:mt-5 mb-4 md:mb-5" />
            
            <div className="flex flex-col items-center font-display text-[2.8vw] md:text-[1.2vw] tracking-[0.3em] uppercase leading-tight text-white/60">
              <span>MEETINGS</span>
              <span className="my-1 md:my-2">&</span>
              <span>SPECIAL EVENTS, INC.</span>
            </div>
            
            <div className="w-full h-[1px] bg-white/20 mt-4 md:mt-5" />
          </div>
        </motion.div>

        {/* Bottom Row: Framed Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center w-full z-10 gap-2 mt-6 border-t border-white/5 pt-4">
          <p className="font-sans text-[0.55rem] md:text-[0.6rem] uppercase tracking-[0.2em] text-white/30 text-center sm:text-left">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <a href="#" className="font-sans text-[0.55rem] md:text-[0.6rem] uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors">
            Privacy Policy
          </a>
        </div>

      </div>
    </footer>
  );
}
