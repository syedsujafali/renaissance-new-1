import { motion } from "framer-motion";
import { ABOUT_COPY } from "../data/content";

function ScrollParagraph({ text, align = "center" }: { text: string, align?: "center" | "left" }) {
  const words = text.split(" ");
  return (
    <motion.p 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      transition={{ staggerChildren: 0.03 }}
      className={`flex flex-wrap ${align === "center" ? "justify-center" : "justify-start"}`}
    >
      {words.map((word, i) => (
        <motion.span 
          key={i} 
          variants={{
            hidden: { opacity: 0, y: 40, rotateX: -60, filter: "blur(12px)", scale: 0.8 },
            visible: { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)", scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
          }}
          className="mr-[0.25em] inline-block origin-bottom"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

export function About({ showImages = false }: { showImages?: boolean }) {
  return (
    <section
      id="about"
      className="relative bg-white pt-24 pb-12 md:pt-40 md:pb-16 lg:pt-52 lg:pb-20 overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Elegant Vertical Side Label */}
      <div className="absolute left-4 md:left-8 top-0 h-full w-12 hidden md:flex flex-col items-center justify-start pointer-events-none z-10">
        <div className="sticky top-1/2 -translate-y-1/2">
          <h2 
            id="about-heading"
            className="font-sans text-[0.75rem] font-bold uppercase tracking-[0.4em] text-renaissance/40 -rotate-90 whitespace-nowrap"
          >
            About Us
          </h2>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 [perspective:2000px]">
        <div className={`grid gap-16 lg:gap-20 ${showImages ? "lg:grid-cols-2 lg:items-center" : ""}`}>
          
          {/* Text Column */}
          <div className={`relative ${showImages ? "text-left" : "mx-auto text-center"} max-w-[1300px]`}>
            {/* Background Text aligned directly behind the text column */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                className={`font-display leading-none whitespace-nowrap select-none origin-center ${showImages ? "text-[22vh] md:text-[28vh] text-renaissance/[0.04] -rotate-90" : "text-[30vh] md:text-[45vh] text-renaissance/[0.07]"}`}
                aria-hidden="true"
              >
                ABOUT US
              </motion.div>
            </div>
            <div className="font-display text-[clamp(1.8rem,4vw,4.5rem)] font-medium leading-[1.2] tracking-tight text-renaissance">
              <ScrollParagraph text={ABOUT_COPY.body} align={showImages ? "left" : "center"} />
            </div>
            
            <div className={`mt-12 md:mt-16 font-display text-[clamp(1.4rem,3vw,2.5rem)] font-light leading-[1.3] text-renaissance/80 ${showImages ? "max-w-3xl" : "mx-auto max-w-[1100px]"}`}>
              <ScrollParagraph text={ABOUT_COPY.body2} align={showImages ? "left" : "center"} />
            </div>
          </div>

          {/* Images Column */}
          {showImages && (
            <div className="flex flex-col gap-10 lg:mt-0 mt-16 px-4 md:px-0">
              <motion.div 
                 initial={{ opacity: 0, x: 50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true, margin: "-10%" }}
                 transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                 className="aspect-[4/3] w-[90%] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
              >
                <img 
                  src="/a1.jpeg" 
                  alt="Event production" 
                  className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105" 
                />
              </motion.div>
              
              <motion.div 
                 initial={{ opacity: 0, x: 50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true, margin: "-10%" }}
                 transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                 className="aspect-[4/3] md:aspect-[16/9] w-[85%] ml-auto -mt-10 md:-mt-20 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-4 border-white relative z-10"
              >
                <img 
                  src="/a2.JPEG" 
                  alt="Premium events" 
                  className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105" 
                />
              </motion.div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
