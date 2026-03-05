import sharp from "sharp";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public");
mkdirSync(outDir, { recursive: true });

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <!-- White background -->
  <rect width="1200" height="630" fill="#FFFFFF"/>

  <!-- Dot grid -->
  <defs>
    <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1.2" fill="#CBD5E1" opacity="0.45"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#dots)"/>

  <!-- Red accent bar top -->
  <rect x="0" y="0" width="1200" height="6" fill="#DC2626"/>

  <!-- Red accent line above label -->
  <rect x="576" y="112" width="48" height="4" rx="2" fill="#DC2626"/>

  <!-- INTERACTIVE DATA REPORT label -->
  <text x="600" y="152"
    font-family="Arial, Helvetica, sans-serif"
    font-size="13" font-weight="700" fill="#94A3B8"
    text-anchor="middle" letter-spacing="5">INTERACTIVE DATA REPORT</text>

  <!-- Title line 1 -->
  <text x="600" y="245"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="66" font-weight="700" fill="#0F172A"
    text-anchor="middle">What If War Money</text>

  <!-- Title line 2 (Was Spent On Life?) -->
  <text x="600" y="328"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="66" font-weight="700" fill="#0F172A"
    text-anchor="middle">
    <tspan>Was Spent On </tspan><tspan fill="#DC2626" font-style="italic">Life</tspan><tspan>?</tspan>
  </text>

  <!-- Subtitle -->
  <text x="600" y="388"
    font-family="Arial, Helvetica, sans-serif"
    font-size="20" fill="#94A3B8"
    text-anchor="middle">Interactive Data Visualization · SIPRI 2024</text>

  <!-- Budget card -->
  <rect x="320" y="415" width="560" height="96" rx="14"
    fill="#FAFBFC" stroke="#E2E8F0" stroke-width="1.5"/>
  <text x="600" y="448"
    font-family="Arial, Helvetica, sans-serif"
    font-size="11" font-weight="700" fill="#94A3B8"
    text-anchor="middle" letter-spacing="4">COMBINED MILITARY SPENDING</text>
  <text x="600" y="492"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="44" font-weight="700" fill="#DC2626"
    text-anchor="middle" letter-spacing="-1">$1.6 trillion / year</text>

  <!-- Bottom credit -->
  <text x="600" y="592"
    font-family="Arial, Helvetica, sans-serif"
    font-size="14" fill="#CBD5E1"
    text-anchor="middle">by @itsabader</text>
</svg>`;

const outputPath = join(outDir, "og-image.png");

await sharp(Buffer.from(svg))
  .png()
  .toFile(outputPath);

console.log(`✓ OG image generated → public/og-image.png`);
