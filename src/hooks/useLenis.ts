import { useEffect } from "react";
import Lenis from "lenis";

export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.35,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.4,
      smoothWheel: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -20, duration: 1.6 });
    };

    document.addEventListener("click", onClick);

    const observer = new MutationObserver(() => {
      if (document.body.classList.contains("scroll-locked")) {
        lenis.stop();
      } else {
        lenis.start();
      }
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    if (document.body.classList.contains("scroll-locked")) {
      lenis.stop();
    }

    const onScrollTop = () => {
      lenis.scrollTo(0, { immediate: true });
    };
    window.addEventListener("scroll-to-top", onScrollTop);

    return () => {
      window.removeEventListener("scroll-to-top", onScrollTop);
      observer.disconnect();
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, [enabled]);
}
