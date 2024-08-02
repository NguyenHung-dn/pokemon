import { useState } from "react";
export default function FilterBox(props) {
  const {
    colorClasses,
    pokemons,
    listType,
    input,
    handleCheckBox,
    handleClickSearch,
    handleInput,
    filterByInput,
    filteredPokemonType,
  } = props;

  return (
    <div className="flex flex-col w-[785px] h-[160px] gap-4 ml-[100px] font-montserrat">
      <div>
        <input
          className="w-[260px] h-[40px] line pl-3 border-black border-[1px] rounded-lg "
          placeholder="search for a pokemon..."
          value={input}
          onChange={(e) => {
            handleInput(e);
          }}
        />
        <button
          onClick={handleClickSearch}
          className="  ml-8 bg-flying h-full border-black border-[1px] rounded-lg px-2 "
        >
          Search
        </button>
      </div>
      <div className="flex flex-row flex-wrap justify-start gap-4">
        {listType.map((cell) => {
          return (
            <div
              key={cell}
              className="flex text-black gap-1 justify-center items-center"
            >
              <input
                className="w-5 h-5 "
                type="checkbox"
                value={cell}
                onChange={(e) => {
                  handleCheckBox(e);
                }}
              />
              <p
                className={` w-[72px] h-[25px] text-center rounded-md text-white ${colorClasses[cell]} `}
              >
                {cell}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
