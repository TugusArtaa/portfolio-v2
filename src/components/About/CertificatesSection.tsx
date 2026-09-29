"use client";

import type { Certificate } from "@/data/portfolio-data";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { X, Maximize2 } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CertificatesSectionProps {
  certificates: Certificate[];
}

const customScrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgb(241 245 249);
    border-radius: 9999px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgb(161 161 170);
    border-radius: 9999px;
    transition: background-color 0.2s ease;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgb(113 113 122);
  }
  
  /* Firefox */
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgb(161 161 170) rgb(241 245 249);
  }
`;

interface CertificateCardImageProps {
  cert: Certificate;
  onOpen: () => void;
}

function CertificateCardImage({ cert, onOpen }: CertificateCardImageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics inspired by ReactBits cursor follower
  const springConfig = { damping: 20, stiffness: 300, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const updateCoordinates = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rawX = clientX - rect.left;
    const rawY = clientY - rect.top;

    // Clamp coordinates so the follower badge never gets clipped by rounded container bounds
    const clampedX = Math.max(48, Math.min(rect.width - 48, rawX));
    const clampedY = Math.max(22, Math.min(rect.height - 22, rawY));

    x.set(clampedX);
    y.set(clampedY);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    updateCoordinates(e.clientX, e.clientY);
    setIsHovered(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateCoordinates(e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="p-4 sm:p-6">
      <div
        ref={containerRef}
        onClick={onOpen}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden aspect-[297/210] bg-zinc-100 rounded-lg group/image cursor-pointer border border-zinc-200/80 hover:border-zinc-400 transition-colors duration-300 select-none"
        role="button"
        tabIndex={0}
        aria-label={`View ${cert.title} certificate`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
          }
        }}
      >
        {cert.image ? (
          <Image
            src={cert.image || "/placeholder.svg"}
            alt={cert.title}
            fill
            sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
            className="object-cover group-hover/image:scale-105 transition-transform duration-500 ease-out rounded-lg"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-zinc-600">
            <h3 className="text-base sm:text-lg font-bold mb-2">
              Certificate Preview
            </h3>
            <p className="text-xs sm:text-sm opacity-80">
              A4 Landscape Ratio
            </p>
          </div>
        )}

        {/* ReactBits Dynamic Cursor Follower Badge (Maximize icon + VIEW label) */}
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={false}
          animate={{
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
          className="pointer-events-none absolute top-0 left-0 z-30 hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-950/90 text-white backdrop-blur-md border border-white/20 shadow-[0_8px_25px_rgba(0,0,0,0.35)] select-none whitespace-nowrap"
        >
          <Maximize2 className="w-3.5 h-3.5 text-white" />
          <span className="font-mono text-[10px] font-semibold tracking-wider uppercase">
            VIEW
          </span>
        </motion.div>

        {/* Subtle mobile hint */}
        <div className="md:hidden absolute bottom-2 right-2 p-1.5 rounded-md bg-zinc-950/70 text-white backdrop-blur-xs border border-white/15 pointer-events-none">
          <Maximize2 className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}

export default function CertificatesSection({
  certificates,
}: CertificatesSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayedCertificates = showAll
    ? certificates
    : certificates.slice(0, 3);

  // Refresh ScrollTrigger when certificates shown changes
  useEffect(() => {
    if (typeof window !== "undefined" && ScrollTrigger) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 50);
    }
  }, [displayedCertificates.length]);

  // Lock body scroll and apply lightbox-open class when modal is open
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (selectedCertificate) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("lightbox-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("lightbox-open");
    }

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("lightbox-open");
    };
  }, [selectedCertificate]);

  // Escape key shortcut to close modal
  useEffect(() => {
    if (!selectedCertificate) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCertificate]);

  const openModal = (cert: Certificate) => {
    setSelectedCertificate(cert);
  };

  const closeModal = () => {
    setSelectedCertificate(null);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customScrollbarStyles }} />
      <section className="relative w-full pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 px-6 sm:px-8 lg:px-16 bg-[#FAFAF9] text-zinc-950 overflow-hidden">
        {/* Full-width hairline tactile anchor connecting from previous section */}
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300/80 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Full-width hairline tactile anchor connecting to Footer matching Home bottom section */}
        <div
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-zinc-300/80 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* =====================================================================
              SECTION HEADER: 100% Consistent Spacing & Sizing with Sections 01-04
             ===================================================================== */}
          <div data-section-header className="flex flex-col space-y-6 text-left mb-10 sm:mb-12">
            {/* Eyebrow */}
            <div>
              <h2 className="font-mono text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">
                ABOUT // CERTIFICATES &amp; ACHIEVEMENTS
              </h2>
            </div>

            {/* Title: 100% Consistent font-brutal, size scale, leading, and tracking */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
              <h3 className="font-brutal text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold tracking-[-0.035em] text-zinc-950 leading-[1.05] text-left">
                Certificates &amp; Achievements
              </h3>
              <span className="font-mono text-xs text-zinc-500 tracking-wider uppercase font-medium self-start sm:self-auto sm:pb-2">
                [{certificates.length} Certificates]
              </span>
            </div>
          </div>

        {Array.isArray(certificates) && certificates.length > 0 ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {displayedCertificates.map((cert: Certificate) => (
                <div
                  key={cert.id}
                  data-about-certificates
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-zinc-200 transition-all duration-300 hover:-translate-y-1.5"
                >
                  {/* Corner borders */}
                  <div className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-r-2 rounded-tr-2xl transition-all duration-300 border-zinc-300 group-hover:border-zinc-900 group-hover:w-12 group-hover:h-12 sm:group-hover:w-16 sm:group-hover:h-16 z-10" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-l-2 rounded-bl-2xl transition-all duration-300 border-zinc-300 group-hover:border-zinc-900 group-hover:w-12 group-hover:h-12 sm:group-hover:w-16 sm:group-hover:h-16 z-10" />

                  {/* Certificate Image - Interactive with ReactBits cursor follower */}
                  <CertificateCardImage cert={cert} onOpen={() => openModal(cert)} />

                  {/* Certificate Info - Compact bottom section */}
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 relative z-10">
                    {/* Title - Full width */}
                    <h3
                      onClick={() => openModal(cert)}
                      className="font-bold text-base sm:text-lg text-zinc-900 line-clamp-1 group-hover:text-zinc-950 transition-colors duration-300 mb-2 cursor-pointer"
                    >
                      {cert.title || "Cert.title"}
                    </h3>

                    {/* Issuer and Year - Same line */}
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm text-zinc-600 truncate flex-1">
                        {cert.issuer || "cert.issuer"}
                      </p>

                      {cert.issueDate ? (
                        <button className="px-3 py-1.5 bg-zinc-900 text-white text-xs font-medium rounded-lg transition-colors duration-200 shadow-sm flex-shrink-0">
                          {new Date(cert.issueDate).getFullYear()}
                        </button>
                      ) : (
                        <button className="px-3 py-1.5 bg-zinc-900 text-white text-xs font-medium rounded-lg transition-colors duration-200 shadow-sm flex-shrink-0">
                          2025
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {certificates.length > 3 && (
              <div className="text-center mt-10 sm:mt-12">
                <button
                  type="button"
                  onClick={() => setShowAll(!showAll)}
                  className="group cursor-pointer inline-flex items-center gap-3 px-6 py-3 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md border border-zinc-800"
                >
                  <span className="font-mono text-xs font-semibold tracking-wider uppercase">
                    {showAll
                      ? "Show Less"
                      : `View More Certificates (${certificates.length - 3})`}
                  </span>
                  <span className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
                    <svg
                      className={`w-3 h-3 text-zinc-300 transition-transform duration-300 ${
                        showAll ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-slate-500 text-base sm:text-lg">
              No certificates available.
            </p>
          </div>
        )}
        </div>

        {/* Certificate Modal (Portaled to document.body with z-[9999]) */}
        {mounted &&
          createPortal(
            <AnimatePresence>
              {selectedCertificate && (
                <motion.div
                  key="cert-modal-backdrop"
                  role="dialog"
                  aria-modal="true"
                  aria-label={selectedCertificate.title || "Certificate Details"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 sm:p-6 select-none"
                  onClick={closeModal}
                >
                  <motion.div
                    key="cert-modal-content"
                    initial={{ opacity: 0, scale: 0.96, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 8 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-zinc-200/90 text-zinc-950"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-4 sm:p-6 border-b border-zinc-200/80">
                      <h3 className="font-brutal text-lg sm:text-xl font-bold tracking-[-0.02em] text-zinc-950 truncate pr-4">
                        {selectedCertificate.title || "Certificate"}
                      </h3>

                      <button
                        onClick={closeModal}
                        className="cursor-pointer p-2 hover:bg-zinc-100 rounded-full transition-all duration-200 group text-zinc-500 hover:text-zinc-950 shrink-0"
                        type="button"
                        aria-label="Close modal"
                      >
                        <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
                      </button>
                    </div>

                    {/* Modal Content */}
                    <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-120px)] custom-scrollbar">
                      {/* Certificate Image */}
                      <div className="mb-6">
                        <div className="relative aspect-[297/210] rounded-xl overflow-hidden shadow-sm border border-zinc-200/80 bg-zinc-100">
                          {selectedCertificate.image ? (
                            <Image
                              src={selectedCertificate.image || "/placeholder.svg"}
                              alt={selectedCertificate.title}
                              fill
                              sizes="(max-width: 768px) 90vw, 850px"
                              className="object-cover"
                              priority
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center h-full text-zinc-700 p-6 text-center">
                              <h4 className="font-brutal text-lg font-bold mb-1">
                                Certificate Preview
                              </h4>
                              <p className="font-mono text-xs text-zinc-500">
                                A4 Landscape Format
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Certificate Info */}
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex-1">
                          <h4 className="font-brutal text-base sm:text-lg font-bold text-zinc-900 mb-1">
                            {selectedCertificate.issuer || "Certificate Issuer"}
                          </h4>
                          <div className="flex items-center gap-3 font-sans text-sm text-zinc-600">
                            <span>
                              Issued:{" "}
                              {selectedCertificate.issueDate
                                ? new Date(selectedCertificate.issueDate).getFullYear()
                                : "2025"}
                            </span>
                            {selectedCertificate.expireDate && (
                              <>
                                <span>•</span>
                                <span
                                  className={
                                    new Date(selectedCertificate.expireDate) < new Date()
                                      ? "text-rose-600"
                                      : new Date(selectedCertificate.expireDate) <
                                        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                                      ? "text-amber-600"
                                      : "text-zinc-600"
                                  }
                                >
                                  Expires:{" "}
                                  {new Date(selectedCertificate.expireDate).toLocaleDateString(
                                    "en-US",
                                    { year: "numeric", month: "short", day: "numeric" }
                                  )}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="shrink-0 pt-0.5">
                          {selectedCertificate.expireDate ? (
                            new Date(selectedCertificate.expireDate) < new Date() ? (
                              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600">
                                <svg className="w-4 h-4 text-rose-500 fill-none stroke-current shrink-0" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Expired
                              </span>
                            ) : new Date(selectedCertificate.expireDate) <
                              new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? (
                              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600">
                                <svg className="w-4 h-4 text-amber-500 fill-none stroke-current shrink-0" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                                Expires Soon
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900">
                                <Image src="/icons/verified.svg" alt="Verified" width={16} height={16} className="w-4 h-4 shrink-0" />
                                Valid
                              </span>
                            )
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900">
                              <Image src="/icons/verified.svg" alt="Verified" width={16} height={16} className="w-4 h-4 shrink-0" />
                              Valid
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )}
      </section>
    </>
  );
}
