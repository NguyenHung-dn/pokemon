import CreateTeam from "@/components/CreateTeam";
import Layout from "@/components/layout";
import ModalPokemon from "@/components/ModalPokemon";
import Link from "next/link";

export default function AccountPage() {
  return (
    <Layout title={"Account"}>
      <CreateTeam />
    </Layout>
  );
}
