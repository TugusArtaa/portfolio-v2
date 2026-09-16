"use client";

interface FormLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  onCancel?: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
  isSubmitting?: boolean;
  preview?: React.ReactNode;
}

export default function FormLayout({
  title,
  subtitle,
  children,
  onCancel,
  onSubmit,
  submitLabel = "Simpan",
  isSubmitting = false,
  preview,
}: FormLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-50 py-8">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm border border-black/10 overflow-hidden">
          {/* Header */}
          <div className="relative bg-zinc-50 border-b border-black/10 p-8 text-black overflow-hidden">
            <div className="relative">
              <h1 className="text-3xl font-black text-black tracking-tight leading-tight mb-2">
                {title}
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-zinc-600 text-sm font-medium">
                  {subtitle}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form Section */}
              <div className="space-y-6">{children}</div>

              {/* Preview Section */}
              {preview && (
                <div className="space-y-6">
                  <div className="sticky top-8">
                    <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      Preview
                    </h3>
                    {preview}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-8 pt-6 border-t border-black/10">
              <div className="flex gap-4 justify-end">
                {onCancel && (
                  <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-3 bg-zinc-100 text-zinc-700 font-semibold rounded-xl hover:bg-zinc-200 transition-colors duration-200"
                  >
                    Batal
                  </button>
                )}
                {onSubmit && (
                  <button
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    className="inline-flex items-center px-8 py-3 bg-black hover:bg-zinc-800 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin w-5 h-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span className="relative">Menyimpan...</span>
                      </>
                    ) : (
                      <span className="relative">{submitLabel}</span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
