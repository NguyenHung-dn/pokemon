import CreateTeam from "@/components/accountPage/CreateTeam";
import Layout from "@/components/layout";
import axios from "axios";
import Cookies from "js-cookie";
import Head from "next/head";
import { useEffect, useState } from "react";
import PokemonSelectionModal from "@/components/accountPage/PokemonSelectionModal"; // Di chuyển import này từ CreateTeam
import AbilityMoveSelectionModal from "@/components/accountPage/AbilityMoveSelectionModal";
import PokemonInformationModal from "@/components/accountPage/PokemonInformationModal";
import { getAllPokemonDetails } from "@/services/pokemonService";
import PokemonOptionPopup from "@/components/accountPage/PokemonOptionPopup";

export default function AccountPage() {
  const [userData, setUserData] = useState("");
  const [error, setError] = useState(null);
  const [selectedTeamIndex, setSelectedTeamIndex] = useState(null);
  const [teamPokemon, setTeamPokemon] = useState([]);
  const cookie = Cookies.get("token");
  const [showPokemonModal, setShowPokemonModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showAbilityMoveModal, setShowAbilityMoveModal] = useState(false);
  const [showPokemonInfoModal, setShowPokemonInfoModal] = useState(false);
  const [pokemonInfo, setPokemonInfo] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const fetchDataUserTeams = async () => {
    try {
      const response = await axios.post(
        "https://pokemon-api-phi-nine.vercel.app/auth",
        {
          token: cookie,
        }
      );
      setUserData(response.data.user);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  // Hàm gọi API và lưu dữ liệu Pokémon
  const fetchPokemonData = async () => {
    try {
      const allPokemonDetails = await getAllPokemonDetails();
      setPokemonInfo(allPokemonDetails);
    } catch (error) {
      console.error("Failed to fetch Pokémon details:", error);
    }
  };
  useEffect(() => {
    fetchDataUserTeams();
    fetchPokemonData();
  }, []);

  const handleTeamClick = (index) => {
    setSelectedTeamIndex(index);
    setTeamPokemon(userData.teams[index]?.team);
  };
  const handleSaveAbilityMove = (pokemon) => {
    // Di chuyển từ CreateTeam
    setTeamPokemon((prevTeam) =>
      prevTeam.map((poke) => (poke.name === pokemon.name ? pokemon : poke))
    );
    setShowAbilityMoveModal(false);
  };
  // Thêm logic xử lý lưu và thêm Pokemon
  const addPokemonToTeam = (pokemon) => {
    // Di chuyển từ CreateTeam
    setTeamPokemon((prevTeam) => {
      if (prevTeam.length < 6) {
        return [...prevTeam, pokemon];
      } else {
        alert("A team can only have up to 6 Pokémon.");
        return prevTeam;
      }
    });
    setShowPokemonModal(false);
  };

  const handleSaveTeam = async () => {
    const token = Cookies.get("token");
    if (!token) {
      alert("Token không hợp lệ hoặc không có.");
      return;
    }

    if (selectedTeamIndex === null) {
      alert("No team selected.");
      return;
    }

    try {
      await axios.post("https://pokemon-api-phi-nine.vercel.app/team/update", {
        token,
        team: {
          _id: userData.teams[selectedTeamIndex]._id,
          team: teamPokemon,
        },
      });
      fetchDataUserTeams(); // Cập nhật dữ liệu đội hình
      alert("Team updated successfully");
    } catch (error) {
      console.error("Failed to update team:", error);
      alert(
        "Failed to update team: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleSelectNewPokemon = (pokemon) => {
    setShowPopup(false);
    // Hiển thị modal để chọn Pokémon mới
    setShowPokemonModal(true);
  };

  const handleEditPokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
    setShowAbilityMoveModal(true);
  };
  const handleSelectPokemonModal = (pokemon) => {
    setSelectedPokemon(pokemon);
    setShowPokemonModal(true);
  };
  const handleImageClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setShowPopup(true);
  };
  const handlePokemonInfo = (pokemon) => {
    const pokemonDetail = pokemonInfo.find((p) => p.name === pokemon.name);
    if (pokemonDetail) {
      setPokemonInfo({
        name: pokemonDetail.name,
        id: pokemonDetail.id,
        type: pokemonDetail.types
          .map((typeInfo) => typeInfo.type.name)
          .join(", "),
        abilities: pokemonDetail.abilities.map(
          (abilityInfo) => abilityInfo.ability.name
        ),
        moves: pokemonDetail.moves.map((moveInfo) => moveInfo.move.name),
      });
      setShowPokemonInfoModal(true);
    } else {
      console.error("Pokémon details not found.");
    }
  };

  return (
    <Layout title={"Account"}>
      <Head>
        <title>Pokédex - AccountPage</title>
        <meta property="og:title" content="Pokédex - Homepage" />
        <meta property="og:description" content="Find your favorite pokémon" />
        <meta property="og:image" content="/banner.png" />
        <meta property="og:url" content="https:pokemon-main-kohl.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="image card" />
        <meta name="twitter:title" content="Pokédex - Homepage" />
        <meta name="twitter:description" content="Find your favorite pokémon" />
        <meta name="twitter:image" content="/banner.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.png"></link>
      </Head>
      <div className="flex">
        <>
          <CreateTeam
            userData={userData}
            fetchDataUserTeams={fetchDataUserTeams}
            selectedTeamIndex={selectedTeamIndex}
            teamPokemon={teamPokemon}
            handleTeamClick={handleTeamClick}
            setTeamPokemon={setTeamPokemon}
            setSelectedTeamIndex={setSelectedTeamIndex}
            setShowPokemonModal={setShowPokemonModal}
            setSelectedPokemon={setSelectedPokemon}
            setShowAbilityMoveModal={setShowAbilityMoveModal}
            setShowPokemonInfoModal={setShowPokemonInfoModal}
            setPokemonInfo={setPokemonInfo}
          />
        </>
        <div className="flex flex-col">
          {showPokemonModal && (
            <PokemonSelectionModal
              onSave={(pokemon) => {
                if (selectedPokemon) {
                  setTeamPokemon((prevTeam) =>
                    prevTeam.map((poke) =>
                      poke.name === selectedPokemon.name ? pokemon : poke
                    )
                  );
                } else {
                  addPokemonToTeam(pokemon);
                }
                setSelectedPokemon(null);
                setShowPokemonModal(false);
              }}
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

          {showPokemonInfoModal && pokemonInfo && (
            <PokemonInformationModal
              pokemon={pokemonInfo}
              onClose={() => setShowPokemonInfoModal(false)}
            />
          )}

          {selectedTeamIndex !== null &&
            userData &&
            userData.teams[selectedTeamIndex] && (
              <>
                <div>
                  Choose Pokémon
                  <div className="flex gap-3">
                    {teamPokemon.map((pokemon) => {
                      const pokemonDetail = pokemonInfo.find(
                        (p) => p.name === pokemon.name
                      );

                      return (
                        <div
                          key={pokemon.name}
                          className="flex items-center gap-3 justify-between p-2 bg-gray-100 rounded mb-2"
                        >
                          <img
                            onClick={() => handleImageClick(pokemon)}
                            src={
                              pokemonDetail
                                ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetail.id}.png`
                                : "/placeholder.png"
                            }
                            alt={pokemon.name}
                            className="w-16 h-16 hover:cursor-pointer"
                          />

                          {/* <button
                            className="text-fire p-2 bg-gray-700"
                            onClick={() => handleSelectPokemonModal(pokemon)}
                          >
                            Select New Pokémon
                          </button> */}
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
                <div className="h-80 w-785px bg-steel p-4">
                  {selectedTeamIndex !== null &&
                  userData &&
                  userData.teams[selectedTeamIndex] ? (
                    userData.teams[selectedTeamIndex].team.map(
                      (pokemon, index) => (
                        <div key={index} className="mb-4">
                          <h2 className="text-lg font-bold">{pokemon.name}</h2>
                          <p>
                            <strong>Ability:</strong> {pokemon.ability}
                          </p>
                          <p>
                            <strong>Moves:</strong> {pokemon.moves.join(", ")}
                          </p>
                        </div>
                      )
                    )
                  ) : (
                    <p>No team selected or team data unavailable.</p>
                  )}
                </div>{" "}
                <button
                  onClick={handleSaveTeam}
                  className="mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-700"
                >
                  Save Team
                </button>
              </>
            )}
        </div>
        {showPopup && selectedPokemon && (
          <PokemonOptionPopup
            pokemon={selectedPokemon}
            onEdit={() => handleEditPokemon(selectedPokemon)}
            onSelectNew={() => handleSelectNewPokemon(selectedPokemon)}
            onClose={() => setShowPopup(false)}
          />
        )}
      </div>
    </Layout>
  );
}
