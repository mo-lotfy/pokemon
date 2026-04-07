interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <p className="text-red-500 text-lg font-semibold">Error</p>
      <p className="text-gray-600">{message}</p>
      <button
        onClick={onRetry}
        aria-label="Retry"
        className="bg-gray-800 text-white rounded-full px-6 py-2 hover:bg-gray-700 transition-colors cursor-pointer"
      >
        Try Again
      </button>
    </div>
  );
}
