import { useState } from "react";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navigation } from "./components/Navigation";
import { Portfolio } from "./components/Portfolio";
import { useLenis } from "./hooks/useLenis";

export default function App() {
  const [ready, setReady] = useState(true);

  useLenis(ready);

  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10001] focus:bg-white focus:px-4 focus:py-2 focus:text-renaissance"
      >
        Skip to content
      </a>
      <Navigation ready={ready} />
      <main id="main">
        <Hero ready={ready} />
        <About />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
