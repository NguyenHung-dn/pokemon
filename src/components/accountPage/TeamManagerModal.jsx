import { useState, useEffect } from "react";
import axios from "axios";
import PokemonSelectionModal from "./PokemonSelectionModal";
import AbilityMoveSelectionModal from "./AbilityMoveSelectionModal";

export default function TeamManagerModal({ team, onClose }) {
  const [teamMembers, setTeamMembers] = useState(team.members);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showPokemonModal, setShowPokemonModal] = useState(false);
  const [showAbilityMoveModal, setShowAbilityMoveModal] = useState(false);

  const addPokemon = (pokemon) => {
    if (teamMembers.length < 6) {
      setTeamMembers([...teamMembers, pokemon]);
      setShowPokemonModal(false);
    } else {
      alert("A team can only have 6 Pokémon.");
    }
  };

  const handleSaveAbilityMove = (pokemon) => {
    setTeamMembers(
      teamMembers.map((poke) => (poke.name === pokemon.name ? pokemon : poke))
    );
    setShowAbilityMoveModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">
          Manage Team - {team.name}
        </h2>
        <div className="max-h-80 overflow-y-auto mb-4">
          {teamMembers.map((pokemon, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 mb-2 bg-gray-100 rounded hover:bg-gray-200"
            >
              <span className="text-gray-800">{pokemon.name}</span>
              <button
                className="text-blue-500 underline"
                onClick={() => {
                  setSelectedPokemon(pokemon);
                  setShowAbilityMoveModal(true);
                }}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
        <button
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() => setShowPokemonModal(true)}
        >
          Add Pokémon
        </button>
        <button
          className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-700"
          onClick={onClose}
        >
          Close
        </button>
        {showPokemonModal && (
          <PokemonSelectionModal
            onSave={addPokemon}
            onClose={() => setShowPokemonModal(false)}
          />
        )}
        {showAbilityMoveModal && selectedPokemon && (
          <AbilityMoveSelectionModal
            pokemon={selectedPokemon}
            onSave={handleSaveAbilityMove}
            onClose={() => setShowAbilityMoveModal(false)}
          />
        )}
      </div>
    </div>
  );
}
