import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { PROJECTS, type Project } from "../data/content";

export function Portfolio() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  const openModal = (project: Project) => {
    setActiveProject(project);
    setActiveImageIndex(0);
  };

  return (
    <section id="portfolio" className="relative bg-[#FAFAFA] min-h-screen pb-24 md:pb-36" aria-labelledby="portfolio-heading">

      {/* Background Subtle Mesh Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px]" />

      {/* Editorial Header */}
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 pt-16 pb-20 md:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          <h1 id="portfolio-heading" className="relative font-display text-[clamp(3.5rem,8vw,7rem)] font-medium leading-[0.95] tracking-tight text-renaissance mb-12 flex items-center justify-center gap-6">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="hidden md:block w-12 lg:w-24 h-[2px] bg-gradient-to-l from-renaissance/50 to-transparent origin-right"
            />
            <span className="relative">
              Port<span className="font-light italic text-renaissance/70">folio</span>
              <motion.span
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.8, type: "spring" }}
                className="absolute -top-4 md:-top-6 -right-8 md:-right-12 text-3xl md:text-4xl text-renaissance/40"
              >
                ✦
              </motion.span>
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="hidden md:block w-12 lg:w-24 h-[2px] bg-gradient-to-r from-renaissance/50 to-transparent origin-left"
            />
          </h1>
        </motion.div>
      </div>

      {/* Asymmetric Editorial Flow */}
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14 flex flex-col gap-20 md:gap-28 lg:gap-32 py-10">
        {PROJECTS.map((project, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={project.id}
              className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-10 lg:gap-20`}
            >
              {/* Image Block */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full lg:w-[40%] relative group cursor-pointer"
                onClick={() => openModal(project)}
              >
                <div className="relative w-full aspect-[4/3] lg:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white text-renaissance font-sans text-[0.65rem] uppercase tracking-widest px-6 py-3 rounded-full font-semibold shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      View Project
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Text Block */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full lg:w-[55%] flex flex-col justify-center lg:px-8"
              >
                <div className="flex items-center gap-6 text-renaissance/40 font-sans text-xs uppercase tracking-widest font-semibold mb-6">
                  <span>{String(idx + 1).padStart(2, '0')}</span>
                  <span className="h-[1px] flex-1 bg-renaissance/10" />
                  <span>{project.year}</span>
                </div>

                <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl text-renaissance font-medium leading-[1.1] mb-6">
                  {project.title}
                </h2>

                <p className="font-sans text-base lg:text-lg text-renaissance/80 leading-relaxed font-normal mb-8 max-w-2xl">
                  {project.description}
                </p>

                <div className="flex flex-col gap-3 mb-10 border-l border-renaissance/10 pl-5">
                  <div>
                    <span className="block text-[0.65rem] uppercase tracking-widest font-sans text-renaissance/40 font-semibold">Location</span>
                    <span className="block font-sans text-sm text-renaissance">{project.location}</span>
                  </div>
                  <div>
                    <span className="block text-[0.65rem] uppercase tracking-widest font-sans text-renaissance/40 font-semibold">Scale</span>
                    <span className="block font-sans text-sm text-renaissance">{project.attendees}</span>
                  </div>
                </div>

                <button
                  onClick={() => openModal(project)}
                  className="group/btn flex items-center gap-4 w-fit"
                >
                  <span className="w-12 h-12 rounded-full border-2 border-renaissance/10 flex items-center justify-center group-hover/btn:bg-renaissance group-hover/btn:border-renaissance group-hover/btn:text-white transition-all duration-300">
                    →
                  </span>
                  <span className="font-sans text-[0.7rem] uppercase tracking-[0.2em] font-semibold text-renaissance/60 group-hover/btn:text-renaissance transition-colors">
                    Explore Details
                  </span>
                </button>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* KINETIC LUXURY TICKER AT BOTTOM */}
      <div className="mt-32 py-10 bg-renaissance text-white overflow-hidden border-y border-white/10 flex">
        <div className="flex space-x-12 animate-showcase-marquee whitespace-nowrap pr-12 min-w-max">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-12">
              {PROJECTS.map((project) => (
                <div key={project.id} className="flex items-center space-x-12">
                  <span className="font-display text-2xl md:text-3xl tracking-widest uppercase opacity-90 hover:opacity-100 transition-opacity cursor-default">{project.title}</span>
                  <span className="text-white/20 text-xl">•</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* QUICK VIEW CINEMA MODAL DRAWER */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-12">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-7xl max-h-[95vh] h-full overflow-hidden bg-[#FAFAFA] rounded-3xl shadow-2xl flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute z-20 top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-renaissance shadow-sm hover:bg-renaissance hover:text-white hover:scale-105 transition-all duration-300"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Left Column: Image Gallery (Takes up full height on desktop) */}
              <div className="w-full md:w-[60%] h-[35vh] sm:h-[45vh] md:h-full relative bg-gray-100 flex flex-col flex-shrink-0">
                <div className="flex-1 relative overflow-hidden">
                  <img
                    src={activeProject.images[activeImageIndex] || activeProject.image}
                    alt={activeProject.title}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                  />
                </div>

                {/* Thumbnails overlaid at bottom of image area */}
                {activeProject.images && activeProject.images.length > 1 && (
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                    <div className="bg-white/90 backdrop-blur-md p-2 rounded-2xl flex items-center gap-2 shadow-lg max-w-[90%] overflow-x-auto scrollbar-hide">
                      {activeProject.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative h-14 w-20 rounded-xl overflow-hidden transition-all flex-shrink-0 ${activeImageIndex === idx ? "ring-2 ring-renaissance scale-105 shadow-md" : "opacity-60 hover:opacity-100 hover:scale-105"
                            }`}
                        >
                          <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Info & Content */}
              <div className="w-full md:w-[40%] flex flex-col h-full overflow-y-auto bg-white">
                <div className="p-8 md:p-12 lg:p-16 flex flex-col flex-1 justify-center">

                  <div className="flex items-center gap-4 mb-6">
                    <span className="h-[1px] w-8 bg-renaissance/20" />
                    <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.3em] text-renaissance/50">
                      Project Details
                    </span>
                  </div>

                  <h2 className="font-display text-4xl lg:text-5xl font-medium text-renaissance leading-tight mb-8">
                    {activeProject.title}
                  </h2>

                  <p className="font-sans text-base lg:text-lg text-renaissance/80 leading-relaxed font-light mb-12">
                    {activeProject.description}
                  </p>

                  {/* Spec Matrix */}
                  <div className="grid grid-cols-2 gap-y-8 gap-x-4 mb-12">
                    <div>
                      <span className="block font-sans text-[0.65rem] uppercase tracking-widest text-renaissance/40 font-semibold mb-2">Location</span>
                      <span className="font-sans text-sm md:text-base font-medium text-renaissance">{activeProject.location}</span>
                    </div>
                    <div>
                      <span className="block font-sans text-[0.65rem] uppercase tracking-widest text-renaissance/40 font-semibold mb-2">Scale</span>
                      <span className="font-sans text-sm md:text-base font-medium text-renaissance">{activeProject.attendees}</span>
                    </div>
                    <div>
                      <span className="block font-sans text-[0.65rem] uppercase tracking-widest text-renaissance/40 font-semibold mb-2">Year</span>
                      <span className="font-sans text-sm md:text-base font-medium text-renaissance">{activeProject.year}</span>
                    </div>
                  </div>



                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center w-full py-4 lg:py-5 rounded-full bg-renaissance text-white font-sans text-[0.7rem] uppercase tracking-[0.25em] font-semibold hover:bg-renaissance/90 transition-colors shadow-lg hover:shadow-xl mt-auto"
                  >
                    Inquire About This Event →
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
