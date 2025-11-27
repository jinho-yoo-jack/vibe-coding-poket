import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchPokemon } from '../api/pokemon'
import { TYPE_COLORS, TYPE_KOREAN, formatPokemonId } from '../utils/pokemon'

interface PokemonCardProps {
  name: string
  url: string
}

export default function PokemonCard({ name, url }: PokemonCardProps) {
  const id = url.split('/').filter(Boolean).pop()
  
  const { data: pokemon, isLoading } = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => fetchPokemon(id!),
    enabled: !!id,
  })

  if (isLoading || !pokemon) {
    return (
      <div className="pokemon-card p-6 animate-pulse">
        <div className="w-32 h-32 mx-auto bg-slate-700 rounded-full" />
        <div className="h-4 bg-slate-700 rounded mt-4 w-2/3 mx-auto" />
      </div>
    )
  }

  const mainType = pokemon.types[0]?.type.name || 'normal'

  return (
    <Link to={`/pokemon/${pokemon.id}`}>
      <div className="pokemon-card p-6 cursor-pointer group">
        <div className="relative">
          <div className={`absolute inset-0 ${TYPE_COLORS[mainType]} opacity-20 rounded-full blur-2xl group-hover:opacity-40 transition-opacity`} />
          <img
            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
            alt={name}
            className="w-32 h-32 mx-auto relative z-10 drop-shadow-lg group-hover:scale-110 transition-transform"
          />
        </div>
        <p className="text-slate-400 text-center text-sm mt-4">{formatPokemonId(pokemon.id)}</p>
        <h3 className="text-white text-center font-bold capitalize text-lg mt-1">{name}</h3>
        <div className="flex justify-center gap-2 mt-3">
          {pokemon.types.map((t) => (
            <span
              key={t.type.name}
              className={`type-badge ${TYPE_COLORS[t.type.name]} text-white`}
            >
              {TYPE_KOREAN[t.type.name] || t.type.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

