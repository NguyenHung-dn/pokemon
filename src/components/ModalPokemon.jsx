import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ModalPokemon({ pokemonDetail }) {
  const [pokemon, setPokemon] = useState(null);
  const [typeCss, setTypeCss] = useState("");
  const [abilities, setAbilities] = useState([]);
  const [species, setSpecies] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemonDetail) return;

    const fetchData = async () => {
      try {
        // Fetch Pokémon data
        const pokemonResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonDetail}`
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
        setError("Failed to fetch   data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pokemonDetail]);

  return (
    <div className="mt-225px">
      {pokemon ? (
        <div className={`w-375px h-fit rounded-xl relative  `}>
          {pokemon && (
            <div className="flex  flex-col relative">
              <div className="absolute top-1 left-1 w-10 h-10 bg-white  flex justify-center items-center rounded-lg z-10 ">
                1
              </div>
              <div className="absolute top-2 right-3 font-press_start_2p z-10">
                X
              </div>

              <div
                className={`min-h-1000px w-375px ${typeCss} rounded-xl relative flex flex-col justify-center items-end`}
              >
                <Image
                  width={200}
                  height={200}
                  className=" absolute top-24 right-1/2 translate-x-1/2"
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                />
                <div className="h-180px w-365px bg-white rounded-xl mx-auto mb-1 flex flex-col items-center gap-3 mt-56 ">
                  <p className="mt-16">{pokemon.name}</p>
                  <div className="flex gap-2">
                    {pokemon.types.map((item) => {
                      return (
                        <div
                          className={`bg-${item.type.name}  w-72px text-center rounded-4`}
                          key={item.type.name}
                        >
                          {item.type.name}
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-sm text-start px-3 ">{species}</p>
                  <div className="h-186px w-345px bg-steel rounded-xl flex  flex-col gap-1 ">
                    {/* stats */}
                    {pokemon.stats.map((item, index) => {
                      let statName;
                      if (item.stat.name === "special-attack") {
                        statName = "special";
                      } else if (item.stat.name === "special-defense") {
                        statName = "spe-def";
                      } else {
                        statName = item.stat.name;
                      }
                      const widthStyle = { width: `${item.base_stat}px` };
                      return (
                        <div
                          key={index}
                          className="p-1  h-5 text-sm flex gap-1  items-center m-auto "
                        >
                          <div className="w-16 text-sm">{statName}</div>
                          <div
                            className={`h-1 w-225px bg-white flex items-center justify-start`}
                          >
                            <div
                              className="h-1 bg-primary"
                              style={widthStyle}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex gap-1.5">
                    <div className="bg-steel h-30px w-170px rounded-xl text-center flex items-center justify-center">
                      {pokemon.height * 10} cm
                    </div>
                    <p className="bg-steel h-30px w-170px rounded-xl text-center flex items-center justify-center">
                      {pokemon.weight / 10} kg
                    </p>
                  </div>
                  <div className=" flex gap-4 flex-col mb-4">
                    {abilities.map((ability, index) => (
                      <div
                        className="text-center  bg-steel mx-2 rounded-xl "
                        key={index}
                      >
                        <p className="mb-1.5 mt-1.5">{ability.name}</p>
                        <div className="text-start px-2">
                          <p> {ability.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* <div className=" h-28 w-345px bg-steel "></div> */}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={`min-h-1000px w-375px rounded-xl relative  `}>
          chosePokemon to view more detail
        </div>
      )}
    </div>
  );
}
