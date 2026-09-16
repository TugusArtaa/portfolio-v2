import React from "react";
import { About } from "@prisma/client";

interface AboutIdOption {
  value: string;
  label: string;
  icon: string;
  color: string;
}

interface AboutIdPickerProps {
  ABOUT_IDS: AboutIdOption[];
  existing?: About;
  availableIds: AboutIdOption[];
  displayedIds: AboutIdOption[];
  formId: string;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  showAllIds: boolean;
  setShowAllIds: (show: boolean) => void;
  handleIdSelect: (id: string) => void;
}

export default function AboutIdPicker({
  ABOUT_IDS,
  existing,
  availableIds,
  displayedIds,
  formId,
  errors,
  touched,
  showAllIds,
  setShowAllIds,
  handleIdSelect,
}: AboutIdPickerProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-zinc-700 block">
          Pilih Bagian About <span className="text-rose-500">*</span>
        </label>
        {!existing && availableIds.length > 6 && (
          <button
            type="button"
            onClick={() => setShowAllIds(!showAllIds)}
            className="text-sm text-black hover:underline font-medium transition-colors"
          >
            {showAllIds
              ? "Tampilkan Sedikit"
              : `Lihat Semua (${availableIds.length})`}
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {displayedIds.map((opt) => (
          <button
            key={opt.value}
            type="button"
            disabled={!!existing}
            onClick={() => handleIdSelect(opt.value)}
            className={`
              relative p-4 rounded-xl border-2 transition-all duration-200
              ${
                formId === opt.value
                  ? "bg-zinc-100 border-black shadow-sm transform scale-102"
                  : "bg-white border-zinc-200 hover:border-black/30 hover:shadow-sm"
              }
              ${existing ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              group
            `}
          >
            <div className="flex flex-col items-center space-y-2">
              <div
                className={`
                text-2xl transition-transform duration-200
                ${formId === opt.value ? "scale-110" : "group-hover:scale-105"}
              `}
              >
                {opt.icon}
              </div>
              <div className="text-sm font-medium text-black text-center leading-tight">
                {opt.label}
              </div>
            </div>

            {formId === opt.value && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-black rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
          </button>
        ))}
        {/* Dummy card if no ID available */}
        {!existing && availableIds.length === 0 && (
          <div className="col-span-2 md:col-span-3 flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50 text-zinc-400 text-center">
            <div className="font-semibold">Semua ID sudah digunakan</div>
            <div className="text-xs mt-1">
              Tidak ada ID about yang tersedia untuk ditambahkan
            </div>
          </div>
        )}
      </div>

      {touched.id && errors.id && (
        <div className="flex items-center space-x-2 text-rose-600">
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
          <p className="text-sm">{errors.id}</p>
        </div>
      )}

      {formId && (
        <div className="bg-zinc-100 border border-black/10 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <div className="text-lg">
              {ABOUT_IDS.find((opt) => opt.value === formId)?.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-black">
                Bagian about yang di pilih:{" "}
                {ABOUT_IDS.find((opt) => opt.value === formId)?.label}
              </p>
              <p className="text-xs text-zinc-500">
                {formId}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
