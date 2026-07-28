import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { BRAND } from "../data/content";
import { MagneticButton } from "./MagneticButton";
import { Reveal, RevealText } from "./Reveal";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-renaissance text-white"
      aria-labelledby="contact-heading"
    >
      {/* Static Glow Effects (No continuous animations to prevent scroll lag) */}
      <div 
        className="absolute top-1/4 left-1/4 w-[800px] h-[800px] pointer-events-none rounded-full opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, rgba(96, 165, 250, 0) 70%)' }}
      />
      <div 
        className="absolute bottom-0 right-1/4 w-[1000px] h-[1000px] pointer-events-none rounded-full opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0) 70%)' }}
      />

      <div className="relative z-10 mx-auto grid max-w-[1600px] gap-16 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-12 lg:gap-10 lg:px-14 lg:py-40">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="mb-6 font-sans text-[0.7rem] uppercase tracking-[0.35em] text-white/50">
              Get in Touch
            </p>
          </Reveal>
          <RevealText
            as="h2"
            text="Let’s create something unforgettable"
            className="font-display text-[clamp(2.4rem,5vw,4.2rem)] font-medium leading-[1.05] tracking-tight text-white"
          />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md font-sans text-base font-light leading-relaxed text-white/70 md:text-lg">
              Share a glimpse of your vision. Our team will respond with care,
              clarity, and the craftsmanship your occasion deserves.
            </p>
          </Reveal>

          <div className="mt-14 space-y-8">
            <Reveal delay={0.25}>
              <p className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-white/40">
                Inquire
              </p>
              <a
                href={`mailto:${BRAND.email}`}
                className="mt-2 block font-display text-2xl text-white transition-opacity hover:opacity-70 md:text-3xl"
                data-cursor="hover"
              >
                {BRAND.email}
              </a>
            </Reveal>
            <Reveal delay={0.32}>
              <p className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-white/40">
                Call
              </p>
              <a
                href={`tel:+12125618955`}
                className="mt-2 block font-display text-2xl text-white transition-opacity hover:opacity-70 md:text-3xl"
                data-cursor="hover"
              >
                {BRAND.phone}
              </a>
            </Reveal>
            <Reveal delay={0.38}>
              <p className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-white/40">
                Studio
              </p>
              <p className="mt-2 max-w-xs font-sans text-base font-light leading-relaxed text-white/70">
                {BRAND.address}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal delay={0.15}>
            <div className="relative border border-white/5 bg-white/[0.04] p-8 md:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.2)] rounded-3xl">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8"
                    noValidate
                  >
                    <div className="grid gap-8 md:grid-cols-2">
                      <label className="block group">
                        <span className="font-sans text-[0.65rem] uppercase tracking-[0.28em] text-white/50 group-focus-within:text-white transition-colors">
                          Name
                        </span>
                        <input
                          required
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Your full name"
                          className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white placeholder-white/30 focus:border-white focus:outline-none focus:bg-white/5 transition-all duration-300 mt-2"
                        />
                      </label>
                      <label className="block group">
                        <span className="font-sans text-[0.65rem] uppercase tracking-[0.28em] text-white/50 group-focus-within:text-white transition-colors">
                          Email
                        </span>
                        <input
                          required
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@company.com"
                          className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white placeholder-white/30 focus:border-white focus:outline-none focus:bg-white/5 transition-all duration-300 mt-2"
                        />
                      </label>
                    </div>

                    <label className="block group">
                      <span className="font-sans text-[0.65rem] uppercase tracking-[0.28em] text-white/50 group-focus-within:text-white transition-colors">
                        Company / Organization
                      </span>
                      <input
                        name="company"
                        type="text"
                        autoComplete="organization"
                        placeholder="Optional"
                        className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white placeholder-white/30 focus:border-white focus:outline-none focus:bg-white/5 transition-all duration-300 mt-2"
                      />
                    </label>

                    <label className="block group">
                      <span className="font-sans text-[0.65rem] uppercase tracking-[0.28em] text-white/50 group-focus-within:text-white transition-colors">
                        How can we help?
                      </span>
                      <textarea
                        required
                        name="message"
                        placeholder="Tell us about your event, timeline, and aspirations..."
                        className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white placeholder-white/30 focus:border-white focus:outline-none focus:bg-white/5 transition-all duration-300 mt-2 min-h-[120px] resize-y"
                      />
                    </label>

                    <div className="flex flex-wrap items-center justify-between gap-6 pt-2">
                      <p className="max-w-xs font-sans text-xs font-light leading-relaxed text-white/40">
                        By submitting, you agree to be contacted regarding your inquiry.
                        We respect your privacy.
                      </p>
                      <MagneticButton 
                        type="submit" 
                        disabled={sending} 
                        size="lg" 
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white hover:text-renaissance hover:border-white"
                      >
                        {sending ? "Sending" : "Send Message"}
                      </MagneticButton>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="flex min-h-[420px] flex-col items-start justify-center"
                  >
                    <p className="font-sans text-[0.7rem] uppercase tracking-[0.35em] text-white/50">
                      Message received
                    </p>
                    <h3 className="mt-4 font-display text-4xl font-medium tracking-tight text-white md:text-5xl">
                      Thank you.
                    </h3>
                    <p className="mt-6 max-w-sm font-sans text-base font-light leading-relaxed text-white/70">
                      Your note is in good hands. A member of the Renaissance team
                      will be in touch shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-10 font-sans text-[0.7rem] uppercase tracking-[0.28em] text-white underline-offset-4 hover:underline"
                      data-cursor="hover"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
