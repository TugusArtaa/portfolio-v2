import React from "react";

export interface LevelOption {
  label: string;
  value: string;
  color?: string;
}

interface LevelPickerProps {
  label?: string;
  value: string;
  options: LevelOption[];
  onSelect: (level: string) => void;
  error?: string;
  touched?: boolean;
  required?: boolean;
}

export default function LevelPicker({
  label = "Level",
  value,
  options,
  onSelect,
  error,
  touched,
  required,
}: LevelPickerProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-zinc-700 block">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <div className="flex gap-2 flex-wrap">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`px-4 py-2 rounded-xl font-semibold border transition-all duration-200 focus:outline-none
              ${
                value === opt.value
                  ? "bg-black text-white border-black"
                  : "bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-zinc-200"
              }
            `}
            onClick={() => onSelect(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {touched && error && (
        <p className="text-sm text-rose-600 flex items-center gap-1">
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
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
