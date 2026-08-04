import { useEffect } from "react";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";

export function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main id="main" className="min-h-screen flex flex-col bg-renaissance pt-24 lg:pt-32">
        <div className="flex-1 flex flex-col justify-center">
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
