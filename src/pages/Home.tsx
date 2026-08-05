import { About } from "../components/About";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Showcase } from "../components/Showcase";

type HomeProps = {
  ready: boolean;
};

export function Home({ ready }: HomeProps) {
  return (
    <>
      <main id="main">
        <Hero ready={ready} />
        <Showcase />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
