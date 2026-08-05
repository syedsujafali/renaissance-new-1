import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
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
            <p className="mb-6 font-sans text-[0.75rem] uppercase tracking-[0.35em] text-white/80 font-semibold">
              Get in Touch
            </p>
          </Reveal>
          <RevealText
            as="h2"
            text="Let’s create something unforgettable"
            className="font-display text-[clamp(2.4rem,5vw,4.2rem)] font-medium leading-[1.05] tracking-tight text-white"
          />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md font-sans text-base font-light leading-relaxed text-white/90 md:text-lg">
              Share a glimpse of your vision. Our team will respond with care,
              clarity, and the craftsmanship your occasion deserves.
            </p>
          </Reveal>

          <div className="mt-14 space-y-8">
            <Reveal delay={0.25}>
              <p className="font-sans text-[0.7rem] uppercase tracking-[0.3em] text-white/70 font-semibold">
                Inquire
              </p>
              <div className="space-y-4 mt-2">
                <a
                  href="mailto:info@renaissanceevents.com"
                  className="block font-display text-lg sm:text-xl md:text-[1.35rem] lg:text-3xl text-white transition-opacity hover:opacity-75 break-words"
                  data-cursor="hover"
                >
                  info@renaissanceevents.com
                </a>
                <a
                  href="mailto:info@specialeventschannel.com"
                  className="block font-display text-lg sm:text-xl md:text-[1.35rem] lg:text-3xl text-white transition-opacity hover:opacity-75 break-words"
                  data-cursor="hover"
                >
                  info@specialeventschannel.com
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal delay={0.15}>
            <div className="relative z-10 w-full bg-white/[0.06] border border-white/15 rounded-3xl p-8 sm:p-10 md:p-14 shadow-2xl backdrop-blur-sm">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-10"
                    noValidate
                  >
                    
                    <div className="grid gap-10 md:grid-cols-2">
                      <label className="flex flex-col gap-4 group/input">
                        <span className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-white/90 group-focus-within/input:text-white transition-colors font-bold">
                          Name
                        </span>
                        <input
                          required
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Your full name"
                          className="w-full bg-transparent border-b border-white/40 px-0 py-2 font-sans text-base md:text-lg text-white placeholder-white/60 focus:border-white focus:outline-none transition-colors"
                        />
                      </label>

                      <label className="flex flex-col gap-4 group/input">
                        <span className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-white/90 group-focus-within/input:text-white transition-colors font-bold">
                          Email
                        </span>
                        <input
                          required
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@company.com"
                          className="w-full bg-transparent border-b border-white/40 px-0 py-2 font-sans text-base md:text-lg text-white placeholder-white/60 focus:border-white focus:outline-none transition-colors"
                        />
                      </label>
                    </div>

                    <label className="flex flex-col gap-4 group/input">
                      <span className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-white/90 group-focus-within/input:text-white transition-colors font-bold">
                        Company / Organization
                      </span>
                      <input
                        name="company"
                        type="text"
                        autoComplete="organization"
                        placeholder="Optional"
                        className="w-full bg-transparent border-b border-white/40 px-0 py-2 font-sans text-base md:text-lg text-white placeholder-white/60 focus:border-white focus:outline-none transition-colors"
                      />
                    </label>

                    <label className="flex flex-col gap-4 group/input">
                      <span className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-white/90 group-focus-within/input:text-white transition-colors font-bold">
                        How can we help?
                      </span>
                      <textarea
                        required
                        name="message"
                        placeholder="Tell us about your event, timeline, and aspirations..."
                        className="w-full bg-transparent border-b border-white/40 px-0 py-2 font-sans text-base md:text-lg text-white placeholder-white/60 focus:border-white focus:outline-none transition-colors min-h-[120px] resize-none"
                      />
                    </label>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 pt-6">
                      <p className="max-w-[280px] font-sans text-[0.7rem] font-normal leading-relaxed text-white/80">
                        By submitting, you agree to be contacted regarding your inquiry. We respect your privacy.
                      </p>
                      
                      <button 
                        type="submit" 
                        disabled={sending} 
                        className="flex items-center justify-center gap-4 px-8 py-4 rounded-full border-2 border-white text-white hover:bg-white hover:text-renaissance transition-all duration-300 shrink-0 group font-bold"
                      >
                        <span className="font-sans text-[0.75rem] font-bold tracking-[0.2em] uppercase">
                          {sending ? "Sending..." : "Send Message"}
                        </span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
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
