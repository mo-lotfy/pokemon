type View = 'pagination' | 'loadmore';

interface ViewToggleProps {
  activeView: View;
  onViewChange: (view: View) => void;
}

export default function ViewToggle({
  activeView,
  onViewChange,
}: ViewToggleProps) {
  return (
    <div className="flex justify-center gap-2" role="tablist" aria-label="View mode">
      <button
        onClick={() => onViewChange('pagination')}
        role="tab"
        aria-selected={activeView === 'pagination'}
        className={`rounded-full px-6 py-2 min-h-[44px] transition-colors cursor-pointer ${
          activeView === 'pagination'
            ? 'bg-gray-800 text-white'
            : 'bg-white text-gray-600'
        }`}
      >
        Page Controls
      </button>
      <button
        onClick={() => onViewChange('loadmore')}
        role="tab"
        aria-selected={activeView === 'loadmore'}
        className={`rounded-full px-6 py-2 min-h-[44px] transition-colors cursor-pointer ${
          activeView === 'loadmore'
            ? 'bg-gray-800 text-white'
            : 'bg-white text-gray-600'
        }`}
      >
        Infinite Scroll
      </button>
    </div>
  );
}
