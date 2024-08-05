import Cookies from "js-cookie";
import { useEffect } from "react";

export default function CreateTeam() {
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return;
  });

  return (
    <section className="flex ga-4">
      <div className="h-1000px w-375px bg-primary ">
        <h1 className=" font-press_start_2p">MyTeam</h1>
        <div>
          <button>Create Team</button>
        </div>
      </div>
      <div>
        <div>chose pokemon</div>
        <div className="h-80 w-785px bg-steel"> information</div>
      </div>
    </section>
  );
}
