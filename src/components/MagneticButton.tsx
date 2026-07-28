import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "../utils/cn";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: "solid" | "outline" | "ghost";
  size?: "md" | "lg";
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
};

export function MagneticButton({
  children,
  className,
  variant = "solid",
  size = "md",
  href,
  type = "button",
  onClick,
  disabled,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.3 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.3 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    mx.set(dx * 0.22);
    my.set(dy * 0.22);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const base =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full font-sans font-light tracking-[0.18em] uppercase transition-colors duration-500";

  const sizes = {
    md: "px-8 py-3.5 text-[0.7rem]",
    lg: "px-10 py-4 text-[0.75rem]",
  };

  const variants = {
    solid: "bg-renaissance text-white hover:bg-renaissance-deep",
    outline:
      "border border-renaissance/30 text-renaissance hover:border-renaissance hover:bg-renaissance hover:text-white",
    ghost: "text-renaissance hover:text-renaissance-deep",
  };

  const classes = cn(base, sizes[size], variants[variant], className);

  const inner = (
    <span className="relative z-10 flex items-center gap-3">
      {children}
      <span
        aria-hidden
        className="inline-block transition-transform duration-500 group-hover:translate-x-1"
      >
        →
      </span>
    </span>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={classes}
        style={{ x, y }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onClick}
        data-cursor="hover"
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      className={classes}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      disabled={disabled}
      data-cursor="hover"
    >
      {inner}
    </motion.button>
  );
}
