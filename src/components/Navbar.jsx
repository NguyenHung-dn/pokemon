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
    <section className="h-500px max-w-1400px m-auto">
      <div className="fixed top-0 left-0 right-0 z-30 bg-white ">
        <div className="flex justify-between mx-auto h-14 items-center max-w-1400px relative">
          <h2 className="flex justify-between items-center font-start_press_2p md:ml-8 ml-1 font-bold text-base text-primary font-press_start_2p">
            <Link href="/">Pokedex</Link>
          </h2>
          {!isLoggedIn ? (
            <>
              <button
                onClick={handleClickModal}
                className="flex justify-center items-center  border rounded-lg border-primary w-150px h-10 text-primary absolute top-2 right-0 mr-2 md:right-2 "
              >
                {modal && "close"}
                {!modal && "login"}
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
                className=" w-150px h-10 rounded-lg bg-yellow-500"
              >
                <Link href="/account">Account Page</Link>
              </button>
              <button
                onClick={() => {
                  handleLogout();
                }}
                className=" lg:mr-8 lg:w-150px w-20 mr-1 h-10 bg-fighting rounded-lg "
              >
                LogOut
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex max-w-1400px relative">
        <div className="flex h-500px max-w-1400px">
          <Image
            src="/banner.png"
            width={1400}
            height={500}
            alt="banner"
            className="object-cover"
          />
        </div>
        <div className=" max-w-1400px h-500px absolute right-0 top-0 bottom-0 left-0">
          <h1 className="font-bold text-5xl text-primary font-press_start_2p opacity-65 bg-black  h-500px absolute top-0 right-0 left-0 bottom-0 flex justify-center pt-314px">
            {router.pathname === "/" ? "Pokedex" : "Account"}
          </h1>
        </div>
      </div>
    </section>
  );
};
export default Navbar;
