import { useQuery } from '@tanstack/react-query'
import { fetchPokemon, fetchPokemonList, fetchPokemonSpecies, fetchEvolutionChain } from '../api/pokemon'

export const usePokemonList = (limit = 20, offset = 0) => {
  return useQuery({
    queryKey: ['pokemonList', limit, offset],
    queryFn: () => fetchPokemonList(limit, offset),
  })
}

export const usePokemon = (id: string | number) => {
  return useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => fetchPokemon(id),
    enabled: !!id,
  })
}

export const usePokemonSpecies = (id: number) => {
  return useQuery({
    queryKey: ['pokemonSpecies', id],
    queryFn: () => fetchPokemonSpecies(id),
    enabled: !!id,
  })
}

export const useEvolutionChain = (url: string | undefined) => {
  return useQuery({
    queryKey: ['evolutionChain', url],
    queryFn: () => fetchEvolutionChain(url!),
    enabled: !!url,
  })
}

