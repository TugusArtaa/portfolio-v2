"use client";

import { useState, useEffect } from "react";
import WelcomeSection from "@/components/Shared/WelcomeSection";
import LoadingSkeleton from "@/components/Shared/LoadingSkeleton";
import DashboardCard from "@/components/Shared/DashboardCard";
import QuickActionCard from "@/components/Shared/QuickActionCard";
import InfoCard from "@/components/Shared/InfoCard";

const DASHBOARD_CARDS = [
  {
    key: "projects",
    label: "Proyek",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
    bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
    glowColor: "shadow-blue-500/25",
    hoverGlow: "group-hover:shadow-blue-500/40",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    link: "/admin/projects",
  },
  {
    key: "skills",
    label: "Skills",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    bgColor: "bg-gradient-to-br from-amber-500 to-orange-600",
    glowColor: "shadow-amber-500/25",
    hoverGlow: "group-hover:shadow-amber-500/40",
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    link: "/admin/skills",
  },
  {
    key: "sertifikat",
    label: "Sertifikat",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
    bgColor: "bg-gradient-to-br from-emerald-500 to-teal-600",
    glowColor: "shadow-emerald-500/25",
    hoverGlow: "group-hover:shadow-emerald-500/40",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    link: "/admin/sertifikat",
  },
  {
    key: "tools",
    label: "Tools",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    bgColor: "bg-gradient-to-br from-purple-500 to-indigo-600",
    glowColor: "shadow-purple-500/25",
    hoverGlow: "group-hover:shadow-purple-500/40",
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-600 dark:text-purple-400",
    link: "/admin/tools",
  },
  {
    key: "about",
    label: "About",
    icon: (
      <svg
        className="w-8 h-8"
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
    bgColor: "bg-gradient-to-br from-pink-500 to-rose-600",
    glowColor: "shadow-pink-500/25",
    hoverGlow: "group-hover:shadow-pink-500/40",
    iconBg: "bg-pink-100 dark:bg-pink-900/30",
    iconColor: "text-pink-600 dark:text-pink-400",
    link: "/admin/about",
  },
];

export default function DashboardPage() {
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [stats, setStats] = useState<Record<string, number>>({
    projects: 0,
    skills: 0,
    sertifikat: 0,
    tools: 0,
    about: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString("id-ID"));
    setLoading(true);

    Promise.all([
      fetch("/api/project")
        .then((r) => r.json())
        .catch(() => []),
      fetch("/api/skills")
        .then((r) => r.json())
        .catch(() => []),
      fetch("/api/sertifikat")
        .then((r) => r.json())
        .catch(() => []),
      fetch("/api/tools")
        .then((r) => r.json())
        .catch(() => []),
      fetch("/api/about")
        .then((r) => r.json())
        .catch(() => []),
    ])
      .then(([projects, skills, sertifikat, tools, about]) => {
        setStats({
          projects: projects.length,
          skills: skills.length,
          sertifikat: sertifikat.length,
          tools: tools.length,
          about: about.length,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
          <div className="max-w-7xl mx-auto">
            <LoadingSkeleton variant="header" />
            <LoadingSkeleton variant="stats" count={4} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"></div>
            <LoadingSkeleton variant="quickActions" count={4} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative px-4 sm:px-6 lg:px-8 pt-8 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Welcome Section */}
        <div className="mb-12">
          <WelcomeSection
            title="Selamat Datang Kembali!"
            subtitle="Kelola portfolio Anda dengan mudah dan efisien"
            lastUpdated={lastUpdated}
            icon={
              <svg
                className="w-16 h-16 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            }
          />
        </div>

        {/* Modern Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {DASHBOARD_CARDS.map((card, index) => (
            <DashboardCard
              key={card.key}
              label={card.label}
              icon={card.icon}
              iconBg={card.iconBg}
              iconColor={card.iconColor}
              bgColor={card.bgColor}
              glowColor={card.glowColor}
              hoverGlow={card.hoverGlow}
              link={card.link}
              value={stats[card.key]}
            />
          ))}
        </div>

        {/* Quick Actions Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity Card */}
          <InfoCard
            icon={
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            }
            title="Aktivitas Terbaru"
            description={`Dashboard terakhir diperbarui pada ${lastUpdated}`}
            extra={
              <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Sistem berjalan normal
              </div>
            }
          />

          {/* Quick Stats Card */}
          <InfoCard
            icon={
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            }
            title="Ringkasan Data"
            value={Object.values(stats).reduce((a, b) => a + b, 0)}
            description="Total item dalam portfolio"
          />
        </div>

        {/* Quick Actions Section */}
        <div className="mt-8 hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {DASHBOARD_CARDS.slice(0, 4).map((card) => (
              <QuickActionCard
                key={card.key}
                label={card.label}
                iconBg={card.iconBg}
                iconColor={card.iconColor}
                link={`${card.link}/new`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
