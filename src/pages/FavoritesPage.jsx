import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PokemonCard from '../components/PokemonCard'

export default function FavoritesPage() {
  const { list, favorites } = useSelector((state) => state.pokemon)
  const favoriteList = list.filter((p) => favorites.includes(p.id))

  return (
    <section className="favorites-page">
      <h2 className="text-white text-xl font-bold mb-6">찜 목록</h2>
      {favoriteList.length === 0 ? (
        <div className="text-center text-slate-400 py-16">
          <p className="text-lg mb-4">찜한 포켓몬이 없습니다</p>
          <Link to="/" className="text-pokemon-yellow hover:underline">
            도감에서 찜하기
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favoriteList.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </section>
  )
}
