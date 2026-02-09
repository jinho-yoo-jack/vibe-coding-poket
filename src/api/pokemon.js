const BASE_URL = 'https://pokeapi.co/api/v2'

export const fetchPokemonList = async (limit = 20, offset = 0) => {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)
  return res.json()
}

export const fetchPokemon = async (idOrName) => {
  const res = await fetch(`${BASE_URL}/pokemon/${idOrName}`)
  return res.json()
}

export const fetchPokemonSpecies = async (id) => {
  const res = await fetch(`${BASE_URL}/pokemon-species/${id}`)
  return res.json()
}

export const fetchEvolutionChain = async (url) => {
  const res = await fetch(url)
  return res.json()
}
