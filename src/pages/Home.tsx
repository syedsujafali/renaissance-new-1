import { About } from "../components/About";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";

type HomeProps = {
  ready: boolean;
};

export function Home({ ready }: HomeProps) {
  return (
    <>
      <main id="main">
        <Hero ready={ready} />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
