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

function getStatBarColor(value: number): string {
  if (value >= 100) return '#22c55e';
  if (value >= 50) return '#facc15';
  return '#ef4444';
}

function DetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-5 w-28 bg-gray-200 rounded mb-6" />

      <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 p-8 flex flex-col items-center gap-3">
        <div className="h-8 w-48 bg-white/30 rounded" />
        <div className="h-5 w-16 bg-white/20 rounded" />
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-4">
        <div className="flex flex-col items-center">
          <div className="bg-white rounded-2xl shadow p-4 -mt-16">
            <div className="w-64 h-64 bg-gray-200 rounded-lg" />
          </div>
          <div className="flex gap-2 mt-4">
            <div className="h-7 w-16 bg-gray-200 rounded-full" />
            <div className="h-7 w-16 bg-gray-200 rounded-full" />
          </div>
          <div className="flex gap-6 mt-4">
            <div className="h-10 w-20 bg-gray-200 rounded" />
            <div className="h-10 w-20 bg-gray-200 rounded" />
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div>
            <div className="h-6 w-24 bg-gray-200 rounded mb-3" />
            <div className="space-y-2">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-24 h-4 bg-gray-200 rounded" />
                  <div className="w-10 h-4 bg-gray-200 rounded" />
                  <div className="flex-1 h-2 bg-gray-200 rounded-full" />
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
          className="text-gray-600 flex items-center gap-1 mb-6 hover:text-gray-800 transition-colors"
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
        className="text-gray-600 flex items-center gap-1 mb-6 hover:text-gray-800 transition-colors"
      >
        &larr; Back to List
      </Link>

      <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-center text-white">
        <h1 className="text-3xl font-bold capitalize">⚡ {data.name}</h1>
        <p className="text-white/70 text-lg">
          #{String(data.id).padStart(3, '0')}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-4">
        <div className="flex flex-col items-center">
          <div className="bg-white rounded-2xl shadow p-4 -mt-16">
            <img
              src={
                data.sprites.other['official-artwork'].front_default ??
                data.sprites.front_default
              }
              alt={data.name}
              className="w-64 h-64 object-contain"
            />
          </div>

          <div className="flex gap-2 mt-4">
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

          <div className="flex gap-6 mt-4 text-gray-700">
            <div className="text-center">
              <p className="text-sm text-gray-500">Height</p>
              <p className="font-semibold">
                📏 {(data.height / 10).toFixed(1)} m
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Weight</p>
              <p className="font-semibold">
                ⚖️ {(data.weight / 10).toFixed(1)} kg
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div>
            <h2 className="font-bold text-lg mb-3">Base Stats</h2>
            <div className="space-y-2">
              {data.stats.map((s) => (
                <div key={s.stat.name} className="flex items-center gap-3">
                  <span className="w-24 text-sm text-gray-600 text-right">
                    {STAT_NAMES[s.stat.name] ?? s.stat.name}
                  </span>
                  <span className="w-10 text-sm font-semibold text-right">
                    {s.base_stat}
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${(s.base_stat / 255) * 100}%`,
                        backgroundColor: getStatBarColor(s.base_stat),
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
                    <span className="text-xs text-gray-400 ml-1">(Hidden)</span>
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
  );
}
