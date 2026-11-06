// Converts source photos into responsive WebP assets. Run once after adding photos.
import { execFileSync } from "node:child_process";
import { mkdirSync, existsSync, statSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const SRC = path.resolve("assets/img/src");
const OUT = path.resolve("assets/img");
mkdirSync(OUT, { recursive: true });

// [source, output name, widths]
const jobs = [
  ["26-ter-68359481c5c1b", "hero-poster", [768, 1280, 1920]],
  ["19-3869-6452145b5e620", "cottage-1", [640, 1024, 1600]],
  ["1-3870-645213ede82d4", "cottage-2", [640, 1024, 1600]],
  ["1-4544-6835952625184", "cottage-3", [640, 1024, 1600]],
  ["1-4741-68358e85cc1cd", "cottage-4", [640, 1024, 1600]],
  ["11-ter-646ceb18d37ac", "about-1", [640, 1200, 1800]],
  ["24-ter-68359469b4863", "about-2", [640, 1024]],
  ["1-infrastructure-645211a00a0a5", "amenity-pool", [640, 1200]],
  ["out31", "amenity-bath", [640, 1200]],
  ["5-ter-645216676d9e0", "amenity-forest", [640, 1200]],
  ["12-ter-646ceb1b93e03", "gallery-01", [480, 1200]],
  ["17-ter-68345520ede79", "gallery-02", [480, 1200]],
  ["10-ter-646ceb1633497", "gallery-03", [480, 1200]],
  ["3-ter-64521110f00cc", "gallery-04", [480, 1200]],
  ["6-ter-64521669e1be3", "gallery-05", [480, 1200]],
  ["1-ter-645210fe25ab2", "gallery-06", [480, 1200]],
  ["2-3870-645213f1189f3", "gallery-07", [480, 1200]],
  ["5-4544-683595356c55c", "gallery-08", [480, 1200]],
  ["3-4741-68358e9680b09", "gallery-09", [480, 1200]],
  ["20-3869-6452145e11f48", "gallery-10", [480, 1200]],
  ["out34", "gallery-11", [480, 1200]],
  ["out42", "gallery-12", [480, 1200]],
  ["out43", "gallery-13", [480, 1200]],
  ["out44", "gallery-14", [480, 1200]],
  ["2-service-645211236a15f", "gallery-15", [480, 1200]],
  ["1-service-6452112104a5f", "gallery-16", [480, 1200]],
  ["4-food-6452115379015", "gallery-17", [480, 1200]],
  ["5-ter-645216676d9e0", "page-polyanytsia", [640, 960, 1200, 1800]],
  ["17-ter-68345520ede79", "page-bukovel", [640, 960, 1200, 1800]],
  ["1-4544-6835952625184", "page-shale", [640, 960, 1200, 1800]],
  ["out40", "page-privacy", [640, 960, 1200]],
];

let count = 0;
for (const [srcName, outName, widths] of jobs) {
  const input = path.join(SRC, `${srcName}.jpg`);
  if (!existsSync(input)) {
    console.warn(`missing source: ${srcName}`);
    continue;
  }
  for (const w of widths) {
    const out = path.join(OUT, `${outName}-${w}.webp`);
    execFileSync(
      "ffmpeg",
      [
        "-hide_banner",
        "-loglevel",
        "error",
        "-i",
        input,
        "-vf",
        `scale=${w}:-2:flags=lanczos`,
        "-c:v",
        "libwebp",
        "-quality",
        "80",
        "-compression_level",
        "6",
        "-y",
        out,
      ],
      { stdio: "inherit" },
    );
    count++;
  }
}
console.log(`\n${count} webp files written to assets/img`);

/* ---------------------------------------------------------- images.json */
// Keep src/images.json in sync so every <img> can declare width/height.
const dims = {};
for (const file of readdirSync(OUT).filter((f) => f.endsWith(".webp")).sort()) {
  const full = path.join(OUT, file);
  const [w, h] = execFileSync(
    "ffprobe",
    ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=p=0", full],
    { encoding: "utf8" },
  )
    .trim()
    .split(",")
    .map(Number);
  dims[file.replace(/\.webp$/, "")] = { w, bytes: statSync(full).size, h };
}
writeFileSync(path.resolve("src/images.json"), JSON.stringify(dims, null, 2) + "\n");
console.log(`src/images.json updated (${Object.keys(dims).length} entries)`);
