"use client"
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import { PokemonCardProps } from "./types/PokemonCard";
import Link from "next/link";
import { routes } from "@/configs/routes";
const PokemonCard: React.FC<PokemonCardProps> = ({ slug, id, name, types, stats, image }) => {
    return (
        <Link href={routes.detail(slug)}>
            <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.3)" }}
                transition={{ duration: 0.3 }}
                className="p-4 bg-gray-800 text-white rounded-lg shadow-lg w-full"
            >
                <div className="flex flex-col items-center">
                    {/* Pokémon Image */}
                    <motion.div
                        className="relative w-32 h-32 bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 rounded-full flex items-center justify-center shadow-lg mb-4"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                    >
                        <Image
                            src={image}
                            alt={name}
                            width={96}
                            height={96}
                            className="w-24 h-24"
                        />
                    </motion.div>

                    {/* Pokémon ID and Name */}
                    <div className="text-center">
                        <span className="text-sm text-gray-400">#{id}</span>
                        <h2 className="text-xl font-semibold capitalize">{name}</h2>
                    </div>

                    {/* Pokémon Types */}
                    <div className="flex gap-2 mt-2">
                        {types.map((type) => (
                            <span
                                key={type.name}
                                style={{ backgroundColor: type.color }}
                                className="px-3 py-1 text-sm rounded-full text-white"
                            >
                                {type.name}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Pokémon Stats */}
                <div className="mt-4">
                    <h3 className="text-sm font-semibold mb-2">Stats</h3>
                    <div className="grid grid-cols-2 gap-1 text-sm">
                        <div className="flex justify-between"><span>HP:</span> <span>{stats.hp}</span></div>
                        <div className="flex justify-between"><span>Attack:</span> <span>{stats.attack}</span></div>
                        <div className="flex justify-between"><span>Defense:</span> <span>{stats.defense}</span></div>
                        <div className="flex justify-between"><span>Sp. Atk:</span> <span>{stats.spAttack}</span></div>
                        <div className="flex justify-between"><span>Sp. Def:</span> <span>{stats.spDefense}</span></div>
                        <div className="flex justify-between"><span>Speed:</span> <span>{stats.speed}</span></div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default PokemonCard;
