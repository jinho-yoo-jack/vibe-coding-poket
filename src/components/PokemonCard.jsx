import { Link } from 'react-router-dom'
import { formatPokemonId } from '../utils/pokemon'

export default function PokemonCard({ pokemon }) {
  const imageUrl =
    pokemon.front_default ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`

  return (
    <Link to={`/pokemon/${pokemon.id}`}>
      <div className="pokemon-card p-6 cursor-pointer group">
        <img
          src={imageUrl}
          alt={pokemon.nameKo ?? pokemon.name}
          className="w-32 h-32 mx-auto block drop-shadow-lg group-hover:scale-110 transition-transform"
        />
        <p className="text-slate-400 text-center text-sm mt-4">{formatPokemonId(pokemon.id)}</p>
        <h3 className="text-white text-center font-bold text-lg mt-1">{pokemon.nameKo ?? pokemon.name}</h3>
        {pokemon.description && (
          <p className="text-slate-500 text-xs text-center mt-2 line-clamp-2">{pokemon.description}</p>
        )}
      </div>
    </Link>
  )
}