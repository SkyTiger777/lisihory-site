/* Маєток «Ліс і Гори» — progressive enhancement only. */
(() => {
  "use strict";

  const doc = document;
  const root = doc.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, ctx = doc) => ctx.querySelector(sel);
  const $$ = (sel, ctx = doc) => Array.from(ctx.querySelectorAll(sel));

  /* ------------------------------------------------------------- toast */
  let toastTimer;
  function toast(message) {
    let el = $(".toast");
    if (!el) {
      el = doc.createElement("div");
      el.className = "toast";
      el.setAttribute("role", "status");
      el.setAttribute("aria-live", "polite");
      doc.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => el.classList.remove("is-visible"), 3200);
  }

  /* ------------------------------------------------------------- nav */
  const nav = $("#site-nav");
  const menu = $("#mobile-menu");
  const burger = $(".nav__burger");
  let lastY = window.scrollY;
  let menuOpen = false;

  function setMenu(open) {
    if (!menu || !burger) return;
    menuOpen = open;
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Закрити меню" : "Відкрити меню");
    doc.body.classList.toggle("menu-open", open);
    if (open) {
      menu.hidden = false;
      window.requestAnimationFrame(() => menu.classList.add("is-open"));
      const first = $(".menu__link", menu);
      if (first) window.setTimeout(() => first.focus({ preventScroll: true }), 450);
    } else {
      menu.classList.remove("is-open");
      window.setTimeout(() => {
        if (!menuOpen) menu.hidden = true;
      }, 480);
    }
  }

  if (burger) {
    burger.addEventListener("click", () => setMenu(!menuOpen));
  }

  if (menu) {
    $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  }

  doc.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuOpen) setMenu(false);
  });

  function onScroll() {
    const y = window.scrollY;

    if (nav) {
      const hero = $(".hero, .subhero");
      const heroLimit = hero ? hero.offsetHeight - 150 : 0;
      nav.dataset.theme = y < heroLimit ? "dark" : "light";
      nav.dataset.scrolled = y > 20 ? "true" : "false";
      nav.dataset.hidden =
        !menuOpen && y > Math.max(420, heroLimit) && y > lastY + 6 ? "true" : "false";
    }

    const cta = $(".mobile-cta");
    if (cta) cta.classList.toggle("is-visible", y > 560);

    lastY = y;
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ------------------------------------------------------------- reveal */
  const revealItems = $$("[data-reveal]");
  if (revealItems.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((el) => el.classList.add("is-in"));
    } else {
      revealItems.forEach((el) => el.classList.add("reveal"));
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );
      revealItems.forEach((el) => io.observe(el));
    }
  }

  /* ------------------------------------------------------------- hero video */
  const heroVideo = $("video[data-src]");
  if (heroVideo) {
    const conn = navigator.connection;
    const slow = conn && (conn.saveData || /(^|-)2g$|(^|-)3g$/.test(conn.effectiveType || ""));
    if (!reduceMotion && !slow) {
      const startVideo = () => {
        heroVideo.src = heroVideo.dataset.src;
        heroVideo.preload = "auto";
        heroVideo.addEventListener(
          "playing",
          () => {
            heroVideo.classList.add("is-playing");
            const poster = $(".hero__media img");
            if (poster) poster.style.opacity = "0";
          },
          { once: true },
        );
        const attempt = heroVideo.play();
        if (attempt && typeof attempt.catch === "function") attempt.catch(() => {});
      };
      if (doc.readyState === "complete") window.setTimeout(startVideo, 350);
      else window.addEventListener("load", () => window.setTimeout(startVideo, 350), { once: true });
    }
  }

  /* ------------------------------------------------------------- copy */
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const ta = doc.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      doc.body.appendChild(ta);
      ta.select();
      let ok = false;
      try {
        ok = doc.execCommand("copy");
      } catch {
        ok = false;
      }
      ta.remove();
      return ok;
    }
  }

  $$("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const ok = await copyText(btn.dataset.copy);
      toast(ok ? "Координати скопійовано" : "Не вдалося скопіювати — виділіть текст вручну");
    });
  });

  /* ------------------------------------------------------------- map facade */
  const mapOpen = $("[data-map-open]");
  if (mapOpen) {
    mapOpen.addEventListener("click", () => {
      const map = mapOpen.closest(".map");
      const src = mapOpen.dataset.mapOpen;
      if (!map || !src) return;
      const frame = doc.createElement("iframe");
      frame.src = src;
      frame.title = "Маєток «Ліс і Гори» на Google Maps";
      frame.loading = "lazy";
      frame.referrerPolicy = "no-referrer-when-downgrade";
      frame.allowFullscreen = true;
      map.appendChild(frame);
      mapOpen.remove();
    });
  }

  /* ------------------------------------------------------------- gallery */
  const track = $("[data-gallery]");
  if (track) {
    const prev = $("[data-gallery-prev]");
    const next = $("[data-gallery-next]");
    const step = () => {
      const item = $(".gallery__item", track);
      return item ? item.getBoundingClientRect().width + 16 : 320;
    };
    if (prev) prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
    if (next) next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));

    let down = false;
    let startX = 0;
    let startScroll = 0;
    let moved = 0;

    track.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      down = true;
      moved = 0;
      startX = e.clientX;
      startScroll = track.scrollLeft;
      track.classList.add("is-dragging");
    });

    track.addEventListener("pointermove", (e) => {
      if (!down) return;
      const delta = e.clientX - startX;
      moved = Math.abs(delta);
      if (moved > 4) {
        e.preventDefault();
        track.scrollLeft = startScroll - delta;
      }
    });

    const endDrag = () => {
      down = false;
      track.classList.remove("is-dragging");
    };

    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);
    track.addEventListener("pointerleave", endDrag);
    track.addEventListener(
      "click",
      (e) => {
        if (moved > 8) {
          e.preventDefault();
          e.stopPropagation();
        }
      },
      true,
    );
  }

  /* ------------------------------------------------------------- lightbox */
  const dialog = $("#lightbox");
  const openers = $$("[data-lightbox]");
  if (dialog && openers.length) {
    const image = $(".lightbox__img", dialog);
    const cap = $(".lightbox__cap", dialog);
    const counter = $(".lightbox__count", dialog);
    let index = 0;

    const show = (i) => {
      index = (i + openers.length) % openers.length;
      const btn = openers[index];
      image.src = btn.dataset.full;
      image.alt = btn.dataset.alt || "";
      cap.textContent = btn.dataset.alt || "";
      counter.textContent = `${index + 1} / ${openers.length}`;
    };

    openers.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        show(i);
        if (typeof dialog.showModal === "function") dialog.showModal();
        else dialog.setAttribute("open", "");
        doc.body.classList.add("menu-open");
      });
    });

    const close = () => {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
      doc.body.classList.remove("menu-open");
    };

    $$("[data-lightbox-close]", dialog).forEach((b) => b.addEventListener("click", close));
    $("[data-lightbox-prev]", dialog)?.addEventListener("click", () => show(index - 1));
    $("[data-lightbox-next]", dialog)?.addEventListener("click", () => show(index + 1));

    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) close();
    });

    dialog.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    });

    dialog.addEventListener("close", () => doc.body.classList.remove("menu-open"));
  }

  /* ------------------------------------------------------------- booking */
  const form = $("#booking-form");
  if (form) {
    const panel = $("#request-panel");
    const requestText = $("#request-text");
    const name = $("#bf-name");
    const phone = $("#bf-phone");
    const checkin = $("#bf-in");
    const checkout = $("#bf-out");
    const guests = $("#bf-guests");
    const unit = $("#bf-unit");
    const note = $("#bf-note");
    const viber = $("#request-viber");
    const mail = $("#request-mail");
    const copy = $("#request-copy");
    const back = $("#request-back");

    const today = new Date();
    const iso = (d) => d.toISOString().slice(0, 10);
    if (checkin) checkin.min = iso(today);
    if (checkout) checkout.min = iso(today);

    if (checkin && checkout) {
      checkin.addEventListener("change", () => {
        if (!checkin.value) return;
        const next = new Date(checkin.value);
        next.setDate(next.getDate() + 1);
        checkout.min = iso(next);
        if (!checkout.value || checkout.value <= checkin.value) checkout.value = iso(next);
      });
    }

    $$("[data-unit]").forEach((link) => {
      link.addEventListener("click", () => {
        if (unit) unit.value = link.dataset.unit;
      });
    });

    const setInvalid = (input, invalid) => {
      const field = input?.closest(".field");
      if (field) field.classList.toggle("is-invalid", invalid);
      if (input) input.setAttribute("aria-invalid", invalid ? "true" : "false");
    };

    const formatDate = (value) => {
      if (!value) return "—";
      const d = new Date(value);
      return d.toLocaleDateString("uk-UA", { day: "numeric", month: "long", year: "numeric" });
    };

    const unitText = () => {
      if (!unit) return "ще не визначено";
      const opt = unit.options[unit.selectedIndex];
      return opt ? opt.textContent.trim() : unit.value;
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const badName = !name || name.value.trim().length < 2;
      const digits = phone ? phone.value.replace(/\D/g, "") : "";
      const badPhone = digits.length < 9;
      const badIn = !checkin || !checkin.value;
      const badOut = !checkout || !checkout.value || (checkin && checkout.value <= checkin.value);

      setInvalid(name, badName);
      setInvalid(phone, badPhone);
      setInvalid(checkin, badIn);
      setInvalid(checkout, badOut);

      if (badName || badPhone || badIn || badOut) {
        const target = badName ? name : badPhone ? phone : badIn ? checkin : checkout;
        target?.focus();
        toast("Перевірте ім'я, телефон і дати заїзду");
        return;
      }

      const lines = [
        "Заявка на бронювання — Маєток «Ліс і Гори»",
        "",
        `Ім'я: ${name.value.trim()}`,
        `Телефон: ${phone.value.trim()}`,
        `Заїзд: ${formatDate(checkin.value)} (з 14:00)`,
        `Виїзд: ${formatDate(checkout.value)} (до 11:00)`,
        `Гостей: ${guests ? guests.value : "2"}`,
        `Помешкання: ${unitText()}`,
      ];
      if (note && note.value.trim()) lines.push(`Коментар: ${note.value.trim()}`);
      lines.push("", "Надіслано з сайту lisihory.ua");

      const text = lines.join("\n");
      if (requestText) requestText.value = text;
      if (viber) {
        viber.href = `viber://chat?number=${encodeURIComponent("+380504680470")}`;
      }
      if (mail) {
        mail.href = `mailto:lisovyi.maietok@gmail.com?subject=${encodeURIComponent(
          "Заявка на бронювання — Ліс і Гори",
        )}&body=${encodeURIComponent(text)}`;
      }

      form.hidden = true;
      if (panel) panel.hidden = false;
      if (viber) viber.focus({ preventScroll: true });
      panel?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
    });

    if (copy) {
      copy.addEventListener("click", async () => {
        if (!requestText) return;
        const ok = await copyText(requestText.value);
        toast(ok ? "Текст заявки скопійовано" : "Не вдалося скопіювати текст");
      });
    }

    if (back) {
      back.addEventListener("click", () => {
        if (panel) panel.hidden = true;
        form.hidden = false;
        name?.focus({ preventScroll: true });
      });
    }
  }

  /* ------------------------------------------------------------- print */
  window.addEventListener("beforeprint", () => {
    if (dialog?.open) dialog.close();
  });
})();
