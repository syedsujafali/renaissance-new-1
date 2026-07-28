import { motion, useScroll, useTransform, useMotionValue, animate } from "framer-motion";
import { useRef } from "react";
import { ABOUT_COPY } from "../data/content";
import { ClipImage } from "./Reveal";



function ScrollParagraph({ text, offsetStart = "90%", offsetEnd = "30%" }: { text: string, offsetStart?: string, offsetEnd?: string }) {
  const words = text.split(" ");
  return (
    <motion.p 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      transition={{ staggerChildren: 0.015 }}
      className="flex flex-wrap justify-center"
    >
      {words.map((word, i) => (
        <motion.span 
          key={i} 
          variants={{
            hidden: { opacity: 0, y: 20, rotateX: 20, scale: 0.95 },
            visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
          }}
          className="mr-[0.25em] inline-block origin-bottom"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

const ABOUT_IMAGES = [
  { src: "/a1.jpeg", alt: "Exquisite details" },
  { src: "/a3.JPEG", alt: "Elegant event space" },
  { src: "/a4.png", alt: "Cinematic atmosphere" }
];

// A highly unique scroll-driven reveal that opens from the center like a cinema window
function ScrollWindowReveal({ 
  src, alt, yTransform, className 
}: { 
  src: string, alt: string, yTransform: any, className: string 
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "center 60%"], // Starts when top hits bottom 95%, ends a bit past center
  });

  // The window starts small in the center and expands to the edges
  const clipPath = useTransform(scrollYProgress, [0, 1], ["inset(40% 20% 40% 20%)", "inset(0% 0% 0% 0%)"]);
  // The image scales down as the window opens, creating extreme depth
  const scale = useTransform(scrollYProgress, [0, 1], [1.6, 1]);

  return (
    <motion.div 
      style={{ y: yTransform }} 
      className={className}
    >
      <div ref={ref} className="w-full h-full overflow-hidden will-change-transform bg-gray-100">
        <motion.div style={{ clipPath }} className="w-full h-full will-change-transform">
          <motion.img 
            style={{ scale }}
            src={src} 
            alt={alt} 
            className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-110 will-change-transform" 
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

function CinematicImages() {
  const ref = useRef<HTMLDivElement>(null);
  
  // Overall scroll progress for container parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Unique parallax speeds for each pillar
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <div ref={ref} className="relative w-full bg-white px-6 md:px-10 lg:px-14 pb-10 md:pb-16 mt-10 md:mt-20 overflow-visible">
      <div className="mx-auto max-w-[1600px] grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 items-start">
        
        {/* Left Pillar */}
        <ScrollWindowReveal 
          src={ABOUT_IMAGES[0].src} 
          alt={ABOUT_IMAGES[0].alt} 
          yTransform={y1} 
          className="w-full aspect-[3/4] mt-4 md:mt-32 shadow-[0_20px_50px_rgba(10,31,68,0.08)] will-change-transform"
        />

        {/* Center Pillar */}
        <ScrollWindowReveal 
          src={ABOUT_IMAGES[1].src} 
          alt={ABOUT_IMAGES[1].alt} 
          yTransform={y2} 
          className="w-full aspect-[3/4] mt-4 md:mt-64 shadow-[0_30px_60px_rgba(10,31,68,0.12)] will-change-transform"
        />

        {/* Right Pillar */}
        <ScrollWindowReveal 
          src={ABOUT_IMAGES[2].src} 
          alt={ABOUT_IMAGES[2].alt} 
          yTransform={y3} 
          className="w-full aspect-[3/4] mt-4 md:-mt-10 shadow-[0_20px_50px_rgba(10,31,68,0.08)] will-change-transform"
        />

      </div>
    </div>
  );
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // For the image parallax
  const { scrollYProgress: parallaxProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const image1Y = useTransform(parallaxProgress, [0, 1], [50, -50]);
  const image2Y = useTransform(parallaxProgress, [0, 1], [120, -120]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-white pt-24 pb-12 md:pt-40 md:pb-16 lg:pt-52 lg:pb-20"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 [perspective:2000px]">
        <div className="mx-auto max-w-[1300px] text-center font-display text-[clamp(1.8rem,4vw,4.5rem)] font-medium leading-[1.2] tracking-tight text-renaissance">
          <ScrollParagraph text={ABOUT_COPY.body} offsetStart="95%" offsetEnd="35%" />
        </div>
        
        <div className="mx-auto mt-12 md:mt-16 max-w-[1100px] text-center font-display text-[clamp(1.4rem,3vw,2.5rem)] font-light leading-[1.3] text-renaissance/80">
          <ScrollParagraph text={ABOUT_COPY.body2} offsetStart="95%" offsetEnd="45%" />
        </div>
      </div>

      <CinematicImages />
    </section>
  );
}
