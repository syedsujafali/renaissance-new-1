import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { IMAGES } from "../data/content";
import { Reveal } from "./Reveal";

export function Atmosphere() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.6]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-renaissance md:min-h-[85vh]"
      aria-label="Brand atmosphere"
    >
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <img
          src={IMAGES.atmosphere}
          alt="Lavish banquet with cherry blossom centerpieces"
          loading="lazy"
          className="h-full w-full object-cover opacity-60"
        />
      </motion.div>
      <div className="absolute inset-0 bg-renaissance/55" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center md:px-10"
      >
        <Reveal>
          <p className="mb-8 font-sans text-[0.7rem] uppercase tracking-[0.4em] text-white/55">
            The Renaissance Standard
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-display text-[clamp(2rem,5.5vw,4.2rem)] font-medium leading-[1.15] tracking-tight text-white text-balance">
            From the first sketch to the final standing ovation — every detail is intentional,
            every moment is designed to last.
          </p>
        </Reveal>
      </motion.div>
    </section>
  );
}
