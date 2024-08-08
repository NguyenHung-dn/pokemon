import PokemonCard from "./PokemonCard";

function PokemonList({ pokemons, handleClickDetail }) {
  return (
    <div className="flex flex-wrap items-center justify-center  gap-0.5 md:gap-5 lg:gap-10">
      {pokemons.map((pokemon) => {
        return (
          <PokemonCard
            key={pokemon.id}
            name={pokemon.name}
            imageUrl={pokemon.imageUrl}
            type={pokemon.types[0]}
            typeCss={pokemon.typeCss}
            pokemon={pokemon}
            handleClickDetail={handleClickDetail}
          />
        );
      })}
    </div>
  );
}

export default PokemonList;
