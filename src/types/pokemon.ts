export interface Pokemon {
  id: number
  name: string
  sprites: {
    front_default: string
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }
  types: PokemonType[]
  stats: PokemonStat[]
  height: number
  weight: number
  abilities: PokemonAbility[]
}

export interface PokemonType {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokemonStat {
  base_stat: number
  stat: {
    name: string
  }
}

export interface PokemonAbility {
  ability: {
    name: string
  }
  is_hidden: boolean
}

export interface PokemonListResponse {
  count: number
  results: {
    name: string
    url: string
  }[]
}

export interface PokemonSpecies {
  flavor_text_entries: {
    flavor_text: string
    language: {
      name: string
    }
  }[]
  names: {
    name: string
    language: {
      name: string
    }
  }[]
  evolution_chain: {
    url: string
  }
}

export interface EvolutionChain {
  chain: EvolutionNode
}

export interface EvolutionNode {
  species: {
    name: string
    url: string
  }
  evolves_to: EvolutionNode[]
}

