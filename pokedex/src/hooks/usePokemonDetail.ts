import { useQuery } from '@tanstack/react-query';
import { fetchPokemonDetail } from '../api/pokemon';

const STALE_TIME = 10 * 60 * 1000;

export default function usePokemonDetail(id: string) {
  return useQuery({
    queryKey: ['pokemon-detail', id],
    queryFn: () => fetchPokemonDetail(id),
    enabled: !!id,
    staleTime: STALE_TIME,
  });
}
