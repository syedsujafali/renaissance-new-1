import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SHOWCASE_ITEMS = [
  {
    title: "Executive Summits & Conferences",
    category: "Corporate Conferences",
    image: "/b1.jpeg",
    subtitle: "New York, NY",
  },
  {
    title: "Philanthropic Nights & Galas",
    category: "Fundraising & Galas",
    image: "/a3.JPEG",
    subtitle: "Pittsburgh, PA",
  },
];

export function Showcase() {
  return (
    <section id="showcase" className="relative bg-[#F8F9FA] py-16 sm:py-20 md:py-24 overflow-hidden border-b border-gray-200/60">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="font-sans text-[0.7rem] uppercase tracking-[0.35em] text-renaissance/50 font-semibold mb-2 block">
              Visual Chronicle
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-renaissance">
              Signature Event Highlights
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] font-semibold text-renaissance/70 hover:text-renaissance transition-colors"
            >
              Explore Full Gallery →
            </Link>
          </motion.div>
        </div>

        {/* 2-Image Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {SHOWCASE_ITEMS.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Image Box */}
              <div className="relative aspect-[16/9] max-h-[320px] w-full overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                <span className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-renaissance">
                  {item.category}
                </span>
              </div>

              {/* Card Footer */}
              <div className="p-5 flex flex-col justify-between bg-white flex-1 border-t border-gray-100">
                <h3 className="font-display text-lg font-medium text-renaissance group-hover:text-black transition-colors">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-renaissance/50 mt-1">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
