import { createCanvas } from "canvas";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public");
mkdirSync(outDir, { recursive: true });

const W = 1200, H = 630;
const canvas = createCanvas(W, H);
const ctx = canvas.getContext("2d");

// White background
ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0, 0, W, H);

// Subtle dot grid
ctx.fillStyle = "rgba(203, 213, 225, 0.45)";
for (let x = 16; x < W; x += 32) {
  for (let y = 16; y < H; y += 32) {
    ctx.beginPath();
    ctx.arc(x, y, 1.2, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Red accent bar at top
ctx.fillStyle = "#DC2626";
ctx.beginPath();
ctx.roundRect(0, 0, W, 6, 0);
ctx.fill();

// Small red line above label
ctx.fillStyle = "#DC2626";
ctx.beginPath();
ctx.roundRect(576, 112, 48, 4, 2);
ctx.fill();

// "INTERACTIVE DATA REPORT" label
ctx.fillStyle = "#94A3B8";
ctx.font = "bold 13px Arial, sans-serif";
ctx.textAlign = "center";
ctx.letterSpacing = "5px";
ctx.fillText("INTERACTIVE DATA REPORT", W / 2, 152);
ctx.letterSpacing = "0px";

// Title line 1
ctx.fillStyle = "#0F172A";
ctx.font = "bold 64px Georgia, serif";
ctx.textAlign = "center";
ctx.fillText("What If War Money", W / 2, 248);

// Title line 2 — "Was Spent On " + "Life" (red) + "?"
ctx.font = "bold 64px Georgia, serif";
const line2parts = [
  { text: "Was Spent On ", color: "#0F172A", italic: false },
  { text: "Life",          color: "#DC2626", italic: true  },
  { text: "?",             color: "#0F172A", italic: false },
];
// Measure total width to center manually
const measures = line2parts.map(p => {
  ctx.font = p.italic ? "italic bold 64px Georgia, serif" : "bold 64px Georgia, serif";
  return ctx.measureText(p.text).width;
});
const totalWidth = measures.reduce((a, b) => a + b, 0);
let cx = W / 2 - totalWidth / 2;
line2parts.forEach((p, i) => {
  ctx.font = p.italic ? "italic bold 64px Georgia, serif" : "bold 64px Georgia, serif";
  ctx.fillStyle = p.color;
  ctx.textAlign = "left";
  ctx.fillText(p.text, cx, 332);
  cx += measures[i];
});

// Subtitle
ctx.fillStyle = "#94A3B8";
ctx.font = "20px Arial, sans-serif";
ctx.textAlign = "center";
ctx.fillText("$1.56T in military spending — what else could it build?", W / 2, 392);

// Budget card background
const cardX = 300, cardY = 418, cardW = 600, cardH = 100, cardR = 14;
ctx.fillStyle = "#FAFBFC";
ctx.strokeStyle = "#E2E8F0";
ctx.lineWidth = 1.5;
ctx.beginPath();
ctx.roundRect(cardX, cardY, cardW, cardH, cardR);
ctx.fill();
ctx.stroke();

// Card label
ctx.fillStyle = "#94A3B8";
ctx.font = "bold 11px Arial, sans-serif";
ctx.textAlign = "center";
ctx.letterSpacing = "4px";
ctx.fillText("COMBINED MILITARY SPENDING", W / 2, cardY + 34);
ctx.letterSpacing = "0px";

// Card value
ctx.fillStyle = "#DC2626";
ctx.font = "bold 42px Georgia, serif";
ctx.textAlign = "center";
ctx.fillText("$1.6 trillion / year", W / 2, cardY + 78);

// Footer
ctx.fillStyle = "#CBD5E1";
ctx.font = "14px Arial, sans-serif";
ctx.textAlign = "center";
ctx.fillText("SIPRI 2024  ·  @itsabader", W / 2, 596);

// Save
const outputPath = join(outDir, "og-image.png");
writeFileSync(outputPath, canvas.toBuffer("image/png"));
console.log("✓ OG image generated → public/og-image.png");
