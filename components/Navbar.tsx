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
        <a href="#top" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Sinergia" className="h-14 w-auto object-contain" />
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <a href="#landings" className="hover:text-[#FF4D00] transition-colors">Landings</a>
          <a href="#sistemas" className="hover:text-[#FF4D00] transition-colors">Sistemas</a>
          <a href="#automatizaciones" className="hover:text-[#FF4D00] transition-colors">Automatizaciones</a>
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
