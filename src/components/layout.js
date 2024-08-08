import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
const Layout = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("token");
    token && setIsLoggedIn(true);

    !token &&
      router.pathname === "/account" &&
      (alert("login to access account page"), router.push("/"));
  }, []);
  const handleLogin = (token) => {
    token && setIsLoggedIn(true);
  };
  const handleLogout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    router.push("/");
  };
  return (
    <>
      <Navbar
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};
export default Layout;
