import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

type LoaderProps = {
  onComplete: () => void;
};

export function Loader({ onComplete }: LoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [showTagline, setShowTagline] = useState(false);
  const taglineWords = "Where Creativity Begins".split(" ");

  useEffect(() => {
    // 1. Show logo first (loads immediately via initial states)
    
    // 2. Show tagline after 600ms
    const taglineTimer = setTimeout(() => {
      setShowTagline(true);
    }, 600);

    // 3. Hide loader completely after 1.8 seconds (much faster)
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 1800);

    // 4. Notify parent that loader is done after exit animation finishes
    const notifyTimer = setTimeout(() => {
      onComplete();
    }, 2600);

    return () => {
      clearTimeout(taglineTimer);
      clearTimeout(completeTimer);
      clearTimeout(notifyTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1, y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} // Cinematic ease-in-out curve
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-renaissance"
        >
          {/* Centered Logo with Buttery Smooth Animation (No Blur) */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 2.8 }}
            animate={{ opacity: 1, y: 0, scale: 3 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14 will-change-transform"
          >
            <Logo inverted={true} />
          </motion.div>

          {/* Centered Tagline with Staggered Word Reveal */}
          <AnimatePresence>
            {showTagline && (
              <div className="overflow-hidden mt-12 flex justify-center space-x-3">
                {taglineWords.map((word, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: "0%" }}
                    exit={{ opacity: 0, y: "-100%" }}
                    transition={{ 
                      duration: 0.9, 
                      ease: [0.22, 1, 0.36, 1],
                      delay: index * 0.1 
                    }}
                    className="will-change-transform"
                  >
                    <h1 className="font-sans text-lg md:text-xl lg:text-2xl uppercase tracking-[0.3em] text-white/50">
                      {word}
                    </h1>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
