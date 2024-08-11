import { useState, useEffect } from "react";
import axios from "axios";

export default function PokemonSelectionModal({ onSave, onClose }) {
  const [pokemons, setPokemons] = useState([]);
  const [searchNamePokemon, setSearchPokemon] = useState("");
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        setPokemons(response.data.results);
      } catch (error) {
        console.error("Error fetching Pokémon list", error);
      }
    };
    fetchPokemons();
  }, []);
  const handleInputSearchPokemonName = (e) => {
    setSearchPokemon(e.target.value);
  };
  const filterPokemonName = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchNamePokemon)
  );
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Select a Pokémon</h2>
        <input
          className="bg-white-light mb-4 pl-2 border border-fire w-60"
          type="text"
          placeholder="Search Pokemon"
          onChange={handleInputSearchPokemonName}
        />
        <div className="max-h-80  flex w-90 flex-wrap overflow-y-auto gap-2">
          {filterPokemonName.map((pokemon, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 mb-2 bg-gray-100 border-primary border rounded-lg hover:bg-gray-200 cursor-pointer"
              onClick={() => onSave(pokemon)}
            >
              <div className="text-gray-80">{pokemon.name}</div>
            </div>
          ))}
        </div>
        <button
          className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
