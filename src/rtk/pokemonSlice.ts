import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllPokemon } from './fetchPokemon';
import { fetchPokemon, fetchPokemonSpecies, fetchEvolutionChain } from '../api/pokemon';
import { Pokemon, PokemonFullDetail } from '../types';

// Redux State 타입 정의
export interface PokemonState {
  list: Pokemon[];
  currentDetail: PokemonFullDetail | null;
  favorites: number[];
  searchQuery: string;
  loading: boolean;
  detailLoading: boolean;
  error: string | null;
}

// 초기 상태
const initialState: PokemonState = {
  list: [],
  currentDetail: null,
  favorites: [],
  searchQuery: '',
  loading: false,
  detailLoading: false,
  error: null,
};

// 비동기 액션: 모든 포켓몬 로드
export const loadAllPokemon = createAsyncThunk(
  'pokemon/loadAll',
  async () => {
    return fetchAllPokemon();
  }
);

// 비동기 액션: 포켓몬 상세정보 로드
export const loadPokemonDetail = createAsyncThunk<
  PokemonFullDetail,
  string | number
>(
  'pokemon/loadDetail',
  async (id) => {
    const pokemon = await fetchPokemon(id);
    const species = await fetchPokemonSpecies(Number(pokemon.id));

    let evolutionChain = null;
    if (species.evolution_chain?.url) {
      evolutionChain = await fetchEvolutionChain(species.evolution_chain.url);
    }

    return { pokemon, species, evolutionChain };
  }
);

// Pokemon Slice 생성
const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    // 검색어 설정
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    // 찜 추가
    addFavorite(state, action: PayloadAction<number>) {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    // 찜 제거
    removeFavorite(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter((id) => id !== action.payload);
    },
    // 찜 토글
    toggleFavorite(state, action: PayloadAction<number>) {
      const id = action.payload;
      const idx = state.favorites.indexOf(id);
      if (idx === -1) {
        state.favorites.push(id);
      } else {
        state.favorites.splice(idx, 1);
      }
    },
    // 현재 상세정보 초기화
    clearCurrentDetail(state) {
      state.currentDetail = null;
    },
  },
  extraReducers: (builder) => {
    // loadAllPokemon 액션 처리
    builder
      .addCase(loadAllPokemon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadAllPokemon.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(loadAllPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? '포켓몬 목록을 불러오는데 실패했습니다';
      });

    // loadPokemonDetail 액션 처리
    builder
      .addCase(loadPokemonDetail.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(loadPokemonDetail.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.currentDetail = action.payload;
      })
      .addCase(loadPokemonDetail.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.error.message ?? '포켓몬 상세정보를 불러오는데 실패했습니다';
      });
  },
});

// 액션 export
export const {
  setSearchQuery,
  addFavorite,
  removeFavorite,
  toggleFavorite,
  clearCurrentDetail,
} = pokemonSlice.actions;

// Reducer export
export default pokemonSlice.reducer;