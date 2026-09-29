"use client";

import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/UI/Toast";
import Magnetic from "@/components/UI/Magnetic";
import type { About } from "@/data/portfolio-data";
import { REACTBITS_EASE } from "@/lib/motion";

// Shared animation preset — simple fade-up, no scale
const FADE_UP = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: (delay = 0) => ({
    duration: 0.55,
    ease: REACTBITS_EASE,
    delay,
  }),
};

/* Hallmark · component: contact-section · genre: editorial-minimal · theme: Studio
 * layout: split 2-column (left: copy & social, right: unboxed email form without subject)
 * contrast: pass (WCAG AAA on zinc-950, AA on zinc-600)
 * pre-emit critique: P5 H5 E5 S5 R5 V5
 */

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

interface ContactSectionProps {
  contacts?: About[];
  callToAction?: About;
}

export default function ContactSection({
  callToAction,
}: ContactSectionProps) {
  const { addToast } = useToast();

  // Form State (without subject)
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const missingFields: string[] = [];
    if (!form.name.trim()) missingFields.push("Name");
    if (!form.email.trim()) missingFields.push("Email");
    if (!form.message.trim()) missingFields.push("Message");

    if (missingFields.length > 0) {
      addToast({
        type: "error",
        title: "Incomplete Form",
        message: `Please fill in: ${missingFields.join(", ")}.`,
      });
      return;
    }

    if (form.name.trim().length < 2) {
      addToast({
        type: "error",
        title: "Invalid Name",
        message: "Name must be at least 2 characters.",
      });
      return;
    }

    if (!isValidEmail(form.email.trim())) {
      addToast({
        type: "error",
        title: "Invalid Email",
        message: "Please enter a valid email address.",
      });
      return;
    }

    if (form.message.trim().length < 10) {
      addToast({
        type: "error",
        title: "Message Too Short",
        message: "Message must be at least 10 characters.",
      });
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to send message.");
      }

      addToast({
        type: "success",
        title: "Message Sent",
        message: "Your message has been sent successfully!",
      });

      setForm({ name: "", email: "", message: "", honeypot: "" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      addToast({
        type: "error",
        title: "Failed to Send",
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full min-h-[calc(100dvh-190px)] flex flex-col justify-center bg-[#FAFAF9] text-zinc-950 selection:bg-[#455ce9] selection:text-white pt-32 sm:pt-36 lg:pt-44 pb-16 sm:pb-20 lg:pb-24 px-6 sm:px-8 lg:px-16 overflow-hidden">
      {/* Full-width hairline tactile anchor connecting from top */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300/80 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Full-width hairline tactile anchor connecting to footer */}
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-zinc-300/80 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl lg:max-w-7xl mx-auto w-full my-auto">
        {/* =====================================================================
            2-COLUMN SPLIT LAYOUT (Left: Text, Right: Unboxed Email Form)
           ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-stretch w-full">
          {/* ================= LEFT SIDE: Headings & Call to Action ================= */}
          <div className="w-full text-left flex flex-col justify-between">
            <h1 className="select-none">
              <motion.span
                initial={FADE_UP.initial}
                whileInView={FADE_UP.animate}
                viewport={FADE_UP.viewport}
                transition={FADE_UP.transition(0)}
                className="block font-editorial italic font-normal text-[clamp(4.25rem,14vw,7.5rem)] text-zinc-950 leading-[0.9] tracking-tight"
              >
                Let&apos;s start
              </motion.span>
              <motion.span
                initial={FADE_UP.initial}
                whileInView={FADE_UP.animate}
                viewport={FADE_UP.viewport}
                transition={FADE_UP.transition(0.07)}
                className="block font-brutal font-extrabold uppercase text-[clamp(3.25rem,11.5vw,6rem)] text-zinc-950 leading-[0.88] tracking-[-0.04em] mt-2 sm:mt-3"
              >
                A PROJECT
              </motion.span>
            </h1>

            {/* Bottom description aligned horizontally with form bottom row */}
            <motion.div
              initial={FADE_UP.initial}
              whileInView={FADE_UP.animate}
              viewport={FADE_UP.viewport}
              transition={FADE_UP.transition(0.15)}
              className="mt-8 lg:mt-auto pt-4"
            >
              <p className="text-zinc-600 text-sm sm:text-base font-normal leading-relaxed">
                {callToAction?.content ||
                  "Always open to new collaborations, freelance projects, or full-time opportunities. Let's build something great!"}
              </p>
            </motion.div>
          </div>

          {/* ================= RIGHT SIDE: Unboxed Email Form (No Subject) ================= */}
          <div className="w-full flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="w-full h-full flex flex-col justify-between" autoComplete="off">
              {/* Anti-spam Bot Honeypot (Invisible to human users, silently traps automated spam bots) */}
              <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
                <input
                  type="text"
                  id="honeypot"
                  name="honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.honeypot}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-8 sm:space-y-10">
                {/* Field 1: Name */}
                <motion.div
                  initial={FADE_UP.initial}
                  whileInView={FADE_UP.animate}
                  viewport={FADE_UP.viewport}
                  transition={FADE_UP.transition(0.06)}
                  className="relative"
                >
                  <input
                    type="text"
                    id="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What's your name?"
                    disabled={loading}
                    className="peer w-full px-0 py-3.5 bg-transparent border-0 border-b-2 border-zinc-300 text-zinc-950 placeholder-transparent focus:border-zinc-950 focus:outline-none transition-colors duration-200 text-base sm:text-lg disabled:opacity-50"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 -top-3 text-zinc-500 font-mono text-xs tracking-wider uppercase transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-zinc-950 peer-focus:font-semibold"
                  >
                    {"What's your name? *"}
                  </label>
                </motion.div>

                {/* Field 2: Email */}
                <motion.div
                  initial={FADE_UP.initial}
                  whileInView={FADE_UP.animate}
                  viewport={FADE_UP.viewport}
                  transition={FADE_UP.transition(0.13)}
                  className="relative"
                >
                  <input
                    type="email"
                    id="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What's your email?"
                    disabled={loading}
                    className="peer w-full px-0 py-3.5 bg-transparent border-0 border-b-2 border-zinc-300 text-zinc-950 placeholder-transparent focus:border-zinc-950 focus:outline-none transition-colors duration-200 text-base sm:text-lg disabled:opacity-50"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3 text-zinc-500 font-mono text-xs tracking-wider uppercase transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-zinc-950 peer-focus:font-semibold"
                  >
                    {"What's your email? *"}
                  </label>
                </motion.div>

                {/* Field 3: Project Message */}
                <motion.div
                  initial={FADE_UP.initial}
                  whileInView={FADE_UP.animate}
                  viewport={FADE_UP.viewport}
                  transition={FADE_UP.transition(0.20)}
                  className="relative pt-2"
                >
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project"
                    disabled={loading}
                    className="peer w-full px-0 py-3 bg-transparent border-0 border-b-2 border-zinc-300 text-zinc-950 placeholder-transparent focus:border-zinc-950 focus:outline-none transition-colors duration-200 text-base sm:text-lg resize-none disabled:opacity-50"
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-0 -top-2 text-zinc-500 font-mono text-xs tracking-wider uppercase transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-zinc-950 peer-focus:font-semibold"
                  >
                    {"Tell me about your project *"}
                  </label>
                  <div className="flex justify-end mt-1">
                    <span className="font-mono text-[11px] text-zinc-400">
                      {form.message.length} chars (min 10)
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Row 3: Submit Button & Info */}
              <motion.div
                initial={FADE_UP.initial}
                whileInView={FADE_UP.animate}
                viewport={FADE_UP.viewport}
                transition={FADE_UP.transition(0.27)}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 mt-8 lg:mt-auto w-full"
              >
                <span className="font-mono text-xs text-zinc-500">
                  * All fields required. Confidential &amp; spam-free.
                </span>

                <div className="flex justify-end w-full sm:w-auto">
                  <Magnetic strength={0.35}>
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative inline-flex items-center gap-2.5 sm:gap-3 pl-4 pr-6 sm:pl-4.5 sm:pr-7 py-2.5 sm:py-3 rounded-full bg-white hover:bg-zinc-950 text-zinc-950 hover:text-white border border-zinc-200/90 hover:border-zinc-950 shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.25)] transition-all duration-300 active:scale-95 cursor-pointer select-none whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {/* Left slot */}
                      <div className="relative flex items-center justify-center w-6 h-6 shrink-0">
                        {loading ? (
                          <div className="w-4 h-4 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin group-hover:border-white group-hover:border-t-transparent" />
                        ) : success ? (
                          <Check className="w-4 h-4 text-emerald-600 group-hover:text-emerald-400" />
                        ) : (
                          <>
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 group-hover:scale-0 group-hover:opacity-0 transition-all duration-300 ease-out" />
                            <span className="absolute inset-0 rounded-full bg-white flex items-center justify-center scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-sm">
                              <ArrowRight className="w-4 h-4 text-zinc-950 stroke-[2.5]" />
                            </span>
                          </>
                        )}
                      </div>

                      {/* Button Text */}
                      <span className="font-mono text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors duration-300">
                        {loading
                          ? "Sending..."
                          : success
                          ? "Message Sent"
                          : "Send Message"}
                      </span>
                    </button>
                  </Magnetic>
                </div>
              </motion.div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
