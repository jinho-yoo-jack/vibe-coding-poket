import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadAllPokemon } from '../rtk/pokemonSlice'
import PokemonCard from '../components/PokemonCard'

export default function MainPage() {
  const dispatch = useDispatch()
  const { list, loading, searchQuery } = useSelector((state) => state.pokemon)

  useEffect(() => {
    dispatch(loadAllPokemon())
  }, [dispatch])

  const filteredList = searchQuery.trim()
    ? list.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : list

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-pokemon-yellow border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <section className="pokemon-list">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      {filteredList.length === 0 && (
        <div className="text-center text-slate-400 py-16">
          <p className="text-xl">표시할 포켓몬이 없습니다</p>
        </div>
      )}
    </section>
  )
}
