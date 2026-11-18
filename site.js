/* =========================================================
   ADVANCED — site geneli (header, mobil menü, akordeon, modal)
   ========================================================= */
(function () {
  const A = window.ADV;

  /* ---- tema (ışık modu) ---- */
  const SUN = '<svg class="sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5 5l1.6 1.6M17.4 17.4 19 19M19 5l-1.6 1.6M6.6 17.4 5 19"/></svg>';
  const MOON = '<svg class="moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>';
  const applyTheme = (t) => {
    document.documentElement.setAttribute("data-theme", t);
    document.querySelectorAll(".theme-toggle").forEach((b) => {
      b.innerHTML = SUN + MOON;
      b.setAttribute("aria-label", t === "light" ? "Koyu moda geç" : "Işık moduna geç");
      b.setAttribute("title", t === "light" ? "Koyu mod" : "Işık modu");
    });
  };
  let theme = "dark";
  try { theme = localStorage.getItem("adv_theme") || "dark"; } catch (e) {}
  applyTheme(theme);
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".theme-toggle");
    if (!btn) return;
    theme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    try { localStorage.setItem("adv_theme", theme); } catch (err) {}
    applyTheme(theme);
  });

  /* ---- aktif menü ---- */
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach((a) => {
    if (a.getAttribute("href") === path) a.classList.add("active");
  });

  /* ---- header scroll ---- */
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- mobil menü ---- */
  const toggle = document.querySelector(".menu-toggle");
  const mobile = document.querySelector(".mobile-menu");
  if (toggle && mobile) {
    toggle.addEventListener("click", () => {
      const open = mobile.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.innerHTML = open
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
    });
  }

  /* ---- IP kopyala ---- */
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.getAttribute("data-copy");
      try {
        await navigator.clipboard.writeText(text);
        A.toast("Kopyalandı: " + text);
      } catch (e) {
        A.toast("IP: " + text);
      }
    });
  });

  /* ---- akordeon ---- */
  document.querySelectorAll(".acc-head").forEach((head) => {
    head.addEventListener("click", () => {
      const item = head.closest(".acc-item");
      const body = item.querySelector(".acc-body");
      const open = item.classList.toggle("open");
      head.setAttribute("aria-expanded", open ? "true" : "false");
      body.style.maxHeight = open ? body.scrollHeight + 40 + "px" : "0px";
    });
  });

  /* ---- duyuru modalı ---- */
  let modal = document.getElementById("notice-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "notice-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.innerHTML =
      '<div class="modal-card">' +
      '<div class="modal-head"><div><div class="modal-tagline">Advanced Duyuru Merkezi</div>' +
      '<h2 class="h3" style="margin-top:8px" data-m-title></h2>' +
      '<div class="mono small muted" style="margin-top:8px" data-m-meta></div></div>' +
      '<button class="icon-btn" data-close aria-label="Kapat"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>' +
      '<div class="modal-body" data-m-body></div></div>';
    document.body.appendChild(modal);
  }
  if (modal) {
    document.addEventListener("click", (e) => {
      const card = e.target.closest("[data-notice]");
      if (!card) return;
      const id = Number(card.getAttribute("data-notice"));
      const n = A.notices.all().find((x) => x.id === id);
      if (!n) return;
      modal.querySelector("[data-m-title]").textContent = n.title;
      modal.querySelector("[data-m-meta]").textContent = A.dateTR(n.date) + " / " + n.author;
      modal.querySelector("[data-m-body]").textContent = n.body || n.summary;
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
    const closeModal = () => {
      if (!modal.classList.contains("open") || modal.classList.contains("closing")) return;
      modal.classList.add("closing");
      setTimeout(() => {
        modal.classList.remove("open", "closing");
        document.body.style.overflow = "";
      }, 220);
    };
    modal._close = closeModal;
    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.closest("[data-close]")) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }
})();

