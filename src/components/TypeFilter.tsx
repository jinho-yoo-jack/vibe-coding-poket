import { usePokedexStore } from '../store/usePokedexStore'
import { TYPE_COLORS, TYPE_KOREAN } from '../utils/pokemon'

const TYPES = Object.keys(TYPE_KOREAN)

export default function TypeFilter() {
  const { selectedType, setSelectedType } = usePokedexStore()

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      <button
        onClick={() => setSelectedType(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          selectedType === null
            ? 'bg-pokemon-yellow text-black'
            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
        }`}
      >
        전체
      </button>
      {TYPES.map((type) => (
        <button
          key={type}
          onClick={() => setSelectedType(type)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedType === type
              ? `${TYPE_COLORS[type]} text-white ring-2 ring-white`
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          {TYPE_KOREAN[type]}
        </button>
      ))}
    </div>
  )
}

