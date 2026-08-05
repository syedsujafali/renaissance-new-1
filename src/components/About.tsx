import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ABOUT_COPY } from "../data/content";

function ScrollParagraph({ text, align = "center" }: { text: string, align?: "center" | "left" }) {
  const words = text.split(" ");
  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      transition={{ staggerChildren: 0.03 }}
      className={`block ${align === "center" ? "text-center" : "text-left"}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
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
      className="relative bg-white pt-16 pb-12 md:pt-24 md:pb-16 lg:pt-32 lg:pb-20 overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 [perspective:2000px]">
        
        {/* Single Container with Floated Image */}
        <div className="relative text-left w-full max-w-[1400px] mx-auto">
          
          {/* Floated Image(s) on the Right */}
          <div className={`float-right ml-4 sm:ml-6 lg:ml-8 ${showImages ? "mb-16 sm:mb-24 md:mb-36 lg:mb-48 mr-2 sm:mr-6 md:mr-10" : "mb-4"} w-[140px] xs:w-[180px] sm:w-[250px] md:w-[350px] lg:w-[450px] relative z-20 mt-2`}>
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
               className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative z-20"
            >
              <img 
                src="/n3.jpeg" 
                alt="Event production" 
                className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105" 
              />
            </motion.div>
            
            {showImages && (
              <motion.div 
                 initial={{ opacity: 0, scale: 0.95, y: 50 }}
                 whileInView={{ opacity: 1, scale: 1, y: 0 }}
                 viewport={{ once: true, margin: "-10%" }}
                 transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                 className="absolute -bottom-20 md:-bottom-28 lg:-bottom-40 -right-8 md:-right-16 lg:-right-24 w-[85%] aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border-4 md:border-[6px] border-white z-30"
              >
                <img 
                  src="/a2.JPEG" 
                  alt="Premium events" 
                  className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105" 
                />
              </motion.div>
            )}
          </div>

          {/* Background Text aligned directly behind the text column (Hidden on dedicated About Page) */}
          {!showImages && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                className="font-display leading-none whitespace-nowrap select-none origin-center text-[22vh] md:text-[28vh] text-renaissance/[0.04] -rotate-90 lg:rotate-0 lg:text-[40vh] lg:-translate-y-12"
                aria-hidden="true"
              >
                ABOUT US
              </motion.div>
            </div>
          )}
          
          {/* Text Content Wrapping the Image */}
          <div className="mb-8 md:mb-12 relative z-10">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-display text-2xl md:text-4xl text-renaissance font-black tracking-[0.2em] uppercase relative inline-block"
            >
              About Us
              <motion.span 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                className="absolute -bottom-3 md:-bottom-4 left-0 w-[120%] h-[3px] bg-gradient-to-r from-renaissance via-renaissance/70 to-transparent origin-left"
              ></motion.span>
            </motion.h2>
          </div>
          
          <div className={`font-display ${showImages ? "text-[clamp(1.4rem,2.5vw,3rem)]" : "text-[clamp(1.8rem,4vw,4.5rem)]"} font-medium leading-[1.2] tracking-tight text-renaissance pt-2 relative z-10`}>
            <ScrollParagraph text={ABOUT_COPY.body} align="left" />
          </div>
          
          <div className={`mt-12 md:mt-16 font-display ${showImages ? "text-[clamp(1.1rem,1.8vw,1.8rem)]" : "text-[clamp(1.4rem,3vw,2.5rem)]"} font-light leading-[1.3] text-renaissance/80 relative z-10`}>
            <ScrollParagraph text={ABOUT_COPY.body2} align="left" />
          </div>
          
          <div className="mt-12 md:mt-16 relative z-10">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-3 px-8 py-4 bg-renaissance text-white font-display text-lg tracking-wide rounded-full transition-transform hover:scale-105 shadow-xl"
            >
              See Our Work
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>
          
          {/* Clearfix just in case the image is taller than the text */}
          <div className="clear-both"></div>
        </div>
      </div>
    </section>
  );
}
