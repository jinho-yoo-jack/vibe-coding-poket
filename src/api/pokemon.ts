import type { Pokemon, PokemonListResponse, PokemonSpecies, EvolutionChain } from '../types/pokemon'

const BASE_URL = 'https://pokeapi.co/api/v2'

export const fetchPokemonList = async (limit = 20, offset = 0): Promise<PokemonListResponse> => {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)
  return res.json()
}

export const fetchPokemon = async (idOrName: string | number): Promise<Pokemon> => {
  const res = await fetch(`${BASE_URL}/pokemon/${idOrName}`)
  return res.json()
}

export const fetchPokemonSpecies = async (id: number): Promise<PokemonSpecies> => {
  const res = await fetch(`${BASE_URL}/pokemon-species/${id}`)
  return res.json()
}

export const fetchEvolutionChain = async (url: string): Promise<EvolutionChain> => {
  const res = await fetch(url)
  return res.json()
}

