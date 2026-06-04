import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        {/* Wordmark */}
        <div
          style={{
            display: "flex",
            fontSize: "30px",
            fontWeight: 700,
            color: "white",
            marginBottom: "28px",
            letterSpacing: "-0.5px",
          }}
        >
          santiago ignespina<span style={{ color: "#FF4D00" }}>.</span>
        </div>

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid rgba(255,77,0,0.35)",
            background: "rgba(255,77,0,0.12)",
            color: "#FF4D00",
            fontSize: "18px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "2px",
            padding: "8px 22px",
            borderRadius: "999px",
            marginBottom: "28px",
          }}
        >
          Desarrollo web a medida
        </div>

        {/* Título */}
        <div
          style={{
            fontSize: "70px",
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            lineHeight: 1.05,
            textTransform: "uppercase",
          }}
        >
          Tu próxima web,
        </div>
        <div
          style={{
            fontSize: "70px",
            fontWeight: 700,
            color: "#FF4D00",
            textAlign: "center",
            lineHeight: 1.05,
            textTransform: "uppercase",
            marginBottom: "32px",
          }}
        >
          hecha a medida.
        </div>

        {/* Servicios */}
        <div
          style={{
            fontSize: "22px",
            color: "rgba(255,255,255,0.45)",
            textAlign: "center",
          }}
        >
          Landing pages · E-commerce · Sistemas · Automatizaciones
        </div>
      </div>
    ),
    { ...size }
  );
}
