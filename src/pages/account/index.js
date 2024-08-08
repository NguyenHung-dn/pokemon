import CreateTeam from "@/components/CreateTeam";
import Layout from "@/components/layout";
import axios from "axios";
import Cookies from "js-cookie";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const [userData, setUserData] = useState("");
  const cookie = Cookies.get("token");
  const [error, setError] = useState(null); // State để lưu lỗi

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://pokemon-api-phi-nine.vercel.app/auth",
          {
            token: cookie,
          }
        );
        setUserData(response.data.user.teams); // Lưu dữ liệu vào state
      } catch (error) {
        setError(error); // Lưu lỗi vào state
        console.log(error);
      }
    };

    fetchData(); // Gọi hàm fetchData
  }, [cookie]); // Dependency array
  return (
    <Layout title={"Account"}>
      <Head>
        <title>Pokédex - AccountPage</title>
        <meta property="og:title" content="Pokédex - Homepage" />
        <meta property="og:description" content="Find your favorite pokémon" />
        <meta property="og:image" content="/banner.png" />
        <meta
          property="og:url"
          content="https://pokemon-main-kohl.vercel.app/"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="image card" />
        <meta name="twitter:title" content="Pokédex - Homepage" />
        <meta name="twitter:description" content="Find your favorite pokémon" />
        <meta name="twitter:image" content="/banner.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.png"></link>
      </Head>
      <CreateTeam userData={userData} />
    </Layout>
  );
}
