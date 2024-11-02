import React from "react";

const PokemonStats = ({ stats }: { stats: any[] }) => {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Base Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {stats.map((stat: any) => (
                    <div key={stat.stat.name}>
                        <div className="flex justify-between border-b border-gray-300 pb-1">
                            <span className="capitalize">{stat.stat.name.replace('-', ' ')}</span>
                            <span className="font-semibold">{stat.base_stat}</span>
                        </div>
                        <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${Math.min(stat.base_stat / 10, 100)}%` }}
                        ></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PokemonStats;
