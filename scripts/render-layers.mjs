// Rastérise les calques SVG de la carte en WebP transparents.
import sharp from "sharp";
const W = 2800;
for (const n of ["buildings", "streets", "water", "drains"]) {
  await sharp(`scripts/.layers/${n}.svg`, { density: 72 * (W / 1600), limitInputPixels: false })
    .resize(W)
    .webp({ quality: 40, alphaQuality: 55, effort: 6 })
    .toFile(`public/map/${n}.webp`);
  console.log(n);
}
