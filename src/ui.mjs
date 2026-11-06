// Small view helpers: icons, images, page shell, navigation, footer and structured data.
import { BASE_URL, business, cottages, faqs, nav } from "./data.mjs";

const ICONS = {
  arrow: "M4.5 12h15M13 5.5l6.5 6.5-6.5 6.5",
  arrowUpRight: "M7 17 17 7M8 7h9v9",
  arrowDown: "M12 4v15M6 13l6 6 6-6",
  phone:
    "M6.5 3.5h3L11 8l-2.2 1.6a12.5 12.5 0 0 0 5.6 5.6L16 13l4.5 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.7a2 2 0 0 1 2-2.2Z",
  mail: "M3.5 5.5h17v13h-17zM4 6.5l8 6 8-6",
  pin: "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z|M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  copy: "M9 9h10v12H9zM5 15H3V3h12v2",
  close: "M6 6l12 12M18 6 6 18",
  chevronLeft: "M15 5l-7 7 7 7",
  chevronRight: "M9 5l7 7-7 7",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  users:
    "M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20M9.5 10.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M17 4.2a3.5 3.5 0 0 1 0 6.6M21 20v-1.5a4 4 0 0 0-3-3.8",
  bed: "M3 18v-9M3 14h18v4M7 10h4v4M13 10h4a4 4 0 0 1 4 4",
  waves:
    "M2 12c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 17c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2",
  steam:
    "M8 14c0-2 2-2 2-4s-2-2-2-4M13 14c0-2 2-2 2-4s-2-2-2-4M18 14c0-2 2-2 2-4s-2-2-2-4M3 18h18",
  sparkles: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z",
  flame: "M12 21c4 0 6-2.6 6-6 0-4.5-6-11-6-11S6 10.5 6 15c0 3.4 2 6 6 6Z",
  utensils: "M7 3v8M5 3v8M9 3v8M7 11v10M15 21V3c2.5 0 4 2 4 5s-1.5 5-4 5",
  bbq: "M4 10h16M6 10l1 6h10l1-6M12 16v5M9 21h6M8 6c0-1 1-1 1-2M12 6c0-1 1-1 1-2M16 6c0-1 1-1 1-2",
  play: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM10 8.5l6 3.5-6 3.5z",
  car: "M4 16h16M5 16l1.5-6h11L19 16M3 16v3h2M19 19h2v-3M7 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M17 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3",
  wifi: "M2 8.5a15 15 0 0 1 20 0M5 12a10.5 10.5 0 0 1 14 0M8.5 15.5a6 6 0 0 1 7 0|M12 19h.01",
  route: "M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM18 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM8 17h6a4 4 0 0 0 0-8H9a3 3 0 0 1 0-6h6",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z",
  tree: "M12 3 6 13h4l-4 6h12l-4-6h4L12 3ZM12 19v3",
  check: "M4 12.5l5 5L20 6.5",
  calendar: "M4 6h16v15H4zM8 3v5M16 3v5M4 10h16",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2",
  instagram: "M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z|M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z|M17 7h.01",
  facebook: "M14 8h3V4h-3c-2.5 0-4 1.8-4 4.3V11H7v4h3v6h4v-6h3l1-4h-4V8.5c0-.3.2-.5.5-.5Z",
  telegram: "M21 4 3 11l5 2 2 6 3-4 5 3zM8 13l9-7",
  download: "M12 3v12M7 10l5 5 5-5M4 21h16",
};

export function icon(name, cls = "") {
  const d = ICONS[name] || ICONS.arrow;
  const paths = d.split("|");
  return `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths
    .map((p) => `<path d="${p}"/>`)
    .join("")}</svg>`;
}

export function mark(cls = "") {
  return `<svg class="mark ${cls}" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
  <path d="M2 26 11.5 8.5 18 21l3.6-6.2L30 26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/>
  <circle cx="24.4" cy="7.4" r="2.6" fill="none" stroke="currentColor" stroke-width="1.6"/>
</svg>`;
}

