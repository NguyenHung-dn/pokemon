import axios from "axios";
import { useEffect, useState } from "react";

export default function ModalPokemon() {
  const [pokemon, setPokemon] = useState(null);
  const [typeCss, setTypeCss] = useState("");
  const [abilities, setAbilities] = useState([]);
  const [species, setSpecies] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Pokémon data
        const pokemonResponse = await axios.get(
          "https://pokeapi.co/api/v2/pokemon/1"
        );

        setPokemon(pokemonResponse.data);

        setTypeCss(`bg-${pokemonResponse.data.types[0].type.name}`);
        // Fetch abilities descriptions
        const speciesUrl = pokemonResponse.data.species.url;
        const speciesResponse = await axios.get(speciesUrl);
        const flavorTextEntries = speciesResponse.data.flavor_text_entries;
        setSpecies(
          flavorTextEntries.find((entry) => entry.language.name === "en")
            .flavor_text
        );

        const abilitiesResponses = await Promise.all(
          pokemonResponse.data.abilities.map((ability) =>
            axios.get(ability.ability.url)
          )
        );
        setAbilities(
          abilitiesResponses.map((response) => ({
            name: response.data.name,
            description: response.data.effect_entries.find(
              (entry) => entry.language.name === "en"
            ).effect,
          }))
        );
      } catch (err) {
        setError("Failed to fetch Pokémon data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(pokemon);
  console.log(species);
  return (
    <div className={`h-1000px w-375px rounded-xl relative  `}>
      {pokemon && (
        <>
          <div className="absolute top-1 left-1 w-10 h-10 bg-white  flex justify-center items-center rounded-lg z-10 ">
            1
          </div>
          <div className="absolute top-2 right-3 font-press_start_2p z-10">
            X
          </div>
          <div className="w-375px flex justify-center">
            <img
              className=" absolute w-96 h-fit z-10 top-0"
              src={pokemon.sprites.front_shiny}
              alt={pokemon.name}
            />
          </div>
          <div
            className={`h-1000px w-375px ${typeCss} rounded-xl relative flex justify-center items-end`}
          >
            <div className="h-780px w-365px bg-white rounded-xl mx-auto mb-1 flex flex-col items-center gap-3 ">
              <p className="mt-16">{pokemon.name}</p>
              <div className="flex gap-2">
                {pokemon.types.map((item) => {
                  return (
                    <div
                      className={`bg-${item.type.name} w-72px text-center rounded-4`}
                      key={item.type.name}
                    >
                      {item.type.name}
                    </div>
                  );
                })}
              </div>
              <p className="text-sm text-start px-3 ">{species}</p>
              <div className="h-186px w-345px bg-steel rounded-xl ">asds</div>
              <div className="flex gap-3">
                <p className="bg-steel">{pokemon.height} </p>
                <p className="bg-steel">{pokemon.weight}</p>
              </div>
              {abilities.map((ability, index) => (
                <div
                  className="text-center  bg-steel mx-2 rounded-xl"
                  key={index}
                >
                  <p className="">{ability.name}</p>
                  <div className="text-start px-2">
                    <p> {ability.description}</p>
                  </div>
                </div>
              ))}
              {/* <div className=" h-28 w-345px bg-steel "></div> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
