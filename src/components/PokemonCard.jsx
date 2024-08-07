import Image from "next/image";
import { useEffect, useState } from "react";
function PokemonCard({ pokemon, type, imageUrl, name, handleClickDetail }) {
  let typeToClassMap = {
    grass: "bg-grass",
    fire: "bg-fire",
    water: "bg-water",
    bug: "bg-bug",
    normal: "bg-normal",
    poison: "bg-poison",
    electric: "bg-electric",
    ground: "bg-ground",
    fairy: "bg-fairy",
    fighting: "bg-fighting",
    psychic: "bg-psychic",
    rock: "bg-rock",
    steel: "bg-steel",
    ice: "bg-ice",
    ghost: "bg-ghost",
    dragon: "bg-dragon",
    dark: "bg-dark",
    flying: "bg-flying",
  };
  const classTypes = typeToClassMap[type];
  const handleClick = () => {
    handleClickDetail(name);
  };
  return (
    <li
      onClick={() => {
        handleClick();
      }}
      className="w-32 h-44 text-center transition hover:-translate-y-2 border-2 relative overflow-hidden cursor-pointer rounded-lg "
    >
      <div
        className={`h-[150%] w-[150%] text-white rounded-full absolute bottom-10 left-[-32px]  ${classTypes}`}
      ></div>
      <div className="  w-full absolute flex top-2  justify-center  ">
        <Image width={100} height={100} src={imageUrl} alt={name} />
      </div>

      <div className=" h-full w-full text-center rounded absolute bottom-2 flex items-end justify-center ">
        <h3 className="font-montserrat">{name}</h3>
      </div>
    </li>
  );
}
export default PokemonCard;
// on veut bg- + le types
// donc classTypes est la variable qui est attribué
// on veut bg-grass
