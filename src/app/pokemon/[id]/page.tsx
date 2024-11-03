"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPokemonDetailPage } from "@/model/GetDataPokemon";
import { padNumber, getTypeColor } from "@/helper/ManipulationString";
import Image from "next/image";
import SkeletonLoader from "@/components/PokemonDetail/SkeletonLoader";
import BackButton from "@/components/PokemonDetail/BackButton";
import PokemonStats from "@/components/PokemonDetail/PokemonStats";
const PokemonDetailPage = () => {
    const params = useParams();
    const [pokemon, setPokemon] = useState<any>(null);

    useEffect(() => {
        if (params.id) {
            async function firstLoad() {
                const res = await getPokemonDetailPage('/' + params.id);
                setPokemon(res);
            }
            firstLoad();
        }
    }, [params.id]);


    if (!pokemon) {
        return <SkeletonLoader />;
    }

    return (
        <div className="bg-black container mx-auto p-4 max-w-5xl">
            {/* Back Button */}
            <BackButton />

            {/* Overview Section */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                <div className="flex justify-center items-center">
                    <div className="relative w-[200px] h-[200px] rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 p-4">
                        <Image
                            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${padNumber(pokemon.id, 3)}.png`}
                            alt={pokemon.name}
                            width={200}
                            height={200}
                            className="rounded-full border-4 border-blue-500"
                        />
                    </div>
                </div>
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
                    <p className="text-lg text-gray-600">#{padNumber(pokemon.id, 3)}</p>
                    <div className="flex gap-2 mt-2">
                        {pokemon.types.map((type: any) => (
                            <span
                                key={type.type.name}
                                className="px-3 py-1 rounded-full text-white font-semibold"
                                style={{ backgroundColor: getTypeColor(type.type.name) }}
                            >
                                {type.type.name}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-start bg-[#1C2331] p-6 rounded-lg shadow-lg space-y-2">
                    <h2 className="text-2xl font-semibold mb-2">Informasi Pokémon</h2>
                    <div className="flex flex-col gap-1 text-center md:text-left">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-gray-400">Tinggi:</span>
                            <span>{pokemon.height} m</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-gray-400">Berat:</span>
                            <span>{pokemon.weight} kg</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-gray-400">Kemampuan:</span>
                        </div>
                        {pokemon.abilities.map((v: any) => (
                            <span
                                key={v.ability.name}
                                className="bg-gray-500 px-3 py-1 rounded-full text-white font-semibold"
                            >
                                {v.ability.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Base Stats Section */}
            <PokemonStats stats={pokemon.stats} />

            {/* Moves Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Moves</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {pokemon.moves.slice(0, 20).map((move: any) => (
                        <span key={move.move.name} className="capitalize bg-gray-100 p-2 rounded text-center text-black">
                            {move.move.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PokemonDetailPage;
