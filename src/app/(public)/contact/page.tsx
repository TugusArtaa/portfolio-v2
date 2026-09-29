import type { Metadata } from "next";
import { aboutEntries, getAboutById } from "@/data/portfolio-data";
import type { About } from "@/data/portfolio-data";
import ContactSection from "@/components/Contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Tuagus (I Putu Agus Seniartawan). Available for Web Development (React, Next.js, Laravel), Branding, and Graphic Design collaborations.",
  openGraph: {
    title: "Contact | Tuagus",
    description:
      "Get in touch with Tuagus (I Putu Agus Seniartawan). Available for Web Development (React, Next.js, Laravel), Branding, and Graphic Design collaborations.",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  const contactIds = [
    "gmail",
    "whatsapp",
    "instagram",
    "linkedin",
    "github",
    "discord",
  ];

  const contacts: About[] = aboutEntries.filter((item) =>
    contactIds.includes(item.id)
  );

  const callToAction = getAboutById("call_to_action");

  return <ContactSection contacts={contacts} callToAction={callToAction} />;
}
