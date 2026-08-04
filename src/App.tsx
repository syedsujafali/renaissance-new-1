import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { useLenis } from "./hooks/useLenis";
import { Home } from "./pages/Home";
import { PortfolioPage } from "./pages/PortfolioPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { CookieBanner } from "./components/CookieBanner";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "./components/PageTransition";

function AnimatedRoutes({ ready }: { ready: boolean }) {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home ready={ready} /></PageTransition>} />
        <Route path="/portfolio" element={<PageTransition><PortfolioPage /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [ready] = useState(true);

  useLenis(ready);

  return (
    <BrowserRouter>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10001] focus:bg-white focus:px-4 focus:py-2 focus:text-renaissance"
      >
        Skip to content
      </a>
      <Navigation ready={ready} />
      <AnimatedRoutes ready={ready} />
      <CookieBanner />
    </BrowserRouter>
  );
}

