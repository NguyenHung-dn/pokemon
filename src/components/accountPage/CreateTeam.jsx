import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import PokemonSelectionModal from "./PokemonSelectionModal";
import AbilityMoveSelectionModal from "./AbilityMoveSelectionModal";
import PokemonInformationModal from "./PokemonInformationModal";

export default function CreateTeam({
  userData,
  fetchDataUserTeams,
  selectedTeamIndex,
  teamPokemon,
  handleTeamClick,
  setTeamPokemon,
  setSelectedTeamIndex,
  setShowPokemonModal, // Nhận prop từ AccountPage
  setSelectedPokemon, // Nhận prop từ AccountPage
  setShowAbilityMoveModal, // Nhận prop từ AccountPage
  setShowPokemonInfoModal, // Nhận prop từ AccountPage
  setPokemonInfo, // Nhận prop từ AccountPage
}) {
  const [pokemonListName, setPokemonListName] = useState([]);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?offset=0&limit=151"
        );
        setPokemonListName(response.data.results);
      } catch (error) {
        console.error("Failed to fetch Pokémon data:", error);
      }
    };

    fetchPokemon();
  }, []);
  console.log("pokemonListName", pokemonListName);
  const handleCreateTeam = async () => {
    // const token = Cookies.get("token");
    if (!token) {
      alert("Token không hợp lệ hoặc không có.");
      return;
    }

    try {
      await axios.post("https://pokemon-api-phi-nine.vercel.app/team/create", {
        token,
        team: [],
      });
      fetchDataUserTeams(); // Cập nhật dữ liệu đội hình
      alert("Team created successfully");
    } catch (error) {
      console.error("Failed to create team:", error);
      alert(
        "Failed to create team: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  // const handleSaveTeam = async () => {
  //   const token = Cookies.get("token");
  //   if (!token) {
  //     alert("Token không hợp lệ hoặc không có.");
  //     return;
  //   }

  //   if (selectedTeamIndex === null) {
  //     alert("No team selected.");
  //     return;
  //   }

  //   try {
  //     await axios.post("https://pokemon-api-phi-nine.vercel.app/team/update", {
  //       token,
  //       team: {
  //         _id: userData.teams[selectedTeamIndex]._id,
  //         team: teamPokemon,
  //       },
  //     });
  //     fetchDataUserTeams(); // Cập nhật dữ liệu đội hình
  //     alert("Team updated successfully");
  //   } catch (error) {
  //     console.error("Failed to update team:", error);
  //     alert(
  //       "Failed to update team: " +
  //         (error.response?.data?.message || error.message)
  //     );
  //   }
  // };
  // const addPokemonToTeam = (pokemon) => {
  //   setTeamPokemon((prevTeam) => {
  //     if (prevTeam.length < 6) {
  //       return [...prevTeam, pokemon];
  //     } else {
  //       alert("A team can only have up to 6 Pokémon.");
  //       return prevTeam;
  //     }
  //   });
  //   setShowPokemonModal(false);
  // };

  // const handleSelectPokemonModal = (pokemon) => {
  //   setSelectedPokemon(pokemon);
  //   setShowPokemonModal(true);
  // };
  // const handleSaveAbilityMove = (pokemon) => {
  //   setTeamPokemon((prevTeam) =>
  //     prevTeam.map((poke) => (poke.name === pokemon.name ? pokemon : poke))
  //   );
  //   setShowAbilityMoveModal(false);
  // };

  // const handlePokemonInfo = (pokemon) => {
  //   const fetchPokemonDetails = async (pokemonName) => {
  //     try {
  //       const response = await axios.get(
  //         `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  //       );
  //       const { name, id, types, abilities, moves } = response.data;
  //       setPokemonInfo({
  //         name,
  //         id,
  //         type: types.map((typeInfo) => typeInfo.type.name).join(", "),
  //         abilities: abilities.map((abilityInfo) => abilityInfo.ability.name),
  //         moves: moves.map((moveInfo) => moveInfo.move.name),
  //       });
  //       setShowPokemonInfoModal(true);
  //     } catch (error) {
  //       console.error("Failed to fetch Pokémon details:", error);
  //     }
  //   };

  //   fetchPokemonDetails(pokemon.name);
  // };

  // const handleEditPokemon = (pokemon) => {
  //   setSelectedPokemon(pokemon);
  //   setShowAbilityMoveModal(true);
  // };

  // const handleSelectPokemon = (pokemon) => {
  //   setTeamPokemon((prevTeam) =>
  //     prevTeam.map((poke) => (poke.name === pokemon.name ? pokemon : poke))
  //   );
  //   setShowAbilityMoveModal(true);
  // };

  const imgId = pokemonListName.map((p) => {
    const urlParts = p.url.split("/");
    const id = urlParts[urlParts.length - 2];
    return { name: p.name, id: Number(id) };
  });
  return (
    <section className="flex gap-4">
      <div className="h-1000px w-375px bg-primary">
        <h1 className="font-press_start_2p">MyTeam</h1>
        <div className="flex flex-col">
          {userData &&
            userData.teams.map((u, index) => (
              <button key={index} onClick={() => handleTeamClick(index)}>
                Team {index + 1}
              </button>
            ))}
          {userData && userData.teams.length < 5 && (
            <button onClick={handleCreateTeam}>Add Team</button>
          )}
        </div>
      </div>
      {/* <div>
        {selectedTeamIndex !== null &&
          userData &&
          userData.teams[selectedTeamIndex] && (
            <>
              <div>
                Choose Pokémon
                <div className="flex gap-3">
                  {teamPokemon.map((pokemon) => {
                    return (
                      <div
                        key={pokemon.name}
                        className="flex items-center gap-3 justify-between p-2 bg-gray-100 rounded mb-2"
                      >
                        <span>{pokemon.name}</span>
                        <button
                          className="text-blue-500  bg-yellow-400 "
                          onClick={() => handlePokemonInfo(pokemon)}
                        >
                          Info
                        </button>
                        <button
                          className="text-blue-500 bg-primary "
                          onClick={() => handleEditPokemon(pokemon)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-fire p-2   bg-gray-700"
                          onClick={() => {
                            handleSelectPokemonModal(pokemon);
                          }}
                        >
                          Select New Pokémon
                        </button>
                      </div>
                    );
                  })}
                  {teamPokemon.length < 4 && (
                    <button onClick={() => setShowPokemonModal(true)}>
                      Add Pokémon
                    </button>
                  )}
                </div>
              </div>
              <div className="h-80 w-785px bg-steel">Information</div>
              <button
                onClick={handleSaveTeam}
                className="mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-700"
              >
                Save Team
              </button>
            </>
          )}
      </div> */}
    </section>
  );
}
