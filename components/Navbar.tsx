"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

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
        scrolled ? "bg-[#0a1628]/95 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Image src="/logo.png" alt="Sinergia" width={110} height={36} className="object-contain mt-4" />
        <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <a href="#servicios" className="hover:text-[#00C8E8] transition-colors">Servicios</a>
          <a href="#contacto" className="hover:text-[#00C8E8] transition-colors">Contacto</a>
        </div>
        <a
          href="#contacto"
          className="text-sm bg-[#00C8E8] text-[#0a1628] font-semibold px-4 py-2 rounded-lg hover:bg-[#00b8d4] transition-colors"
        >
          Hablemos
        </a>
      </div>
    </nav>
  );
}
