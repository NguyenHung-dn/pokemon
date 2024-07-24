import Layout from "@/components/layout";
import Link from "next/link";

export default function AccountPage() {
  return (
    <Layout title={"Account"}>
      <section>
        <div>
          <Link href="/">go homepage</Link>
        </div>
      </section>
    </Layout>
  );
}
