/// <reference types="react-scripts" />

type TPokemons = {
    name: string;
    url: string;
};

type TPokemon = {
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
    