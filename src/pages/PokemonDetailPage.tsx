import { useParams, Link } from 'react-router-dom'
import { usePokemon, usePokemonSpecies, useEvolutionChain } from '../hooks/usePokemon'
import { TYPE_COLORS, TYPE_KOREAN, formatPokemonId, getPokemonIdFromUrl } from '../utils/pokemon'
import StatBar from '../components/StatBar'
import type { EvolutionNode } from '../types/pokemon'

function getEvolutionChain(node: EvolutionNode): { name: string; id: number }[] {
  const result: { name: string; id: number }[] = []
  
  function traverse(n: EvolutionNode) {
    result.push({
      name: n.species.name,
      id: getPokemonIdFromUrl(n.species.url),
    })
    n.evolves_to.forEach(traverse)
  }
  
  traverse(node)
  return result
}

export default function PokemonDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: pokemon, isLoading } = usePokemon(id!)
  const { data: species } = usePokemonSpecies(Number(id))
  const { data: evolutionData } = useEvolutionChain(species?.evolution_chain?.url)

  if (isLoading || !pokemon) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-pokemon-yellow border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const mainType = pokemon.types[0]?.type.name || 'normal'
  const koreanName = species?.names?.find((n) => n.language.name === 'ko')?.name || pokemon.name
  const description = species?.flavor_text_entries?.find((e) => e.language.name === 'ko')?.flavor_text?.replace(/\n|\f/g, ' ')
  const evolutions = evolutionData ? getEvolutionChain(evolutionData.chain) : []

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        도감으로 돌아가기
      </Link>

      <div className="pokemon-card p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* 이미지 섹션 */}
          <div className="relative">
            <div className={`absolute inset-0 ${TYPE_COLORS[mainType]} opacity-20 rounded-3xl blur-3xl`} />
            <img
              src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-full max-w-sm mx-auto relative z-10 drop-shadow-2xl"
            />
          </div>

          {/* 정보 섹션 */}
          <div>
            <p className="text-slate-400 text-lg">{formatPokemonId(pokemon.id)}</p>
            <h1 className="text-4xl font-bold text-white capitalize mb-2">{koreanName}</h1>
            <p className="text-slate-400 capitalize mb-4">{pokemon.name}</p>

            <div className="flex gap-2 mb-6">
              {pokemon.types.map((t) => (
                <span
                  key={t.type.name}
                  className={`type-badge ${TYPE_COLORS[t.type.name]} text-white text-sm`}
                >
                  {TYPE_KOREAN[t.type.name] || t.type.name}
                </span>
              ))}
            </div>

            {description && (
              <p className="text-slate-300 mb-6 leading-relaxed">{description}</p>
            )}

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-800/50 rounded-xl p-4">
                <p className="text-slate-400 text-sm">키</p>
                <p className="text-white text-xl font-bold">{(pokemon.height / 10).toFixed(1)}m</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4">
                <p className="text-slate-400 text-sm">몸무게</p>
                <p className="text-white text-xl font-bold">{(pokemon.weight / 10).toFixed(1)}kg</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-white font-bold mb-2">특성</h3>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((a) => (
                  <span
                    key={a.ability.name}
                    className={`px-3 py-1 bg-slate-700 rounded-full text-sm ${
                      a.is_hidden ? 'text-pokemon-yellow' : 'text-white'
                    }`}
                  >
                    {a.ability.name.replace('-', ' ')}
                    {a.is_hidden && ' (숨겨진 특성)'}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 스탯 섹션 */}
        <div className="mt-8">
          <h3 className="text-white font-bold text-xl mb-4">기본 스탯</h3>
          <div className="space-y-3">
            {pokemon.stats.map((stat) => (
              <StatBar key={stat.stat.name} name={stat.stat.name} value={stat.base_stat} />
            ))}
          </div>
        </div>

        {/* 진화 체인 */}
        {evolutions.length > 1 && (
          <div className="mt-8">
            <h3 className="text-white font-bold text-xl mb-4">진화</h3>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {evolutions.map((evo, index) => (
                <div key={evo.id} className="flex items-center gap-4">
                  <Link
                    to={`/pokemon/${evo.id}`}
                    className={`flex flex-col items-center p-4 rounded-xl transition-all hover:bg-slate-700/50 ${
                      evo.id === pokemon.id ? 'ring-2 ring-pokemon-yellow' : ''
                    }`}
                  >
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evo.id}.png`}
                      alt={evo.name}
                      className="w-20 h-20"
                    />
                    <span className="text-white capitalize mt-2">{evo.name}</span>
                    <span className="text-slate-400 text-sm">{formatPokemonId(evo.id)}</span>
                  </Link>
                  {index < evolutions.length - 1 && (
                    <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

