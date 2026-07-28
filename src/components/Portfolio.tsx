import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CLIENTS, PROJECTS, type Project } from "../data/content";
import { Reveal, RevealText } from "./Reveal";

function StackedCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll from when this card hits the top of the screen,
  // until the user scrolls another 100vh (which is when the next card fully covers it).
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "start -100%"],
  });

  // Scale down and dim the card as the next one slides over it
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  // Track scroll for when this card is sliding INTO the viewport
  const { scrollYProgress: entranceProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"], 
  });

  // Extreme entrance effects for the Gallery Print
  const img1Scale = useTransform(entranceProgress, [0, 1], [1.2, 1]);
  const img1Rotate = useTransform(entranceProgress, [0, 1], [4, 0]);
  const img1Y = useTransform(entranceProgress, [0, 1], ["15%", "0%"]);

  return (
    <div 
      ref={ref} 
      className="sticky top-0 flex h-screen w-full items-center justify-start overflow-hidden bg-white border-t border-renaissance/10"
      style={{ zIndex: index }}
    >
      <motion.div 
        style={{ scale, opacity, y }} 
        className="relative flex h-full w-full flex-col-reverse md:flex-row items-center justify-between will-change-transform"
      >
        
        {/* Project Info Panel */}
        <div className="relative z-10 flex min-h-[55vh] flex-1 w-full flex-col justify-center bg-white px-6 py-10 md:h-full md:w-[45%] md:flex-none md:px-14 lg:px-20 md:py-0">
          <Reveal>
            <p className="mb-4 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-renaissance/45">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · {project.category}
            </p>
          </Reveal>
          <RevealText
            text={project.title}
            className="font-display text-[clamp(2.5rem,5vw,5.5rem)] font-medium leading-[1.05] tracking-tight text-renaissance"
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md font-sans text-base font-light leading-relaxed text-renaissance/60 md:mt-10 md:text-xl">
              {project.description}
            </p>
          </Reveal>
        </div>

        {/* BIG Project Imagery (Edge-to-Edge Bleed) */}
        <div className="relative h-[45vh] w-full md:absolute md:right-0 md:top-0 md:h-screen md:w-[55%] overflow-hidden bg-gray-100">
          
          {/* Main MASSIVE Image */}
          <motion.div 
            style={{ scale: img1Scale, y: img1Y }}
            className="h-full w-full will-change-transform"
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="h-full w-full object-cover transition-transform duration-[3s] hover:scale-105" 
            />
          </motion.div>

          {/* Vertical Separator Line */}
          <div className="absolute left-0 top-0 h-full w-[1px] bg-renaissance/10 hidden md:block" />
        </div>

      </motion.div>
    </div>
  );
}

export function Portfolio() {
  return (
    <section id="portfolio" className="relative bg-white" aria-labelledby="portfolio-heading">
      
      {/* Cinematic Intro */}
      <div className="relative z-0 mx-auto flex min-h-[40vh] max-w-[1600px] flex-col justify-center px-6 py-16 md:min-h-[50vh] md:px-10 lg:px-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="mb-6 font-sans text-[0.7rem] uppercase tracking-[0.3em] text-renaissance/50">
                Selected Portfolio
              </p>
            </Reveal>
            <RevealText
              as="h2"
              text="Experiences that define moments."
              className="font-display text-[clamp(3.5rem,7vw,7.5rem)] font-medium leading-[1.02] tracking-tight text-renaissance"
            />
          </div>
          <Reveal delay={0.2} className="flex items-end lg:col-span-4">
            <p className="font-sans text-lg font-light leading-relaxed text-renaissance/60 md:text-2xl">
              Each production is curated like a private exhibition — immersive environments,
              meticulous detail, and storytelling that resonates long after the final toast.
            </p>
          </Reveal>
        </div>
      </div>

      {/* The 3D Sticky Stacks */}
      <div className="relative w-full bg-white">
        {PROJECTS.map((project, index) => (
          <StackedCard 
            key={project.id} 
            project={project} 
            index={index} 
            total={PROJECTS.length} 
          />
        ))}
      </div>

      
    </section>
  );
}
