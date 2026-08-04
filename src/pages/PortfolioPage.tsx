import { useEffect } from "react";
import { Footer } from "../components/Footer";
import { Portfolio } from "../components/Portfolio";

export function PortfolioPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main id="main" className="pt-28 md:pt-36 bg-white min-h-screen">
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}
