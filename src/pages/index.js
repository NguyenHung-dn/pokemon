import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import Layout from "@/components/layout";

import { useEffect, useState } from "react";
import PokemonList from "@/components/PokemonList";
import Loader from "@/components/Loader";
import FilterBox from "@/components/FilterBox";

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
  // useEffect(() => {
  //   const fetchAllPokemon = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://pokeapi.co/api/v2/pokemon?limit=151"
  //       );
  //       const pokemonUrls = response.data.results.map((pokemon) => pokemon.url);
  //       const pokemonResponses = await Promise.all(
  //         pokemonUrls.map((url) => axios.get(url))
  //       );
  //       const allPokemonData = pokemonResponses.map(
  //         (response) => response.data
  //       );
  //       console.log("🚀 ~ fetchAllPokemon ~ allPokemonData:", allPokemonData);
  //       const list = allPokemonData.reduce((acc, pokemon) => {
  //         return acc.concat(pokemon.types);
  //       }, []);
  //       const listSet = new Set(list); //remove Remove duplicates type
  //       const typeList = [...listSet];
  //       console.log("🚀 ~ fetchAllPokemon ~ typeList:", typeList);
  // Chọn ra những thông tin cần thiết từ dữ liệu
  // const selectedPokemonData = allPokemonData.map((pokemon) => ({
  //   name: pokemon.name,
  //   id: pokemon.id,
  //   height: pokemon.height,
  //   weight: pokemon.weight,
  //   types: pokemon.types.map((typeInfo) => typeInfo.type.name),
  // }));

  // setPokemonData(selectedPokemonData);
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //   };

  //   fetchAllPokemon();
  // }, []);
  // fetch all pokemons
  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
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

  return (
    <main>
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
            content="https://pokemon-76uw-l7og3xfg0-nguyenhungs-projects-1d1013a4.vercel.app/"
          />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="image card" />
          <meta name="twitter:title" content="Pokédex - Homepage" />
          <meta
            name="twitter:description"
            content="Find your favorite pokémon"
          />
          <meta name="twitter:image" content="/banner.png" />
          <link rel="icon" type="image/x-icon" href="/favicon.png"></link>
        </Head>

        <div className="ml-16 mr-16">
          <h2>My Pokemon Collection</h2>

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
          <PokemonList pokemons={filteredPokemonType} />
        </div>
      </Layout>
    </main>
  );
}
