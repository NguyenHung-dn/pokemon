import PokemonCard from "./PokemonCard";

function PokemonList({ pokemons, handleClickDetail }) {
  return (
    <ul className="flex flex-wrap gap-10">
      {pokemons.map((pokemon) => {
        return (
          // <PokemonCard
          //   key={pokemon.id}
          //   name={pokemon.name}
          //   imageUrl={pokemon.imageUrl}
          //   types={pokemon.types}
          //   typeCss={pokemon.typeCss}
          //   pokemon={pokemon}
          // />
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
    </ul>
  );
}

export default PokemonList;
