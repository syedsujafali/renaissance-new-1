import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef, type MouseEvent } from "react";
import { PROJECTS, type Project } from "../data/content";

const CATEGORIES = ["ALL", "GALAS", "EXECUTIVE SUMMITS", "BRAND EXPERIENCES", "SPECIAL EVENTS"] as const;

export function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list" | "showcase">("grid");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Mouse tracking for floating preview in list mode
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220 };
  const previewX = useSpring(mouseX, springConfig);
  const previewY = useSpring(mouseY, springConfig);

  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Filter projects by category and search query
  const filteredProjects = PROJECTS.filter((p) => {
    const matchesCategory = selectedCategory === "ALL" || p.category.toUpperCase() === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const [isShowcasePaused, setIsShowcasePaused] = useState<boolean>(false);

  const openModal = (project: Project) => {
    setActiveProject(project);
    setActiveImageIndex(0);
  };

  return (
    <section id="portfolio" className="relative bg-[#FAFAFA] min-h-screen pb-24 md:pb-36" aria-labelledby="portfolio-heading">
      
      {/* Background Subtle Mesh Grid & Glow Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px]" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-renaissance/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* Editorial Header */}
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 pt-4 pb-10 md:px-10 lg:px-14">
        
        {/* Top Eyebrow & Headline */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-renaissance/10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[2px] w-6 bg-renaissance" />
              <span className="font-sans text-[0.68rem] uppercase tracking-[0.35em] text-renaissance/60 font-semibold">
                Curated Exhibition
              </span>
            </div>
            <h1 id="portfolio-heading" className="font-display text-[clamp(2.8rem,6vw,5.8rem)] font-medium leading-[1.02] tracking-tight text-renaissance">
              Selected Works
            </h1>
          </div>

          {/* Right Side Controls (Search + View Switcher) */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search works, cities, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-56 md:w-64 pl-9 pr-4 py-2.5 rounded-full bg-white border border-renaissance/15 font-sans text-xs text-renaissance placeholder:text-renaissance/40 focus:outline-none focus:border-renaissance focus:ring-1 focus:ring-renaissance transition-all shadow-sm"
              />
              <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-renaissance/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-renaissance/40 hover:text-renaissance"
                >
                  ✕
                </button>
              )}
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-renaissance/15 shadow-sm">
              <button
                onClick={() => setViewMode("grid")}
                title="Bento Grid"
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-sans text-[0.68rem] uppercase tracking-[0.2em] font-semibold transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-renaissance text-white shadow-md"
                    : "text-renaissance/60 hover:text-renaissance"
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Grid
              </button>
              <button
                onClick={() => setViewMode("showcase")}
                title="Exhibition Strip"
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-sans text-[0.68rem] uppercase tracking-[0.2em] font-semibold transition-all duration-300 ${
                  viewMode === "showcase"
                    ? "bg-renaissance text-white shadow-md"
                    : "text-renaissance/60 hover:text-renaissance"
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h18M3 16h18" />
                </svg>
                Showcase
              </button>
              <button
                onClick={() => setViewMode("list")}
                title="Index View"
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-sans text-[0.68rem] uppercase tracking-[0.2em] font-semibold transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-renaissance text-white shadow-md"
                    : "text-renaissance/60 hover:text-renaissance"
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Index
              </button>
            </div>
          </div>
        </div>

        {/* Filter Tabs & Counter */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-b border-renaissance/10">
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-4 py-2 rounded-full font-sans text-[0.65rem] uppercase tracking-[0.25em] font-semibold transition-all duration-300 ${
                    isActive
                      ? "text-white shadow-sm"
                      : "text-renaissance/60 hover:text-renaissance hover:bg-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="category-pill"
                      className="absolute inset-0 bg-renaissance rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>

          <div className="font-sans text-[0.68rem] uppercase tracking-[0.25em] text-renaissance/40 font-semibold">
            Showing {filteredProjects.length} of {PROJECTS.length} Works
          </div>
        </div>
      </div>

      {/* Main Content Showcase */}
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14">
        <AnimatePresence mode="wait">
          {viewMode === "grid" && (
            /* UNIQUE 3D TILT BENTO GRID WITH DUAL SMALL IMAGES */
            <motion.div
              key="grid-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {filteredProjects.map((project, idx) => (
                <Tilt3DCard
                  key={project.id}
                  project={project}
                  index={idx}
                  onClick={() => openModal(project)}
                />
              ))}
            </motion.div>
          )}

          {viewMode === "showcase" && (
            /* KINETIC EXHIBITION HORIZONTAL AUTO-SCROLLING SLIDER */
            <motion.div
              key="showcase-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="py-4 overflow-hidden relative"
              onMouseEnter={() => setIsShowcasePaused(true)}
              onMouseLeave={() => setIsShowcasePaused(false)}
            >
              {/* Pause / Auto-Scroll Badge Indicator */}
              <div className="mb-4 flex items-center justify-between text-xs font-sans text-renaissance/50">
                <span className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isShowcasePaused ? "bg-amber-500" : "bg-emerald-500 animate-pulse"}`} />
                  <span className="uppercase tracking-widest text-[0.65rem] font-semibold">
                    {isShowcasePaused ? "Auto-Scroll Paused (Hovering)" : "Continuous Auto-Scroll Active"}
                  </span>
                </span>
                <span className="hidden sm:block text-[0.65rem] uppercase tracking-widest text-renaissance/40">
                  Hover card to pause · Click card for details
                </span>
              </div>

              <div className="w-full overflow-hidden">
                <div
                  className="flex gap-6 w-max animate-showcase-marquee"
                  style={{ animationPlayState: isShowcasePaused ? "paused" : "running" }}
                >
                  {[...filteredProjects, ...filteredProjects].map((project, idx) => (
                    <ShowcaseRailCard
                      key={`${project.id}-${idx}`}
                      project={project}
                      onClick={() => openModal(project)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {viewMode === "list" && (
            /* EDITORIAL INDEX VIEW WITH MOUSE FOLLOWER PREVIEW */
            <motion.div
              key="list-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative"
              onMouseMove={handleMouseMove}
            >
              <div className="divide-y divide-renaissance/10 border-b border-renaissance/10">
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    onMouseEnter={() => setHoveredProject(project)}
                    onMouseLeave={() => setHoveredProject(null)}
                    onClick={() => openModal(project)}
                    className="group flex flex-col md:flex-row md:items-center justify-between py-6 px-4 cursor-pointer transition-colors duration-300 hover:bg-white hover:shadow-md rounded-2xl"
                  >
                    <div className="flex items-center gap-6">
                      <span className="font-sans text-xs font-bold text-renaissance/30 group-hover:text-renaissance transition-colors">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-display text-2xl md:text-3xl font-medium text-renaissance group-hover:translate-x-2 transition-transform duration-300">
                          {project.title}
                        </h3>
                        <p className="font-sans text-xs text-renaissance/50 mt-1 md:hidden">
                          {project.category} · {project.location}
                        </p>
                      </div>
                    </div>

                    <div className="hidden md:flex items-center gap-10 text-right">
                      <span className="font-sans text-[0.68rem] uppercase tracking-[0.25em] text-renaissance/50">
                        {project.category}
                      </span>
                      <span className="font-sans text-xs text-renaissance/40 font-light w-28">
                        {project.location}
                      </span>
                      <span className="font-sans text-xs font-semibold text-renaissance/70 border border-renaissance/15 px-3 py-1 rounded-full bg-white">
                        {project.year}
                      </span>
                      <div className="w-8 h-8 rounded-full border border-renaissance/20 flex items-center justify-center group-hover:bg-renaissance group-hover:border-renaissance group-hover:text-white transition-all duration-300">
                        →
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Floating Mini Image Preview Follower */}
              <AnimatePresence>
                {hoveredProject && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      x: previewX,
                      y: previewY,
                      translateX: "-50%",
                      translateY: "-115%",
                      pointerEvents: "none",
                      zIndex: 40,
                    }}
                    className="hidden lg:block w-60 h-40 rounded-2xl overflow-hidden shadow-2xl border-2 border-white bg-white"
                  >
                    <img
                      src={hoveredProject.image}
                      alt={hoveredProject.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                      <div>
                        <span className="block text-[0.65rem] font-sans uppercase tracking-widest text-white/70">
                          {hoveredProject.category}
                        </span>
                        <span className="text-xs font-display text-white font-medium">
                          {hoveredProject.title}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* KINETIC LUXURY TICKER AT BOTTOM */}
      <div className="mt-24 py-8 bg-renaissance text-white overflow-hidden border-y border-white/10 flex">
        <div className="flex space-x-12 animate-showcase-marquee whitespace-nowrap pr-12 min-w-max">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-12">
              {PROJECTS.map((project) => (
                <div key={project.id} className="flex items-center space-x-12">
                  <span className="font-display text-lg tracking-widest uppercase">{project.title}</span>
                  <span className="text-white/30">•</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* QUICK VIEW CINEMA MODAL DRAWER */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 25 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl p-6 md:p-10 shadow-2xl border border-white/20"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-renaissance hover:bg-renaissance hover:text-white transition-colors"
                aria-label="Close"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Image Gallery Column (Small Display Frame + Thumbnails) */}
                <div className="md:col-span-7 flex flex-col gap-4">
                  <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-100 shadow-md border border-renaissance/10">
                    <img
                      src={activeProject.images[activeImageIndex] || activeProject.image}
                      alt={activeProject.title}
                      className="w-full h-full object-cover transition-all duration-500"
                    />
                  </div>

                  {/* Thumbnail Selector */}
                  {activeProject.images && activeProject.images.length > 1 && (
                    <div className="flex items-center gap-3 overflow-x-auto pb-2">
                      {activeProject.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative h-16 w-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                            activeImageIndex === idx ? "border-renaissance scale-105 shadow-md" : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Info Column */}
                <div className="md:col-span-5 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-renaissance/5 text-renaissance font-sans text-[0.65rem] font-semibold uppercase tracking-[0.25em] mb-3 border border-renaissance/10">
                      {activeProject.category}
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl font-medium text-renaissance leading-tight">
                      {activeProject.title}
                    </h2>
                    <p className="font-sans text-xs md:text-sm text-renaissance/70 leading-relaxed mt-4">
                      {activeProject.description}
                    </p>
                  </div>

                  {/* Spec Matrix */}
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-renaissance/10">
                    <div>
                      <span className="block font-sans text-[0.65rem] uppercase tracking-widest text-renaissance/40 font-semibold">Location</span>
                      <span className="font-sans text-xs md:text-sm font-medium text-renaissance mt-0.5 block">{activeProject.location}</span>
                    </div>
                    <div>
                      <span className="block font-sans text-[0.65rem] uppercase tracking-widest text-renaissance/40 font-semibold">Scale</span>
                      <span className="font-sans text-xs md:text-sm font-medium text-renaissance mt-0.5 block">{activeProject.attendees}</span>
                    </div>
                    <div>
                      <span className="block font-sans text-[0.65rem] uppercase tracking-widest text-renaissance/40 font-semibold">Year</span>
                      <span className="font-sans text-xs md:text-sm font-medium text-renaissance mt-0.5 block">{activeProject.year}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tags.map((tag) => (
                      <span key={tag} className="text-[0.65rem] font-sans bg-gray-100 text-renaissance/70 px-2.5 py-1 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center w-full py-3.5 rounded-full bg-renaissance text-white font-sans text-xs uppercase tracking-[0.25em] font-semibold hover:bg-renaissance/90 transition-colors shadow-lg"
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

/* 3D TILT CARD COMPONENT WITH SMALL DUAL FRAMED IMAGES */
function Tilt3DCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [6, -6]);
  const rotateY = useTransform(x, [-100, 100], [-6, 6]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative flex flex-col justify-between bg-white border border-renaissance/12 rounded-3xl p-5 shadow-sm hover:shadow-2xl hover:border-renaissance/30 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Dual Small Image Frame Container */}
      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-100">
        {/* Main Primary Image */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />



        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[0.65rem] font-sans uppercase tracking-widest text-renaissance font-semibold shadow-sm">
          {project.category}
        </div>
      </div>

      {/* Card Metadata */}
      <div className="pt-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between text-[0.7rem] text-renaissance/40 font-sans mb-1 font-medium">
            <span>{project.location}</span>
            <span>{project.year}</span>
          </div>
          <h3 className="font-display text-2xl font-medium text-renaissance group-hover:text-renaissance/80 transition-colors">
            {project.title}
          </h3>
          <p className="font-sans text-xs text-renaissance/60 line-clamp-2 mt-2 font-light leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Card Footer Tag & Arrow */}
        <div className="mt-5 pt-4 border-t border-renaissance/10 flex items-center justify-between">
          <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] font-semibold text-renaissance/50 group-hover:text-renaissance transition-colors">
            Explore Work
          </span>
          <span className="w-7 h-7 rounded-full bg-renaissance/5 group-hover:bg-renaissance group-hover:text-white flex items-center justify-center text-xs transition-all duration-300">
            →
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* EXHIBITION RAIL HORIZONTAL CARD */
function ShowcaseRailCard({ project, onClick }: { project: Project; index?: number; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group relative w-80 md:w-96 flex flex-col bg-white border border-renaissance/12 rounded-3xl p-5 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer flex-shrink-0"
    >
      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gray-100">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[0.65rem] font-sans uppercase tracking-widest text-renaissance font-semibold">
          {project.category}
        </div>
      </div>

      <div className="pt-4 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between text-xs text-renaissance/40 font-sans mb-1">
            <span>{project.location}</span>
            <span>{project.year}</span>
          </div>
          <h3 className="font-display text-xl font-medium text-renaissance">
            {project.title}
          </h3>
        </div>
        <div className="mt-4 pt-3 border-t border-renaissance/10 flex items-center justify-between">
          <span className="font-sans text-[0.65rem] uppercase tracking-widest font-semibold text-renaissance/50 group-hover:text-renaissance">
            Inspect Project
          </span>
          <span className="text-xs">→</span>
        </div>
      </div>
    </div>
  );
}
