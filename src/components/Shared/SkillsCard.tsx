"use client";

import { Skill } from "@prisma/client";

interface SkillsCardProps {
  skill: Skill;
  index: number;
  onDelete: (skill: Skill) => void;
  onEdit: (skill: Skill) => void;
  showActions?: boolean;
  variant?: "admin" | "public";
}

const getLevelConfig = (level: string) => {
  const configs = {
    Beginner: {
      color: "from-zinc-400 to-zinc-600",
      bgColor: "bg-zinc-100",
      textColor: "text-zinc-700",
      borderColor: "border-zinc-200",
      shadowColor: "shadow-zinc-500/10",
      progress: 25,
      emoji: "🌱",
    },
    Intermediate: {
      color: "from-zinc-500 to-zinc-700",
      bgColor: "bg-zinc-100",
      textColor: "text-zinc-800",
      borderColor: "border-zinc-200",
      shadowColor: "shadow-zinc-500/10",
      progress: 50,
      emoji: "⚡",
    },
    Advanced: {
      color: "from-zinc-600 to-zinc-800",
      bgColor: "bg-zinc-100",
      textColor: "text-zinc-900",
      borderColor: "border-zinc-300",
      shadowColor: "shadow-zinc-500/10",
      progress: 75,
      emoji: "🚀",
    },
    Expert: {
      color: "from-zinc-700 to-black",
      bgColor: "bg-zinc-100",
      textColor: "text-black font-bold",
      borderColor: "border-zinc-300",
      shadowColor: "shadow-zinc-500/10",
      progress: 100,
      emoji: "👑",
    },
  };
  return configs[level as keyof typeof configs] || configs["Beginner"];
};

export default function SkillsCard({
  skill,
  index,
  onDelete,
  onEdit,
  showActions = true,
  variant = "admin",
}: SkillsCardProps) {
  const levelConfig = getLevelConfig(skill.level || "Beginner");

  return (
    <div
      className="group relative bg-white backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-md border border-black/10 hover:border-black/25 transition-all duration-300 overflow-hidden transform hover:-translate-y-1 animate-fadeInUp"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="relative z-10 p-6 flex flex-col justify-between h-full">
        {/* Header Section */}
        <div>
          <div className="flex items-start gap-4 mb-4">
            {/* Enhanced Icon Container */}
            <div className="relative flex-shrink-0">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-zinc-50 border border-black/10 shadow-sm transition-transform duration-200">
                {skill.icon ? (
                  skill.icon.startsWith("http") ||
                  skill.icon.startsWith("/uploads/") ||
                  skill.icon.startsWith("data:image/") ? (
                    <div className="p-1.5 w-full h-full">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <span
                        dangerouslySetInnerHTML={{ __html: skill.icon }}
                        className="text-lg"
                      />
                    </div>
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-lg font-bold text-white bg-black">
                    {skill.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-black mb-1 group-hover:text-zinc-700 transition-colors duration-200">
                {skill.name}
              </h3>

              {/* Level Badge */}
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-semibold ${levelConfig.bgColor} ${levelConfig.textColor} border ${levelConfig.borderColor}`}
              >
                <span className="text-base leading-none">
                  {levelConfig.emoji}
                </span>
                <span>{skill.level}</span>
              </div>
            </div>
          </div>

          {/* Progress Visualization */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-xs text-zinc-500">
              <span>Skill Level</span>
              <span className="font-medium text-black">{levelConfig.progress}%</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2 overflow-hidden border border-black/5">
              <div
                className="h-full bg-black rounded-full transition-all duration-700 ease-out"
                style={{ width: `${levelConfig.progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {showActions && variant === "admin" && (
          <div className="flex gap-3">
            <button
              onClick={() => onEdit(skill)}
              className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-sm font-semibold rounded-xl transition-all duration-200"
            >
              <svg
                className="w-4 h-4 mr-2"
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
              <span>Edit</span>
            </button>

            <button
              onClick={() => onDelete(skill)}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-sm font-semibold rounded-xl transition-all duration-200"
            >
              <svg
                className="w-4 h-4"
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

      {/* Bottom Progress Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
}
