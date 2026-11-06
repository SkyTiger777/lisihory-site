import { BASE_URL, business } from "../data.mjs";
import {
  bookingSection,
  breadcrumbSchema,
  breadcrumbs,
  faqBlock,
  faqSchema,
  footer,
  head,
  header,
  icon,
  img,
  mobileCta,
  relatedPages,
  schemaGraph,
} from "../ui.mjs";

/* Shared layout for the editorial / geo landing pages. */
export function renderSubpage({
  base,
  images,
  page,
  crumbLabel,
  h1,
  lead,
  meta = [],
  heroImage,
  prose,
  faqs = [],
  faqTitle = "питання про цю локацію",
  related = [],
  asideTitle = "жити в лісі,<br><em>їхати на схил</em>",
  asideText = "Чотири оселі, до 42 гостей, п'ять кілометрів до Буковеля. Перевірте вільні дати — відповімо протягом дня.",
  asideFacts = [],
  asideLinks = [],
  asideCta = null,
  booking = null,
}) {
  page.schema = schemaGraph({
    page,
    extra: [
      ...(faqs.length ? [faqSchema(faqs, `${page.slug}-faq`)] : []),
      breadcrumbSchema([
        { label: "головна", url: `${BASE_URL}/` },
        { label: crumbLabel, url: page.url },
      ]),
    ],
  });

  const script = `${head({ base, images, page })}
<body class="page-sub">
  ${header({ base, page })}

  <main id="main">
    <section class="subhero" aria-labelledby="page-title">
      <div class="subhero__media">
        ${img(base, images, heroImage, {
          alt: page.title,
          sizes: "100vw",
          loading: "eager",
          priority: true,
        })}
      </div>
      <div class="wrap">
        ${breadcrumbs({ base, items: [{ label: crumbLabel }] })}
        <h1 id="page-title">${h1}</h1>
        <p class="subhero__lead">${lead}</p>
        ${
          meta.length
            ? `<div class="subhero__meta">${meta.map((m) => `<span>${m}</span>`).join("")}</div>`
            : ""
        }
      </div>
    </section>

    <section class="article">
      <div class="wrap article__grid">
        <div class="prose">
          ${prose}

          ${
            faqs.length
              ? `<div class="article__faq" id="faq">
            <h2>${faqTitle}</h2>
            ${faqBlock(faqs, `${page.slug}-faq`)}
          </div>`
              : ""
          }
        </div>

        <aside class="aside" aria-label="Коротко про маєток">
          <div class="aside__card">
            <h2>${asideTitle}</h2>
            <p>${asideText}</p>
            ${
              asideFacts.length
                ? `<ul class="aside__facts">${asideFacts
                    .map((f) => `<li>${icon("check")}${f}</li>`)
                    .join("")}</ul>`
                : ""
            }
            <a class="btn btn--solid" href="${asideCta?.href || (page.hasBooking ? "#booking" : `${base}#booking`)}">${asideCta?.label || "перевірити дати"} ${icon("arrow")}</a>
            <a class="aside__phone" href="tel:${business.phoneHref}">або зателефонувати: ${business.phone}</a>
          </div>

          ${
            asideLinks.length
              ? `<div class="aside__related">
            <h2>поруч</h2>
            ${asideLinks
              .map(
                (l) =>
                  `<a href="${l.href}">${l.label} ${icon("arrowUpRight")}</a>`,
              )
              .join("")}
          </div>`
              : ""
          }
        </aside>
      </div>
    </section>

    ${related.length ? relatedPages({ base, items: related }) : ""}

    ${
      booking
        ? bookingSection({ base, title: booking.title, text: booking.text })
        : ""
    }
  </main>

  ${footer({ base })}
  ${mobileCta({ base, page })}
  <script src="${base}assets/js/main.js" defer></script>
</body>
</html>`;

  return script;
}
