import CreateTeam from "@/components/accountPage/CreateTeam";
import Layout from "@/components/layout";
import axios from "axios";
import Cookies from "js-cookie";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const [userData, setUserData] = useState("");
  const [error, setError] = useState(null);

  const cookie = Cookies.get("token");

  const fetchDataUserTeams = async () => {
    try {
      const response = await axios.post(
        "https://pokemon-api-phi-nine.vercel.app/auth",
        {
          token: cookie,
        }
      );
      setUserData(response.data.user);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDataUserTeams();
  }, [cookie]);
  return (
    <Layout title={"Account"}>
      <CreateTeam userData={userData} fetchDataUserTeams={fetchDataUserTeams} />
    </Layout>
  );
}

// <Head>
// <title>Pokédex - AccountPage</title>
// <meta property="og:title" content="Pokédex - Homepage" />
// <meta property="og:description" content="Find your favorite pokémon" />
// <meta property="og:image" content="/banner.png" />
// <meta property="og:url" content="https://pokemon-main-kohl.vercel.app/" />
// <meta property="og:type" content="website" />
// <meta name="twitter:card" content="image card" />
// <meta name="twitter:title" content="Pokédex - Homepage" />
// <meta name="twitter:description" content="Find your favorite pokémon" />
// <meta name="twitter:image" content="/banner.png" />
// <link rel="icon" type="image/x-icon" href="/favicon.png"></link>
// </Head>
