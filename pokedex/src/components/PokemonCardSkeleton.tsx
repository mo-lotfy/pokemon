export default function PokemonCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow animate-pulse">
      <div className="bg-blue-50 flex items-center justify-center p-4">
        <div className="w-32 h-32 bg-gray-200 rounded-lg" />
      </div>
      <div className="p-3 flex flex-col items-center gap-2">
        <div className="h-5 w-24 bg-gray-200 rounded" />
        <div className="h-4 w-12 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
