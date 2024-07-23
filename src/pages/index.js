import axios from "axios";
import Link from "next/link";
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
    <Layout title={"Pokédex"}>
      <main>
        <h1>
          <Link href="/account">go account page</Link>
        </h1>

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
      </main>
    </Layout>
  );
}
