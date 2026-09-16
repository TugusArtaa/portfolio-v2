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
    bgColor: "bg-black",
    glowColor: "shadow-black/5",
    hoverGlow: "group-hover:shadow-black/10",
    iconBg: "bg-zinc-100",
    iconColor: "text-black",
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
    bgColor: "bg-black",
    glowColor: "shadow-black/5",
    hoverGlow: "group-hover:shadow-black/10",
    iconBg: "bg-zinc-100",
    iconColor: "text-black",
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
    bgColor: "bg-black",
    glowColor: "shadow-black/5",
    hoverGlow: "group-hover:shadow-black/10",
    iconBg: "bg-zinc-100",
    iconColor: "text-black",
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
    bgColor: "bg-black",
    glowColor: "shadow-black/5",
    hoverGlow: "group-hover:shadow-black/10",
    iconBg: "bg-zinc-100",
    iconColor: "text-black",
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
    bgColor: "bg-black",
    glowColor: "shadow-black/5",
    hoverGlow: "group-hover:shadow-black/10",
    iconBg: "bg-zinc-100",
    iconColor: "text-black",
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
      <div className="min-h-screen bg-zinc-50">
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
                className="w-16 h-16 text-black"
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
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
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
              <div className="flex items-center text-xs text-zinc-500">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                Sistem berjalan normal
              </div>
            }
          />

          {/* Quick Stats Card */}
          <InfoCard
            icon={
              <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center">
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
