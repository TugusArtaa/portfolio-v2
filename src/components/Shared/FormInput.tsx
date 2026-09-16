"use client";

import React from "react";

interface FormInputProps {
  label: string;
  name: string;
  type?: "text" | "email" | "password" | "url" | "textarea" | "date"; // tambahkan "date"
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  icon?: React.ReactNode;
  iconColor?: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  helpText?: string;
  error?: string;
  onBlur?: () => void;
}

export default function FormInput({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  iconColor = "blue-500",
  rows = 4,
  required = false,
  disabled = false,
  helpText,
  error,
  onBlur,
}: FormInputProps) {
  const hasError = !!error;
  const borderColor = hasError
    ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20"
    : "border-black/10 focus:border-black focus:ring-black/10";

  const inputClasses = `w-full px-4 py-3 bg-white border ${borderColor} rounded-xl focus:ring-1 transition-all duration-200 text-black placeholder-zinc-400 ${
    type === "textarea" ? "resize-none" : ""
  } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${
    hasError ? "pr-12" : ""
  }`;

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-semibold text-zinc-700">
        {icon && (
          <div className={`w-4 h-4 ${hasError ? "text-rose-500" : "text-black"}`}>
            {icon}
          </div>
        )}
        {label} {required && <span className="text-rose-500">*</span>}
      </label>

      <div className="relative">
        {type === "textarea" ? (
          <textarea
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            rows={rows}
            required={required}
            disabled={disabled}
            className={inputClasses}
          />
        ) : (
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            disabled={disabled}
            className={inputClasses}
          />
        )}

        {hasError && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-rose-500"
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
          </div>
        )}
      </div>

      {error && (
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

      {helpText && !error && (
        <p className="text-xs text-zinc-500">{helpText}</p>
      )}
    </div>
  );
}
