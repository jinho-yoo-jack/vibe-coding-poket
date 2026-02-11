import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import pokemonReducer from '../rtk/pokemonSlice';

// Store 생성
export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});

// RootState 타입 추론
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch 타입 추론
export type AppDispatch = typeof store.dispatch;

// 타입이 지정된 hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;