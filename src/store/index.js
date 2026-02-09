import { configureStore } from '@reduxjs/toolkit'
import pokemonReducer from '../rtk/pokemonSlice'

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
})
