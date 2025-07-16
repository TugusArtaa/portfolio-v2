"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  itemLabel?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  itemLabel = "item",
}: PaginationProps) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  if (totalPages <= 1) return null;

  return (
    <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-2xl shadow-md border border-white/20 dark:border-slate-700/50 p-6 mb-8">
      {/* Mobile Pagination */}
      <div className="flex md:hidden items-center justify-between">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="group flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-medium rounded-xl shadow-lg disabled:shadow-none transition-all duration-200 disabled:cursor-not-allowed"
        >
          <svg
            className="w-4 h-4 group-disabled:opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="hidden xs:inline">Previous</span>
        </button>

        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-xl">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {currentPage} / {totalPages}
          </span>
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="group flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-medium rounded-xl shadow-lg disabled:shadow-none transition-all duration-200 disabled:cursor-not-allowed"
        >
          <span className="hidden xs:inline">Next</span>
          <svg
            className="w-4 h-4 group-disabled:opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Desktop Pagination */}
      <div className="hidden md:flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Previous Button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 hover:from-blue-500 hover:to-blue-600 dark:hover:from-blue-500 dark:hover:to-blue-600 text-slate-700 dark:text-slate-300 hover:text-white font-medium rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-slate-100 disabled:hover:to-slate-200 dark:disabled:hover:from-slate-700 dark:disabled:hover:to-slate-600 disabled:hover:text-slate-700 dark:disabled:hover:text-slate-300"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Previous</span>
          </button>
        </div>

        {/* Page Numbers */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            const isActive = page === currentPage;
            const showPage =
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1);

            if (showPage) {
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`relative px-4 py-3 text-sm font-bold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                      : "bg-white/60 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:text-white border border-slate-200 dark:border-slate-600 hover:border-transparent"
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl blur opacity-50 animate-pulse"></div>
                  )}
                  <span className="relative">{page}</span>
                </button>
              );
            } else if (
              (page === currentPage - 2 && page > 1) ||
              (page === currentPage + 2 && page < totalPages)
            ) {
              return (
                <div
                  key={page}
                  className="flex items-center justify-center w-10 h-10"
                >
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>

        <div className="flex items-center gap-4">
          {/* Next Button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 hover:from-blue-500 hover:to-blue-600 dark:hover:from-blue-500 dark:hover:to-blue-600 text-slate-700 dark:text-slate-300 hover:text-white font-medium rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-slate-100 disabled:hover:to-slate-200 dark:disabled:hover:from-slate-700 dark:disabled:hover:to-slate-600 disabled:hover:text-slate-700 dark:disabled:hover:text-slate-300"
          >
            <span>Next</span>
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Pagination Info */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span>
              Menampilkan{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {startIndex + 1}-{endIndex}
              </span>{" "}
              dari{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {totalItems}
              </span>{" "}
              {itemLabel}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span>Halaman</span>
            <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md font-semibold">
              {currentPage}
            </div>
            <span>dari</span>
            <div className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md font-semibold">
              {totalPages}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
