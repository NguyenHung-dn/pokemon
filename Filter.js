import axios from "axios";
import { useEffect, useState } from "react";
import TypeFilter from "./TypeFilter";
import CardPokemon from "./CardPokemon";
export default function Filter() {
  const [types, setTypes] = useState([]);
  const [filterType, setFilterType] = useState([]);
  const [listPokemon, setListPokemon] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type/?offset=0&limit=18")
      .then(function (response) {
        setTypes(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, []);
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=151")
      .then(function (response) {
        setListPokemon(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, []);
  const handleCheckBox = (name) => {
    filterType.includes(name) ? "" : setFilterType([...filterType, name]);
  };
  const handleInput = (e) => {
    setSearchInput(e.target.value);
  };
  const colorClasses = types.reduce((acc, type) => {
    if (type.name != "unknown") {
      acc[type.name] = `bg-${type.name}`;
    }
    return acc;
  }, {});
  let filterByInput = listPokemon.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchInput.toLowerCase());
  });
  console.log("filter by input", filterByInput);
  return (
    <div className="flex flex-col w-[785px] h-[160px] gap-4 ml-[100px] font-montserrat">
      <input
        className="w-[260px] h-[40px] pl-3 "
        placeholder="text to search pokemon"
        value={searchInput}
        onChange={(e) => {
          handleInput(e);
        }}
      />
      <div className="flex flex-row flex-wrap justify-start gap-4">
        {types.map((cell) => {
          return cell.name === "unknown" ? (
            ""
          ) : (
            <div k className="flex  gap-1 justify-center items-center">
              <input
                className="w-5 h-5"
                type="checkbox"
                value={cell.name}
                onClick={() => {
                  handleCheckBox(cell.name);
                }}
              />
              <p
                className={` w-[75px] h-[25px] text-center rounded-md text-white ${
                  colorClasses[cell.name]
                } `}
              >
                {cell.name}
              </p>
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-4">
        {filterByInput.map((poke) => {
          return <CardPokemon data={poke} />;
        })}
      </div>
    </div>
  );
}
