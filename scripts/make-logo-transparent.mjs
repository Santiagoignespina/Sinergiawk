import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = path.join(__dirname, "../public/logo.jpeg");
const output = path.join(__dirname, "../public/logo.png");

// El logo tiene fondo oscuro navy (~#0a1628). Removemos pixels oscuros.
const image = sharp(input);
const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

const pixels = new Uint8Array(data.buffer);
const { width, height, channels } = info; // 4 channels (RGBA)

for (let i = 0; i < width * height; i++) {
  const idx = i * channels;
  const r = pixels[idx];
  const g = pixels[idx + 1];
  const b = pixels[idx + 2];

  // Si el pixel es oscuro/navy, lo hacemos transparente
  const brightness = (r + g + b) / 3;
  if (brightness < 45) {
    pixels[idx + 3] = 0; // alpha = 0
  } else if (brightness < 80) {
    // Zona de transición suave
    pixels[idx + 3] = Math.round(((brightness - 45) / 35) * 255);
  }
}

await sharp(Buffer.from(pixels), { raw: { width, height, channels } })
  .png()
  .toFile(output);

console.log(`Logo guardado en: ${output}`);
