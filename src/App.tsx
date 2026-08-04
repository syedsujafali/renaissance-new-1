import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { useLenis } from "./hooks/useLenis";
import { Home } from "./pages/Home";
import { PortfolioPage } from "./pages/PortfolioPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { CookieBanner } from "./components/CookieBanner";

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
      <Routes>
        <Route path="/" element={<Home ready={ready} />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <CookieBanner />
    </BrowserRouter>
  );
}

