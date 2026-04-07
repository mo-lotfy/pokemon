import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ViewToggle from '../components/ViewToggle';
import PokemonGrid from '../components/PokemonGrid';
import PokemonCard from '../components/PokemonCard';
import PokemonCardSkeleton from '../components/PokemonCardSkeleton';
import ErrorState from '../components/ErrorState';
import Pagination from '../components/Pagination';
import LoadMoreButton from '../components/LoadMoreButton';
import usePokemonList from '../hooks/usePokemonList';
import usePokemonLoadMore from '../hooks/usePokemonLoadMore';

type View = 'pagination' | 'loadmore';

const subtitles: Record<View, string> = {
  pagination: 'Discover and explore Pokemon with page controls',
  loadmore: 'Discover and explore Pokemon with infinite scroll',
};

export default function HomePage() {
  const [activeView, setActiveView] = useState<View>('pagination');
  const [currentPage, setCurrentPage] = useState(1);

  const { pokemon, totalPages, isLoading, isError, error, refetch } =
    usePokemonList(currentPage);

  const {
    pokemon: loadMorePokemon,
    isLoading: isLoadMoreLoading,
    isError: isLoadMoreError,
    error: loadMoreError,
    refetch: loadMoreRefetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePokemonLoadMore();

  useEffect(() => {
    document.title = 'Pokédex';
  }, []);

  const handleViewChange = (view: View) => {
    setActiveView(view);
    if (view === 'pagination') {
      setCurrentPage(1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout subtitle={subtitles[activeView]}>
      <div className="mt-6 space-y-6">
        <ViewToggle activeView={activeView} onViewChange={handleViewChange} />

        {activeView === 'pagination' ? (
          <>
            {isLoading ? (
              <PokemonGrid>
                {Array.from({ length: 20 }, (_, i) => (
                  <PokemonCardSkeleton key={i} />
                ))}
              </PokemonGrid>
            ) : isError ? (
              <ErrorState
                message={error?.message ?? 'Failed to load Pokémon'}
                onRetry={refetch}
              />
            ) : pokemon.length === 0 ? (
              <p className="text-center text-gray-500 py-16">No Pokémon found.</p>
            ) : (
              <PokemonGrid>
                {pokemon.map((p) => (
                  <PokemonCard
                    key={p.id}
                    id={p.id}
                    name={p.name}
                    spriteUrl={p.spriteUrl}
                  />
                ))}
              </PokemonGrid>
            )}

            {!isLoading && !isError && totalPages > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <>
            {isLoadMoreLoading ? (
            <PokemonGrid>
              {Array.from({ length: 20 }, (_, i) => (
                <PokemonCardSkeleton key={i} />
              ))}
            </PokemonGrid>
          ) : isLoadMoreError ? (
            <ErrorState
              message={loadMoreError?.message ?? 'Failed to load Pokémon'}
              onRetry={loadMoreRefetch}
            />
          ) : loadMorePokemon.length === 0 ? (
            <p className="text-center text-gray-500 py-16">No Pokémon found.</p>
          ) : (
            <>
              <PokemonGrid>
                {loadMorePokemon.map((p) => (
                  <PokemonCard
                    key={p.id}
                    id={p.id}
                    name={p.name}
                    spriteUrl={p.spriteUrl}
                  />
                ))}
              </PokemonGrid>

              <LoadMoreButton
                onClick={fetchNextPage}
                isLoading={isFetchingNextPage}
                hasNextPage={hasNextPage ?? false}
              />

              <p className="text-sm text-gray-500 text-center">
                Showing {loadMorePokemon.length} Pokémon
              </p>
            </>
          )}
          </>
        )}
      </div>
    </Layout>
  );
}
