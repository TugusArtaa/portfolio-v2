import React from "react";

interface SkillPreviewProps {
  name: string;
  level: string;
  icon: string;
}

const getLevelConfig = (level: string) => {
  const configs = {
    Beginner: {
      color: "from-zinc-400 to-zinc-600",
      bgColor: "bg-zinc-100",
      textColor: "text-zinc-700",
      borderColor: "border-zinc-200",
      progress: 25,
      emoji: "🌱",
    },
    Intermediate: {
      color: "from-zinc-500 to-zinc-700",
      bgColor: "bg-zinc-100",
      textColor: "text-zinc-800",
      borderColor: "border-zinc-200",
      progress: 50,
      emoji: "⚡",
    },
    Advanced: {
      color: "from-zinc-600 to-zinc-800",
      bgColor: "bg-zinc-100",
      textColor: "text-zinc-900",
      borderColor: "border-zinc-300",
      progress: 75,
      emoji: "🚀",
    },
    Expert: {
      color: "from-zinc-700 to-black",
      bgColor: "bg-zinc-100",
      textColor: "text-black font-bold",
      borderColor: "border-zinc-300",
      progress: 100,
      emoji: "👑",
    },
  };
  return configs[level as keyof typeof configs] || configs["Beginner"];
};

export default function SkillPreview({ name, level, icon }: SkillPreviewProps) {
  const levelConfig = getLevelConfig(level);

  return (
    <div className="group">
      <div className="p-5 rounded-2xl bg-white border border-black/10 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Icon Container */}
          <div className="relative flex-shrink-0">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-zinc-50 border border-black/10 shadow-sm">
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
                <div className="w-full h-full flex items-center justify-center text-lg font-bold text-white bg-black">
                  {name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-black truncate text-lg leading-tight">
                {name || "Nama Skill"}
              </h3>
            </div>

            {/* Level Badge & Progress */}
            {level && (
              <div className="space-y-2">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold ${levelConfig.bgColor} ${levelConfig.textColor} ${levelConfig.borderColor} border`}
                >
                  <span className="text-base leading-none">
                    {levelConfig.emoji}
                  </span>
                  <span>{level}</span>
                </div>

                {/* Enhanced Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>Skill Level</span>
                    <span className="font-medium text-black">{levelConfig.progress}%</span>
                  </div>
                  <div className="w-full bg-zinc-100 rounded-full h-2 overflow-hidden border border-black/5">
                    <div
                      className="h-full bg-black rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${levelConfig.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
