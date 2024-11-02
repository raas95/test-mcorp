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
        <div className="h-[500px]  relative flex justify-center items-center bg-[#0A0E27] p-20 overflow-hidden">

            <motion.div
                className="absolute w-[800px] h-[750px] rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-20"
                animate={backgroundAnimation}
            />

            <div className="grid grid-cols-4 gap-4 w-[600px] h-[600px] absolute top-10">
                {surroundingPokemonIds.map((id, index) => (
                    <motion.div
                        key={index}
                        className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center border-4 border-blue-500 shadow-lg"
                        variants={floatAnimation}
                        whileHover="hover"
                    >
                        <Image
                            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${padNumber(id, 3)}.png`}
                            alt={`pokemon-${id}`}
                            width={80}
                            height={80}
                            className="rounded-full"
                        />
                    </motion.div>
                ))}
            </div>


            <motion.div
                className="w-44 h-44 rounded-full bg-gray-800 flex items-center justify-center border-4 border-blue-500 shadow-lg z-10"
                animate={{ scale: [1, 1.05, 1], transition: { duration: 3, repeat: Infinity } }}
            >
                <Image
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${padNumber(centralPokemonId, 3)}.png`}
                    alt="Central Pokemon"
                    width={144}
                    height={144}
                    className="rounded-full"
                />
            </motion.div>


            <div className="absolute top-0 flex justify-center items-center w-full z-10">
                <div className="bg-blue-500 px-6 py-2 rounded-full shadow-md">
                    <h1 className="text-white text-3xl font-bold">Pokédex</h1>
                </div>
            </div>
        </div>
    );
};

export default Header;
