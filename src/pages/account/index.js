import CreateTeam from "@/components/accountPage/CreateTeam";
import Layout from "@/components/layout";
import axios from "axios";
import Cookies from "js-cookie";
import Head from "next/head";
import { useEffect, useState } from "react";
import PokemonSelectionModal from "@/components/accountPage/PokemonSelectionModal"; // Di chuyển import này từ CreateTeam
import AbilityMoveSelectionModal from "@/components/accountPage/AbilityMoveSelectionModal";
import PokemonInformationModal from "@/components/accountPage/PokemonInformationModal";
export default function AccountPage() {
  const [userData, setUserData] = useState("");
  const [error, setError] = useState(null);
  const [selectedTeamIndex, setSelectedTeamIndex] = useState(null);
  const [teamPokemon, setTeamPokemon] = useState([]);
  const cookie = Cookies.get("token");

  const [showPokemonModal, setShowPokemonModal] = useState(false); // Di chuyển từ CreateTeam
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Di chuyển từ CreateTeam
  const [showAbilityMoveModal, setShowAbilityMoveModal] = useState(false); // Di chuyển từ CreateTeam
  const [showPokemonInfoModal, setShowPokemonInfoModal] = useState(false); // Di chuyển từ CreateTeam
  const [pokemonInfo, setPokemonInfo] = useState(null); // Di chuyển từ CreateTeam

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
  useEffect(() => {
    fetchDataUserTeams();
  }, [cookie]);

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

  const handleEditPokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
    setShowAbilityMoveModal(true);
  };
  const handleSelectPokemonModal = (pokemon) => {
    setSelectedPokemon(pokemon);
    setShowPokemonModal(true);
  };
  const handlePokemonInfo = (pokemon) => {
    const fetchPokemonDetails = async (pokemonName) => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        const { name, id, types, abilities, moves } = response.data;
        setPokemonInfo({
          name,
          id,
          type: types.map((typeInfo) => typeInfo.type.name).join(", "),
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
    <Layout title={"Account"}>
      <div className="flex">
        <>
          <CreateTeam
            userData={userData}
            fetchDataUserTeams={fetchDataUserTeams}
            selectedTeamIndex={selectedTeamIndex}
            teamPokemon={teamPokemon}
            handleTeamClick={handleTeamClick} // Thêm prop này
            setTeamPokemon={setTeamPokemon}
            setSelectedTeamIndex={setSelectedTeamIndex}
            setShowPokemonModal={setShowPokemonModal} // Truyền thêm prop này
            setSelectedPokemon={setSelectedPokemon} // Truyền thêm prop này
            setShowAbilityMoveModal={setShowAbilityMoveModal} // Truyền thêm prop này
            setShowPokemonInfoModal={setShowPokemonInfoModal} // Truyền thêm prop này
            setPokemonInfo={setPokemonInfo} // Truyền thêm prop này
          />
        </>
        <div className="flex flex-col">
          {showPokemonModal && ( // Di chuyển từ CreateTeam
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
                setSelectedPokemon(null); // Reset selected Pokémon
                setShowPokemonModal(false);
              }}
              onClose={() => setShowPokemonModal(false)}
            />
          )}
          {showAbilityMoveModal &&
            selectedPokemon && ( // Di chuyển từ CreateTeam
              <AbilityMoveSelectionModal
                pokemon={selectedPokemon}
                onSave={handleSaveAbilityMove}
                onClose={() => setShowAbilityMoveModal(false)}
              />
            )}

          {showPokemonInfoModal &&
            pokemonInfo && ( // Di chuyển từ CreateTeam
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
                            className="text-fire p-2 bg-gray-700"
                            onClick={() => handleSelectPokemonModal(pokemon)}
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
        </div>
      </div>
    </Layout>
  );
}

// <Head>
// <title>Pokédex - AccountPage</title>
// <meta property="og:title" content="Pokédex - Homepage" />
// <meta property="og:description" content="Find your favorite pokémon" />
// <meta property="og:image" content="/banner.png" />
// <meta property="og:url" content="https://pokemon-main-kohl.vercel.app/" />
// <meta property="og:type" content="website" />
// <meta name="twitter:card" content="image card" />
// <meta name="twitter:title" content="Pokédex - Homepage" />
// <meta name="twitter:description" content="Find your favorite pokémon" />
// <meta name="twitter:image" content="/banner.png" />
// <link rel="icon" type="image/x-icon" href="/favicon.png"></link>
// </Head>
