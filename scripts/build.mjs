// Static site generator: renders every page and writes the deployable files
// straight into the project root, next to assets/.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { BASE_URL } from "../src/data.mjs";
import * as home from "../src/pages/home.mjs";
import * as polyanytsia from "../src/pages/polyanytsia.mjs";
import * as bukovel from "../src/pages/bukovel.mjs";
import * as shale from "../src/pages/shale.mjs";
import * as privacy from "../src/pages/privacy.mjs";
import * as notFound from "../src/pages/404.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const images = JSON.parse(await readFile(join(root, "src/images.json"), "utf8"));
const today = new Date().toISOString().slice(0, 10);

const routes = [
  { module: home, out: "index.html", base: "" },
  { module: polyanytsia, out: "polyanytsia/index.html", base: "../" },
  { module: bukovel, out: "bukovel/index.html", base: "../" },
  { module: shale, out: "shale/index.html", base: "../" },
  { module: privacy, out: "privacy/index.html", base: "../" },
  { module: notFound, out: "404.html", base: "" },
];

for (const route of routes) {
  const html = route.module.render({ base: route.base, images });
  const target = join(root, route.out);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html, "utf8");
  console.log(`✓ ${route.out.padEnd(24)} ${(Buffer.byteLength(html) / 1024).toFixed(1)} kB`);
}

/* ------------------------------------------------------------- sitemap */
const sitemapPages = [
  { loc: `${BASE_URL}/`, priority: "1.0", changefreq: "weekly" },
  { loc: `${BASE_URL}/polyanytsia/`, priority: "0.8", changefreq: "monthly" },
  { loc: `${BASE_URL}/bukovel/`, priority: "0.8", changefreq: "monthly" },
  { loc: `${BASE_URL}/shale/`, priority: "0.8", changefreq: "monthly" },
  { loc: `${BASE_URL}/privacy/`, priority: "0.2", changefreq: "yearly" },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapPages
  .map(
    (p) => `  <url>
    <loc>${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
    <xhtml:link rel="alternate" hreflang="uk" href="${p.loc}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${p.loc}"/>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

await writeFile(join(root, "sitemap.xml"), sitemap, "utf8");
console.log("✓ sitemap.xml");

/* ------------------------------------------------------------- robots */
const robots = `# Маєток «Ліс і Гори» — ${BASE_URL}
User-agent: *
Allow: /
Disallow: /404.html

Sitemap: ${BASE_URL}/sitemap.xml
`;
await writeFile(join(root, "robots.txt"), robots, "utf8");
console.log("✓ robots.txt");

/* ------------------------------------------------------------- manifest */
const manifest = {
  name: "Маєток «Ліс і Гори» — Поляниця, Буковель",
  short_name: "Ліс і Гори",
  description:
    "Чотири дерев'яні котеджі в Поляниці за 5 км від Буковеля: басейн із підігрівом, лазня, гори та ліс.",
  lang: "uk",
  dir: "ltr",
  start_url: "./",
  scope: "./",
  display: "standalone",
  background_color: "#faf8f2",
  theme_color: "#10130f",
  icons: [
    { src: "favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    { src: "assets/img/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    { src: "assets/img/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
  ],
};
await writeFile(join(root, "site.webmanifest"), JSON.stringify(manifest, null, 2) + "\n", "utf8");
console.log("✓ site.webmanifest");

console.log(`\nГотово. Базовий URL: ${BASE_URL}`);
