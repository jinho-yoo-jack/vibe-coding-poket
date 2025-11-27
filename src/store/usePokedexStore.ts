import { create } from 'zustand'

interface PokedexState {
  searchQuery: string
  selectedType: string | null
  page: number
  setSearchQuery: (query: string) => void
  setSelectedType: (type: string | null) => void
  setPage: (page: number) => void
}

export const usePokedexStore = create<PokedexState>((set) => ({
  searchQuery: '',
  selectedType: null,
  page: 0,
  setSearchQuery: (query) => set({ searchQuery: query, page: 0 }),
  setSelectedType: (type) => set({ selectedType: type, page: 0 }),
  setPage: (page) => set({ page }),
}))

