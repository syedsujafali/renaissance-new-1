import { motion } from "framer-motion";
import { ReactNode, useEffect } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  useEffect(() => {
    // When the new page actually mounts (after the exit animation), force scroll to top
    window.scrollTo(0, 0);
    window.dispatchEvent(new CustomEvent("scroll-to-top"));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
