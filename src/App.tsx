import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import PokemonDetailPage from './pages/PokemonDetailPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="pokemon/:id" element={<PokemonDetailPage />} />
      </Route>
    </Routes>
  )
}

export default App

