const PokemonOptionPopup = ({ pokemon, onEdit, onSelectNew, onClose }) => (
  <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div className="bg-white p-4 rounded shadow-lg">
      <h2 className="text-lg font-bold mb-2">{pokemon.name}</h2>
      <div className="flex gap-2">
        <button className="bg-blue-500 text-white p-2 rounded" onClick={onEdit}>
          Edit
        </button>
        <button
          className="bg-green-500 text-white p-2 rounded"
          onClick={onSelectNew}
        >
          Select New Pokémon
        </button>
      </div>
      <button
        className="mt-4 bg-red-500 text-white p-2 rounded"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  </div>
);
export default PokemonOptionPopup;
