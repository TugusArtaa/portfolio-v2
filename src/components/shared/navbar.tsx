"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { useState, useEffect } from "react";
import { useLoading } from "@/context/LoadingContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

// Social Media Icons Components
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export function Navbar({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { startLoading } = useLoading();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Transparent Header Container */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm shadow-lg shadow-slate-950/5 dark:shadow-sky-500/10 transition-all duration-300 border-b border-sky-400/40 dark:border-sky-400/40",
          className
        )}
        style={style}
      >
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center relative">
            {/* Logo/Brand - Left Side */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="flex items-center space-x-2 group"
                onClick={() => {
                  if (pathname !== "/") startLoading();
                }}
              >
                <div className="w-8 h-8 flex items-center justify-center transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 ease-out">
                  <svg
                    className="w-8 h-8 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 ease-out text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 24L8 32L20 40"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M44 24L56 32L44 40"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M28 48L36 16"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent group-hover:from-sky-500 group-hover:to-sky-400 dark:group-hover:from-sky-500 dark:group-hover:to-sky-400 transition-all duration-300">
                  Tuagus
                </span>
              </Link>
            </div>

            {/* Center Navigation Menu - Rounded Border Container */}
            <div className="hidden md:block absolute pb-0.5 left-1/2 -translate-x-1/2">
              <nav className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border border-sky-400/40 dark:border-sky-400/40 rounded-full px-4 py-2 shadow-md shadow-sky-400/10 dark:shadow-sky-500/10 hover:shadow-sky-400/20 dark:hover:shadow-sky-500/20 transition-all duration-300">
                <div className="flex items-center space-x-1">
                  {links.map((link, index) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => {
                        if (pathname !== link.href) startLoading();
                      }}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 ease-out relative overflow-hidden group",
                        pathname === link.href
                          ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30 scale-105"
                          : "text-sky-900 dark:text-white hover:text-sky-900 dark:hover:text-white hover:bg-sky-400/10 dark:hover:bg-sky-400/10 hover:scale-105"
                      )}
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      {/* Always render the background div for hover effect */}
                      <div
                        className={cn(
                          "absolute inset-0 rounded-full pointer-events-none transition-opacity duration-500 ease-out",
                          pathname === link.href
                            ? "opacity-0"
                            : "bg-sky-400/10 opacity-0 group-hover:opacity-100"
                        )}
                        aria-hidden="true"
                      />
                      <span className="relative z-10">{link.label}</span>
                    </Link>
                  ))}
                </div>
              </nav>
            </div>

            {/* Right Side - Social Media Icons & Theme Toggle */}
            <div className="flex items-center space-x-3">
              {/* Social Media Icons */}
              <div className="hidden sm:flex items-center space-x-2">
                <a
                  href="https://www.linkedin.com/in/iputuagusseniartawan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white/20 dark:bg-slate-800/40 backdrop-blur-sm border border-white/30 dark:border-slate-700/40 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/30 dark:hover:bg-slate-700/50 transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/TugusArtaa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white/20 dark:bg-slate-800/40 backdrop-blur-sm border border-white/30 dark:border-slate-700/40 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/30 dark:hover:bg-slate-700/50 transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-lg hover:shadow-slate-500/25"
                >
                  <GitHubIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/putuaguss?igsh=MWNldDl0MjYyN3o1MA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white/20 dark:bg-slate-800/40 backdrop-blur-sm border border-white/30 dark:border-slate-700/40 text-slate-700 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-white/30 dark:hover:bg-slate-700/50 transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-lg hover:shadow-pink-500/25"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              </div>

              {/* Theme Toggle */}
              <div className="p-0.5 rounded-full bg-white/20 dark:bg-slate-800/40 backdrop-blur-sm border border-white/30 dark:border-slate-700/40 hover:bg-white/30 dark:hover:bg-slate-700/50 transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-lg hover:shadow-slate-500/25">
                <ThemeToggle />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2.5 rounded-full bg-white/20 dark:bg-slate-800/40 backdrop-blur-sm border border-white/30 dark:border-slate-700/40 text-slate-700 dark:text-slate-300 hover:bg-white/30 dark:hover:bg-slate-700/50 transition-all duration-300 hover:scale-110"
              >
                <div className="relative w-5 h-5">
                  <span
                    className={cn(
                      "absolute block h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out",
                      isMobileMenuOpen ? "rotate-45 top-2" : "top-1"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute block h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out top-2",
                      isMobileMenuOpen ? "opacity-0" : "opacity-100"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute block h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out",
                      isMobileMenuOpen ? "-rotate-45 top-2" : "top-3"
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-500 ease-in-out",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-500 ease-in-out",
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Mobile Navigation */}
        <div
          className={cn(
            "fixed top-20 left-4 right-4 transform transition-all duration-500 ease-out",
            isMobileMenuOpen
              ? "translate-y-0 opacity-100 scale-100"
              : "-translate-y-8 opacity-0 scale-95"
          )}
        >
          {/* Mobile Menu Container */}
          <div className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border border-sky-400/40 dark:border-sky-400/40 rounded-2xl shadow-2xl p-6 transform-gpu">
            <div className="space-y-2">
              {links.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    if (pathname !== link.href) startLoading();
                  }}
                  className={cn(
                    "block px-6 py-3 rounded-full text-center font-medium transition-all duration-500 ease-out transform hover:scale-105 relative overflow-hidden group",
                    pathname === link.href
                      ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30"
                      : "text-sky-900 dark:text-white hover:text-sky-900 dark:hover:text-white hover:bg-sky-400/10 dark:hover:bg-sky-400/10"
                  )}
                  style={{
                    animationDelay: `${index * 100 + 200}ms`,
                    animation: isMobileMenuOpen
                      ? `slideInUp 0.6s ease-out ${index * 100 + 200}ms both`
                      : "none",
                  }}
                >
                  {/* Always render the background div for hover effect */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-full pointer-events-none transition-opacity duration-500 ease-out",
                      pathname === link.href
                        ? "opacity-0"
                        : "bg-sky-400/10 opacity-0 group-hover:opacity-100"
                    )}
                    aria-hidden="true"
                  />
                  <span className="relative z-10">{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Social Media Icons */}
            <div
              className="flex justify-center space-x-4 pt-6 mt-6 border-t border-slate-200/50 dark:border-slate-700/50"
              style={{
                animation: isMobileMenuOpen
                  ? "slideInUp 0.6s ease-out 600ms both"
                  : "none",
              }}
            >
              <a
                href="https://www.linkedin.com/in/iputuagusseniartawan/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/30 dark:bg-slate-700/40 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/40 dark:hover:bg-slate-600/50 transition-all duration-300 hover:scale-110 hover:rotate-12"
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/TugusArtaa"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/30 dark:bg-slate-700/40 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-600/50 transition-all duration-300 hover:scale-110 hover:rotate-12"
              >
                <GitHubIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/putuaguss?igsh=MWNldDl0MjYyN3o1MA=="
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/30 dark:bg-slate-700/40 text-slate-700 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-white/40 dark:hover:bg-slate-600/50 transition-all duration-300 hover:scale-110 hover:rotate-12"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-20" />

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
