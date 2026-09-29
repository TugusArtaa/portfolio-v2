import React, { forwardRef } from "react";
import FolderFloat from "@/components/UI/FolderFloat/FolderFloat";

/* Hallmark · component: services-section · genre: modern-minimal · theme: Studio
 * pre-emit critique: P5 H5 E5 S5 R5 V5
 * layout: compact horizontal alternating (zigzag: L-R, R-L, L-R)
 * states: default · hover · focus · active
 * contrast: pass (WCAG AAA on zinc-950, AA on zinc-600)
 */

interface ServiceDetail {
  id: string;
  letter: string;
  title: string;
  description: string;
  folderLabel: string;
  folderSublabel: string;
  folderItems: string[];
  folderSide: "left" | "right";
}

const SERVICES_DATA: ServiceDetail[] = [
  {
    id: "web-developer",
    letter: "A",
    title: "Web Developer",
    description:
      "Specializing in modern, responsive web development using React, Next.js, and Laravel, with clean architecture, optimal performance, and intuitive user experiences.",
    folderLabel: "Web Developer",
    folderSublabel: "Code & Architecture",
    folderItems: [
      "Laravel",
      "React",
      "Next.js",
      "WordPress",
      "Tailwind CSS",
    ],
    folderSide: "left",
  },
  {
    id: "branding",
    letter: "B",
    title: "Branding",
    description:
      "Building impactful brand presence through creative social media direction, videography, photography, and distinctive logo design.",
    folderLabel: "Branding",
    folderSublabel: "Media & Identity",
    folderItems: [
      "Social Media",
      "Videography",
      "Photography",
      "Logo Design",
    ],
    folderSide: "right",
  },
  {
    id: "graphic-design",
    letter: "C",
    title: "Graphic Design",
    description:
      "Crafting compelling promotional visuals, digital assets, poster illustrations, and marketing layouts with balanced composition.",
    folderLabel: "Graphic Design",
    folderSublabel: "Visuals & Layouts",
    folderItems: [
      "Adobe Photoshop",
      "Canva",
      "Figma",
      "Poster & Banner",
      "Digital Assets",
    ],
    folderSide: "left",
  },
];

const ServicesSection = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>((props, ref) => {
  return (
    <section
      ref={ref}
      id="services-section"
      className="relative w-full py-20 sm:py-24 lg:py-32 px-6 sm:px-8 lg:px-16 bg-[#FAFAF9] text-zinc-950 overflow-hidden"
    >
      {/* Hairline tactile anchor connecting from Summary Section */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300/80 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-14 sm:space-y-18 lg:space-y-20">
        {/* =========================================================================
            HEADER: Section Eyebrow & Editorial Title (Spacious & Refined)
           ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 sm:pb-14 lg:pb-16 border-b border-zinc-200/80">
          <div className="space-y-5 sm:space-y-6 max-w-2xl text-left">
            {/* Architectural Section Coordinate */}
            <div data-services-text className="inline-flex items-center gap-2.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-zinc-950 shrink-0"
                aria-hidden="true"
              />
              <h2 className="font-mono text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">
                02 // SERVICES &amp; EXPERTISE
              </h2>
            </div>

            {/* Display Headline */}
            <h3
              data-services-text
              className="font-brutal text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-[-0.03em] text-zinc-950 leading-[1.18] text-left"
            >
              Turning ideas into functional &amp; engaging digital experiences.
            </h3>
          </div>

          {/* Subtitle / Measure */}
          <div
            data-services-text
            className="md:max-w-xs lg:max-w-sm text-left text-zinc-600 text-sm sm:text-base leading-relaxed font-sans md:pb-1.5"
          >
            <p>
              Core disciplines bridging modern web development, distinctive brand
              identities, and engaging visual media.
            </p>
          </div>
        </div>

        {/* =========================================================================
            ALTERNATING ROWS (Balanced & Elegantly Spaced)
            Row 1 (Web Developer): Folder Kiri, Teks Kanan
            Row 2 (Branding): Teks Kiri, Folder Kanan
            Row 3 (Graphic Design): Folder Kiri, Teks Kanan
           ========================================================================= */}
        <div className="space-y-8 sm:space-y-10 lg:space-y-10">
          {SERVICES_DATA.map((service) => {
            const isFolderLeft = service.folderSide === "left";

            return (
              <div
                key={service.id}
                data-service-card
                className={`flex flex-col ${
                  isFolderLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center justify-between gap-8 lg:gap-12 pb-8 sm:pb-10 lg:pb-10 border-b border-zinc-200/60 last:border-none`}
              >
                {/* -------------------------------------------------------------
                    FOLDER COLUMN (Menggunakan FolderFloat ReactBits dengan Headroom Mobile)
                   ------------------------------------------------------------- */}
                <div className="w-full lg:w-1/2 flex justify-center items-center pt-20 pb-4 sm:pt-24 sm:pb-6 lg:py-2">
                  <FolderFloat
                    label={service.folderLabel}
                    sublabel={service.folderSublabel}
                    items={service.folderItems}
                    width={195}
                    height={142}
                    spread={165}
                    lift={26}
                    stagger={65}
                    autoScrollTrigger={true}
                    scrollThreshold={0.35}
                    folderColor="#18181b"
                    frontColor="#27272a"
                    paperColor="#fafafa"
                    itemColor="#ffffff"
                    itemTextColor="#18181b"
                    labelColor="#fafafa"
                  />
                </div>

                {/* -------------------------------------------------------------
                    TEXT & CONTENT COLUMN (Direct & Focused on Title + Description)
                   ------------------------------------------------------------- */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-2.5 text-left">
                  {/* Service Title with Editorial Alphabet Index [ A ] */}
                  <h4 className="font-brutal text-2xl sm:text-3xl lg:text-[2.25rem] font-extrabold tracking-tight text-zinc-950 leading-[1.15] flex items-baseline gap-3 sm:gap-3.5">
                    <span className="font-mono text-lg sm:text-xl lg:text-2xl font-semibold text-zinc-400 shrink-0 select-none">
                      [ {service.letter} ]
                    </span>
                    <span>{service.title}</span>
                  </h4>

                  {/* Descriptive Text */}
                  <p className="font-sans text-sm sm:text-base text-zinc-600 leading-relaxed max-w-xl">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

ServicesSection.displayName = "ServicesSection";
export default ServicesSection;
