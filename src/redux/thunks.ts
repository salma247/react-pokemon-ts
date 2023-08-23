// src/store/thunks.ts

import { AppThunk } from './store';
import axios from 'axios';
import {
    getPokemonsStart,
    getPokemonsSuccess,
    getPokemonsFailure,
    getPokemonStart,
    getPokemonSuccess,
    getPokemonFailure,
} from './pokemon/pokemonSlice';


export const fetchPokemons = (): AppThunk => async (dispatch) => {
    try {
        dispatch(getPokemonsStart());
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
        dispatch(getPokemonsSuccess(response.data.results));
    } catch (error : any) {
        dispatch(getPokemonsFailure(error.message));
    }
}

export const fetchPokemon = (pokemon: string): AppThunk => async (dispatch) => {
    try {
        dispatch(getPokemonStart());
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        dispatch(getPokemonSuccess(response.data));
        console.log(response.data);
        
    } catch (error : any) {
        dispatch(getPokemonFailure(error.message));
    }
}