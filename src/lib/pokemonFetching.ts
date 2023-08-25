import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const fetchPokemon = async (pokemonName: string) => {
    const { data } = await axiosInstance.get(`/pokemon/${pokemonName}`);
    return data;
};

export const fetchPokemons = async (limit: number = 100) => {
    const { data } = await axiosInstance.get(`/pokemon?limit=${limit}`);
    return data.results;
};

export default axiosInstance;
