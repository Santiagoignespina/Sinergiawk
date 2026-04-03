import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Servicios from "@/components/Servicios";
import Contacto from "@/components/Contacto";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Servicios />
      <Contacto />
      <footer className="border-t border-white/5 py-6 text-center text-white/20 text-sm">
        © {new Date().getFullYear()} Sinergia Automatizaciones
      </footer>
    </main>
  );
}