export const iconSprite = `<svg width="0" height="0" aria-hidden="true" style="position:absolute">${Object.entries(
  ICONS,
)
  .map(
    ([name, d]) =>
      `<symbol id="i-${name}" viewBox="0 0 24 24">${d
        .split("|")
        .map((p) => `<path d="${p}"/>`)
        .join("")}</symbol>`,
  )
  .join("")}</svg>`;

export function asset(base, path) {
  return `${base}assets/${path}`;
}

export function img(base, images, name, opts = {}) {
  const variants = Object.entries(images)
    .map(([key, value]) => {
      const m = new RegExp(`^${name}-(\\d+)$`).exec(key);
      return m ? { w: Number(m[1]), h: value.h, url: `${base}assets/img/${key}.webp` } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.w - b.w);

  if (!variants.length) return `<!-- missing image: ${name} -->`;

  const largest = variants[variants.length - 1];
  const srcset = variants.map((v) => `${v.url} ${v.w}w`).join(", ");
  const sizes = opts.sizes || "100vw";
  const loading = opts.loading || "lazy";
  const priority = opts.priority ? ' fetchpriority="high"' : "";
  const cls = opts.className ? ` class="${opts.className}"` : "";
  const alt = (opts.alt || "").replace(/"/g, "&quot;");

  return `<img src="${largest.url}" srcset="${srcset}" sizes="${sizes}" width="${largest.w}" height="${largest.h}" alt="${alt}" loading="${loading}" decoding="async"${priority}${cls}>`;
}

/* ------------------------------------------------------------------ */
/* Head                                                                */
/* ------------------------------------------------------------------ */

export function head({ base, images, page }) {
  const canonical = page.noindex ? "" : `<link rel="canonical" href="${page.url}">`;
  const ogImage = `${BASE_URL}/assets/img/${page.ogImageSocial || "og-image-1200x630"}.webp`;
  const preloads = [];
  if (page.preloadImage) {
    const variants = Object.entries(images)
      .map(([key, value]) => {
        const m = new RegExp(`^${page.preloadImage}-(\\d+)$`).exec(key);
        return m ? { w: Number(m[1]), url: `${base}assets/img/${key}.webp`, h: value.h } : null;
      })
      .filter(Boolean)
      .sort((a, b) => a.w - b.w);
    if (variants.length) {
      const largest = variants[variants.length - 1];
      preloads.push(
        `<link rel="preload" as="image" href="${largest.url}" imagesrcset="${variants
          .map((v) => `${v.url} ${v.w}w`)
          .join(", ")}" imagesizes="100vw" fetchpriority="high">`,
      );
    }
  }

  const ld = JSON.stringify(page.schema, null, 2).replace(/</g, "\\u003c");

  return `<!doctype html>
<html lang="uk">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <meta name="theme-color" content="#10130f">
  <meta name="color-scheme" content="light dark">
  <meta name="format-detection" content="telephone=no">
  ${page.robots ? `<meta name="robots" content="${page.robots}">` : `<meta name="robots" content="index, follow, max-image-preview:large">`}
  ${canonical}
  <link rel="alternate" hreflang="uk" href="${page.url}">
  <link rel="alternate" hreflang="x-default" href="${page.url}">
  <link rel="icon" href="${base}favicon.svg" type="image/svg+xml">
  <link rel="icon" href="${base}favicon.ico" sizes="32x32">
  <link rel="apple-touch-icon" href="${base}assets/img/apple-touch-icon.png">
  <link rel="manifest" href="${base}site.webmanifest">
  <meta name="geo.region" content="UA-26">
  <meta name="geo.placename" content="Поляниця, Буковель, Івано-Франківська область">
  <meta name="geo.position" content="${business.geo.lat};${business.geo.lng}">
  <meta name="ICBM" content="${business.geo.lat}, ${business.geo.lng}">
  <meta property="og:type" content="${page.ogType || "website"}">
  <meta property="og:site_name" content="Маєток «Ліс і Гори»">
  <meta property="og:locale" content="uk_UA">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:url" content="${page.url}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:type" content="image/webp">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Маєток «Ліс і Гори» у Поляниці біля Буковеля">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${page.title}">
  <meta name="twitter:description" content="${page.description}">
  <meta name="twitter:image" content="${ogImage}">
  ${preloads.join("\n  ")}
  <link rel="preload" href="${base}assets/fonts/onest-300-normal-cyrillic.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="${base}assets/fonts/onest-400-normal-cyrillic.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="${base}assets/fonts/cormorant-garamond-300-italic-cyrillic.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="${base}assets/fonts/fonts.css">
  <link rel="stylesheet" href="${base}assets/css/styles.css">
  ${
    page.schema
      ? `<script type="application/ld+json">
${ld}
  </script>`
      : ""
  }
</head>`;
}

/* ------------------------------------------------------------------ */
/* Header / footer                                                     */
/* ------------------------------------------------------------------ */

export function header({ base, page }) {
  const home = base || "./";
  const links = nav
    .map(
      (n) =>
        `<a class="nav__link" href="${page.isHome ? n.hash : `${home}${n.hash}`}">${n.label}</a>`,
    )
    .join("\n        ");

  const subLinks = nav
    .map(
      (n) =>
        `<a class="menu__link" href="${page.isHome ? n.hash : `${home}${n.hash}`}"><span>${n.label}</span>${icon("arrowUpRight")}</a>`,
    )
    .join("\n      ");

  return `<a class="skip-link" href="#main">перейти до змісту</a>

<header class="nav" id="site-nav" data-theme="dark">
  <div class="nav__bar">
    <a class="nav__brand" href="${home}" aria-label="Маєток «Ліс і Гори» — на головну">
      ${mark("nav__mark")}
      <span class="nav__brandtext">
        <span class="nav__name">ліс і гори</span>
        <span class="nav__place">поляниця · буковель</span>
      </span>
    </a>

    <nav class="nav__links" aria-label="Головна навігація">
        ${links}
    </nav>

    <div class="nav__actions">
      <a class="nav__phone" href="tel:${business.phoneHref}" aria-label="Зателефонувати: ${business.phone}">${icon("phone")}<span>${business.phone}</span></a>
      <a class="btn btn--cream btn--sm nav__cta" href="${page.hasBooking ? "#booking" : `${home}#booking`}">забронювати</a>
      <button class="nav__burger" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Відкрити меню">
        <span></span><span></span>
      </button>
    </div>
  </div>
</header>

<div class="menu" id="mobile-menu" hidden>
  <div class="menu__inner">
    <p class="menu__label">навігація</p>
    <nav class="menu__nav" aria-label="Мобільна навігація">
      ${subLinks}
    </nav>
    <div class="menu__foot">
      <a class="menu__phone" href="tel:${business.phoneHref}">${business.phone}</a>
      <div class="menu__socials">
        ${business.socials
          .map((s) => `<a href="${s.href}" target="_blank" rel="noopener">${s.label}</a>`)
          .join("")}
      </div>
      <a class="btn btn--cream" href="${page.hasBooking ? "#booking" : `${home}#booking`}">забронювати</a>
    </div>
  </div>
</div>`;
}

export function footer({ base }) {
  const home = base || "./";
  const year = new Date().getFullYear();
  return `<footer class="footer">
  <div class="wrap">
    <div class="footer__top">
      <div class="footer__brand">
        <a class="footer__logo" href="${home}" aria-label="Маєток «Ліс і Гори» — на головну">${mark()} <span>ліс і гори</span></a>
        <p>Чотири дерев'яні оселі в Поляниці, підніжжя Хом'яка. П'ять кілометрів до Буковеля, ліс — за порогом.</p>
        <p class="footer__coords">${business.geoText}<br>${business.address.street}, ${business.address.locality}</p>
      </div>

      <nav class="footer__col" aria-label="Розділи сайту">
        <h2>маєток</h2>
        <a href="${home}#manor">про маєток</a>
        <a href="${home}#cottages">помешкання</a>
        <a href="${home}#territory">територія</a>
        <a href="${home}#gallery">галерея</a>
        <a href="${home}#location">локація</a>
        <a href="${home}#faq">питання</a>
      </nav>

      <nav class="footer__col" aria-label="Сторінки про відпочинок">
        <h2>поруч</h2>
        <a href="${home}polyanytsia/">відпочинок у Поляниці</a>
        <a href="${home}bukovel/">котеджі біля Буковеля</a>
        <a href="${home}shale/">оренда шале в Карпатах</a>
        <a href="${home}#location">як дістатися</a>
        <a href="${business.mapsShort}" target="_blank" rel="noopener">Google Maps ${icon("arrowUpRight")}</a>
      </nav>

      <div class="footer__col">
        <h2>контакти</h2>
        <a href="tel:${business.phoneHref}">${business.phone}</a>
        <a href="mailto:${business.email}">${business.email}</a>
        <a href="${home}#booking">забронювати</a>
        <div class="footer__socials">
          ${business.socials
            .map(
              (s) =>
                `<a href="${s.href}" target="_blank" rel="noopener">${s.label} ${icon("arrowUpRight")}</a>`,
            )
            .join("")}
        </div>
      </div>
    </div>

    <div class="footer__nap" itemscope itemtype="https://schema.org/LodgingBusiness">
      <span itemprop="name">Маєток «Ліс і Гори»</span> · <span itemprop="address" itemscope itemtype="https://schema.org/PostalAddress"><span itemprop="streetAddress">${business.address.street}</span>, <span itemprop="addressLocality">${business.address.locality}</span>, <span itemprop="addressRegion">${business.address.region}</span></span> · <a href="tel:${business.phoneHref}" itemprop="telephone">${business.phone}</a> · <a href="mailto:${business.email}" itemprop="email">${business.email}</a>
    </div>

    <div class="footer__bottom">
      <p>© ${year} Маєток «Ліс і Гори». Усі права захищені.</p>
      <div class="footer__legal">
        <a href="${home}privacy/">політика конфіденційності</a>
        <a href="${home}sitemap.xml">карта сайту</a>
      </div>
    </div>
  </div>
</footer>`;
}

/* ------------------------------------------------------------------ */
/* Shared blocks                                                       */
/* ------------------------------------------------------------------ */

export function bookingSection({ base, title, text }) {
  const options = cottages
    .map((c) => `<option value="${c.name}">${c.name} — ${c.meta}</option>`)
    .join("\n            ");
  return `<section class="booking" id="booking" aria-labelledby="booking-title">
  <div class="wrap booking__wrap">
    <div class="booking__intro">
      <p class="eyebrow eyebrow--light"><span>07</span> бронювання</p>
      <h2 class="display display--light" id="booking-title">${title}</h2>
      <p class="booking__text">${text}</p>

      <div class="booking__contacts">
        <a class="contact-line" href="tel:${business.phoneHref}">
          <span class="contact-line__icon">${icon("phone")}</span>
          <span><small>телефон і Viber</small>${business.phone}</span>
        </a>
        <a class="contact-line" href="mailto:${business.email}">
          <span class="contact-line__icon">${icon("mail")}</span>
          <span><small>пошта</small>${business.email}</span>
        </a>
        <a class="contact-line" href="${business.mapsShort}" target="_blank" rel="noopener">
          <span class="contact-line__icon">${icon("pin")}</span>
          <span><small>адреса</small>${business.address.street}, ${business.address.locality}</span>
        </a>
      </div>
    </div>

    <div class="booking__card">
      <form class="book-form" id="booking-form" novalidate>
        <div class="field field--row">
          <div class="field">
            <label for="bf-name">ім'я</label>
            <input id="bf-name" name="name" type="text" autocomplete="name" placeholder="Як до вас звертатися" required>
          </div>
          <div class="field">
            <label for="bf-phone">телефон</label>
            <input id="bf-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+380 __ ___ __ __" required>
          </div>
        </div>

        <div class="field field--row">
          <div class="field">
            <label for="bf-in">заїзд</label>
            <input id="bf-in" name="checkin" type="date" required>
          </div>
          <div class="field">
            <label for="bf-out">виїзд</label>
            <input id="bf-out" name="checkout" type="date" required>
          </div>
        </div>

        <div class="field field--row">
          <div class="field">
            <label for="bf-guests">гостей</label>
            <input id="bf-guests" name="guests" type="number" min="1" max="${business.maxGuests}" value="2" inputmode="numeric">
          </div>
          <div class="field">
            <label for="bf-unit">помешкання</label>
            <select id="bf-unit" name="unit">
              ${options}
              <option value="Весь маєток">Весь маєток — до ${business.maxGuests} гостей</option>
              <option value="Ще не визначився">Ще не визначився</option>
            </select>
          </div>
        </div>

        <div class="field">
          <label for="bf-note">коментар <span>(необов'язково)</span></label>
          <textarea id="bf-note" name="note" rows="2" placeholder="Діти, тварини, трансфер, особливі побажання"></textarea>
        </div>

        <button class="btn btn--solid btn--wide" type="submit">сформувати заявку ${icon("arrow")}</button>
        <p class="book-form__note">Форма сформує текст заявки — надішліть його у Viber, Telegram або на пошту. Дані нікуди не передаються без вашої дії.</p>
      </form>

      <div class="request" id="request-panel" hidden>
        <p class="request__label">ваша заявка готова</p>
        <textarea id="request-text" class="request__text" rows="8" readonly aria-label="Текст заявки"></textarea>
        <div class="request__actions">
          <a class="btn btn--solid" id="request-viber" href="viber://chat?number=${business.phoneRaw}">надіслати у Viber</a>
          <a class="btn btn--outline" id="request-mail" href="mailto:${business.email}">надіслати на пошту</a>
          <button class="btn btn--ghost" id="request-copy" type="button">${icon("copy")} скопіювати</button>
        </div>
        <button class="request__back" type="button" id="request-back">← повернутися до форми</button>
      </div>
    </div>
  </div>
</section>`;
}

export function cottageCards({ base, images }) {
  return cottages
    .map(
      (c) => `<article class="cottage" id="${c.id}">
  <a class="cottage__media" href="${base}#booking" data-unit="${c.name}" aria-label="Забронювати: ${c.name} — ${c.badge}">
    ${img(base, images, c.image, {
      alt: c.alt,
      sizes: "(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 45vw",
      className: "cottage__img",
    })}
    <span class="cottage__badge">${c.badge}</span>
    <span class="cottage__open">${icon("arrowUpRight")}</span>
  </a>
  <div class="cottage__body">
    <div class="cottage__head">
      <h3>${c.name}</h3>
      <p class="cottage__meta">${c.meta}</p>
    </div>
    <p class="cottage__text">${c.text}</p>
    <ul class="cottage__features">
      ${c.features.map((f) => `<li>${icon("check")}${f}</li>`).join("")}
    </ul>
    <div class="cottage__foot">
      <p class="cottage__price"><strong>${c.price}</strong><span>/ ніч</span><small>${c.high}</small></p>
      <a class="cottage__link" href="${base}#booking" data-unit="${c.name}">обрати ${icon("arrow")}</a>
    </div>
  </div>
</article>`,
    )
    .join("\n");
}

export function faqBlock(items, idPrefix = "faq") {
  return `<div class="faq-list">
    ${items
      .map(
        (f, i) => `<details class="faq-item" ${i === 0 ? "open" : ""}>
      <summary>
        <span class="faq-item__q">${f.q}</span>
        <span class="faq-item__icon" aria-hidden="true">${icon("plus")}</span>
      </summary>
      <div class="faq-item__a"><p>${f.a}</p></div>
    </details>`,
      )
      .join("\n    ")}
  </div>`;
}

export function breadcrumbs({ base, items }) {
  return `<nav class="crumbs" aria-label="Навігаційний ланцюжок">
  <ol>
    <li><a href="${base}">головна</a></li>
    ${items
      .map(
        (item, i) =>
          `<li>${item.href ? `<a href="${item.href}">${item.label}</a>` : `<span aria-current="page">${item.label}</span>`}</li>`,
      )
      .join("")}
  </ol>
</nav>`;
}

/* ------------------------------------------------------------------ */
/* Page shell                                                          */
/* ------------------------------------------------------------------ */

export function mobileCta({ base, page }) {
  return `<div class="mobile-cta" aria-label="Швидке бронювання">
  <span><strong>поляниця · 5 км до буковеля</strong>від 5 000 ₴ / ніч</span>
  <a class="btn btn--solid" href="${page.hasBooking ? "#booking" : `${base || "./"}#booking`}">забронювати</a>
</div>`;
}

export function shell({ base, images, page, bodyClass, content }) {
  return `${head({ base, images, page })}
<body class="${bodyClass}">
  ${header({ base, page })}
${content}
  ${footer({ base })}
  ${mobileCta({ base, page })}
  <script src="${base}assets/js/main.js" defer></script>
</body>
</html>`;
}

export function gallerySection({ base, images, items }) {
  const figures = items
    .map(
      (g, i) => `<figure class="gallery__item">
      <button class="gallery__btn" type="button" data-lightbox data-full="${base}assets/img/${g.image}-1200.webp" data-alt="${g.alt}" aria-label="Відкрити фото: ${g.alt}">
        ${img(base, images, g.image, {
          alt: g.alt,
          sizes: "(max-width: 640px) 74vw, (max-width: 1100px) 42vw, 30vw",
          className: "gallery__img",
        })}
      </button>
      <figcaption>${g.alt}</figcaption>
    </figure>`,
    )
    .join("\n    ");

  return `<section class="section section--paper gallery" id="gallery" aria-labelledby="gallery-title">
  <div class="wrap">
    <div class="gallery__head" data-reveal>
      <div>
        <p class="eyebrow"><span>04</span> галерея</p>
        <h2 class="display" id="gallery-title" style="margin-top:22px">світло,<br><em>дерево й тиша</em></h2>
      </div>
      <div class="gallery__controls">
        <button class="ctrl" type="button" data-gallery-prev aria-label="Попередні фото">${icon("chevronLeft")}</button>
        <button class="ctrl" type="button" data-gallery-next aria-label="Наступні фото">${icon("chevronRight")}</button>
      </div>
    </div>

    <div class="gallery__track" data-gallery>
    ${figures}
    </div>
    <p class="gallery__hint">гортайте → або натисніть на фото, щоб відкрити більше</p>
  </div>

  <dialog class="lightbox" id="lightbox" aria-label="Галерея маєтку">
    <div class="lightbox__inner">
      <button class="lightbox__close" type="button" data-lightbox-close aria-label="Закрити галерею">${icon("close")}</button>
      <img class="lightbox__img" src="" alt="">
      <div class="lightbox__bar">
        <p class="lightbox__cap"></p>
        <div class="lightbox__nav">
          <span class="lightbox__count" style="align-self:center;font-size:11px;letter-spacing:.12em;opacity:.55;margin-right:6px"></span>
          <button type="button" data-lightbox-prev aria-label="Попереднє фото">${icon("chevronLeft")}</button>
          <button type="button" data-lightbox-next aria-label="Наступне фото">${icon("chevronRight")}</button>
        </div>
      </div>
    </div>
  </dialog>
</section>`;
}

export function relatedPages({ base, items }) {
  return `<section class="related-pages" aria-labelledby="related-title">
  <div class="wrap">
    <h2 id="related-title">читати далі</h2>
    <div class="related-grid">
      ${items
        .map(
          (p) => `<a class="related-card" href="${p.href || `${base}${p.slug}/`}">
        <div>
          <small>${p.label}</small>
          <strong>${p.title}</strong>
        </div>
        ${icon("arrowUpRight")}
      </a>`,
        )
        .join("\n      ")}
    </div>
  </div>
</section>`;
}

/* ------------------------------------------------------------------ */
/* Structured data                                                     */
/* ------------------------------------------------------------------ */

export function lodgingSchema() {
  const url = BASE_URL;
  const image = (name, w = 1280) => `${url}/assets/img/${name}-${w}.webp`;
  return {
    "@type": ["LodgingBusiness", "LocalBusiness"],
    "@id": `${url}/#lodging`,
    name: business.name,
    alternateName: ["Лісовий маєток", "Маєток Ліс і Гори"],
    description: business.description,
    url: `${url}/`,
    image: [
      image("hero-poster", 1920),
      image("cottage-1", 1600),
      image("about-1", 1800),
    ],
    logo: `${url}/assets/img/apple-touch-icon.png`,
    telephone: business.phone,
    email: business.email,
    priceRange: business.priceRange,
    currenciesAccepted: "UAH",
    paymentAccepted: "Готівка, картка, банківський переказ",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    hasMap: business.mapsShort,
    sameAs: business.socials.map((s) => s.href),
    checkinTime: business.checkin,
    checkoutTime: business.checkout,
    numberOfRooms: 17,
    areaServed: [
      { "@type": "Place", name: "Поляниця" },
      { "@type": "Place", name: "Буковель" },
      { "@type": "Place", name: "Яремче" },
      { "@type": "AdministrativeArea", name: "Івано-Франківська область" },
    ],
    amenityFeature: [
      "Басейн із підігрівом",
      "Лазня",
      "Джакузі",
      "Камін",
      "Кухня та їдальня",
      "Мангал і альтанка",
      "Дитячий майданчик",
      "Безкоштовний паркінг",
      "Wi-Fi",
      "Трансфер до Буковеля",
      "Охорона та відеонагляд",
      "Тераси з видом на гори",
    ].map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    makesOffer: cottages.map((c) => ({
      "@type": "Offer",
      name: c.name,
      priceCurrency: "UAH",
      price: c.price.replace(/[^0-9]/g, ""),
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceCurrency: "UAH",
        price: c.price.replace(/[^0-9]/g, ""),
        unitText: "ніч",
      },
      availability: "https://schema.org/InStock",
      itemOffered: {
        "@type": "Accommodation",
        name: `${c.name} — ${c.meta}`,
        description: c.text,
        occupancy: { "@type": "QuantitativeValue", maxValue: c.max },
      },
    })),
  };
}

export function schemaGraph({ page, extra = [] }) {
  const url = BASE_URL;
  const graph = [
    {
      "@type": "WebSite",
      "@id": `${url}/#website`,
      url: `${url}/`,
      name: business.name,
      inLanguage: "uk-UA",
      publisher: { "@id": `${url}/#lodging` },
    },
    {
      "@type": "WebPage",
      "@id": `${page.url}#webpage`,
      url: page.url,
      name: page.title,
      description: page.description,
      isPartOf: { "@id": `${url}/#website` },
      about: { "@id": `${url}/#lodging` },
      inLanguage: "uk-UA",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${url}/assets/img/${page.ogImage || "hero-poster-1280"}.webp`,
      },
      potentialAction: {
        "@type": "ReserveAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/#booking`,
          actionPlatform: [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform",
          ],
        },
        result: { "@type": "Reservation", name: "Бронювання маєтку «Ліс і Гори»" },
      },
    },
    lodgingSchema(),
    ...extra,
  ];
  return { "@context": "https://schema.org", "@graph": graph };
}

export function faqSchema(items, id = "faq") {
  return {
    "@type": "FAQPage",
    "@id": `${BASE_URL}/#${id}`,
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.url,
    })),
  };
}

export { faqs };
