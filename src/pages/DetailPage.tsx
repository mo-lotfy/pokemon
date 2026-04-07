import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import usePokemonDetail from '../hooks/usePokemonDetail';
import ErrorState from '../components/ErrorState';

const TYPE_COLORS: Record<string, string> = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
};

const STAT_NAMES: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Attack',
  'special-defense': 'Sp. Defense',
  speed: 'Speed',
};

function DetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-10 w-32 bg-gray-200 rounded-lg mb-6" />

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 flex flex-col items-center gap-3">
          <div className="h-8 w-48 bg-white/30 rounded" />
          <div className="h-5 w-16 bg-white/20 rounded" />
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 bg-gray-100 rounded-full -mt-32" />
              <div className="flex gap-2 mt-4">
                <div className="h-7 w-16 bg-gray-200 rounded-full" />
                <div className="h-7 w-16 bg-gray-200 rounded-full" />
              </div>
              <div className="border border-gray-200 rounded-xl flex mt-4 w-full">
                <div className="flex-1 p-4 flex flex-col items-center gap-1">
                  <div className="h-4 w-12 bg-gray-200 rounded" />
                  <div className="h-6 w-16 bg-gray-200 rounded" />
                </div>
                <div className="border-r border-gray-200" />
                <div className="flex-1 p-4 flex flex-col items-center gap-1">
                  <div className="h-4 w-12 bg-gray-200 rounded" />
                  <div className="h-6 w-16 bg-gray-200 rounded" />
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <div className="h-6 w-24 bg-gray-200 rounded mb-3" />
                <div className="space-y-3">
                  {Array.from({ length: 6 }, (_, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1">
                        <div className="w-20 h-4 bg-gray-200 rounded" />
                        <div className="w-8 h-4 bg-gray-200 rounded" />
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="h-6 w-20 bg-gray-200 rounded mb-3" />
                <div className="flex gap-2">
                  <div className="h-7 w-20 bg-gray-200 rounded-full" />
                  <div className="h-7 w-24 bg-gray-200 rounded-full" />
                </div>
              </div>
              <div>
                <div className="h-6 w-32 bg-gray-200 rounded mb-3" />
                <div className="h-8 w-16 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error, refetch } = usePokemonDetail(
    id ?? '',
  );

  useEffect(() => {
    if (data) {
      document.title = `${data.name.charAt(0).toUpperCase() + data.name.slice(1)} | Pokédex`;
    }
    return () => {
      document.title = 'Pokédex';
    };
  }, [data]);

  if (isLoading) return <DetailSkeleton />;

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 w-auto bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition text-gray-600 hover:text-gray-800 mb-6"
        >
          &larr; Back to List
        </Link>
        <ErrorState
          message={error?.message ?? 'Failed to load Pokémon'}
          onRetry={refetch}
        />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 w-auto bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition text-gray-600 hover:text-gray-800 mb-6"
      >
        &larr; Back to List
      </Link>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-center text-white">
          <h1 className="text-3xl font-bold capitalize">⚡ {data.name}</h1>
          <p className="text-white/70 text-lg">
            #{String(data.id).padStart(3, '0')}
          </p>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 flex-col items-center">
              <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <img
                  src={
                    data.sprites.other['official-artwork'].front_default ??
                    data.sprites.front_default
                  }
                  alt={data.name}
                  className="w-56 h-56 object-contain"
                />
              </div>

              <div className="flex gap-2 mt-4 w-full justify-center">
                {data.types.map((t) => (
                  <span
                    key={t.type.name}
                    className="px-3 py-1 rounded-full text-white text-sm font-semibold capitalize"
                    style={{
                      backgroundColor: TYPE_COLORS[t.type.name] ?? '#A8A878',
                    }}
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>

              <div className="overflow-hidden flex mt-4 w-full gap-2">
                <div className="flex-1 p-4 text-center bg-gray-50 rounded-xl overflow-hidden">
                  <p className="text-sm text-gray-500">📏 Height</p>
                  <p className="font-bold text-lg mt-1">
                    {(data.height / 10).toFixed(1)} m
                  </p>
                </div>
                <div className="flex-1 p-4 text-center bg-gray-50 rounded-xl overflow-hidden">
                  <p className="text-sm text-gray-500">⚖️ Weight</p>
                  <p className="font-bold text-lg mt-1">
                    {(data.weight / 10).toFixed(1)} kg
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <h2 className="font-bold text-lg mb-3">Base Stats</h2>
                <div className="space-y-3">
                  {data.stats.map((s) => (
                    <div key={s.stat.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {STAT_NAMES[s.stat.name] ?? s.stat.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {s.base_stat}
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div
                          className="bg-gray-800 h-2.5 rounded-full"
                          style={{
                            width: `${(s.base_stat / 255) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-bold text-lg mt-6 mb-3">Abilities</h2>
                <div className="flex flex-wrap gap-2">
                  {data.abilities.map((a) => (
                    <span
                      key={a.ability.name}
                      className="bg-gray-100 rounded-full px-3 py-1 text-sm capitalize"
                    >
                      {a.ability.name.replace(/-/g, ' ')}
                      {a.is_hidden && (
                        <span className="text-xs text-gray-400 ml-1">
                          (Hidden)
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h2 className="font-bold text-lg mb-3">Base Experience</h2>
                <span className="text-2xl font-bold text-green-600">
                  {data.base_experience ?? 'Unknown'}{' '}
                  {data.base_experience != null && 'XP'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