/* ---------- ayarları siteye uygula + ziyaretçi kaydı ---------- */
(function () {
  const A = window.ADV;
  if (!A) return;
  try {
    A.visits.log();
  } catch (e) {}

  const apply = () => {
    const s = A.settings.get();
    const ip = String(s.serverIp || "").trim();
    const ipHost = ip.split(":")[0];

    /* bağlantı butonları ve IP kopyalama */
    document.querySelectorAll('a[href^="steam://connect/"]').forEach((a) => (a.href = "steam://connect/" + ip));
    document.querySelectorAll("[data-copy]").forEach((el) => {
      const v = el.getAttribute("data-copy") || "";
      if (v.indexOf(":") > 0 || /^\d+\.\d+\.\d+\.\d+/.test(v)) el.setAttribute("data-copy", ip);
    });
    /* IP yazan tüm metinler */
    document.querySelectorAll("*").forEach((el) => {
      if (el.children.length) return;
      const t = el.textContent;
      if (!t || !/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(t)) return;
      el.textContent = t
        .replace(/connect\s+\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?/g, "connect " + ip)
        .replace(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+/g, ip)
        .replace(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g, ipHost);
    });
    document.querySelectorAll(".footer-static").forEach((el) => (el.textContent = "IP: " + ipHost));
    /* footer'da ikinci IP yerine TS3 adresi */
    document.querySelectorAll("[data-footer-ts3]").forEach((el) => (el.textContent = "TS3: " + (s.ts3 || "Advanced")));

    /* telefon */
    document.querySelectorAll('a[href^="tel:"]').forEach((a) => {
      a.href = "tel:" + (s.phoneRaw || s.phone);
      if (/^[0-9\s()+]+$/.test(a.textContent.trim())) a.textContent = s.phone;
    });
    document.querySelectorAll("*").forEach((el) => {
      if (el.children.length) return;
      if (/^0?\d{3}\s\d{3}\s\d{2}\s\d{2}$/.test(el.textContent.trim())) el.textContent = s.phone;
    });

    /* e-posta */
    document.querySelectorAll('a[href^="mailto:"]').forEach((a) => {
      a.href = "mailto:" + s.email;
      a.textContent = s.email;
    });

    /* telif yılı */
    document.querySelectorAll(".footer-bottom, .footer-copy").forEach((el) => {
      el.innerHTML = el.innerHTML.replace(/©\s*\d{4}/, "© " + s.copyrightYear);
    });

    /* logo */
    document.querySelectorAll(".brand-logo, .brand-logo--footer").forEach((img) => (img.src = s.logo));

    /* site adı */
    document.title = document.title.replace(/Advanced/g, s.siteName);
    document.querySelectorAll(".brand-word").forEach((w) => {
      if (w.children.length) return;
      w.textContent = s.siteName;
    });
  };

  /* ---- bakım modu: yönetici değilse site yerine bakım ekranı ---- */
  const isAdmin = () => {
    try {
      return localStorage.getItem("adv_session_v1") === "1";
    } catch (e) {
      return false;
    }
  };
  const fmtDate = (v) => {
    if (!v) return "";
    const d = new Date(v);
    if (isNaN(d.getTime())) return String(v).slice(0, 10);
    return d.toLocaleString("tr-TR", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };
  const fmtUntil = (v) => {
    if (!v) return "";
    const d = new Date(v);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleString("tr-TR", { day: "2-digit", month: "long", hour: "2-digit", minute: "2-digit" });
  };
  /* sayfa açılırken içerik bir an bile görünmesin */
  function earlyLock() {
    try {
      const st = A.settings.get();
      if (!document.body) return;
      if (st.maintenance && !isAdmin()) document.body.classList.add("maintenance-mode");
      const myip = (A.ip && A.ip()) || "";
      if (myip && !isAdmin() && A.bans.has(myip)) document.body.classList.add("ban-mode");
    } catch (e) {}
  }
  earlyLock();
  function applyMaintenance() {
    const st = A.settings.get();
    const old = document.getElementById("maint-screen");
    if (old) old.remove();
    document.body.classList.remove("maintenance-mode");
    if (!st.maintenance || isAdmin()) return;
    const logo = st.logo || "logo.png";
    const title = st.maintenanceTitle || "Bakımdayız";
    const text = st.maintenanceText || "Site şu anda bakımda. Kısa süre içinde yeniden yayında olacağız.";
    const until = fmtUntil(st.maintenanceUntil);
    const el = document.createElement("div");
    el.id = "maint-screen";
    el.setAttribute("id", "maint-screen");
    el.className = "maint-screen";
    el.innerHTML =
      '<div class="gate-card">' +
      '<div class="gate-head">' +
      '<img class="gate-logo" src="' + A.esc(logo) + '" alt="' + A.esc(st.siteName || "Advanced") + '" />' +
      '<span class="gate-site">' + A.esc(st.siteName || "Advanced") + "</span>" +
      "</div>" +
      '<div class="gate-body">' +
      '<span class="gate-badge"><span class="dot"></span> BAKIM MODU</span>' +
      '<h1 class="gate-title">' + A.esc(title) + "</h1>" +
      '<p class="gate-text">' + A.esc(text) + "</p>" +
      '<div class="gate-progress"><i></i></div>' +
      '<div class="gate-rows">' +
      (until ? '<div class="gate-row"><span>Tahmini dönüş</span><strong>' + A.esc(until) + "</strong></div>" : "") +
      (st.serverIp ? '<div class="gate-row"><span>Sunucu</span><strong>' + A.esc(st.serverIp) + "</strong></div>" : "") +
      (st.ts3 ? '<div class="gate-row"><span>TS3</span><strong>' + A.esc(st.ts3) + "</strong></div>" : "") +
      "</div>" +
      '<div class="gate-actions">' +
      '<a class="gate-btn" href="admin.html">' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>' +
      " Yönetici girişi</a>" +
      "</div>" +
      "</div>" +
      '<div class="gate-foot">© ' + A.esc(st.copyrightYear || "2026") + " " + A.esc(st.siteName || "Advanced") + "</div>" +
      "</div>";
    document.body.classList.add("maintenance-mode");
    document.body.appendChild(el);
    /* "Yönetici girişi": panele git, oradan siteye dönünce bakım ekranı kalkar */
    const link = el.querySelector(".maint-admin");
    if (link) {
      link.addEventListener("click", () => {
        try {
          sessionStorage.setItem("adv_from_maint", "1");
        } catch (e) {}
      });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", apply);
  else apply();
  /* kapılar DOM hazır olunca çalışır */
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => siteGate());
  else siteGate();
  window.addEventListener("storage", (e) => {
    if (e.key === "adv_settings_v1" || e.key === "adv_bans_v1") siteGate();
  });
  /* panelden "Siteyi görüntüle" ile dönüşte bakım ekranını tazele */
  try {
    if (sessionStorage.getItem("adv_from_maint")) {
      sessionStorage.removeItem("adv_from_maint");
      siteGate();
    }
  } catch (e) {}
  /* sekmeye geri dönünce durumu yeniden kontrol et */
  if (typeof window.addEventListener === "function") {
    window.addEventListener("pageshow", siteGate);
  }
  if (typeof document.addEventListener === "function") {
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) siteGate();
    });
  }
  /* ---- IP ban: banlı IP siteyi göremez, yönetici girişi banı kaldırır ---- */
  function banGate() {
    const old = document.getElementById("ban-screen");
    if (old) old.remove();
    document.querySelectorAll("#ban-screen").forEach((n) => n.remove());
    document.body.classList.remove("ban-mode");
    let ip = "";
    try {
      ip = localStorage.getItem("adv_client_ip_v1") || "";
    } catch (e) {}
    if (!ip && A.ip) ip = A.ip() || "";
    if (!ip) return;
    const ban = A.bans.get(ip);
    if (!ban) return;
    if (isAdmin()) {
      /* yönetici girişi: ban otomatik kalkar */
      A.bans.remove(ip, "Yönetici girişi");
      return;
    }
    const st = A.settings.get();
    const el = document.createElement("div");
    el.setAttribute("id", "ban-screen");
    el.className = "maint-screen ban-screen";
    el.innerHTML =
      '<div class="gate-card">' +
      '<div class="gate-head">' +
      '<img class="gate-logo" src="' + A.esc(st.logo || "logo.png") + '" alt="' + A.esc(st.siteName || "Advanced") + '" />' +
      '<span class="gate-site">' + A.esc(st.siteName || "Advanced") + "</span>" +
      "</div>" +
      '<div class="gate-body">' +
      '<span class="gate-badge gate-badge--red">' +
      '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M5.6 5.6 18.4 18.4"/></svg>' +
      " BANLANDINIZ</span>" +
      '<h1 class="gate-title">Bu adres yasaklı</h1>' +
      '<p class="gate-text">' + A.esc(ban.reason ? "Sebep: " + ban.reason : "Bu IP adresi siteye erişimden yasaklandı.") + "</p>" +
      '<div class="gate-rows">' +
      '<div class="gate-row"><span>IP adresin</span><strong>' + A.esc(ip) + "</strong></div>" +
      (ban.at ? '<div class="gate-row"><span>Ban tarihi</span><strong>' + A.esc(fmtDate(ban.at)) + "</strong></div>" : "") +
      (ban.by ? '<div class="gate-row"><span>Banlayan</span><strong>' + A.esc(ban.by) + "</strong></div>" : "") +
      "</div>" +
      '<div class="gate-actions">' +
      '<a class="gate-btn" href="admin.html">' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>' +
      " Yönetici girişi</a>" +
      "</div>" +
      '<p class="gate-note">Yönetici hesabıyla giriş yaparsan ban otomatik kaldırılır.</p>' +
      "</div>" +
      '<div class="gate-foot">© ' + A.esc(st.copyrightYear || "2026") + " " + A.esc(st.siteName || "Advanced") + "</div>" +
      "</div>";
    document.body.classList.add("ban-mode");
    document.body.appendChild(el);
  }
  function siteGate() {
    applyMaintenance();
    banGate();
  }
  if (typeof window.addEventListener === "function") {
    window.addEventListener("adv:myip", () => siteGate());
  }
  window.ADVBanGate = banGate;
  window.ADVSiteGate = siteGate;
})();

