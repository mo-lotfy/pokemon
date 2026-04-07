interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading: boolean;
  hasNextPage: boolean;
}

export default function LoadMoreButton({
  onClick,
  isLoading,
  hasNextPage,
}: LoadMoreButtonProps) {
  if (!hasNextPage) {
    return (
      <p className="text-sm text-gray-500 text-center">All Pokémon loaded</p>
    );
  }

  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        disabled={isLoading}
        className="bg-gray-800 text-white rounded-full px-6 py-2 min-h-[44px] hover:bg-gray-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Loading more Pokémon...
          </span>
        ) : (
          'Load More'
        )}
      </button>
    </div>
  );
}
