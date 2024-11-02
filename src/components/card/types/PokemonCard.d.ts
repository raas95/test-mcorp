

export type PokemonType = {
    name: string;
    color: string;
};

export type PokemonStats = {
    hp: number;
    attack: number;
    defense: number;
    spAttack: number;
    spDefense: number;
    speed: number;
};

export interface PokemonCardProps {
    id: string;
    name: string;
    types: PokemonType[];
    stats: PokemonStats;
    slug: string
    image: string;
}