/* ---------- Redül: site renk düzeni ---------- */
(function () {
  const A = window.ADV;
  if (!A || !A.color) return;

  const hexRgb = (hex) => {
    const h = String(hex || "").replace("#", "");
    if (h.length !== 6) return null;
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  };
  const mix = (a, b, r) => {
    const A1 = hexRgb(a), B1 = hexRgb(b);
    if (!A1 || !B1) return a;
    const m = (i) => Math.round(A1[i] + (B1[i] - A1[i]) * r);
    return "#" + [m(0), m(1), m(2)].map((n) => n.toString(16).padStart(2, "0")).join("");
  };
  const rgba = (hex, alpha) => {
    const c = hexRgb(hex);
    return c ? "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + alpha + ")" : hex;
  };
  const dark = (hex, r) => mix(hex, "#000000", r == null ? 0.22 : r);
  const light = (hex, r) => mix(hex, "#ffffff", r == null ? 0.35 : r);

  /* açık temada ana renk okunur kalsın: parlak renkleri koyulaştır */
  const readableOnLight = (hex) => {
    const c = hexRgb(hex);
    if (!c) return hex;
    const lum = (0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]) / 255;
    return lum > 0.62 ? dark(hex, 0.42) : hex;
  };

  function apply() {
    const cfg = A.color.get();
    const root = document.documentElement;
    const isLight = root.getAttribute("data-theme") === "light";

    let brand = cfg.brand || "#8fe61a";
    if (isLight) brand = readableOnLight(brand);
    const accent2 = cfg.mode === "dual" ? (cfg.accent2 || "#4fa8ff") : "";
    const grade = accent2 ? "linear-gradient(135deg," + brand + "," + accent2 + ")" : "linear-gradient(135deg," + brand + "," + light(brand, 0.2) + ")";

    root.style.setProperty("--brand", brand);
    root.style.setProperty("--brand-strong", dark(brand, 0.24));
    root.style.setProperty("--brand-wash", rgba(brand, 0.12));
    root.style.setProperty("--brand-wash-soft", rgba(brand, 0.06));
    root.style.setProperty("--brand-line", rgba(brand, 0.35));
    root.style.setProperty("--accent-2", accent2 || brand);
    root.style.setProperty("--brand-gradient", grade);
    /* arka plan renkleri */
    try {
      const bgc = A.bg ? A.bg.get() : {};
      const map = { bg: "--bg", surface: "--surface", surface2: "--surface-2", line: "--line", ink: "--ink", muted: "--muted" };
      Object.keys(map).forEach((k) => {
        if (bgc[k]) root.style.setProperty(map[k], bgc[k]);
        else root.style.removeProperty(map[k]);
      });
      /* türetilen tonlar: yüzey-3 ve güçlü çizgi */
      if (bgc.surface) root.style.setProperty("--surface-3", mix(bgc.surface, "#ffffff", 0.06));
      else root.style.removeProperty("--surface-3");
      if (bgc.line) root.style.setProperty("--line-strong", mix(bgc.line, "#ffffff", 0.16));
      else root.style.removeProperty("--line-strong");
      root.setAttribute("data-bg-custom", Object.keys(bgc).some((k) => !!bgc[k]) ? "1" : "0");
      if (!Object.keys(bgc).some((k) => !!bgc[k])) root.removeAttribute("data-bg-custom");
    } catch (e) {}
    root.setAttribute("data-color-mode", cfg.mode);
    if (accent2) root.setAttribute("data-color-dual", "1");
    else root.removeAttribute("data-color-dual");
  }

  window.ADVColor = { apply };
  apply();

  /* tema değişince yeniden hesapla */
  document.addEventListener("click", (e) => {
    if (e.target.closest && e.target.closest(".theme-toggle")) setTimeout(apply, 0);
  });
  /* panelden kaydedilince bu sekmede ve diğer sekmelerde güncelle */
  window.addEventListener("storage", (e) => {
    if (e.key && e.key.indexOf("adv_settings") === 0) apply();
  });
  window.addEventListener("adv:colors", apply);
})();

