export interface GetDataParams {
    search?: string;
    searchType?: string
    offset?: number;
    limit?: number;
}
interface PokemonTypeDetail {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}
interface StatDetail {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

interface PokemonType {
    name: string;
    url: string;
}

interface PokemonDetail {
    name: string;
    id?: string;
    slug?: string;
    stats?: any;
    image?: string;
    types: {
        name: any; type: PokemonType
    }[];
}