import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAllPokemon } from './fetchPokemon'
import { fetchPokemon, fetchPokemonSpecies, fetchEvolutionChain } from '../api/pokemon'

export const loadAllPokemon = createAsyncThunk(
  'pokemon/loadAll',
  async () => {
    return fetchAllPokemon()
  }
)

export const loadPokemonDetail = createAsyncThunk(
  'pokemon/loadDetail',
  async (id) => {
    const pokemon = await fetchPokemon(id)
    const species = await fetchPokemonSpecies(Number(pokemon.id))
    let evolutionChain = null
    if (species.evolution_chain?.url) {
      evolutionChain = await fetchEvolutionChain(species.evolution_chain.url)
    }
    return { pokemon, species, evolutionChain }
  }
)

const initialState = {
  list: [],
  currentDetail: null,
  favorites: [],
  searchQuery: '',
  loading: false,
  detailLoading: false,
  error: null,
}

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload
    },
    addFavorite(state, action) {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload)
      }
    },
    removeFavorite(state, action) {
      state.favorites = state.favorites.filter((id) => id !== action.payload)
    },
    toggleFavorite(state, action) {
      const id = action.payload
      const idx = state.favorites.indexOf(id)
      if (idx === -1) state.favorites.push(id)
      else state.favorites.splice(idx, 1)
    },
    clearCurrentDetail(state) {
      state.currentDetail = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAllPokemon.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadAllPokemon.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(loadAllPokemon.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? '로드 실패'
      })
      .addCase(loadPokemonDetail.pending, (state) => {
        state.detailLoading = true
      })
      .addCase(loadPokemonDetail.fulfilled, (state, action) => {
        state.detailLoading = false
        state.currentDetail = action.payload
      })
      .addCase(loadPokemonDetail.rejected, (state) => {
        state.detailLoading = false
      })
  },
})

export const {
  setSearchQuery,
  addFavorite,
  removeFavorite,
  toggleFavorite,
  clearCurrentDetail,
} = pokemonSlice.actions

export default pokemonSlice.reducer
