"use client";
import React, { useState, useEffect } from "react";
import Select, { StylesConfig } from "react-select";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { pokemonType } from "@/dataset/pokemonType";
import PokemonCard from "@/components/card/PokemonCard";
import SkeletonCard from "@/components/card/SkeletonCard";
import { getDataPokemon, getDataPokemonSearch } from "@/model/GetDataPokemon";

const typeOptions = pokemonType.map(type => ({
    value: type.name,
    label: type.name,
    color: type.color,
}));

const customStyles: StylesConfig<{ value: string; label: string; color: string }, true> = {
    option: (styles, { data, isFocused, isSelected }) => ({
        ...styles,
        backgroundColor: isSelected ? data.color : isFocused ? "#e4e4e4" : undefined,
        color: isSelected ? "white" : "black",
        ":active": {
            ...styles[":active"],
            backgroundColor: data.color,
        },
    }),
    multiValue: (styles, { data }) => ({
        ...styles,
        backgroundColor: data.color,
        color: "white",
    }),
    multiValueLabel: (styles) => ({
        ...styles,
        color: "white",
    }),
    multiValueRemove: (styles) => ({
        ...styles,
        color: "white",
        ":hover": {
            backgroundColor: "#FF4B4B",
            color: "white",
        },
    }),
};

const SearchComponent = () => {
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(0);
    const [sortAsc, setSortAsc] = useState(true);
    const limit = 20;

    const fetchData = async (reset = false, page = 0) => {
        setLoading(true);
        let response;
        if (searchText || selectedTypes.length > 0) {
            response = await getDataPokemonSearch({
                search: searchText,
                searchType: selectedTypes.join(","),
                offset: page,
                limit
            });
        } else {
            response = await getDataPokemon({ offset: page, limit });
        }


        setData(prevData => reset ? response : [...prevData, ...response])
        setLoading(false);
    };

    useEffect(() => {
        setOffset(0);
        const firstLoadData = async (reset = false, page = 0) => {
            setLoading(true);
            const response = await getDataPokemon({ offset: page, limit });


            setData(prevData => reset ? response : [...prevData, ...response])
            setLoading(false);
        };
        firstLoadData(true, 0);
    }, []);

    const handleSearch = () => {
        setOffset(0);
        fetchData(true, 0);
    };

    const handleLoadMore = () => {
        const page = offset + limit;
        setOffset(page);
        fetchData(false, page);
    };


    const toggleSortOrder = () => {
        setSortAsc(!sortAsc);
        setData(prevData =>
            [...prevData].sort((a: any, b: any) =>
                !sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
            )
        );
    };

    return (
        <>
            <div className="flex items-center md:flex-row flex-col md:space-x-2 md:space-y-0 space-y-2 p-4 bg-[#0A0E27] rounded-lg shadow-md">
                <div className="flex flex-col w-full">
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Cari nama atau nomor..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="text-black p-2 rounded-lg w-full focus:outline-none border-2 border-blue-500 focus:border-blue-600"
                        />
                    </div>
                </div>
                <div className="md:ml-2 w-full">
                    <Select
                        options={typeOptions}
                        isMulti
                        placeholder="Select Types"
                        onChange={(selectedOptions) =>
                            setSelectedTypes(selectedOptions ? selectedOptions.map(option => option.value) : [])
                        }
                        className="rounded-lg"
                        styles={customStyles}
                    />
                </div>
                <div className="md:w-fit w-full flex">
                    <button
                        onClick={handleSearch}
                        className="md:w-[60%]  w-[85%] md:ml-2 px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 focus:outline-none"
                    >
                        Search
                    </button>
                    {/* Sort Button */}
                    <button
                        onClick={toggleSortOrder}
                        className="md:w-[40%] w-[15%] ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none flex items-center"
                    >
                        {sortAsc ? <FaSortAlphaDown className="md:text-[25px] text-[20px]" /> : <FaSortAlphaUp className="text-[25px] text-[20px]" />} {/* Toggle icon */}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-x-8 gap-y-12 p-4">
                {loading
                    ? Array.from({ length: 10 }).map((_, index) => <SkeletonCard key={index} />)
                    : data.map((pokemon: any, index: number) => (
                        <PokemonCard
                            key={index}
                            id={pokemon.id}
                            slug={pokemon.slug}
                            name={pokemon.name}
                            types={pokemon.types}
                            stats={pokemon.stats}
                            image={pokemon.image}
                        />
                    ))}
            </div>

            {/* Load More button */}
            <div className="flex justify-center my-4">
                {
                    (!loading && (!(searchText || selectedTypes.length > 0))) && (
                        <button
                            onClick={handleLoadMore}
                            className="px-6 py-3 text-lg font-semibold rounded-full text-[#A3D2F2] border-2 border-[#A3D2F2] 
                                     bg-transparent hover:bg-[#A3D2F2]/10 focus:outline-none transition-colors
                                     shadow-[0_0_8px_#A3D2F2] hover:shadow-[0_0_15px_#A3D2F2]"
                        >
                            Lihat lebih banyak Pokémon
                        </button>
                    )}
            </div>
        </>
    );
};

export default SearchComponent;
