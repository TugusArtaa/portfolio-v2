"use client";

import React from "react";

interface ToolsPreviewProps {
  name: string;
  level: string;
  icon: string;
}

// Level config mirip SkillPreview
const getLevelConfig = (level: string) => {
  const configs = {
    Beginner: {
      color: "from-emerald-400 to-green-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      textColor: "text-emerald-700 dark:text-emerald-300",
      borderColor: "border-emerald-200 dark:border-emerald-800",
      progress: 25,
      emoji: "🌱",
    },
    Intermediate: {
      color: "from-amber-400 to-yellow-500",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      textColor: "text-amber-700 dark:text-amber-300",
      borderColor: "border-amber-200 dark:border-amber-800",
      progress: 50,
      emoji: "⚡",
    },
    Advanced: {
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-700 dark:text-blue-300",
      borderColor: "border-blue-200 dark:border-blue-800",
      progress: 75,
      emoji: "🚀",
    },
    Expert: {
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      textColor: "text-purple-700 dark:text-purple-300",
      borderColor: "border-purple-200 dark:border-purple-800",
      progress: 100,
      emoji: "👑",
    },
  };
  return configs[level as keyof typeof configs] || configs["Beginner"];
};

export default function ToolsPreview({ name, level, icon }: ToolsPreviewProps) {
  const levelConfig = getLevelConfig(level);

  return (
    <div className="group">
      <div className="relative p-5 rounded-2xl bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-800 dark:to-slate-900/50 border border-slate-200/80 dark:border-slate-700/80 shadow-md backdrop-blur-sm">
        <div className="flex items-center gap-4">
          {/* Icon Container */}
          <div className="relative flex-shrink-0">
            {/* Glow Effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${levelConfig.color} opacity-10 rounded-xl blur-sm`}
            ></div>
            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white border-2 border-slate-100 shadow-inner">
              {icon ? (
                icon.startsWith("http") ||
                icon.startsWith("/uploads/") ||
                icon.startsWith("data:image/") ? (
                  <div className="p-2 w-full h-full">
                    <img
                      src={icon}
                      alt={name}
                      className="object-contain w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <span
                      dangerouslySetInnerHTML={{ __html: icon }}
                      className="text-xl"
                    />
                  </div>
                )
              ) : (
                <div
                  className={`w-full h-full flex items-center justify-center text-lg font-bold text-white bg-gradient-to-br ${levelConfig.color}`}
                >
                  {name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-slate-900 dark:text-white truncate text-lg leading-tight">
                {name || "Nama Tool"}
              </h3>
              {name && (
                <div className="w-1 h-1 bg-slate-400 dark:bg-slate-500 rounded-full"></div>
              )}
            </div>
            {/* Level Badge & Progress */}
            {level && (
              <div className="space-y-2">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold ${levelConfig.bgColor} ${levelConfig.textColor} ${levelConfig.borderColor} border backdrop-blur-sm shadow-sm`}
                >
                  <span className="text-base leading-none">
                    {levelConfig.emoji}
                  </span>
                  <span>{level}</span>
                </div>
                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Tool Level</span>
                    <span className="font-medium">{levelConfig.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2 overflow-hidden shadow-inner">
                    <div
                      className={`h-full bg-gradient-to-r ${levelConfig.color} rounded-full transition-all duration-500 ease-out shadow-sm`}
                      style={{ width: `${levelConfig.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Decorative dots */}
        <div className="absolute top-2 right-2 w-1 h-1 bg-blue-400/40 rounded-full opacity-100"></div>
        <div className="absolute bottom-2 left-2 w-1 h-1 bg-purple-400/40 rounded-full opacity-100"></div>
      </div>
    </div>
  );
}
