import { useMemo } from 'react'
import { useQueries } from '@tanstack/react-query'
import { usePokemonList } from '../hooks/usePokemon'
import { usePokedexStore } from '../store/usePokedexStore'
import { fetchPokemon } from '../api/pokemon'
import PokemonCard from '../components/PokemonCard'
import SearchBar from '../components/SearchBar'
import TypeFilter from '../components/TypeFilter'

const ITEMS_PER_PAGE = 20

export default function HomePage() {
  const { searchQuery, selectedType, page, setPage } = usePokedexStore()
  const { data, isLoading } = usePokemonList(151, 0)

  const pokemonQueries = useQueries({
    queries: (data?.results || []).map((pokemon) => ({
      queryKey: ['pokemon', pokemon.name],
      queryFn: () => fetchPokemon(pokemon.name),
      enabled: !!selectedType,
    })),
  })

  const filteredPokemon = useMemo(() => {
    if (!data?.results) return []
    
    let filtered = data.results

    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedType) {
      const pokemonWithTypes = pokemonQueries
        .filter((q) => q.data)
        .map((q) => q.data!)
      
      const typeFiltered = pokemonWithTypes
        .filter((p) => p.types.some((t) => t.type.name === selectedType))
        .map((p) => p.name)
      
      filtered = filtered.filter((p) => typeFiltered.includes(p.name))
    }

    return filtered
  }, [data?.results, searchQuery, selectedType, pokemonQueries])

  const paginatedPokemon = useMemo(() => {
    const start = page * ITEMS_PER_PAGE
    return filteredPokemon.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredPokemon, page])

  const totalPages = Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-pokemon-yellow border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <SearchBar />
      <TypeFilter />
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {paginatedPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
        ))}
      </div>

      {filteredPokemon.length === 0 && (
        <div className="text-center text-slate-400 py-16">
          <p className="text-xl">검색 결과가 없습니다</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg disabled:opacity-50 hover:bg-slate-600 transition-colors"
          >
            이전
          </button>
          <span className="px-4 py-2 text-white">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg disabled:opacity-50 hover:bg-slate-600 transition-colors"
          >
            다음
          </button>
        </div>
      )}
    </div>
  )
}

