import { useQuery } from '@tanstack/react-query';
import { fetchPokemonList, mapListToPokemonCards } from '../api/pokemon';

const STALE_TIME = 5 * 60 * 1000;

export default function usePokemonList(page: number, limit: number = 20) {
  const offset = (page - 1) * limit;

  const query = useQuery({
    queryKey: ['pokemon-list', page, limit],
    queryFn: () => fetchPokemonList(limit, offset),
    staleTime: STALE_TIME,
  });

  return {
    ...query,
    pokemon: query.data ? mapListToPokemonCards(query.data.results) : [],
    totalPages: query.data ? Math.ceil(query.data.count / limit) : 0,
    totalCount: query.data?.count ?? 0,
  };
}
