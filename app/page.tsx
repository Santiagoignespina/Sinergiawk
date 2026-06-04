import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import QueEsLanding from "@/components/QueEsLanding";
import Landings from "@/components/Landings";
import CaseStudies from "@/components/CaseStudies";
import Galeria from "@/components/Galeria";
import Servicios from "@/components/Servicios";
import Contacto from "@/components/Contacto";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <QueEsLanding />
      <Landings />
      <CaseStudies />
      <Galeria />
      <Servicios />
      <Contacto />
      <footer className="border-t border-white/10 py-6 text-center text-white/30 text-sm">
        © {new Date().getFullYear()} Santiago Ignespina · Desarrollo web a medida
      </footer>
    </main>
  );
}
