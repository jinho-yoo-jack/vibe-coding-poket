import { Outlet, Link, NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '../rtk/pokemonSlice'

export default function Layout() {
  const dispatch = useDispatch()

  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-r from-pokemon-red to-red-700 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/pokeball.svg" alt="Pokeball" className="w-10 h-10" />
            <h1 className="font-pokemon text-white text-lg md:text-xl tracking-wider drop-shadow-lg">
              포켓몬 도감
            </h1>
          </Link>
          <nav className="flex gap-4">
            <NavLink
              to="/"
              onClick={() => dispatch(setSearchQuery(''))}
              className={({ isActive }) =>
                `text-white font-medium ${isActive ? 'underline' : 'hover:opacity-90'}`
              }
            >
              메인
            </NavLink>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                `text-white font-medium ${isActive ? 'underline' : 'hover:opacity-90'}`
              }
            >
              검색
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `text-white font-medium ${isActive ? 'underline' : 'hover:opacity-90'}`
              }
            >
              찜목록
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}