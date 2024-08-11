import React from "react";

export default function PokemonInformationModal({ pokemon, onClose }) {
  if (!pokemon) return null;
  const handlePokemonInfo = (pokemon) => {
    // Giả sử bạn có phương thức để lấy thông tin chi tiết của Pokémon
    const fetchPokemonDetails = async (pokemonName) => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        const { name, id, types, abilities, moves } = response.data;
        setPokemonInfo({
          name,
          id,
          types,
          abilities: abilities.map((abilityInfo) => abilityInfo.ability.name),
          moves: moves.map((moveInfo) => moveInfo.move.name),
        });
        setShowPokemonInfoModal(true);
      } catch (error) {
        console.error("Failed to fetch Pokémon details:", error);
      }
    };

    fetchPokemonDetails(pokemon.name);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-500px">
        <h2 className="text-lg font-semibold mb-4">{pokemon.name}</h2>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
          alt={pokemon.name}
          className="w-32 h-32 mb-4"
        />
        <div>
          <strong>Type:</strong>
          <p>{pokemon.type}</p>
        </div>
        <p>
          <strong>Abilities:</strong> {pokemon.abilities.join(", ")}
        </p>
        <p>
          <strong>Moves:</strong> {pokemon.moves.join(", ")}
        </p>
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
