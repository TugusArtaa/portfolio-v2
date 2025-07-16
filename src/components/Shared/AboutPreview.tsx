"use client";

import React from "react";

interface AboutPreviewProps {
  id: string;
  content: string;
}

const ABOUT_LABELS: Record<string, string> = {
  who_am_i: "Who Am I",
  education: "Education",
  quote: "Quote",
  whatsapp: "WhatsApp",
  gmail: "Gmail",
  instagram: "Instagram",
  github: "GitHub",
  linkedin: "LinkedIn",
  discord: "Discord",
  call_to_action: "Call To Action",
};

const ICONS: Record<string, React.ReactNode> = {
  who_am_i: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  ),
  education: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0H6m6 0h6"
      />
    </svg>
  ),
  quote: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
      />
    </svg>
  ),
  whatsapp: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
    </svg>
  ),
  gmail: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
  instagram: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.017 0C8.396 0 7.989.013 6.756.072 5.526.13 4.718.333 4.015.63a5.058 5.058 0 00-1.831 1.194A5.058 5.058 0 00.63 4.015C.333 4.718.131 5.526.072 6.756.013 7.989 0 8.396 0 12.017c0 3.624.013 4.09.072 5.321.058 1.23.26 2.038.558 2.741.305.698.718 1.291 1.194 1.831.54.476 1.133.889 1.831 1.194.703.297 1.511.499 2.741.558C7.989 23.988 8.396 24 12.017 24c3.624 0 4.09-.013 5.321-.072 1.23-.058 2.038-.26 2.741-.558a5.06 5.06 0 001.831-1.194 5.058 5.058 0 001.194-1.831c.297-.703.499-1.511.558-2.741.058-1.23.072-1.697.072-5.321 0-3.624-.014-4.09-.072-5.321-.059-1.23-.26-2.038-.558-2.741a5.058 5.058 0 00-1.194-1.831A5.06 5.06 0 0020.078.63c-.703-.297-1.511-.499-2.741-.558C16.106.013 15.7 0 12.017 0zM12.017 2.163c3.557 0 3.981.014 5.387.072 1.3.059 2.004.274 2.472.456.622.242 1.066.532 1.533.998.466.467.756.911.998 1.533.182.468.397 1.172.456 2.472.058 1.406.072 1.83.072 5.387 0 3.557-.014 3.981-.072 5.387-.059 1.3-.274 2.004-.456 2.472-.242.622-.532 1.066-.998 1.533-.467.466-.911.756-1.533.998-.468.182-1.172.397-2.472.456-1.406.058-1.83.072-5.387.072-3.557 0-3.981-.014-5.387-.072-1.3-.059-2.004-.274-2.472-.456-.622-.242-1.066-.532-1.533-.998a4.127 4.127 0 01-.998-1.533c-.182-.468-.397-1.172-.456-2.472-.058-1.406-.072-1.83-.072-5.387 0-3.557.014-3.981.072-5.387.059-1.3.274-2.004.456-2.472.242-.622.532-1.066.998-1.533.467-.466.911-.756 1.533-.998.468-.182 1.172-.397 2.472-.456 1.406-.058 1.83-.072 5.387-.072z" />
      <path d="M12.017 5.838a6.179 6.179 0 100 12.358 6.179 6.179 0 000-12.358zM12.017 16a3.821 3.821 0 110-7.642 3.821 3.821 0 010 7.642zM19.846 5.595a1.441 1.441 0 11-2.883 0 1.441 1.441 0 012.883 0z" />
    </svg>
  ),
  github: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  discord: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.07.07 0 00-.073.035c-.211.375-.444.864-.608 1.249-1.844-.276-3.68-.276-5.486 0-.164-.385-.397-.874-.608-1.249a.07.07 0 00-.073-.035 19.736 19.736 0 00-4.885 1.515.064.064 0 00-.03.027C.533 9.045-.32 13.579.099 18.057a.07.07 0 00.028.048c2.052 1.507 4.041 2.422 5.992 3.029a.07.07 0 00.076-.027c.461-.63.873-1.295 1.226-1.994a.07.07 0 00-.038-.098c-.652-.247-1.27-.549-1.872-.892a.07.07 0 01-.007-.117c.125-.094.25-.192.371-.291a.07.07 0 01.073-.01c3.927 1.793 8.18 1.793 12.062 0a.07.07 0 01.074.009c.122.099.246.197.372.291a.07.07 0 01-.006.117c-.603.343-1.221.645-1.873.892a.07.07 0 00-.038.098c.36.699.772 1.364 1.226 1.994a.07.07 0 00.076.027c1.951-.607 3.94-1.522 5.992-3.029a.07.07 0 00.028-.048c.5-5.177-.838-9.673-3.548-13.661a.061.061 0 00-.03-.027zM8.02 15.331c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.094 2.156 2.418 0 1.334-.955 2.419-2.156 2.419zm7.974 0c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.094 2.156 2.418 0 1.334-.946 2.419-2.156 2.419z" />
    </svg>
  ),
  call_to_action: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  ),
};

