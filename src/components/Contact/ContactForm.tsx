"use client";
import React, { useState } from "react";
import { useToast } from "@/components/UI/Toast";
import { Button } from "@/components/UI/StatefulButton";
import { motion } from "framer-motion";
import useContactSectionAnimations from "@/hooks/useContactSectionAnimations";

// Helper validasi email
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactForm() {
  useContactSectionAnimations();
  const { addToast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
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
    if (!form.subject.trim()) missingFields.push("Subject");
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
    if (form.subject.trim().length < 3) {
      addToast({
        type: "error",
        title: "Invalid Subject",
        message: "Subject must be at least 3 characters.",
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
      setForm({ name: "", email: "", subject: "", message: "" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Failed to Send",
        message: err.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        data-contact-title
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        className="text-center lg:text-left mb-8 sm:mb-12"
      >
        <h1 className="text-3xl sm:text-3xl lg:text-4xl font-bold text-slate-700 dark:text-slate-200">
          Contact
        </h1>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-sky-500 to-sky-400 rounded-full mx-auto lg:mx-0 mt-3 sm:mt-4"></div>
      </motion.div>
      <motion.div
        data-contact-form
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="max-w-lg mx-auto lg:mx-0 w-full"
      >
        <div className="bg-transparent p-0">
          <form
            className="space-y-6 sm:space-y-8"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            {/* Name Input */}
            <div className="relative">
              <input
                type="text"
                id="name"
                value={form.name}
                onChange={handleChange}
                autoComplete="off"
                className="peer w-full px-0 py-3 sm:py-4 bg-transparent border-0 border-b-2 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 placeholder-transparent focus:border-sky-500 dark:focus:border-sky-400 focus:outline-none transition-colors duration-300 text-base sm:text-lg lg:text-xl"
                placeholder="Your Name"
              />
              <label
                htmlFor="name"
                className="absolute left-0 -top-3.5 text-slate-500 dark:text-slate-400 text-sm sm:text-base lg:text-lg transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm sm:peer-focus:text-base lg:peer-focus:text-lg peer-focus:text-sky-500 dark:peer-focus:text-sky-400"
              >
                Your Name
              </label>
            </div>
            {/* Email Input */}
            <div className="relative">
              <input
                type="text"
                id="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="off"
                className="peer w-full px-0 py-3 sm:py-4 bg-transparent border-0 border-b-2 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 placeholder-transparent focus:border-sky-500 dark:focus:border-sky-400 focus:outline-none transition-colors duration-300 text-base sm:text-lg lg:text-xl"
                placeholder="Your Email"
              />
              <label
                htmlFor="email"
                className="absolute left-0 -top-3.5 text-slate-500 dark:text-slate-400 text-sm sm:text-base lg:text-lg transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm sm:peer-focus:text-base lg:peer-focus:text-lg peer-focus:text-sky-500 dark:peer-focus:text-sky-400"
              >
                Your Email
              </label>
            </div>
            {/* Subject Input */}
            <div className="relative">
              <input
                type="text"
                id="subject"
                value={form.subject}
                onChange={handleChange}
                className="peer w-full px-0 py-3 sm:py-4 bg-transparent border-0 border-b-2 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 placeholder-transparent focus:border-sky-500 dark:focus:border-sky-400 focus:outline-none transition-colors duration-300 text-base sm:text-lg lg:text-xl"
                placeholder="Subject"
              />
              <label
                htmlFor="subject"
                className="absolute left-0 -top-3.5 text-slate-500 dark:text-slate-400 text-sm sm:text-base lg:text-lg transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm sm:peer-focus:text-base lg:peer-focus:text-lg peer-focus:text-sky-500 dark:peer-focus:text-sky-400"
              >
                Subject
              </label>
            </div>
            {/* Message Textarea */}
            <div className="relative">
              <textarea
                id="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="peer w-full px-0 py-3 sm:py-4 bg-transparent border-0 border-b-2 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 placeholder-transparent focus:border-sky-500 dark:focus:border-sky-400 focus:outline-none transition-colors duration-300 resize-none text-base sm:text-lg lg:text-xl"
                placeholder="Your Message"
              />
              <label
                htmlFor="message"
                className="absolute left-0 -top-3.5 text-slate-500 dark:text-slate-400 text-sm sm:text-base lg:text-lg transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm sm:peer-focus:text-base lg:peer-focus:text-lg peer-focus:text-sky-500 dark:peer-focus:text-sky-400"
              >
                Your Message
              </label>
            </div>
            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={loading}
                loading={loading}
                success={success}
                className="mt-6 sm:mt-8"
              >
                {loading ? "Sending..." : success ? "Success!" : "Send Message"}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
}
