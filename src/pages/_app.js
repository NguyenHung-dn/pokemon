import "@/styles/globals.css";
import { Montserrat, Press_Start_2P } from "next/font/google";
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: "400",
  display: "swap",
});
const press_start_2P = Press_Start_2P({
  subsets: ["latin"],
  variable: "--font-press_start_2p",
  weight: "400",
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <main
      className={`${montserrat.variable} ${press_start_2P.variable} font-montserrat `}
    >
      <Component {...pageProps} />
    </main>
  );
}
