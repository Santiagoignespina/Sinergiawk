"use client";
import { useState } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["300","400","600","700","900"] });

const GOLD = "#c9a96e";
const BG   = "#111111";
const CARD = "#1c1c1c";
const BORDER = "#2e2e2e";

const screens = ["Inicio", "Tienda", "Carrito", "Personalizado"] as const;
type Screen = (typeof screens)[number];

const productos = [
  { id:1, nombre:"VINCHA HAWAI",         precio:15000, tag:"BESTSELLER", emoji:"🌺" },
  { id:2, nombre:"CORONA FRIDA",         precio:22000, tag:"NUEVO",      emoji:"🌹" },
  { id:3, nombre:"TIARA INDIAN COLOR",   precio:28000, tag:"",           emoji:"🪶" },
  { id:4, nombre:"CORONA CACIQUE",       precio:45000, tag:"EXCLUSIVO",  emoji:"👑" },
];

const cats = ["TODOS","NOVIA","NOVIO","QUINCE","DESPEDIDA","DISNEY"];

export default function BrideonDemo() {
  const [screen, setScreen]     = useState<Screen>("Inicio");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart]         = useState([
    { nombre:"Vincha Hawai",      precio:15000, qty:1 },
    { nombre:"Corona Cacique",    precio:45000, qty:1 },
  ]);
  const [activeCat, setActiveCat]   = useState("TODOS");
  const [tipoEvento, setTipoEvento] = useState("");
  const [msgMode, setMsgMode]       = useState<"text"|"audio">("text");

  const total = cart.reduce((s,i) => s + i.precio * i.qty, 0);

  return (
    <div className={`${montserrat.className} w-full h-full flex flex-col overflow-hidden rounded-xl select-none relative`}
      style={{ fontSize:9, background:BG, color:"#ffffff" }}>

      {/* ── NAVBAR ── */}
      <div className="flex items-center justify-between px-3 py-2 shrink-0 border-b" style={{ borderColor:BORDER }}>
        <button onClick={() => setScreen("Inicio")} className="tracking-[0.2em] font-black uppercase" style={{ fontSize:10, color:GOLD }}>
          ACCESORIOS
        </button>
        <div className="flex gap-3" style={{ fontSize:7 }}>
          {(["Tienda","Personalizado"] as Screen[]).map(s => (
            <button key={s} onClick={() => setScreen(s)}
              className="tracking-widest uppercase transition-colors"
              style={{ color: screen===s ? GOLD : "#666" }}>
              {s}
            </button>
          ))}
        </div>
        <button onClick={() => setCartOpen(true)} className="relative flex items-center gap-1"
          style={{ fontSize:7, color: cart.length ? GOLD : "#666" }}>
          <span style={{ fontSize:12 }}>🛍</span>
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center font-bold text-black"
              style={{ fontSize:6, background:GOLD }}>{cart.length}</span>
          )}
        </button>
      </div>

      {/* ── INICIO ── */}
      {screen === "Inicio" && (
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Hero full-bleed */}
          <div className="relative flex-1 flex flex-col items-center justify-center px-4 text-center overflow-hidden">
            {/* Fondo con patrón sutil */}
            <div className="absolute inset-0" style={{ background:"radial-gradient(ellipse at 50% 40%, #2a1f0e 0%, #111 70%)" }} />
            <div className="relative z-10 flex flex-col items-center">
              <div className="tracking-[0.4em] uppercase mb-3 font-light" style={{ fontSize:6.5, color:GOLD }}>
                ✦ COLECCIÓN 2025 ✦
              </div>
              <div className="font-black uppercase leading-none mb-1" style={{ fontSize:22, letterSpacing:"-0.02em" }}>
                TU EVENTO,
              </div>
              <div className="font-black uppercase leading-none mb-4" style={{ fontSize:22, letterSpacing:"-0.02em", color:GOLD }}>
                TU ESTILO.
              </div>
              <div className="font-light text-center mb-5" style={{ fontSize:7.5, color:"#ccc", maxWidth:140, lineHeight:1.5 }}>
                Accesorios únicos para bodas, quinceañeras y eventos especiales.
              </div>
              <div className="flex gap-2">
                <button onClick={() => setScreen("Tienda")}
                  className="px-4 py-2 font-bold uppercase tracking-widest text-black"
                  style={{ fontSize:7, background:GOLD }}>
                  VER COLECCIÓN
                </button>
                <button onClick={() => setScreen("Personalizado")}
                  className="px-4 py-2 font-bold uppercase tracking-widest border"
                  style={{ fontSize:7, borderColor:GOLD, color:GOLD }}>
                  PERSONALIZADO
                </button>
              </div>
            </div>
          </div>

          {/* Strip inferior */}
          <div className="flex items-center justify-around py-2 border-t shrink-0" style={{ borderColor:BORDER, fontSize:6.5 }}>
            <span style={{ color:"#ccc" }}>💳 3 CUOTAS S/INTERÉS</span>
            <span style={{ color:GOLD }}>✦</span>
            <span style={{ color:"#ccc" }}>🚚 ENVÍOS AL PAÍS</span>
            <span style={{ color:GOLD }}>✦</span>
            <span style={{ color:"#ccc" }}>💬 WHATSAPP</span>
          </div>
        </div>
      )}

      {/* ── TIENDA ── */}
      {screen === "Tienda" && (
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-3 py-2 border-b shrink-0 flex items-center justify-between" style={{ borderColor:BORDER }}>
            <div className="font-black uppercase tracking-widest" style={{ fontSize:9 }}>COLECCIÓN</div>
            <div className="font-light" style={{ fontSize:7, color:"#ccc" }}>{productos.length} piezas</div>
          </div>

          {/* Filtros */}
          <div className="flex gap-1.5 px-3 py-2 border-b shrink-0 overflow-x-auto" style={{ borderColor:BORDER }}>
            {cats.map(c => (
              <button key={c} onClick={() => setActiveCat(c)}
                className="px-2 py-0.5 tracking-widest font-semibold whitespace-nowrap transition-colors"
                style={{ fontSize:6, background: activeCat===c ? GOLD : "transparent", color: activeCat===c ? "#000" : "#ccc", border:`1px solid ${activeCat===c ? GOLD : BORDER}` }}>
                {c}
              </button>
            ))}
          </div>

          {/* Productos — lista editorial, no grid */}
          <div className="flex-1 overflow-y-auto">
            {productos.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 px-3 py-2.5 border-b transition-colors hover:bg-white/5"
                style={{ borderColor:BORDER }}>
                {/* Foto placeholder */}
                <div className="w-12 h-12 rounded-sm shrink-0 flex items-center justify-center"
                  style={{ background:CARD, border:`1px solid ${BORDER}`, fontSize:20 }}>
                  {p.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <div className="font-bold uppercase tracking-wider truncate" style={{ fontSize:8 }}>{p.nombre}</div>
                    {p.tag && (
                      <span className="px-1 py-0.5 font-bold uppercase shrink-0" style={{ fontSize:5.5, background:GOLD, color:"#000" }}>{p.tag}</span>
                    )}
                  </div>
                  <div className="font-light" style={{ fontSize:8, color:GOLD }}>$ {p.precio.toLocaleString()}</div>
                </div>
                <button className="px-2 py-1 font-bold uppercase tracking-wider shrink-0 transition-colors border"
                  style={{ fontSize:6, borderColor:GOLD, color:GOLD }}>
                  + AGREGAR
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── PERSONALIZADO ── */}
      {screen === "Personalizado" && (
        <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2">
          <div className="text-center mb-1">
            <div className="tracking-[0.3em] uppercase font-light mb-1" style={{ fontSize:6.5, color:GOLD }}>✦ SERVICIO EXCLUSIVO ✦</div>
            <div className="font-black uppercase" style={{ fontSize:13, letterSpacing:"-0.01em" }}>DISEÑO A MEDIDA</div>
          </div>

          {/* Tipo evento */}
          <div className="font-semibold uppercase tracking-widest" style={{ fontSize:6.5, color:"#ccc" }}>Tipo de evento</div>
          <div className="grid grid-cols-2 gap-1.5">
            {[["CASAMIENTO 💍","casamiento"],["QUINCEAÑERA 🌸","quince"],["CUMPLEAÑOS 🎂","cumple"],["DESPEDIDA 🥂","despedida"],["CORPORATIVO 🏢","corp"],["OTRO ✨","otro"]].map(([label,val]) => (
              <button key={val} onClick={() => setTipoEvento(val)}
                className="py-1.5 font-semibold uppercase tracking-wider text-left px-2 transition-colors border"
                style={{ fontSize:6.5, borderColor: tipoEvento===val ? GOLD : BORDER, color: tipoEvento===val ? GOLD : "#ccc", background: tipoEvento===val ? "#1f1a0f" : "transparent" }}>
                {String(label)}
              </button>
            ))}
          </div>

          {/* Inputs */}
          <div className="border px-2 py-1.5 text-gray-200" style={{ borderColor:BORDER, fontSize:7.5 }}>Nombre completo</div>
          <div className="border px-2 py-1.5 text-gray-200 flex items-center gap-1" style={{ borderColor:BORDER, fontSize:7.5 }}>
            📅 Fecha del evento
          </div>

          {/* Toggle */}
          <div className="flex gap-1.5">
            <button onClick={() => setMsgMode("text")} className="flex-1 py-1.5 font-bold uppercase tracking-wider transition-colors"
              style={{ fontSize:7, background: msgMode==="text" ? GOLD : "transparent", color: msgMode==="text" ? "#000" : "#ccc", border:`1px solid ${msgMode==="text" ? GOLD : BORDER}` }}>
              ✍ MENSAJE
            </button>
            <button onClick={() => setMsgMode("audio")} className="flex-1 py-1.5 font-bold uppercase tracking-wider transition-colors"
              style={{ fontSize:7, background: msgMode==="audio" ? GOLD : "transparent", color: msgMode==="audio" ? "#000" : "#ccc", border:`1px solid ${msgMode==="audio" ? GOLD : BORDER}` }}>
              🎙 AUDIO
            </button>
          </div>

          {msgMode === "text"
            ? <div className="border px-2 py-2 text-gray-200 leading-relaxed" style={{ borderColor:BORDER, fontSize:7.5, minHeight:30 }}>Contanos tu idea, colores, temática...</div>
            : <div className="border flex flex-col items-center py-3 gap-1" style={{ borderColor:GOLD, background:"#1a1600" }}>
                <span style={{ fontSize:18 }}>🎙️</span>
                <div className="uppercase tracking-widest font-semibold" style={{ fontSize:6.5, color:GOLD }}>PRESIONÁ PARA GRABAR</div>
              </div>
          }

          <button className="w-full py-2 font-black uppercase tracking-widest text-black"
            style={{ fontSize:8, background:GOLD }}>
            ENVIAR CONSULTA ✦
          </button>
        </div>
      )}

      {/* Carrito screen placeholder */}
      {screen === "Carrito" && (
        <div className="flex-1 flex items-center justify-center">
          <button onClick={() => setCartOpen(true)} className="px-4 py-2 font-bold uppercase tracking-widest text-black"
            style={{ fontSize:8, background:GOLD }}>
            VER CARRITO ({cart.length})
          </button>
        </div>
      )}

      {/* ── CART DRAWER ── */}
      {cartOpen && (
        <div className="absolute inset-0 z-20 flex">
          <div className="flex-1 bg-black/60" onClick={() => setCartOpen(false)} />
          <div className="w-48 flex flex-col h-full border-l" style={{ background:BG, borderColor:BORDER }}>
            <div className="px-3 py-2 flex items-center justify-between border-b shrink-0" style={{ borderColor:BORDER }}>
              <div>
                <div className="font-black uppercase tracking-widest" style={{ fontSize:9, color:GOLD }}>CARRITO</div>
                <div className="font-light" style={{ fontSize:6.5, color:"#ccc" }}>{cart.length} piezas</div>
              </div>
              <button onClick={() => setCartOpen(false)} style={{ color:"#ccc", fontSize:12 }}>✕</button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-2 flex flex-col gap-2">
              {cart.map((item, i) => (
                <div key={i} className="border-b pb-2 flex gap-2 items-start" style={{ borderColor:BORDER }}>
                  <div className="w-8 h-8 shrink-0 flex items-center justify-center" style={{ background:CARD, border:`1px solid ${BORDER}` }}>
                    <span style={{ fontSize:14 }}>💍</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold uppercase truncate" style={{ fontSize:6.5 }}>{item.nombre}</div>
                    <div className="font-light mt-0.5" style={{ fontSize:7.5, color:GOLD }}>$ {item.precio.toLocaleString()}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <button onClick={() => setCart(c => c.map((x,j) => j===i ? {...x,qty:Math.max(0,x.qty-1)} : x).filter(x=>x.qty>0))}
                        className="w-4 h-4 border flex items-center justify-center" style={{ borderColor:BORDER, fontSize:9, color:"#ccc" }}>−</button>
                      <span style={{ fontSize:7.5 }}>{item.qty}</span>
                      <button onClick={() => setCart(c => c.map((x,j) => j===i ? {...x,qty:x.qty+1} : x))}
                        className="w-4 h-4 border flex items-center justify-center" style={{ borderColor:BORDER, fontSize:9, color:"#ccc" }}>+</button>
                    </div>
                  </div>
                  <button onClick={() => setCart(c => c.filter((_,j) => j!==i))} style={{ color:"#444", fontSize:10 }}>🗑</button>
                </div>
              ))}
            </div>

            <div className="px-3 py-2 border-t shrink-0" style={{ borderColor:BORDER }}>
              <div className="flex justify-between mb-2">
                <span className="uppercase tracking-widest font-light" style={{ fontSize:7, color:"#ccc" }}>Total</span>
                <span className="font-bold" style={{ fontSize:9, color:GOLD }}>$ {total.toLocaleString()}</span>
              </div>
              <button className="w-full py-2 font-black uppercase tracking-widest text-black mb-1" style={{ fontSize:7, background:"#25D366" }}>
                💬 PEDIR POR WHATSAPP
              </button>
              <button onClick={() => setCart([])} className="w-full text-center uppercase tracking-widest" style={{ fontSize:6, color:"#444" }}>
                Vaciar carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
