import { cn } from "../utils/cn";

type LogoProps = {
  className?: string;
  variant?: "full" | "mark";
  inverted?: boolean;
};

export function Logo({ className, variant = "full", inverted = false }: LogoProps) {
  const color = inverted ? "#ffffff" : "#0A1F44";

  return (
    <div
      className={cn("flex flex-col items-center justify-center select-none w-max", className)}
      aria-label="Renaissance Meetings & Special Events, Inc."
      style={{ color }}
    >
      <div className="w-full h-[2px] mb-1.5" style={{ backgroundColor: color }} />
      
      <span className="font-display text-xl sm:text-2xl tracking-[0.15em] uppercase leading-none pl-[0.15em]">
        RENAISSANCE
      </span>
      
      {variant === "full" && (
        <>
          <div className="w-full h-[1px] mt-1.5 mb-1.5" style={{ backgroundColor: color }} />
          <div className="flex flex-col items-center font-display text-[0.45rem] sm:text-[0.55rem] tracking-[0.2em] uppercase leading-tight">
            <span>MEETINGS</span>
            <span className="my-[1px]">&</span>
            <span>SPECIAL EVENTS, INC.</span>
          </div>
        </>
      )}
      
      <div className="w-full h-[2px] mt-1.5" style={{ backgroundColor: color }} />
    </div>
  );
}
