import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '../rtk/pokemonSlice'

export default function SearchPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm({
    defaultValues: { keyword: '' },
  })

  const onSubmit = (data) => {
    dispatch(setSearchQuery(data.keyword.trim()))
    navigate('/')
  }

  return (
    <section className="max-w-md mx-auto py-8">
      <h2 className="text-white text-xl font-bold mb-6">포켓몬 검색</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="이름으로 검색..."
            {...register('keyword')}
            className="w-full px-6 py-4 bg-slate-800/80 border border-slate-600 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pokemon-yellow focus:border-transparent"
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
        <button
          type="submit"
          className="w-full py-3 bg-pokemon-red hover:bg-red-600 text-white font-bold rounded-xl transition-colors"
        >
          검색
        </button>
      </form>
    </section>
  )
}
