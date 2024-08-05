import { useState } from "react";
import ModalUser from "./ModalUser";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
const Navbar = ({ handleLogin, handleLogout, isLoggedIn }) => {
  const [modal, setModal] = useState(false);
  const handleClickModal = () => {
    setModal(!modal);
  };

  const router = useRouter();
  return (
    <section className="h-500px max-w-1400px">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="flex justify-between mx-auto h-14 items-center max-w-1400px ">
          <h2 className="flex justify-center items-center font-start_press_2p ml-8 font-bold text-base text-primary font-press_start_2p">
            <Link href="/">Pokedex</Link>
          </h2>
          {!isLoggedIn ? (
            <>
              <button
                onClick={handleClickModal}
                className="flex justify-center items-center mr-8 border rounded-lg border-primary w-150px h-10 text-primary "
              >
                {modal ? "Close" : "Login"}
              </button>
              {modal && (
                <ModalUser
                  modal={modal}
                  setModal={setModal}
                  handleLogin={handleLogin}
                  isLoggedIn={isLoggedIn}
                />
              )}
            </>
          ) : (
            <div className=" flex gap-2">
              <button
                href="/account"
                className=" w-150px h-10 rounded-lg  bg-yellow-500"
              >
                <Link href="/account">Account Page</Link>
              </button>
              <button
                onClick={() => {
                  handleLogout();
                }}
                className=" mr-8 w-150px h-10 bg-fighting rounded-lg "
              >
                LogOut
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex">
        <div className="flex h-[500px] w-full">
          <Image
            src="/banner.png"
            width={1400}
            height={500}
            layout="responsive"
            alt="banner"
            className=" object-cover"
          />
        </div>
        <div className="flex items-center justify-center max-w-1400px opacity-65 bg-black h-[500px] absolute inset-0">
          <div className="font-bold text-5xl text-primary font-press_start_2p opacity-65 bg-black h-[500px]  pt-[314px]">
            pokedex
          </div>
        </div>
      </div>
    </section>
  );
};
export default Navbar;
{
  /* {router.pathname === "/" ? "Pokedex" : "Account"} */
}
