import type {
  PokemonListResponse,
  PokemonListItem,
  PokemonDetail,
  PokemonCardData,
} from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export function extractIdFromUrl(url: string): number {
  const segments = url.replace(/\/$/, '').split('/');
  return Number(segments[segments.length - 1]);
}

export function getOfficialArtworkUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export async function fetchPokemonList(
  limit: number,
  offset: number,
): Promise<PokemonListResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch pokemon list: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while fetching pokemon list');
  }
}

export async function fetchPokemonDetail(
  id: number | string,
): Promise<PokemonDetail> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch pokemon ${id}: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(
      `An unexpected error occurred while fetching pokemon ${id}`,
    );
  }
}

export function mapListToPokemonCards(
  results: PokemonListItem[],
): PokemonCardData[] {
  return results.map((item) => {
    const id = extractIdFromUrl(item.url);
    return {
      id,
      name: item.name,
      spriteUrl: getOfficialArtworkUrl(id),
    };
  });
}