/* ---------- Metül: yazı tipi / renk / boyut ---------- */
(function () {
  const A = window.ADV;
  if (!A || !A.text) return;

  const PRESETS = {
    varsayilan: "",
    grotesk: "'Poppins',system-ui,-apple-system,'Segoe UI',sans-serif",
    inter: "'Inter',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif",
    serif: "Georgia,'Times New Roman',Times,serif",
    mono: "ui-monospace,'Cascadia Mono',Consolas,monospace",
    system: "system-ui,-apple-system,'Segoe UI',Roboto,sans-serif",
  };
  let loadedFont = "";

  function loadFontLink(url){
    if (!url || !/^https:\/\/fonts\.googleapis\.com\//.test(url)) return;
    if (loadedFont === url) return;
    loadedFont = url;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = url;
    document.head.appendChild(l);
  }
  function family(cfg){
    const custom = String(cfg.customFont || "").trim();
    if (custom) {
      if (/^https?:\/\//.test(custom)) {
        const m = custom.match(/family=([^:&]+)/);
        return m ? "'" + m[1].replace(/\+/g, " ") + "',system-ui,sans-serif" : "";
      }
      return "'" + custom.replace(/'/g, "") + "',system-ui,sans-serif";
    }
    return PRESETS[cfg.font] || "";
  }

  function apply(){
    const cfg = A.text.get();
    const root = document.documentElement;
    const fam = family(cfg);
    loadFontLink(String(cfg.customFont || "").trim());
    if (fam) root.style.setProperty("--sans", fam);
    else root.style.removeProperty("--sans");
    root.style.setProperty("--text-scale", String(cfg.scale / 100));
    root.style.setProperty("--text-weight", String(cfg.weight));
    root.style.setProperty("--text-line", String(cfg.line));
    if (cfg.ink) root.style.setProperty("--ink", cfg.ink);
    if (cfg.muted) root.style.setProperty("--muted", cfg.muted);
    root.setAttribute("data-font-scale", String(cfg.scale));
  }

  window.ADVText = { apply };
  apply();

  window.addEventListener("storage", (e) => {
    if (e.key && e.key.indexOf("adv_settings") === 0) { apply(); if (window.ADVColor) window.ADVColor.apply(); }
  });
  window.addEventListener("adv:text", apply);
})();
