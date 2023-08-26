import axiosInstance from "./axiosInstance";

export const fetchPokemon = async (pokemonName: string) => {
    const { data } = await axiosInstance.get(`/pokemon/${pokemonName}`);
    return data;
};

export const fetchPokemons = async (limit: number = 1000) => {
    const { data } = await axiosInstance.get(`/pokemon?limit=${limit}`);
    return data.results;
};
