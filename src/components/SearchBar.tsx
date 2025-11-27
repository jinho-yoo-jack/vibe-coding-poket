import { usePokedexStore } from '../store/usePokedexStore'

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = usePokedexStore()

  return (
    <div className="relative max-w-md mx-auto mb-8">
      <input
        type="text"
        placeholder="포켓몬 이름 검색..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-6 py-4 bg-slate-800/80 border border-slate-600 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pokemon-yellow focus:border-transparent transition-all"
      />
      <svg
        className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  )
}

