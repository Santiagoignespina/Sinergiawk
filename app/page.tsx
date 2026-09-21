import { Jost } from "next/font/google";
import Vitrina from "@/components/vitrina/Vitrina";
import "@/components/vitrina/vitrina.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-vitrina",
});

export default function Home() {
  return (
    <div className={jost.variable}>
      <Vitrina />
    </div>
  );
}
