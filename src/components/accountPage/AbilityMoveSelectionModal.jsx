import { useState, useEffect } from "react";
import axios from "axios";

export default function AbilityMoveSelectionModal({
  pokemon,
  onSave,
  onClose,
}) {
  const [abilities, setAbilities] = useState([]);
  const [moves, setMoves] = useState([]);
  const [selectedAbility, setSelectedAbility] = useState("");
  const [selectedMoves, setSelectedMoves] = useState([]);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (pokemon && pokemon.name) {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
          );
          setAbilities(response.data.abilities || []);
          setMoves(response.data.moves || []);
        } catch (error) {
          console.error("Error fetching Pokémon details", error);
        }
      }
    };

    fetchPokemonDetails();
  }, [pokemon]);

  const handleMoveSelection = (e, moveName) => {
    if (e.target.checked) {
      if (selectedMoves.length < 4) {
        setSelectedMoves([...selectedMoves, moveName]);
      } else {
        e.target.checked = false;
        alert("You can only select up to 4 moves.");
      }
    } else {
      setSelectedMoves(selectedMoves.filter((m) => m !== moveName));
    }
  };

  const handleSave = () => {
    onSave({
      name: pokemon?.name || "",
      ability: selectedAbility,
      moves: selectedMoves,
    });
  };

  if (!pokemon || !pokemon.name) return null; // Do not render if Pokémon data is invalid

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1000px">
        <h2 className="text-lg font-semibold mb-4">
          Select Ability and Moves for {pokemon.name}
        </h2>
        <div className="mb-4">
          <h3>Ability</h3>
          <select
            onChange={(e) => setSelectedAbility(e.target.value)}
            value={selectedAbility}
          >
            <option value="">Select an ability</option>
            {abilities.length > 0 ? (
              abilities.map((ability) => (
                <option key={ability.ability.name} value={ability.ability.name}>
                  {ability.ability.name}
                </option>
              ))
            ) : (
              <option value="">No abilities available</option>
            )}
          </select>
        </div>
        <div className="mb-4">
          <h3>Moves</h3>
          <ul className="flex gap-2 flex-wrap justify-start h-800px w-full ">
            {moves.length > 0 ? (
              moves.map((move) => (
                <div className="flex gap-0.5 border rounded-md border-primary-light">
                  <input
                    type="checkbox"
                    value={move.move.name}
                    onChange={(e) => handleMoveSelection(e, move.move.name)}
                    checked={selectedMoves.includes(move.move.name)}
                    disabled={
                      !selectedMoves.includes(move.move.name) &&
                      selectedMoves.length >= 4
                    }
                  />
                  <li
                    key={move.move.name}
                    className="bg-gray-300 border px-1 py-0.5 rounded-md "
                  >
                    {move.move.name}
                  </li>
                </div>
              ))
            ) : (
              <li>No moves available</li>
            )}
          </ul>
        </div>
        <button
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="p-2 bg-red-500 text-white rounded hover:bg-red-700 ml-2"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
