import { useState, useEffect } from "react";
import axios from "axios";
import PokemonSelectionModal from "./PokemonSelectionModal";
import AbilityMoveSelectionModal from "./AbilityMoveSelectionModal";

export default function ManagerTeamModal({ team, onClose, onUpdateTeam }) {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showPokemonModal, setShowPokemonModal] = useState(false);
  const [showAbilityMoveModal, setShowAbilityMoveModal] = useState(false);
  const [teamPokemon, setTeamPokemon] = useState(team);

  useEffect(() => {
    setTeamPokemon(team);
  }, [team]);

  const addPokemon = (pokemon) => {
    if (teamPokemon.length < 6) {
      setTeamPokemon([...teamPokemon, pokemon]);
      setShowPokemonModal(false);
    } else {
      alert("A team can only have 6 Pokémon.");
    }
  };

  const handleSaveAbilityMove = (pokemon) => {
    setTeamPokemon(
      teamPokemon.map((poke) => (poke.name === pokemon.name ? pokemon : poke))
    );
    setShowAbilityMoveModal(false);
  };

  const handleUpdateTeam = () => {
    onUpdateTeam(teamPokemon);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Manage Team</h2>
        <div className="mb-4">
          {teamPokemon.length === 0 ? (
            <div className="text-gray-500">
              No Pokémon in this team. Add Pokémon to start.
            </div>
          ) : (
            teamPokemon.map((pokemon, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 mb-2 bg-gray-100 rounded"
              >
                <span>{pokemon.name}</span>
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
            ))
          )}
        </div>
        {teamPokemon.length < 6 && (
          <button
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={() => setShowPokemonModal(true)}
          >
            Add Pokémon
          </button>
        )}
        <div className="flex justify-between mt-4">
          <button
            className="p-2 bg-green-500 text-white rounded hover:bg-green-700"
            onClick={handleUpdateTeam}
          >
            Save Team
          </button>
          <button
            className="p-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        {showPokemonModal && (
          <PokemonSelectionModal
            onSave={(pokemon) => addPokemon(pokemon)}
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
