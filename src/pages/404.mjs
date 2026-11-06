import { BASE_URL, business } from "../data.mjs";
import { footer, head, header, icon, mobileCta } from "../ui.mjs";

export const page = {
  url: `${BASE_URL}/404.html`,
  title: "Сторінку не знайдено — Маєток «Ліс і Гори»",
  description: "Такої сторінки немає. Поверніться на головну або подивіться котеджі в Поляниці біля Буковеля.",
  robots: "noindex, follow",
  noindex: true,
  hasBooking: false,
  schema: null,
};

export function render({ base = "" }) {
  return `${head({ base, images: {}, page })}
<body class="page-plain">
  ${header({ base, page })}

  <main id="main" class="error">
    <div class="wrap error__inner">
      <p class="eyebrow eyebrow--light"><span>404</span> сторінку не знайдено</p>
      <p class="error__code" aria-hidden="true">404</p>
      <h1 class="display display--light">тут лише <em>ліс</em></h1>
      <p class="error__text">Сторінка, яку ви шукали, переїхала або ніколи не існувала. Але смереки, басейн і п'ять кілометрів до Буковеля — на місці.</p>
      <div class="btn-row">
        <a class="btn btn--cream" href="${base}">на головну ${icon("arrow")}</a>
        <a class="btn btn--outline" style="--btn-fg:var(--cream);border-color:rgba(246,241,229,.3)" href="tel:${business.phoneHref}">${business.phone}</a>
      </div>
      <nav class="error__links" aria-label="Корисні сторінки">
        <a href="${base}polyanytsia/">відпочинок у Поляниці ${icon("arrowUpRight")}</a>
        <a href="${base}bukovel/">котеджі біля Буковеля ${icon("arrowUpRight")}</a>
        <a href="${base}shale/">оренда шале ${icon("arrowUpRight")}</a>
      </nav>
    </div>
  </main>

  ${footer({ base })}
  ${mobileCta({ base, page })}
  <script src="${base}assets/js/main.js" defer></script>
</body>
</html>`;
}
