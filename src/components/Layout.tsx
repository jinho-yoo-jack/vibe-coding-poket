import { Outlet, Link } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-r from-pokemon-red to-red-700 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-3 w-fit">
            <img src="/pokeball.svg" alt="Pokeball" className="w-10 h-10 animate-spin-slow" />
            <h1 className="font-pokemon text-white text-lg md:text-xl tracking-wider drop-shadow-lg">
              포켓몬 도감
            </h1>
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

