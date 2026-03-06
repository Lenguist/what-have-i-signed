// Generates extension icons at 16, 48, 128px using sharp
import sharp from "sharp";
import fs from "fs";

fs.mkdirSync("extension/icons", { recursive: true });

function svgIcon(size) {
  const r = Math.round(size * 0.18); // corner radius
  const pad = Math.round(size * 0.14);
  const docW = size - pad * 2;
  const docH = Math.round(docW * 1.28);
  const docX = pad;
  const docY = Math.round((size - docH) / 2);
  const docR = Math.round(size * 0.07);
  const lineX = docX + Math.round(docW * 0.16);
  const lineW = Math.round(docW * 0.68);
  const lineH = Math.max(2, Math.round(size * 0.05));
  const lineR = lineH;
  const gap = Math.round(docH * 0.14);
  const line1Y = docY + Math.round(docH * 0.28);
  const line2Y = line1Y + gap;
  const line3Y = line2Y + gap;
  const line3W = Math.round(lineW * 0.6);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${r}" fill="#f59e0b"/>
  <rect x="${docX}" y="${docY}" width="${docW}" height="${docH}" rx="${docR}" fill="#0c0b09"/>
  <rect x="${lineX}" y="${line1Y}" width="${lineW}" height="${lineH}" rx="${lineR}" fill="#f59e0b"/>
  <rect x="${lineX}" y="${line2Y}" width="${lineW}" height="${lineH}" rx="${lineR}" fill="#f59e0b"/>
  <rect x="${lineX}" y="${line3Y}" width="${line3W}" height="${lineH}" rx="${lineR}" fill="rgba(245,158,11,0.45)"/>
</svg>`;
}

for (const size of [16, 48, 128]) {
  await sharp(Buffer.from(svgIcon(size)))
    .resize(size, size)
    .png()
    .toFile(`extension/icons/icon${size}.png`);
  console.log(`✓ icon${size}.png`);
}
