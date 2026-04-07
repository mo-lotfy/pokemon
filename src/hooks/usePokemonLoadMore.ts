import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPokemonList, mapListToPokemonCards } from '../api/pokemon';

const STALE_TIME = 5 * 60 * 1000;

export default function usePokemonLoadMore(limit: number = 20) {
  const query = useInfiniteQuery({
    queryKey: ['pokemon-infinite', limit],
    queryFn: ({ pageParam }) => fetchPokemonList(limit, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.next ? lastPageParam + limit : undefined,
    staleTime: STALE_TIME,
  });

  const pokemon = query.data
    ? query.data.pages.flatMap((page) => mapListToPokemonCards(page.results))
    : [];

  const totalCount = query.data?.pages[0]?.count ?? 0;

  return {
    ...query,
    pokemon,
    totalCount,
  };
}
