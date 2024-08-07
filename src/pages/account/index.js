import CreateTeam from "@/components/CreateTeam";
import Layout from "@/components/layout";
import axios from "axios";
import Cookies from "js-cookie";
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
  console.log("userData", userData);
  return (
    <Layout title={"Account"}>
      <CreateTeam userData={userData} />
    </Layout>
  );
}
