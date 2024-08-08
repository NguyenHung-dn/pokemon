import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function CreateTeam({ userData }) {
  const [teamPokemon, setTeamPokemon] = useState([
    {
      name: "",
      ability: "",
      move: [],
    },
  ]);
  const [pokemonListName, setPokemonListName] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?offset=0&limit=151"
        );

        setPokemonListName(response.data.results);
      } catch (error) {
        setError(error);
        console.error("Failed to fetch Pokémon data:", error);
      }
    };

    fetchPokemon();
  }, []);
  //dummy data
  const pokemonInTeam = [
    { name: "1" },
    { name: "2" },
    { name: "3" },
    { name: "4" },
    { name: "5" },
  ];
  return (
    <section className="flex ga-4">
      <div className="h-1000px w-375px bg-primary ">
        <h1 className=" font-press_start_2p">MyTeam</h1>
        <div>
          {userData &&
            userData.map((u, index) => {
              return <div key={index}>Team {index}</div>;
            })}
          {userData.length < 5 && <button>AddTeam</button>}
        </div>
      </div>
      <div>
        <div>
          chose pokemon
          <div className="flex gap-3">
            {pokemonInTeam.map((team, index) => (
              <div key={index}>{team.name}</div>
            ))}
          </div>
        </div>

        <div className="h-80 w-785px bg-steel"> information</div>
      </div>
    </section>
  );
}
