import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHALE_IMG =
  "https://static.prod-images.emergentagent.com/jobs/582c6470-c938-4394-ad53-271fdddb90df/images/0ff4fda3daf6e0f74d0665953515b0888fb1f116757c25bbcbcf98d62bab6419.png";

const Contact = () => {
  const [swallowed, setSwallowed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSwallow = () => setSwallowed(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: "", email: "", message: "" });
      }, 4000);
    }, 800);
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative min-h-screen w-full bg-[#0a0a0f] py-24 md:py-32 px-6 overflow-hidden flex flex-col items-center justify-center"
    >
      <div className="star-field opacity-40" aria-hidden />

      {/* Faint background japanese */}
      <span
        className="absolute font-shippori text-[#0d9488]/[0.06] select-none pointer-events-none whitespace-nowrap"
        style={{ fontSize: "18vw", top: "20%", left: "-2%" }}
      >
        一緒に作りましょう
      </span>

      <div className="relative z-10 max-w-7xl mx-auto w-full mb-8 flex items-end justify-between">
        <div>
          <p className="font-outfit text-[10px] uppercase tracking-[0.5em] text-[#0d9488] mb-3">
            05 / Send a Signal
          </p>
          <h2
            className="font-oswald uppercase text-4xl md:text-6xl tracking-tight text-[#f0f0ff]"
            data-testid="contact-heading"
          >
            INTO THE COSMOS
          </h2>
        </div>
        <span className="hidden md:block font-shippori text-xl text-[#0d9488]/80">
          連絡
        </span>
      </div>

      {/* Whale stage */}
      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!swallowed ? (
            <motion.div
              key="whale"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 8, transition: { duration: 0.9 } }}
              transition={{ duration: 0.8 }}
              className="relative flex flex-col items-center"
            >
              <motion.img
                src={WHALE_IMG}
                alt="Cosmic whale"
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-[320px] md:w-[500px] select-none"
                style={{
                  filter: "invert(1) hue-rotate(180deg) contrast(1.05)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 65% 60% at 50% 50%, #000 60%, transparent 90%)",
                  maskImage:
                    "radial-gradient(ellipse 65% 60% at 50% 50%, #000 60%, transparent 90%)",
                }}
                data-testid="contact-whale"
                draggable={false}
              />
              <button
                onClick={handleSwallow}
                data-testid="contact-summon-btn"
                className="mt-8 magnetic-btn border border-[#0d9488]/60 text-[#f0f0ff] px-8 py-3 font-oswald uppercase tracking-[0.3em] text-xs hover:bg-[#0d9488] hover:text-[#0a0a0f] transition-colors"
              >
                Speak to the Void →
              </button>
              <p className="mt-4 font-outfit text-[10px] uppercase tracking-[0.4em] text-[#f0f0ff]/40">
                the whale will swallow the screen
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="w-full max-w-md relative"
            >
              <div className="bg-[#0a0a0f]/80 backdrop-blur-md p-8 md:p-10 border border-[#0d9488]/30 rounded-sm">
                <p className="font-shippori text-[#0d9488] text-sm mb-2">送信</p>
                <h3 className="font-oswald uppercase text-2xl md:text-3xl text-[#f0f0ff] mb-8 tracking-tight">
                  TRANSMISSION FORM
                </h3>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-10 text-center"
                    data-testid="contact-success"
                  >
                    <motion.div
                      animate={{ x: [0, 400], y: [0, -80], rotate: [0, 20] }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="text-3xl mb-6"
                    >
                      ✦
                    </motion.div>
                    <p className="font-outfit text-[#f0f0ff] text-sm">
                      Message received across the cosmos ✦
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="font-outfit text-[10px] uppercase tracking-[0.3em] text-[#f0f0ff]/50 mb-1 block">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-transparent border-b border-[#0d9488]/50 focus:border-[#0d9488] focus:outline-none py-2 text-[#f0f0ff] font-outfit"
                        data-testid="contact-input-name"
                      />
                    </div>
                    <div>
                      <label className="font-outfit text-[10px] uppercase tracking-[0.3em] text-[#f0f0ff]/50 mb-1 block">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-transparent border-b border-[#0d9488]/50 focus:border-[#0d9488] focus:outline-none py-2 text-[#f0f0ff] font-outfit"
                        data-testid="contact-input-email"
                      />
                    </div>
                    <div>
                      <label className="font-outfit text-[10px] uppercase tracking-[0.3em] text-[#f0f0ff]/50 mb-1 block">
                        Message
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-transparent border-b border-[#0d9488]/50 focus:border-[#0d9488] focus:outline-none py-2 text-[#f0f0ff] font-outfit resize-none"
                        data-testid="contact-input-message"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      data-testid="contact-submit-btn"
                      className="mt-4 w-full border border-[#0d9488] px-6 py-3 hover:bg-[#0d9488] hover:text-[#0a0a0f] transition-colors uppercase font-oswald tracking-[0.3em] text-xs text-[#f0f0ff] disabled:opacity-50"
                    >
                      {submitting ? "Transmitting…" : "Send into the void →"}
                    </button>
                  </form>
                )}
              </div>

              <button
                onClick={() => setSwallowed(false)}
                className="mt-4 font-outfit text-[10px] uppercase tracking-[0.4em] text-[#f0f0ff]/40 hover:text-[#0d9488] transition-colors"
                data-testid="contact-back-btn"
              >
                ← summon the whale again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer
        className="relative z-10 mt-24 text-center max-w-3xl mx-auto"
        data-testid="footer"
      >
        <div className="font-outfit text-sm text-[#f0f0ff]/70 flex flex-col md:flex-row gap-3 md:gap-8 justify-center mb-6">
          <a
            href="mailto:rfrizqifauzan@gmail.com"
            className="hover:text-[#0d9488] transition-colors"
            data-testid="footer-email"
          >
            rfrizqifauzan@gmail.com
          </a>
          <a
            href="https://github.com/Ruphasa"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#0d9488] transition-colors"
            data-testid="footer-github"
          >
            github.com/Ruphasa
          </a>
          <a
            href="https://linkedin.com/in/ruphasa"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#0d9488] transition-colors"
            data-testid="footer-linkedin"
          >
            linkedin.com/in/ruphasa
          </a>
        </div>
        <p className="font-shippori text-lg text-[#0d9488]/80">
          一緒に作りましょう。
          <span className="font-outfit text-xs text-[#f0f0ff]/50 ml-3 tracking-[0.3em] uppercase">
            Let's build together
          </span>
        </p>
        <p className="mt-8 font-outfit text-[10px] uppercase tracking-[0.4em] text-[#f0f0ff]/30">
          Rizqi Fauzan © 2025 · made among the stars
        </p>
      </footer>
    </section>
  );
};

export default Contact;
