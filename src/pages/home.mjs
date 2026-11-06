import {
  BASE_URL,
  amenities,
  business,
  cottages,
  distances,
  faqs,
  gallery,
  seasons,
} from "../data.mjs";
import {
  bookingSection,
  cottageCards,
  faqBlock,
  faqSchema,
  gallerySection,
  head,
  header,
  footer,
  icon,
  img,
  mobileCta,
  schemaGraph,
} from "../ui.mjs";

const tickerItems = [
  "басейн із підігрівом",
  "лазня на території",
  "5 км до Буковеля",
  "камін і джакузі",
  "закрита територія",
  "мангал і альтанка",
  "діти та тварини",
  "трансфер за домовленістю",
];

export const page = {
  isHome: true,
  hasBooking: true,
  url: `${BASE_URL}/`,
  title: "Маєток «Ліс і Гори» — котеджі в Поляниці біля Буковеля",
  description:
    "Чотири дерев'яні котеджі в Поляниці за 5 км від Буковеля: басейн із підігрівом, лазня, кухні, мангал і ліс за порогом. До 42 гостей.",
  ogImage: "hero-poster-1920",
  preloadImage: "hero-poster",
  schema: null,
};

export function render({ base = "", images }) {
  const tickerGroup = tickerItems
    .map((t) => `<span>${t}</span><i aria-hidden="true"></i>`)
    .join("");

  const amenityList = amenities
    .map(
      (a) => `<div class="amenity">
        <span class="amenity__icon">${icon(a.icon)}</span>
        <div><h3>${a.title}</h3><p>${a.text}</p></div>
      </div>`,
    )
    .join("\n        ");

  const distanceList = distances
    .map(
      (d) => `<li><span class="place">${d.place}</span><span class="dots"></span><span class="km">${d.km}</span><span class="time">${d.time}</span></li>`,
    )
    .join("\n          ");

  const seasonCards = seasons
    .map(
      (s) => `<article class="season">
        <p class="season__label"><span>${s.dates}</span><em>${s.label}</em></p>
        <h4>${s.title}</h4>
        <p>${s.text}</p>
      </article>`,
    )
    .join("\n        ");

  page.schema = schemaGraph({
    page,
    extra: [faqSchema(faqs)],
  });

  const html = `${head({ base, images, page })}
<body class="page-home">
  ${header({ base, page })}

  <main id="main">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero__media">
        ${img(base, images, "hero-poster", {
          alt: "Маєток «Ліс і Гори» серед смерек у Поляниці",
          sizes: "100vw",
          loading: "eager",
          priority: true,
        })}
        <video muted loop playsinline preload="none" data-src="${base}assets/video/hero.mp4" aria-hidden="true" tabindex="-1"></video>
      </div>
      <div class="hero__veil" aria-hidden="true"></div>

      <div class="hero__inner wrap">
        <div class="hero__top">
          <p class="hero__place">Поляниця · Буковель · 5 км</p>
          <a class="hero__coords" href="${business.mapsShort}" target="_blank" rel="noopener">
            ${business.geoText} ${icon("arrowUpRight")}
          </a>
        </div>

        <div class="hero__words">
          <h1 class="hero__title" id="hero-title" aria-label="Ліс і гори">
            <span class="word word--1"><span>ліс</span></span>
            <span class="word word--2"><span>і</span></span>
            <span class="word word--3"><span>гори</span></span>
          </h1>
        </div>

        <div class="hero__bottom">
          <div class="hero__copy">
            <p>Чотири дерев'яні оселі на схилі Хом'яка. Басейн із підігрівом, лазня й смерековий ліс — за п'ять кілометрів від Буковеля.</p>
            <div class="hero__actions">
              <a class="btn btn--cream" href="#booking">забронювати ${icon("arrow")}</a>
              <a class="btn btn--outline" style="--btn-fg:var(--cream);border-color:rgba(246,241,229,.3)" href="#cottages">подивитися оселі</a>
            </div>
          </div>

          <div class="hero__stats">
            <div class="hero__stat"><strong>4</strong><span>оселі</span></div>
            <div class="hero__stat"><strong>42</strong><span>гості</span></div>
            <div class="hero__stat"><strong>5 км</strong><span>до Буковеля</span></div>
          </div>
        </div>

        <a class="hero__scroll" href="#manor">гортайте ${icon("arrowDown")}</a>
      </div>
    </section>

    <div class="ticker" aria-hidden="true">
      <div class="ticker__track">
        <div class="ticker__group">${tickerGroup}</div>
        <div class="ticker__group">${tickerGroup}</div>
      </div>
    </div>

    <section class="section section--paper manor" id="manor" aria-labelledby="manor-title">
      <div class="wrap manor__grid">
        <div class="manor__copy" data-reveal>
          <p class="eyebrow"><span>01</span> маєток</p>
          <h2 class="display" id="manor-title">не готель,<br>а <em>дім</em> у лісі</h2>
          <p class="lead">Маєток стоїть на схилі над Поляницею, у смерековому лісі, який починається одразу за терасою. Це чотири окремі оселі — без ресепшн, коридорів і розкладу сніданків.</p>
          <p>Ми будували його для великих родин і компаній: у кожній оселі є власна кухня, санвузли та місце, де зібратися всім разом. Решта — ліс, гори й п'ять кілометрів до Буковеля.</p>
          <p>Господарі живуть поруч, тож допоможуть із трансфером, мангалом чи порадою, куди йти вранці. Але не будуть поруч, якщо ви приїхали за тишею.</p>

          <div class="manor__facts">
            <div class="fact"><strong>4</strong><span>дерев'яні оселі</span></div>
            <div class="fact"><strong>до <em>42</em></strong><span>гостей разом</span></div>
            <div class="fact"><strong>17</strong><span>номерів</span></div>
            <div class="fact"><strong><em>5</em> км</strong><span>до Буковеля</span></div>
          </div>
        </div>

        <div class="manor__media" data-reveal>
          <div class="manor__tall">
            ${img(base, images, "about-2", {
              alt: "Дерев'яна оселя маєтку серед смерек",
              sizes: "(max-width: 1100px) 55vw, 28vw",
            })}
          </div>
          <div class="manor__wide">
            ${img(base, images, "about-1", {
              alt: "Тераса маєтку з видом на карпатський ліс",
              sizes: "(max-width: 1100px) 65vw, 34vw",
            })}
          </div>
          <p class="manor__caption">${icon("pin")} Поляниця · вул. Прохідний, 192</p>
        </div>
      </div>
    </section>

    <section class="section section--bone cottages" id="cottages" aria-labelledby="cottages-title">
      <div class="wrap">
        <div class="section-head" data-reveal>
          <div>
            <p class="eyebrow"><span>02</span> помешкання</p>
            <h2 class="display" id="cottages-title">кожна оселя —<br><em>окремий світ</em></h2>
          </div>
          <div class="section-head__side">
            <p class="lead">Від компактного котеджу для двох родин до шале на шість спалень. Усі оселі — з власними кухнями, санвузлами та виходом на терасу.</p>
            <p class="note">Ціни — за ніч у низький сезон. У свята, на Різдво та в розпал сезону вартість вища; актуальну суму підтверджуємо під час бронювання.</p>
          </div>
        </div>

        <div class="cottages__grid">
          ${cottageCards({ base, images })}
        </div>

        <div class="cottages__note">
          <p>Не знаєте, яка оселя підійде? Напишіть кількість гостей і дати — підберемо.</p>
          <a href="#booking">сформувати заявку ${icon("arrow")}</a>
        </div>
      </div>
    </section>

    <section class="section section--dark territory" id="territory" aria-labelledby="territory-title">
      <div class="wrap">
        <div class="section-head" data-reveal>
          <div>
            <p class="eyebrow eyebrow--light"><span>03</span> територія</p>
            <h2 class="display display--light" id="territory-title">басейн, лазня<br>і <em>ліс</em> за порогом</h2>
          </div>
          <div class="section-head__side">
            <p class="lead">Усе, що потрібно після схилу, дощу чи довгої прогулянки: тепла вода, пара, вогонь і тиша.</p>
          </div>
        </div>

        <div class="territory__grid">
          <figure class="territory__media territory__media--pool">
            ${img(base, images, "amenity-pool", {
              alt: "Басейн із підігрівом на території маєтку",
              sizes: "(max-width: 860px) 50vw, 55vw",
            })}
            <figcaption>басейн із підігрівом</figcaption>
          </figure>

          <figure class="territory__media territory__media--bath">
            ${img(base, images, "amenity-bath", {
              alt: "Лазня на території маєтку «Ліс і Гори»",
              sizes: "(max-width: 860px) 50vw, 40vw",
            })}
            <figcaption>лазня</figcaption>
          </figure>

          <figure class="territory__media territory__media--forest">
            ${img(base, images, "amenity-forest", {
              alt: "Смерековий ліс навколо маєтку",
              sizes: "(max-width: 860px) 50vw, 40vw",
            })}
            <figcaption>ліс за порогом</figcaption>
          </figure>

          <div class="territory__list">
        ${amenityList}
          </div>
        </div>

        <div class="territory__strip" aria-label="Головні зручності">
          <span>підігрів води</span>
          <span>лазня</span>
          <span>джакузі</span>
          <span>камін</span>
          <span>мангал</span>
          <span>дітям</span>
          <span>паркінг</span>
          <span>wi-fi</span>
          <span>трансфер</span>
        </div>
      </div>
    </section>

    ${gallerySection({ base, images, items: gallery })}

    <section class="section section--paper location" id="location" aria-labelledby="location-title">
      <div class="wrap">
        <div class="location__grid">
          <div data-reveal>
            <p class="eyebrow"><span>05</span> локація</p>
            <h2 class="display" id="location-title">п'ять кілометрів<br><em>до схилів</em></h2>
            <p class="location__address">${business.address.street},<br>${business.address.locality},<br>${business.address.region}</p>
            <p class="location__coords">
              <span>${business.geoText}</span>
              <button class="copy-coords" type="button" data-copy="${business.geo.lat}, ${business.geo.lng}" aria-label="Скопіювати координати">${icon("copy")} копіювати</button>
            </p>

            <ul class="distances">
          ${distanceList}
            </ul>

            <div class="location__actions">
              <a class="btn btn--solid" href="${business.directions}" target="_blank" rel="noopener">прокласти маршрут ${icon("arrowUpRight")}</a>
              <a class="btn btn--outline" href="${business.mapsShort}" target="_blank" rel="noopener">Google Maps</a>
            </div>

            <p class="location__note">У навігаторі краще вводити координати ${business.geo.lat}, ${business.geo.lng} — вулиця Прохідний у Поляниці розгалужується, а покажчик маєтку стоїть біля повороту на Хом'як.</p>
          </div>

          <div class="map">
            <div class="map__poster">
              ${img(base, images, "page-polyanytsia", {
                alt: "Поляниця та гори навколо маєтку",
                sizes: "(max-width: 1100px) 100vw, 55vw",
              })}
            </div>
            <span class="map__label">Поляниця · Хом'як</span>
            <button class="map__facade" type="button" data-map-open="${business.mapsEmbed}">
              <span class="map__pin">${icon("pin")}</span>
              <span class="map__pill">відкрити карту ${icon("arrow")}</span>
              <span class="map__hint">Google Maps завантажиться після натискання</span>
            </button>
          </div>
        </div>

        <div class="route-grid">
          <article class="route-card">
            <span class="route-card__icon">${icon("car")}</span>
            <h3>Автомобілем</h3>
            <p>Трасою Львів — Рахів — Мукачеве до Поляниці, далі 5 км у бік Хом'яка. Паркінг на закритій території — безкоштовний.</p>
          </article>
          <article class="route-card">
            <span class="route-card__icon">${icon("route")}</span>
            <h3>Потягом</h3>
            <p>До Івано-Франківська або Яремче, звідти таксі чи автобус до Поляниці. Зустріч на станції організовуємо за домовленістю.</p>
          </article>
          <article class="route-card">
            <span class="route-card__icon">${icon("users")}</span>
            <h3>Автобусом і трансфером</h3>
            <p>Рейси до Яремче та Буковеля щодня. Трансфер від автостанції або нижньої станції витягів — за попереднім запитом.</p>
          </article>
        </div>

        <div class="seasons">
          <div class="seasons__head">
            <h3>коли їхати</h3>
            <p>Маєток працює цілий рік. Сезон змінює не лише краєвид, а й ціну та кількість людей на схилах.</p>
          </div>
          <div class="seasons__grid">
        ${seasonCards}
          </div>
        </div>
      </div>
    </section>

    <section class="section section--bone faq" id="faq" aria-labelledby="faq-title">
      <div class="wrap faq__grid">
        <div class="faq__aside" data-reveal>
          <p class="eyebrow"><span>06</span> питання</p>
          <h2 class="display" id="faq-title">питають<br><em>найчастіше</em></h2>
          <p>Не знайшли відповіді? Напишіть у Viber або зателефонуйте — відповідаємо щодня з 9:00 до 21:00.</p>
          <div class="faq__contact">
            <small>телефон і Viber</small>
            <a href="tel:${business.phoneHref}">${business.phone}</a>
            <small style="margin-top:10px">пошта</small>
            <a href="mailto:${business.email}" style="font-size:1.15rem">${business.email}</a>
          </div>
        </div>

        <div data-reveal>
          ${faqBlock(faqs)}
        </div>
      </div>
    </section>

    ${bookingSection({
      base,
      title: "оберіть дати —<br><em>решту</em> узгодимо",
      text: "Заповніть коротку форму: ми підготуємо текст заявки, а ви надішлете його у Viber, Telegram або на пошту. Відповідаємо протягом дня та підтверджуємо вільні дати.",
    })}
  </main>

  ${footer({ base })}
  ${mobileCta({ base, page })}
  <script src="${base}assets/js/main.js" defer></script>
</body>
</html>`;

  return html;
}
