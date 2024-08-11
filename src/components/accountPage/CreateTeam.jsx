import axios from "axios";
export default function CreateTeam({
  userData,
  fetchDataUserTeams,
  handleTeamClick,
}) {
  const handleCreateTeam = async () => {
    // const token = Cookies.get("token");
    if (!token) {
      alert("Token không hợp lệ hoặc không có.");
      return;
    }

    try {
      await axios.post("https://pokemon-api-phi-nine.vercel.app/team/create", {
        token,
        team: [],
      });
      fetchDataUserTeams(); // Cập nhật dữ liệu đội hình
      alert("Team created successfully");
    } catch (error) {
      console.error("Failed to create team:", error);
      alert(
        "Failed to create team: " +
          (error.response?.data?.message || error.message)
      );
    }
  };
  return (
    <div className="h-1000px w-375px bg-primary flex flex-col  text-center">
      <h1 className="font-press_start_2p mt-10 mb-10">MyTeam</h1>
      <div className="flex flex-col gap-4 items-center rounded-xl">
        {userData &&
          userData.teams.map((u, index) => (
            <button
              className=" bg-white w-80 rounded-xl py-2"
              key={index}
              onClick={() => handleTeamClick(index)}
            >
              Team {index + 1}
            </button>
          ))}
        {userData && userData.teams.length < 5 && (
          <button
            className=" w-80 py-2  bg-white border border-primary text-black"
            onClick={handleCreateTeam}
          >
            Add Team
          </button>
        )}
      </div>
    </div>
  );
}