const THEME_COLORS: Record<string, { bg: string; icon: string; text: string }> =
  {
    who_am_i: {
      bg: "from-blue-500/10 via-blue-400/5 to-blue-300/10",
      icon: "bg-gradient-to-r from-blue-500 to-blue-600",
      text: "text-blue-700 dark:text-blue-300",
    },
    education: {
      bg: "from-indigo-500/10 via-indigo-400/5 to-indigo-300/10",
      icon: "bg-gradient-to-r from-indigo-500 to-indigo-600",
      text: "text-indigo-700 dark:text-indigo-300",
    },
    quote: {
      bg: "from-purple-500/10 via-purple-400/5 to-purple-300/10",
      icon: "bg-gradient-to-r from-purple-500 to-purple-600",
      text: "text-purple-700 dark:text-purple-300",
    },
    whatsapp: {
      bg: "from-green-500/10 via-green-400/5 to-green-300/10",
      icon: "bg-gradient-to-r from-green-500 to-green-600",
      text: "text-green-700 dark:text-green-300",
    },
    gmail: {
      bg: "from-red-500/10 via-red-400/5 to-red-300/10",
      icon: "bg-gradient-to-r from-red-500 to-red-600",
      text: "text-red-700 dark:text-red-300",
    },
    instagram: {
      bg: "from-pink-500/10 via-pink-400/5 to-pink-300/10",
      icon: "bg-gradient-to-r from-pink-500 to-pink-600",
      text: "text-pink-700 dark:text-pink-300",
    },
    github: {
      bg: "from-gray-500/10 via-gray-400/5 to-gray-300/10",
      icon: "bg-gradient-to-r from-gray-700 to-gray-800",
      text: "text-gray-700 dark:text-gray-300",
    },
    linkedin: {
      bg: "from-blue-600/10 via-blue-500/5 to-blue-400/10",
      icon: "bg-gradient-to-r from-blue-600 to-blue-700",
      text: "text-blue-700 dark:text-blue-300",
    },
    discord: {
      bg: "from-indigo-600/10 via-indigo-500/5 to-indigo-400/10",
      icon: "bg-gradient-to-r from-indigo-600 to-indigo-700",
      text: "text-indigo-700 dark:text-indigo-300",
    },
    call_to_action: {
      bg: "from-orange-500/10 via-orange-400/5 to-orange-300/10",
      icon: "bg-gradient-to-r from-orange-500 to-orange-600",
      text: "text-orange-700 dark:text-orange-300",
    },
  };

export default function AboutPreview({ id, content }: AboutPreviewProps) {
  const theme = THEME_COLORS[id] || THEME_COLORS.who_am_i;
  const label = ABOUT_LABELS[id] || id;
  const hasContent = content && content.trim().length > 0;

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Header with Icon and Label */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 rounded-xl ${theme.icon} flex items-center justify-center text-white shadow-md`}
        >
          {ICONS[id] || (
            <span className="text-lg font-bold">
              {id?.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div>
          <h3 className={`font-semibold text-base ${theme.text}`}>{label}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Preview konten
          </p>
        </div>
      </div>

      {/* Content Preview Card */}
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${theme.bg} border border-white/50 dark:border-gray-700/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}
      >
        <div className="p-6">
          {hasContent ? (
            <div className="space-y-3">
              <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line break-words">
                {content.length > 150
                  ? `${content.substring(0, 150)}...`
                  : content}
              </div>
              {content.length > 150 && (
                <div className="text-xs text-gray-500 dark:text-gray-400 italic">
                  {content.length} karakter total
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                Belum ada konten
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Isi form untuk melihat preview
              </p>
            </div>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
          <div
            className={`w-full h-full rounded-full ${theme.icon.replace(
              "bg-gradient-to-r",
              "bg-gradient-to-br"
            )} blur-xl`}
          ></div>
        </div>
        <div className="absolute bottom-0 left-0 w-16 h-16 opacity-5">
          <div
            className={`w-full h-full rounded-full ${theme.icon.replace(
              "bg-gradient-to-r",
              "bg-gradient-to-tl"
            )} blur-lg`}
          ></div>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="flex items-center justify-between mt-3 text-xs">
        <div
          className={`flex items-center gap-2 ${
            hasContent ? "text-green-600 dark:text-green-400" : "text-gray-400"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              hasContent ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>
          {hasContent ? "Konten tersedia" : "Menunggu input"}
        </div>
        {hasContent && (
          <div className="text-gray-500 dark:text-gray-400">
            {content.length} karakter
          </div>
        )}
      </div>
    </div>
  );
}
