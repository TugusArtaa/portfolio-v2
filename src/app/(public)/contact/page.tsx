"use client";
import React, { useState } from "react";
import type { About } from "@prisma/client";
import Lanyard from "@/components/Lanyard/Lanyard";
import { motion } from "framer-motion";
import ContactForm from "@/components/Contact/ContactForm";
import ContactSocialMedia from "@/components/Contact/ContactSocialMedia";

async function getContactAbout(): Promise<About[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/public/about`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch about");
  const about: About[] = await res.json();
  // Filter hanya contact
  const contactIds = [
    "gmail",
    "whatsapp",
    "instagram",
    "linkedin",
    "github",
    "discord",
  ];
  return Array.isArray(about)
    ? about.filter((item) => contactIds.includes(item.id))
    : [];
}

export default function ContactPage() {
  const [contacts, setContacts] = useState<About[]>([]);
  const [contactsLoading, setContactsLoading] = useState(true);

  React.useEffect(() => {
    getContactAbout()
      .then((data) => setContacts(data))
      .catch(() => setContacts([]))
      .finally(() => setContactsLoading(false));
  }, []);

  return (
    <section className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          {/* Card Container: Lanyard + Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col lg:flex-row min-h-[480px] bg-white/50 border border-zinc-200 rounded-2xl overflow-hidden shadow-sm"
          >
            {/* Left Side - Lanyard */}
            <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center py-6 sm:py-10 lg:py-0 relative">
              <div className="absolute inset-0">
                <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
              </div>
            </div>
            {/* Right Side - Contact Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center p-4 sm:p-8">
              <ContactForm />
            </div>
          </motion.div>
          {/* Social Media Icons */}
          <ContactSocialMedia contacts={contacts} />
        </div>
      </div>
    </section>
  );
}
