import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex h-[85vh] min-h-[520px] max-h-[960px] items-end overflow-hidden bg-renaissance"
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
        {/*
          The video has black bars baked in. We scale it up ~18% and center it
          so the bars are clipped by the overflow:hidden container.
        */}
        <motion.video
          src="/0811(2).mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="hidden md:block absolute inset-0 h-full w-full object-cover"
          style={{ transform: "scale(1.18)", transformOrigin: "center center" }}
          initial={{ clipPath: "circle(0% at 50% 50%)", opacity: 0 }}
          animate={ready ? { clipPath: "circle(150% at 50% 50%)", opacity: 1 } : {}}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />

        {/* Subtle Dark Overlay for contrast */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </motion.div>
    </section>
  );
}