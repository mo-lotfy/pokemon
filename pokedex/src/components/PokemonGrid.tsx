import type { ReactNode } from 'react';

interface PokemonGridProps {
  children: ReactNode;
}

export default function PokemonGrid({ children }: PokemonGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {children}
    </div>
  );
}
