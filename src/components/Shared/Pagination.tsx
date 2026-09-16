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
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm border border-black/10 p-6 mb-8">
      {/* Mobile Pagination */}
      <div className="flex md:hidden items-center justify-between">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="group flex items-center gap-2 px-4 py-3 bg-black hover:bg-zinc-800 disabled:bg-zinc-200 disabled:text-zinc-400 text-white font-medium rounded-xl transition-all duration-200 disabled:cursor-not-allowed"
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

        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-100 rounded-xl">
          <span className="text-sm font-medium text-zinc-800">
            {currentPage} / {totalPages}
          </span>
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="group flex items-center gap-2 px-4 py-3 bg-black hover:bg-zinc-800 disabled:bg-zinc-200 disabled:text-zinc-400 text-white font-medium rounded-xl transition-all duration-200 disabled:cursor-not-allowed"
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
            className="group flex items-center gap-3 px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-zinc-100"
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
                  className={`relative px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-black text-white shadow-sm"
                      : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200 border border-black/5"
                  }`}
                >
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
                    <div className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce"
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
            className="group flex items-center gap-3 px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-zinc-100"
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
      <div className="mt-6 pt-4 border-t border-black/10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-zinc-600">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>
              Menampilkan{" "}
              <span className="font-semibold text-black">
                {startIndex + 1}-{endIndex}
              </span>{" "}
              dari{" "}
              <span className="font-semibold text-black">
                {totalItems}
              </span>{" "}
              {itemLabel}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span>Halaman</span>
            <div className="px-2 py-1 bg-zinc-100 text-black rounded-md font-semibold border border-black/5">
              {currentPage}
            </div>
            <span>dari</span>
            <div className="px-2 py-1 bg-zinc-100 text-zinc-700 rounded-md font-semibold border border-black/5">
              {totalPages}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
