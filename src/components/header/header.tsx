"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { padNumber } from "@/helper/ManipulationString";

const Header = () => {
    const surroundingPokemonIds = Array.from({ length: 12 }, () =>
        Math.floor(Math.random() * 900) + 1
    );

    const centralPokemonId = Math.floor(Math.random() * 900) + 1;

    const floatAnimation = {
        hover: { y: [0, -10, 0], transition: { duration: 2, repeat: Infinity } },
    };

    const backgroundAnimation = {
        rotate: [0, 360],
        transition: { duration: 20, ease: "linear", repeat: Infinity },
    };

    return (
        <div className="h-[400px] md:h-[500px] relative flex justify-center items-center bg-[#0A0E27] p-10 md:p-20 overflow-hidden">
            {/* Background animated circle */}
            <motion.div
                className="absolute w-[500px] h-[500px] md:w-[800px] md:h-[750px] rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-20"
                animate={backgroundAnimation}
            />

            {/* Surrounding Pokemons */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 w-[300px] h-[300px] md:w-[600px] md:h-[600px] absolute top-8 md:top-10">
                {surroundingPokemonIds.map((id, index) => (
                    <motion.div
                        key={index}
                        className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gray-800 flex items-center justify-center border-2 md:border-4 border-blue-500 shadow-lg"
                        variants={floatAnimation}
                        whileHover="hover"
                    >
                        <Image
                            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${padNumber(id, 3)}.png`}
                            alt={`pokemon-${id}`}
                            width={64}
                            height={64}
                            className="rounded-full"
                        />
                    </motion.div>
                ))}
            </div>

            {/* Central Pokemon */}
            <motion.div
                className="w-24 h-24 md:w-44 md:h-44 rounded-full bg-gray-800 flex items-center justify-center border-4 border-blue-500 shadow-lg z-10"
                animate={{ scale: [1, 1.05, 1], transition: { duration: 3, repeat: Infinity } }}
            >
                <Image
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${padNumber(centralPokemonId, 3)}.png`}
                    alt="Central Pokemon"
                    width={96}
                    height={96}
                    className="rounded-full"
                />
            </motion.div>

            {/* Header text */}
            <div className="absolute top-2 md:top-0 flex justify-center items-center w-full z-10">
                <div className="bg-blue-500 px-4 py-1 md:px-6 md:py-2 rounded-full shadow-md">
                    <h1 className="text-white text-xl md:text-3xl font-bold">Pokédex</h1>
                </div>
            </div>
        </div>
    );
};

export default Header;
