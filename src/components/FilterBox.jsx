export default function FilterBox(props) {
  const {
    colorClasses,
    listType,
    input,
    handleCheckBox,
    handleClickSearch,
    handleInput,
  } = props;

  return (
    <div className="relative flex flex-col mx-auto w-full lg:justify-start lg:items-start  justify-center items-center h-40 gap-4 font-montserrat lg:my-100px lg:w-825px my-24 ">
      <div>
        <input
          className="w-260px h-10 line pl-3 border-black border rounded-lg lg:ml-4 "
          placeholder="search for a pokemon..."
          value={input}
          onChange={(e) => {
            handleInput(e);
          }}
        />
      </div>

      <div className="flex flex-row flex-wrap lg:justify-start justify-center lg:gap-4 gap-2">
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
                className={` w-72px h-25px text-center rounded-md text-white ${colorClasses[cell]} `}
              >
                {cell}
              </p>
            </div>
          );
        })}
      </div>
      <button
        onClick={handleClickSearch}
        className="lg:ml-8 bg-flying h-10 border-black border rounded-lg px-2 lg:absolute left-72 "
      >
        Search
      </button>
    </div>
  );
}
