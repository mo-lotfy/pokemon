import { Link } from 'react-router-dom';

interface PokemonCardProps {
  id: number;
  name: string;
  spriteUrl: string;
}

export default function PokemonCard({ id, name, spriteUrl }: PokemonCardProps) {
  return (
    <Link
      to={`/pokemon/${id}`}
      className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer block"
    >
      <div className="bg-blue-50 flex items-center justify-center p-4">
        <img
          src={spriteUrl}
          alt={name}
          className="w-32 h-32 object-contain"
          loading="lazy"
        />
      </div>
      <div className="p-3 text-center">
        <p className="font-bold capitalize text-gray-800">{name}</p>
        <p className="text-sm text-gray-400">#{String(id).padStart(3, '0')}</p>
      </div>
    </Link>
  );
}
