import { apiGetDataPokemon } from "@/api";
import { PokemonDetail, GetDataParams, PokemonTypeDetail, StatDetail } from "@/model/types/GetDataPokemon";
import { ENDPOINT_SERVICE } from "@/configs/env";
import { padNumber, capitalizeWords } from "@/helper/ManipulationString";
import { pokemonType } from "@/dataset/pokemonType";


function getTypeColor(typeName: string) {
    const type = pokemonType.find((pt) => pt.name.toLowerCase() === typeName.toLowerCase());
    return type ? type.color : "#000000";
}


function transformStats(stats: StatDetail[]) {
    return stats.reduce((acc, current) => {
        const statName = current.stat.name;

        switch (statName) {
            case "hp":
                acc.hp = current.base_stat;
                break;
            case "attack":
                acc.attack = current.base_stat;
                break;
            case "defense":
                acc.defense = current.base_stat;
                break;
            case "special-attack":
                acc.spAttack = current.base_stat;
                break;
            case "special-defense":
                acc.spDefense = current.base_stat;
                break;
            case "speed":
                acc.speed = current.base_stat;
                break;
        }

        return acc;
    }, {
        hp: 0,
        attack: 0,
        defense: 0,
        spAttack: 0,
        spDefense: 0,
        speed: 0
    });
}


async function getPokemonDetail(value: any) {
    const urlManipulation = value.url.replace(ENDPOINT_SERVICE, '');
    const responseDetail = await apiGetDataPokemon(urlManipulation);
    const detail = responseDetail.data;

    const formattedTypes = detail?.types?.map((apiType: PokemonTypeDetail) => ({
        name: capitalizeWords(apiType.type.name), // Kapitalisasi nama tipe
        color: getTypeColor(apiType.type.name)
    }));

    const formattedStats = transformStats(detail.stats);

    return {
        id: padNumber(detail.id, 3),
        slug: detail.id,
        name: capitalizeWords(value.name),
        types: formattedTypes,
        stats: formattedStats,
        image: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${padNumber(detail.id, 3)}.png`,
    };
}

export async function getPokemonDetailPage(slug: any) {

    const responseDetail = await apiGetDataPokemon(slug);
    const detail = responseDetail.data;

    return {
        ...detail,
        id: padNumber(detail.id, 3),

        image: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${padNumber(detail.id, 3)}.png`,
    };
}
export async function getDataPokemon({ offset = 0, limit = 20 }: GetDataParams): Promise<any> {
    const filter = new URLSearchParams();
    filter.set("offset", offset.toString());
    filter.set("limit", limit.toString());

    const response = await apiGetDataPokemon(`?${filter.toString()}`);
    const data = response.data.results;


    const dataFinal = await Promise.all(data.map(getPokemonDetail));

    return dataFinal;
}

async function fetchPokemonBatch(offset: number, limit: number): Promise<PokemonDetail[]> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    return data.results;
}

async function fetchPokemonDetails(pokemonUrl: string): Promise<PokemonDetail | null> {
    try {
        const detailResponse = await fetch(pokemonUrl);
        const detailData = await detailResponse.json();

        const formattedTypes = detailData.types.map((apiType: PokemonTypeDetail) => ({
            name: capitalizeWords(apiType.type.name),
            color: getTypeColor(apiType.type.name)
        }));

        const formattedStats = transformStats(detailData.stats);

        return {
            id: padNumber(detailData.id, 3),
            slug: detailData.id,
            name: capitalizeWords(detailData.name),
            types: formattedTypes,
            stats: formattedStats,
            image: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${padNumber(detailData.id, 3)}.png`,
        };
    } catch (error) {
        console.error("Error fetching Pokémon details:", error);
        return null;
    }
}

export async function getDataPokemonSearch({
    search = "",
    searchType = "",
    limit = 50
}: GetDataParams): Promise<PokemonDetail[]> {
    const batchLimit = 50;
    const totalBatches = 27;
    const requiredTypes = searchType.split(',').map(type => type.trim().toLowerCase());

    const batchFetches = Array.from({ length: totalBatches }, (_, i) => fetchPokemonBatch(i * batchLimit, batchLimit));
    const allBatches = (await Promise.all(batchFetches)).flat().sort((a, b) => a.name.localeCompare(b.name));;


    const filteredByName = allBatches
        .filter((pokemon) => pokemon.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name));


    const pokemonToFetch = searchType
        ? filteredByName
        : filteredByName.slice(0, limit);

    const detailsFetches = pokemonToFetch.map((pokemon: any) => fetchPokemonDetails(pokemon.url));
    const detailedPokemon = (await Promise.all(detailsFetches)).filter(Boolean) as PokemonDetail[];


    const finalFilteredPokemon = searchType
        ? detailedPokemon.filter((pokemon) =>
            requiredTypes.every((requiredType) =>
                pokemon.types.some((typeEntry: any) => typeEntry.name.toLowerCase() === requiredType)
            )
        )
        : detailedPokemon;

    return finalFilteredPokemon.slice(0, limit);
}
