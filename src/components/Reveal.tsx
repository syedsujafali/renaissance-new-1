import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "../utils/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px -8% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration: 0.95,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealText({
  text,
  className,
  delay = 0,
  as = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const words = text.split(" ");
  const Tag = motion[as];

  return (
    <Tag ref={ref} className={cn("flex flex-wrap", className)} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="mr-[0.28em] inline-block overflow-hidden pb-1">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotate: 2 }}
            animate={inView ? { y: "0%", rotate: 0 } : { y: "110%", rotate: 2 }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function ClipImage({
  src,
  alt,
  className,
  imgClassName,
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="h-full w-full"
        initial={{ clipPath: "inset(12% 12% 12% 12%)", scale: 1.12 }}
        animate={
          inView
            ? { clipPath: "inset(0% 0% 0% 0%)", scale: 1 }
            : { clipPath: "inset(12% 12% 12% 12%)", scale: 1.12 }
        }
        transition={{ duration: 1.35, delay, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={cn("h-full w-full object-cover", imgClassName)}
          initial={{ scale: 1.15 }}
          animate={inView ? { scale: 1 } : { scale: 1.15 }}
          transition={{ duration: 1.6, delay: delay + 0.05, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </div>
  );
}
