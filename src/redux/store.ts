// create redux store
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import pokemonReducer from './pokemon/pokemonSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
    reducer: {
        pokemon: pokemonReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
