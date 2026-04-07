interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(current: number, total: number): (number | '...')[] {
  const pages: (number | '...')[] = [];
  const around = [current - 1, current, current + 1].filter(
    (p) => p >= 1 && p <= total,
  );

  // Always include page 1
  pages.push(1);

  // Add ellipsis if gap between 1 and the around-group
  if (around[0] > 2) {
    pages.push('...');
  }

  // Add around-group pages (skip 1 and last since they're always added)
  for (const p of around) {
    if (p !== 1 && p !== total) {
      pages.push(p);
    }
  }

  // Add ellipsis if gap between around-group and last page
  if (around[around.length - 1] < total - 1) {
    pages.push('...');
  }

  // Always include last page (if more than 1 page)
  if (total > 1) {
    pages.push(total);
  }

  return pages;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="mt-8">
      <div className="flex justify-center items-center gap-2 flex-wrap">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className={`rounded-lg px-4 h-10 flex items-center justify-center transition-colors cursor-pointer ${
            currentPage === 1
              ? 'opacity-50 cursor-not-allowed text-gray-400'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          &lt; Previous
        </button>

        {pages.map((page, index) =>
          page === '...' ? (
            <span
              key={`ellipsis-${index}`}
              className="min-w-[40px] h-10 flex items-center justify-center text-gray-400"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
              className={`min-w-[40px] h-10 flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
                page === currentPage
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className={`rounded-lg px-4 h-10 flex items-center justify-center transition-colors cursor-pointer ${
            currentPage === totalPages
              ? 'opacity-50 cursor-not-allowed text-gray-400'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Next &gt;
        </button>
      </div>

      <p className="text-sm text-gray-500 text-center mt-2">
        Page {currentPage} of {totalPages} (20 Pokémon shown)
      </p>
    </div>
  );
}
