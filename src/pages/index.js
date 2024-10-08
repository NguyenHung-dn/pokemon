import axios from "axios";
import Head from "next/head";
import Layout from "@/components/layout";

import { useEffect, useState } from "react";
import PokemonList from "@/components/PokemonList";
import Loader from "@/components/Loader";
import FilterBox from "@/components/FilterBox";
import ModalPokemon from "@/components/ModalPokemon";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [listType, setListType] = useState([]);
  const [input, setInput] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [filterValue, setFilterValue] = useState({
    input: "",
    types: [],
  });
  const [pokemonName, setPokemonName] = useState("");
  const url = "https://pokeapi.co/api/v2/pokemon";
  const limitPokemon = "?limit=151";
  const fetchPokemon = async (pokemon) => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    return {
      id: response.data.id,
      name: response.data.name,
      imageUrl: response.data.sprites.front_default,
      types: response.data.types.map((t) => t.type.name),
    };
  };
  console.log(`${url}${limitPokemon}`);
  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await axios.get(`${url}${limitPokemon}`);
      const data = await Promise.all(
        response.data.results.map(async (pokemon) => {
          return await fetchPokemon(pokemon.name);
        })
      );
      //get list type all pokemon
      const list = data.reduce((acc, pokemon) => {
        return acc.concat(pokemon.types);
      }, []);
      const listSet = new Set(list); //remove Remove duplicates type
      const typeList = [...listSet];

      setListType(typeList);
      setPokemons(data);
      setIsLoading(false);
    };

    fetchPokemons();
  }, []);
  const handleCheckBox = (e) => {
    e.target.checked
      ? setSelectedTypes((prevSelectedTypes) => [
          ...prevSelectedTypes,
          e.target.value,
        ])
      : setSelectedTypes((prevSelectedTypes) =>
          prevSelectedTypes.filter((type) => type !== e.target.value)
        );
  };
  const handleClickSearch = () => {
    setFilterValue({ input, types: selectedTypes });
  };
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const filterByInput = pokemons.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(filterValue.input.toLowerCase());
  });
  const filteredPokemonType = filterByInput.filter((pokemon) =>
    filterValue.types.length > 0
      ? filterValue.types.some((type) => pokemon.types.includes(type))
      : filterByInput
  );

  const colorClasses = listType.reduce((acc, curr) => {
    acc[curr] = `bg-${curr}`;
    return acc;
  }, {});

  if (isLoading) {
    return <Loader />;
  }

  const handleClickDetail = (value) => {
    setPokemonName(value);
  };
  return (
    <div className="mx-auto max-w-1400px ">
      <Layout title={"Pokédex"}>
        <Head>
          <title>Pokédex - Homepage</title>
          <meta property="og:title" content="Pokédex - Homepage" />
          <meta
            property="og:description"
            content="Find your favorite pokémon"
          />
          <meta property="og:image" content="/banner.png" />
          <meta
            property="og:url"
            content="https://pokemon-main-kohl.vercel.app/ "
          />
          <meta property="og:type" content="Pokédex -Homepage" />
          <meta name="twitter:card" content="image card" />
          <meta name="twitter:title" content="Pokédex - Homepage" />
          <meta
            name="twitter:description"
            content="Find your favorite pokémon"
          />
          <meta name="twitter:image" content="/banner.png" />
          <link rel="icon" type="image/x-icon" href="/favicon.png"></link>
        </Head>

        <div className=" lg:mx-auto flex flex-col lg:flex-row max-w-1200px mx-auto mb-24 mt-14 ">
          <div className="relative ">
            <FilterBox
              pokemons={pokemons}
              colorClasses={colorClasses}
              listType={listType}
              handleCheckBox={handleCheckBox}
              handleClickSearch={handleClickSearch}
              handleInput={handleInput}
              filteredPokemonType={filteredPokemonType}
              input={input}
            />
            <PokemonList
              pokemons={filteredPokemonType}
              handleClickDetail={handleClickDetail}
            />
          </div>
          <div className="w-825px">
            <ModalPokemon
              pokemonName={pokemonName}
              setPokemonName={setPokemonName}
            />
          </div>
        </div>
      </Layout>
    </div>
  );
}
