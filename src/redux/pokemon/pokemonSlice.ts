import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    abilities: [
        {
            ability: {
                name: string;
                url: string;
            };
            is_hidden: boolean;
            slot: number;
        }
    ];
    sprites: {
        front_default: string;
        back_default: string;
        front_shiny: string;
        back_shiny: string;
    };
    [key: string]: any;
};

export interface Pokemons {
    name: string;
    url: string;
};

export interface PokemonState {
    pokemons: Pokemons[];
    pokemon: Pokemon;
    loading: boolean;
    error: string | null;
    success: boolean;
};

const initialState: PokemonState = {
    pokemons: [],
    pokemon: {} as Pokemon,
    loading: false,
    error: null,
    success: false,
};

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        getPokemonsStart: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        getPokemonsSuccess: (state, action: PayloadAction<Pokemons[]>) => {
            state.pokemons = action.payload;
            state.loading = false;
            state.error = null;
            state.success = true;
        },
        getPokemonsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        },
        getPokemonStart: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        getPokemonSuccess: (state, action: PayloadAction<Pokemon>) => {
            state.pokemon = action.payload;
            state.loading = false;
            state.error = null;
            state.success = true;
        },
        getPokemonFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        },
    },
});

export const {
    getPokemonsStart,
    getPokemonsSuccess,
    getPokemonsFailure,
    getPokemonStart,
    getPokemonSuccess,
    getPokemonFailure,
} = pokemonSlice.actions;

export default pokemonSlice.reducer; // import this in src\redux\store.ts as pokemonReducer
