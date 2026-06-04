"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#top" className="font-display font-bold tracking-tight text-white text-lg">
          santiago ignespina<span className="text-[#FF4D00]">.</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <a href="#casos" className="hover:text-[#FF4D00] transition-colors">Casos</a>
          <a href="#proyectos" className="hover:text-[#FF4D00] transition-colors">Trabajos</a>
          <a href="#servicios" className="hover:text-[#FF4D00] transition-colors">Servicios</a>
          <a href="#contacto" className="hover:text-[#FF4D00] transition-colors">Contacto</a>
        </div>
        <a
          href="#contacto"
          className="text-sm bg-[#FF4D00] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#ff6a2b] transition-colors"
        >
          Hablemos
        </a>
      </div>
    </nav>
  );
}
