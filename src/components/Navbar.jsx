const Navbar = (props) => {
  return (
    <section className="h-[500px] w-full">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="flex justify-between mx-auto h-14 ">
          <h2 className="flex justify-center items-center font-start_press_2p ml-8 font-bold text-base text-primary font-press_start_2p">
            Pokedex
          </h2>
          <div className="flex justify-center items-center mr-8">button</div>
        </div>
      </div>
      <div className="flex">
        <div className="flex h-[500px] w-full">
          <img
            src="/banner.png"
            width={1400}
            height={500}
            className="w-full  object-cover relative z-0 "
          />
        </div>
        <div className="flex items-center justify-center w-full h-[500px] absolute">
          <h1 className="font-bold text-5xl text-primary font-press_start_2p opacity-65 bg-black h-[500px] w-full flex justify-center pt-[314px]">
            {props.title}
          </h1>
        </div>
      </div>
    </section>
  );
};
export default Navbar;
