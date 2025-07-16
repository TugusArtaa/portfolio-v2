"use client";

import React from "react";
import { Tool } from "@prisma/client";

// Level config mirip SkillsCard
const getLevelConfig = (level: string) => {
  const configs = {
    Beginner: {
      color: "from-emerald-400 to-green-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      textColor: "text-emerald-700 dark:text-emerald-300",
      borderColor: "border-emerald-200/50 dark:border-emerald-800/50",
      shadowColor: "shadow-emerald-500/20",
      progress: 25,
      emoji: "🌱",
    },
    Intermediate: {
      color: "from-amber-400 to-yellow-500",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      textColor: "text-amber-700 dark:text-amber-300",
      borderColor: "border-amber-200/50 dark:border-amber-800/50",
      shadowColor: "shadow-amber-500/20",
      progress: 50,
      emoji: "⚡",
    },
    Advanced: {
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-700 dark:text-blue-300",
      borderColor: "border-blue-200/50 dark:border-blue-800/50",
      shadowColor: "shadow-blue-500/20",
      progress: 75,
      emoji: "🚀",
    },
    Expert: {
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      textColor: "text-purple-700 dark:text-purple-300",
      borderColor: "border-purple-200/50 dark:border-purple-800/50",
      shadowColor: "shadow-purple-500/20",
      progress: 100,
      emoji: "👑",
    },
  };
  return configs[level as keyof typeof configs] || configs["Beginner"];
};

interface ToolsCardProps {
  tool: Tool;
  index: number;
  onEdit: (tool: Tool) => void;
  onDelete: (tool: Tool) => void;
  showActions?: boolean;
  variant?: "admin" | "public";
}

export default function ToolsCard({
  tool,
  index,
  onEdit,
  onDelete,
  showActions = true,
  variant = "admin",
}: ToolsCardProps) {
  const levelConfig = getLevelConfig(tool.level || "Beginner");

  return (
    <div
      className={`group relative bg-gradient-to-br from-white to-slate-50/80 dark:from-slate-800 dark:to-slate-900/80 backdrop-blur-xl rounded-2xl shadow-md hover:shadow-lg ${levelConfig.shadowColor} border ${levelConfig.borderColor} hover:border-opacity-100 transition-all duration-500 overflow-hidden transform hover:-translate-y-2 hover:scale-[1.0] animate-fadeInUp`}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${levelConfig.color} animate-pulse`}
        ></div>
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/30 to-transparent rounded-full blur-xl transform -translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-blue-400/20 to-transparent rounded-full blur-lg transform translate-x-8 translate-y-8 group-hover:scale-125 transition-transform duration-700"></div>
      </div>

      <div className="relative z-10 p-6 flex flex-col justify-between h-full">
        {/* Header Section */}
        <div>
          <div className="flex items-start gap-4 mb-4">
            {/* Enhanced Icon Container */}
            <div className="relative flex-shrink-0">
              {/* Glow Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${levelConfig.color} opacity-30 rounded-xl blur-sm group-hover:opacity-50 transition-all duration-300`}
              ></div>

              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white dark:bg-white border-2 border-white/50 shadow-md group-hover:rotate-3 transition-transform duration-300">
                {tool.icon ? (
                  tool.icon.startsWith("http") ||
                  tool.icon.startsWith("/uploads/") ||
                  tool.icon.startsWith("data:image/") ? (
                    <div className="p-1.5 w-full h-full">
                      <img
                        src={tool.icon}
                        alt={tool.name}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <span
                        dangerouslySetInnerHTML={{ __html: tool.icon }}
                        className="text-lg"
                      />
                    </div>
                  )
                ) : (
                  <div
                    className={`w-full h-full flex items-center justify-center text-lg font-bold text-white bg-gradient-to-br ${levelConfig.color}`}
                  >
                    {tool.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {tool.name}
              </h3>

              {/* Level Badge */}
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-semibold ${levelConfig.bgColor} ${levelConfig.textColor} border ${levelConfig.borderColor} backdrop-blur-sm shadow-sm`}
              >
                <span className="text-base leading-none">
                  {levelConfig.emoji}
                </span>
                <span>{tool.level}</span>
              </div>
            </div>
          </div>

          {/* Progress Visualization */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Tool Level</span>
              <span className="font-medium">{levelConfig.progress}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden shadow-inner">
              <div
                className={`h-full bg-gradient-to-r ${levelConfig.color} rounded-full transition-all duration-1000 ease-out shadow-sm group-hover:shadow-lg`}
                style={{ width: `${levelConfig.progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {showActions && variant === "admin" && (
          <div className="flex gap-3">
            <button
              onClick={() => onEdit(tool)}
              className="flex-1 group/btn relative overflow-hidden inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl hover:from-slate-200 hover:to-slate-300 dark:hover:from-slate-600 dark:hover:to-slate-500 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
              <svg
                className="relative w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <span className="relative">Edit</span>
            </button>

            <button
              onClick={() => onDelete(tool)}
              className="group/btn relative overflow-hidden inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40 text-red-700 dark:text-red-400 text-sm font-semibold rounded-xl hover:from-red-200 hover:to-red-300 dark:hover:from-red-800/60 dark:hover:to-red-700/60 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-200/0 via-red-200/40 to-red-200/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
              <svg
                className="relative w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Enhanced Bottom Progress Indicator */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${levelConfig.color} transform scale-x-0 group-hover:scale-x-100 transition-all duration-500 origin-left shadow-lg`}
      ></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-4 left-4 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
        <div
          className="absolute top-6 right-8 w-1 h-1 bg-purple-400 rounded-full animate-ping"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-8 left-6 w-1 h-1 bg-pink-400 rounded-full animate-ping"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Corner Shine Effect */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/20 to-transparent rounded-tr-2xl transform rotate-45 translate-x-10 -translate-y-10 group-hover:scale-125 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
    </div>
  );
}
