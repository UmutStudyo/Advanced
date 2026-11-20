/* =========================================================
   AVALANCHE — ortak veri & yardımcılar
   (Yönetici panelindeki değişiklikler burada saklanır)
   ========================================================= */
window.ADV = (function () {
  const KEYS = {
    notices: "adv_notices_v1",
    gallery: "adv_gallery_v1",
    products: "adv_products_v1",
    session: "adv_session_v1",
    messages: "adv_messages_v1",
    settings: "adv_settings_v1",
    visits: "adv_visits_v1",
    logins: "adv_logins_v1",
    productHistory: "adv_product_history_v1",
    accounts: "adv_accounts_v1",
    team: "adv_team_v1",
    permissions: "adv_permissions_v1",
    bans: "adv_bans_v1",
    banHistory: "adv_ban_history_v1",
    sss: "adv_sss_v1",
  };

  const ADMIN = { email: "admin@gmail.com", pass: "umut!7676!67", name: "Admin" };

  /* ---- site ayarları (Ayarlar sekmesinden düzenlenebilir) ---- */
  const SETTINGS = {
    siteName: "Avalanche",
    domain: "www.advclan.com",
    copyrightYear: "2026",
    phone: "0535 241 76 22",
    phoneRaw: "+905352417622",
    email: "admin@gmail.com",
    serverIp: "95.173.173.124:27015",
    ts3: "Avalanche",
    logo: "logo.png",
    instagram: "https://instagram.com/advclan",
    youtube: "https://youtube.com/@rweqewnickz",
    maintenance: false,
    maintenanceTitle: "Bakımdayız",
    maintenanceText: "Site şu anda bakımda. Kısa süre içinde yeniden yayında olacağız.",
    maintenanceUntil: "",
  };

  const DEFAULTS = {
    sss: [
      {
        id: 1,
        q: "Sunucuya nasıl bağlanırım?",
        a: "CS 1.6'yı aç, konsolu aç ve connect 95.173.173.124:27015 yaz. Ya da sitedeki Sunucuya Bağlan düğmesine bas; Steam otomatik bağlanır.",
        active: true,
        pinned: true,
        at: "2026-08-02T10:00:00.000Z",
      },
      {
        id: 2,
        q: "VIP paketi ne işe yarar, ne zamana kadar aktif?",
        a: "VIP; özel model, renkli isim, öncelikli giriş ve ekstra komutlar açar. Satın alma onaylandığı anda aktifleşir ve seçtiğin süre boyunca (30/90/180 gün) geçerli olur.",
        active: true,
        pinned: true,
        at: "2026-08-02T10:05:00.000Z",
      },
      {
        id: 3,
        q: "Ban yedim, itiraz edebilir miyim?",
        a: "Evet. İletişim sayfasından nick, ban tarihi ve sebebi yazarak başvurabilirsin. Yetkililer kaydı inceler; haksız ban 24 saat içinde kaldırılır.",
        active: true,
        pinned: false,
        at: "2026-08-02T10:10:00.000Z",
      },
      {
        id: 4,
        q: "Jailbreak modu nasıl oynanır?",
        a: "Her turda bir mahkûm rastgele Jailer (gardiyan) olur. Jailer kuralları belirler, mahkûmlar bu kurallara uyar. Son mahkûm kalan oyunu kazanır; kurallara uymayan gardiyan cezalandırılır.",
        active: true,
        pinned: false,
        at: "2026-08-02T10:15:00.000Z",
      },
      {
        id: 5,
        q: "Yetkili nasıl olabilirim?",
        a: "Yetkili alımları dönem dönem duyurularda açılır. Sunucuda en az 30 saat geçirmiş, kural ihlali bulunmayan ve 18 yaşını doldurmuş oyuncular başvurabilir.",
        active: true,
        pinned: false,
        at: "2026-08-02T10:20:00.000Z",
      },
      {
        id: 6,
        q: "Satın alma işlemi güvenli mi?",
        a: "Ödemeler resmi kanallardan alınır ve teslimat yönetici tarafından elle onaylanır. E-posta, şifre veya Steam giriş bilgilerin hiçbir zaman istenmez.",
        active: true,
        pinned: false,
        at: "2026-08-02T10:25:00.000Z",
      },
    ],
    notices: [
      {
        id: 1,
        title: "Sitemiz Yayın Hayatına Başladı!",
        author: "admin",
        date: "2026-08-02",
        summary:
          "Avalanche web sitesi yayında! Artık ürünlerimiz olan VIP, VIP+, Cephane ve Skin paketlerini satın aldığınız anda aktif olacaktır. Diğer duyurularımız için takipte kalın.",
        body:
          "Avalanche web sitesi yayında!\n\nArtık ürünlerimiz olan VIP, VIP+, Cephane ve Skin paketlerini satın aldığınız anda aktif olacaktır.\n\nDiğer duyurularımız için takipte kalın.",
      },
      {
        id: 2,
        title: "Jailbreak Map Rotasyonu ve Etkinlik Takvimi",
        author: "admin",
        date: "2026-09-14",
        summary:
          "Jailbreak map havuzu güncellendi, hafta sonu isyan etkinlikleri eklendi. Yeni haritalar ve ödüllü etkinlikler hakkında tüm detaylar duyuruda.",
        body:
          "Sunucumuzun Jailbreak harita havuzu güncellendi.\n\n• 4 yeni JB haritası rotasyona eklendi\n• Hafta sonu 21:00'de ödüllü etkinlikler\n• VIP+ üyelerimize etkinliklerde öncelik\n\nİyi oyunlar dileriz.",
      },
      {
        id: 3,
        title: "Yetkili Alımları Açıldı",
        author: "admin",
        date: "2026-10-05",
        summary:
          "Sunucumuzda yetkili alımları başladı. Kurallara uyan, aktif ve ekip çalışmasına yatkın oyuncuları aramızda görmek istiyoruz.",
        body:
          "Sunucumuzda yetkili alımları başladı.\n\nAradığımız kriterler:\n• 16 yaş ve üzeri\n• Günde en az 2 saat aktiflik\n• Temiz ban geçmişi\n• TS3 kullanımı\n\nBaşvurular için iletişim bölümünden bize ulaşabilirsiniz.",
      },
    ],
    gallery: [
      { id: 1, src: "g1.jpg", title: "Hücre Bloğu", tag: "jb_avalanche_prison" },
      { id: 2, src: "g2.jpg", title: "Mahkum İsyanı", tag: "isyan" },
      { id: 3, src: "g3.jpg", title: "VIP Etkinliği", tag: "etkinlik" },
      { id: 4, src: "g4.jpg", title: "LR Raundu", tag: "last request" },
      { id: 5, src: "g5.jpg", title: "Gardiyan Ekibi", tag: "gardiyan" },
    ],
    products: [
      {
        id: 1,
        name: "VIP Üyelik",
        tag: "VIP",
        price: "120",
        period: "/ 1 ay",
        desc: "Özel silah menüsü, VIP tagı, fazladan komut hakkı ve özel modeller.",
        features: ["VIP menüsü (silah, skin, bıçak)", "Özel mahkum modeli", "Chatte VIP tagı", "Her turda ekstra can"],
        featured: false,
      },
      {
        id: 2,
        name: "VIP+ Üyelik",
        tag: "ÖNERİLEN",
        price: "360",
        period: "/ 1 ay",
        desc: "VIP'nin tüm ayrıcalıkları + trail, aksesuar ve ekstra item menüleri.",
        features: ["Tüm VIP ayrıcalıkları", "Trail & aksesuar menüsü", "Ekstra Kumandalı Araba +1", "Ekstra Panzehir +1"],
        featured: true,
      },
      {
        id: 3,
        name: "Elit Admin",
        tag: "YÖNETİCİ",
        price: "250",
        period: "/ 1 ay",
        desc: "Sunucuda ban, kick, harita değiştirme gibi sıradan yetkiler.",
        features: ["Ban ve kick yetkisi", "Harita değiştirme", "Lazer silme", "Mod açma / dokunulmazlık yok"],
        featured: false,
      },
      {
        id: 4,
        name: "Genişletilmiş Skin Paketi",
        tag: "SKİN",
        price: "200",
        period: "/ 1 ay",
        desc: "Genişletilmiş özel model ve silah skin havuzuna erişim.",
        features: ["Genişletilmiş skin havuzu", "Özel model erişimi", "Sınırsız skin değişimi", "1 ay geçerli"],
        featured: false,
      },
    ],
    messages: [],
    productHistory: [],
    team: [
      { id: 1, name: "xPantik", role: "Kurucu / Developer", note: "Sunucu sahibi ve site geliştiricisi (Umut).", rank: "OWNER", pinned: false },
      { id: 2, name: "Süper Yetkili", role: "Süper Yetkili", note: "Yetkili alımı, ban onayı ve ekip denetimi bu kademede yürütülür.", rank: "SUPER", pinned: false },
      { id: 3, name: "Admin Ekibi", role: "Admin", note: "Ban, kick, harita değişimi ve kural ihlallerinde ilk müdahale.", rank: "ADMIN", pinned: false },
      { id: 4, name: "Moderatörler", role: "Moderatör", note: "Mikrofon/chat denetimi, susturma ve oyuncu yönlendirmesi.", rank: "MOD", pinned: false },
    ],
  };

  /* ---- yönetici izinleri (rol bazlı varsayılanlar) ---- */
  const PERMS = [
    { key: "dashboard", label: "Dashboard görüntüleme", group: "Genel" },
    { key: "notices.view", label: "Duyuruları görme", group: "Duyurular" },
    { key: "notices.add", label: "Duyuru ekleme", group: "Duyurular" },
    { key: "notices.edit", label: "Duyuru düzenleme", group: "Duyurular" },
    { key: "notices.delete", label: "Duyuru silme", group: "Duyurular" },
    { key: "notices.pin", label: "Duyuru sabitleme", group: "Duyurular" },
    { key: "gallery.view", label: "Galeriyi görme", group: "Galeri" },
    { key: "gallery.add", label: "Galeriye ekleme", group: "Galeri" },
    { key: "gallery.edit", label: "Galeri düzenleme", group: "Galeri" },
    { key: "gallery.delete", label: "Galeri silme", group: "Galeri" },
    { key: "gallery.pin", label: "Galeri sabitleme", group: "Galeri" },
    { key: "products.view", label: "Ürünleri görme", group: "Fiyatlandırma" },
    { key: "products.add", label: "Ürün ekleme", group: "Fiyatlandırma" },
    { key: "products.edit", label: "Ürün düzenleme", group: "Fiyatlandırma" },
    { key: "products.delete", label: "Ürün silme", group: "Fiyatlandırma" },
    { key: "products.pin", label: "Ürün sabitleme", group: "Fiyatlandırma" },
    { key: "messages.view", label: "Mesajları görme", group: "Mesajlar" },
    { key: "messages.delete", label: "Mesaj silme", group: "Mesajlar" },
    { key: "team.view", label: "Kadroyu görme", group: "Kadro" },
    { key: "team.add", label: "Kadroya üye ekleme", group: "Kadro" },
    { key: "team.edit", label: "Kadro üyesi düzenleme", group: "Kadro" },
    { key: "team.delete", label: "Kadro üyesi silme", group: "Kadro" },
    { key: "accounts.view", label: "Başka hesapları görme", group: "Yönetici hesapları" },
    { key: "accounts.add", label: "Yeni hesap ekleme", group: "Yönetici hesapları" },
    { key: "accounts.edit", label: "Başka hesabı düzenleme", group: "Yönetici hesapları" },
    { key: "accounts.delete", label: "Başka hesabı silme", group: "Yönetici hesapları" },
    { key: "accounts.perms", label: "İzinleri değiştirme", group: "Yönetici hesapları" },
    { key: "settings.view", label: "Ayarları görme", group: "Ayarlar" },
    { key: "settings.edit", label: "Ayarları değiştirme", group: "Ayarlar" },
    { key: "module.view", label: "Modülü görme", group: "Modül" },
    { key: "module.maintenance", label: "Bakım modunu açma/kapatma", group: "Modül" },
    { key: "module.edit", label: "Bakım yazısını düzenleme", group: "Modül" },
    { key: "redul.view", label: "Redül sekmesini görme", group: "Redül" },
    { key: "redul.edit", label: "Site renklerini değiştirme", group: "Redül" },
    { key: "metul.view", label: "Metül sekmesini görme", group: "Metül" },
    { key: "metul.edit", label: "Yazı tipi/rengi/boyutu değiştirme", group: "Metül" },
    { key: "kayitlar.view", label: "Kayıtları (yönetici/ziyaretçi) görme", group: "Kayıtlar" },
    { key: "kayitlar.clear", label: "Kayıtları temizleme", group: "Kayıtlar" },
    { key: "sss.view", label: "S.S.S sayfasını görme", group: "S.S.S" },
    { key: "sss.edit", label: "Soru/yanıt ekleme ve düzenleme", group: "S.S.S" },
    { key: "sss.delete", label: "Soru silme", group: "S.S.S" },
    { key: "banip.view", label: "Ban listesini görme", group: "BanIP" },
    { key: "banip.add", label: "IP ban atma", group: "BanIP" },
    { key: "banip.remove", label: "Ban kaldırma", group: "BanIP" },
    { key: "banip.history", label: "Ban geçmişini görme", group: "BanIP" },
  ];
  const ROLE_PERMS = {
    OWNER: PERMS.map((p) => p.key),
    ADMIN: [
      "dashboard",
      "notices.view", "notices.add", "notices.edit", "notices.pin",
      "gallery.view", "gallery.add", "gallery.edit", "gallery.pin",
      "products.view", "products.add", "products.edit", "products.pin",
      "messages.view", "team.view", "settings.view",
      "module.view", "redul.view", "redul.edit", "metul.view", "banip.view", "sss.view", "sss.edit", "kayitlar.view",
    ],
    MOD: ["dashboard", "notices.view", "messages.view", "team.view"],
  };

  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return JSON.parse(JSON.stringify(fallback));
      const val = JSON.parse(raw);
      return val == null ? JSON.parse(JSON.stringify(fallback)) : val;
    } catch (e) {
      return JSON.parse(JSON.stringify(fallback));
    }
  }
  const SUPABASE_URL = "https://kaudarlbjfzfvcbvlwgx.supabase.co";
  const SUPABASE_KEY = "sb_publishable_glNiELbpR-5-mqoKbfTlNA_Qb8AmU_C";
  const SHARED_KEYS = Object.keys(KEYS).filter((name) => !["session", "visits", "logins"].includes(name));
  let remoteReady = false;
  let remoteTimer = null;

  function normalizeGalleryList(value) {
    if (!Array.isArray(value)) return value;
    return value.map((item) => {
      if (!item || typeof item !== "object" || typeof item.src !== "string") return item;
      return Object.assign({}, item, { src: item.src.replace(/^(?:\.\/|\/)?assets\//, "") });
    });
  }
  function isSharedKey(key) { return SHARED_KEYS.some((name) => KEYS[name] === key); }
  function jsonEqual(a, b) {
    try { return JSON.stringify(a) === JSON.stringify(b); } catch (e) { return false; }
  }
  function cloudHeaders(extra) {
    return Object.assign({
      apikey: SUPABASE_KEY,
      Authorization: "Bearer " + SUPABASE_KEY,
      "Content-Type": "application/json",
    }, extra || {});
  }
  async function cloudPut(key, value) {
    if (!isSharedKey(key)) return;
    try {
      await fetch(SUPABASE_URL + "/rest/v1/site_state", {
        method: "POST",
        headers: cloudHeaders({ Prefer: "resolution=merge-duplicates,return=minimal" }),
        body: JSON.stringify([{ key: key, value: value }]),
      });
    } catch (e) {}
  }
  async function cloudPull(announce) {
    try {
      const res = await fetch(SUPABASE_URL + "/rest/v1/site_state?select=key,value", { headers: cloudHeaders() });
      if (!res.ok) return;
      const rows = await res.json();
      if (!rows.length && /admin/i.test(location.pathname)) {
        for (const name of SHARED_KEYS) {
          const local = localStorage.getItem(KEYS[name]);
          if (local) { try { await cloudPut(KEYS[name], JSON.parse(local)); } catch (e) {} }
        }
        return;
      }
      let changed = false;
      rows.forEach((row) => {
        if (!row || !isSharedKey(row.key)) return;
        const value = row.key === KEYS.gallery ? normalizeGalleryList(row.value) : row.value;
        const oldRaw = localStorage.getItem(row.key);
        if (oldRaw !== JSON.stringify(value)) changed = true;
        try { localStorage.setItem(row.key, JSON.stringify(value)); } catch (e) {}
      });
      if (changed && announce) document.dispatchEvent(new CustomEvent("adv:remote-update"));
      if (!remoteReady) {
        remoteReady = true;
        if (changed) document.dispatchEvent(new CustomEvent("adv:remote-ready"));
      }
    } catch (e) {}
  }
  function startCloudSync() {
    cloudPull(true);
    clearInterval(remoteTimer);
    remoteTimer = setInterval(() => cloudPull(true), 5000);
  }
  function write(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
    if (isSharedKey(key)) cloudPut(key, val);
  }

  const startOf = (kind) => {
    const d = new Date();
    if (kind === "day") d.setHours(0, 0, 0, 0);
    if (kind === "week") {
      const day = (d.getDay() + 6) % 7; // pazartesi başlangıç
      d.setDate(d.getDate() - day);
      d.setHours(0, 0, 0, 0);
    }
    if (kind === "month") {
      d.setDate(1);
      d.setHours(0, 0, 0, 0);
    }
    return d.getTime();
  };
  const countSince = (list, kind) => list.filter((t) => new Date(t.at || t).getTime() >= startOf(kind)).length;

  const api = {
    ADMIN,
    KEYS,
    SETTINGS,
    settings: {
      get: () => {
        const current = Object.assign({}, SETTINGS, read(KEYS.settings, {}));
        if (current.siteName === ["Ad", "vanced"].join("")) current.siteName = "Avalanche";
        if (current.ts3 === ["Ad", "vanced"].join("")) current.ts3 = "Avalanche";
        return current;
      },
      save: (obj) => write(KEYS.settings, obj),
    },
    /* ---- sık sorulan sorular ---- */
    sss: {
      all: () => read(KEYS.sss, DEFAULTS.sss),
      published: () => read(KEYS.sss, DEFAULTS.sss).filter((x) => x.active !== false),
      save: (list) => write(KEYS.sss, list),
      add: (item) => {
        const list = read(KEYS.sss, DEFAULTS.sss);
        const rec = Object.assign(
          { id: Date.now(), q: "", a: "", active: true, pinned: false, at: new Date().toISOString() },
          item
        );
        list.push(rec);
        write(KEYS.sss, list);
        return rec;
      },
      update: (id, patch) => {
        const list = read(KEYS.sss, DEFAULTS.sss).map((x) => (x.id === id ? Object.assign({}, x, patch) : x));
        write(KEYS.sss, list);
      },
      remove: (id) => write(KEYS.sss, read(KEYS.sss, DEFAULTS.sss).filter((x) => x.id !== id)),
      move: (id, dir) => {
        const list = read(KEYS.sss, DEFAULTS.sss);
        const i = list.findIndex((x) => x.id === id);
        const j = i + dir;
        if (i < 0 || j < 0 || j >= list.length) return;
        const tmp = list[i];
        list[i] = list[j];
        list[j] = tmp;
        write(KEYS.sss, list);
      },
    },
    /* ---- renk düzeni (Redül) ---- */
    color: {
      get: () => {
        const st = api.settings.get();
        const brand = /^#[0-9a-fA-F]{6}$/.test(st.colorBrand || "") ? st.colorBrand : "#8fe61a";
        const accent2 = /^#[0-9a-fA-F]{6}$/.test(st.colorAccent2 || "") ? st.colorAccent2 : "";
        const mode = ["single", "accent", "dual"].includes(st.colorMode) ? st.colorMode : "single";
        return { mode, brand, accent2: mode === "dual" ? (accent2 || "#4fa8ff") : "" };
      },
      set: (cfg) => api.settings.save({
        colorMode: cfg.mode || "single",
        colorBrand: cfg.brand || "#8fe61a",
        colorAccent2: cfg.accent2 || "",
      }),
      reset: () => api.settings.save({ colorMode: "single", colorBrand: "#8fe61a", colorAccent2: "" }),
    },
    /* ---- arka plan (Redül) ---- */
    bg: {
      KEYS: ["bg", "surface", "surface2", "line", "ink", "muted"],
      get: () => {
        const st = api.settings.get();
        const out = {};
        api.bg.KEYS.forEach((k) => {
          const v = st["color" + k.charAt(0).toUpperCase() + k.slice(1)];
          out[k] = /^#[0-9a-fA-F]{6}$/.test(v || "") ? v : "";
        });
        return out;
      },
      set: (obj) => {
        const patch = {};
        api.bg.KEYS.forEach((k) => {
          const key = "color" + k.charAt(0).toUpperCase() + k.slice(1);
          const v = obj[k];
          patch[key] = /^#[0-9a-fA-F]{6}$/.test(v || "") ? v : "";
        });
        api.settings.save(Object.assign({}, api.settings.get(), patch));
      },
      reset: () => {
        const patch = {};
        api.bg.KEYS.forEach((k) => { patch["color" + k.charAt(0).toUpperCase() + k.slice(1)] = ""; });
        api.settings.save(Object.assign({}, api.settings.get(), patch));
      },
    },
    /* ---- metin (Metül) ---- */
    text: {
      get: () => {
        const st = api.settings.get();
        const font = String(st.fontFamily || "varsayilan");
        const num = (v, d, min, max) => {
          const n = Number(v);
          return Number.isFinite(n) && n >= min && n <= max ? n : d;
        };
        return {
          font: font || "varsayilan",
          customFont: String(st.fontCustom || ""),
          ink: /^#[0-9a-fA-F]{6}$/.test(st.textInk || "") ? st.textInk : "",
          muted: /^#[0-9a-fA-F]{6}$/.test(st.textMuted || "") ? st.textMuted : "",
          scale: num(st.textScale, 100, 85, 125),
          weight: num(st.textWeight, 400, 300, 700),
          line: num(st.textLine, 1.6, 1.3, 2),
        };
      },
      set: (cfg) => api.settings.save({
        fontFamily: cfg.font || "varsayilan",
        fontCustom: cfg.customFont || "",
        textInk: cfg.ink || "",
        textMuted: cfg.muted || "",
        textScale: cfg.scale || 100,
        textWeight: cfg.weight || 400,
        textLine: cfg.line || 1.6,
      }),
      reset: () => api.settings.save({
        fontFamily: "varsayilan", fontCustom: "", textInk: "", textMuted: "",
        textScale: 100, textWeight: 400, textLine: 1.6,
      }),
    },
    /* ziyaretçi takibi: sayfa açılışında bir kez kaydedilir */
    visits: {
      log: () => {
        const list = read(KEYS.visits, []);
        const loc = (typeof location !== "undefined" && location) || {};
        const ua = (typeof navigator !== "undefined" && navigator && navigator.userAgent) || "";
        const device = /Mobile|Android|iPhone|iPod/i.test(ua) ? "Mobil" : /iPad|Tablet/i.test(ua) ? "Tablet" : "Masaüstü";
        list.push({
          at: new Date().toISOString(),
          page: String(loc.pathname || "/").split("/").pop() || "index.html",
          device,
          ip: (api.ip && api.ip()) || "",
        });
        write(KEYS.visits, list.slice(-5000));
      },
      all: () => read(KEYS.visits, []),
      stats: () => {
        const list = read(KEYS.visits, []);
        const seconds = list.reduce((a, v) => a + (v.sec || 45), 0);
        const avgMin = list.length ? Math.round(seconds / list.length / 60 * 10) / 10 : 0;
        return {
          total: list.length,
          month: countSince(list, "month"),
          week: countSince(list, "week"),
          day: countSince(list, "day"),
          avgMinutes: avgMin,
          avgLabel: avgMin >= 60 ? Math.round(avgMin / 60 * 10) / 10 + " saat" : avgMin + " dk",
        };
      },
    },
    /* admin giriş kayıtları */
    logins: {
      log: function (acc) {
        const list = read(KEYS.logins, []);
        const a = acc || {};
        const ua = (typeof navigator !== "undefined" && navigator && navigator.userAgent) || "";
        list.push({
          at: new Date().toISOString(),
          user: a.email || ADMIN.email,
          name: a.name || "Kurucu",
          role: a.role || "OWNER",
          ip: (api.ip && api.ip()) || "",
          device: /Mobile|Android|iPhone/i.test(ua) ? "Mobil" : "Masaüstü",
        });
        write(KEYS.logins, list.slice(-5000));
      },
      all: () => read(KEYS.logins, []),
      stats: () => {
        const list = read(KEYS.logins, []);
        return {
          total: list.length,
          month: countSince(list, "month"),
          week: countSince(list, "week"),
          day: countSince(list, "day"),
          last: list.length ? list[list.length - 1].at : null,
        };
      },
    },
    /* ---- kayıt temizleme ---- */
    clearVisits: () => write(KEYS.visits, []),
    clearLogins: () => write(KEYS.logins, []),
    PERMS,
    ROLE_PERMS,
    /* izinler: rol varsayılanı + hesap bazlı özel izinler */
    permissions: {
      all: () => read(KEYS.permissions, {}),
      save: (obj) => write(KEYS.permissions, obj),
      of: (acc) => {
        if (acc && String(acc.email || "").toLowerCase() === ADMIN.email) return PERMS.map((p) => p.key);
        const migrate = (list) => {
          const MAP = {
            dashboard: ["dashboard"],
            notices: ["notices.view", "notices.add", "notices.edit", "notices.delete", "notices.pin"],
            gallery: ["gallery.view", "gallery.add", "gallery.edit", "gallery.delete", "gallery.pin"],
            products: ["products.view", "products.add", "products.edit", "products.delete", "products.pin"],
            messages: ["messages.view", "messages.delete"],
            team: ["team.view", "team.add", "team.edit", "team.delete"],
            accounts: ["accounts.view", "accounts.add", "accounts.edit", "accounts.delete", "accounts.perms"],
            settings: ["settings.view", "settings.edit"],
          };
          const out = [];
          (list || []).forEach((k) => {
            (MAP[k] || [k]).forEach((x) => {
              if (!out.includes(x)) out.push(x);
            });
          });
          return out;
        };
        const custom = read(KEYS.permissions, {})[acc && acc.email ? acc.email : ""];
        if (custom && Array.isArray(custom)) return migrate(custom);
        return migrate((ROLE_PERMS[acc && acc.role] || ROLE_PERMS.ADMIN).slice());
      },
      set: (email, list) => {
        if (String(email || "").toLowerCase() === ADMIN.email) return;
        const obj = read(KEYS.permissions, {});
        obj[email] = list;
        write(KEYS.permissions, obj);
      },
    },
    team: {
      all: () => read(KEYS.team, DEFAULTS.team),
      save: (list) => write(KEYS.team, list),
    },
    /* ---- ziyaretçinin IP'si (localStorage tabanlı demo) ---- */
    ip: () => {
      /* ziyaretçinin kendi IP'si (bir kez belirlenir ve sabit kalır) */
      let ip = "";
      try {
        ip = localStorage.getItem("adv_client_ip_v1") || "";
      } catch (e) {}
      return ip;
    },
    setMyIp: (value) => {
      const ip = String(value || "").trim();
      if (!api.validIP(ip)) return { ok: false, error: "Geçersiz IP adresi" };
      try {
        localStorage.setItem("adv_client_ip_v1", ip);
      } catch (e) {
        return { ok: false, error: "Tarayıcıya yazılamadı" };
      }
      try {
        if (typeof window.dispatchEvent === "function" && typeof CustomEvent === "function") {
          window.dispatchEvent(new CustomEvent("adv:myip", { detail: ip }));
        }
      } catch (e) {}
      return { ok: true, ip };
    },
    validIP: (value) => {
      const m = String(value || "").trim().match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
      return !!m && m.slice(1).every((n) => Number(n) >= 0 && Number(n) <= 255);
    },
    /* ---- IP ban ---- */
    bans: {
      all: () => read(KEYS.bans, []),
      save: (list) => write(KEYS.bans, list),
      has: (ip) => read(KEYS.bans, []).some((b) => b.ip === ip),
      get: (ip) => read(KEYS.bans, []).find((b) => b.ip === ip) || null,
      add: (ban) => {
        const list = read(KEYS.bans, []);
        const ip = String(ban.ip || "").trim();
        if (!ip) return { ok: false, error: "IP adresi boş" };
        const m = ip.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
        if (!m || !m.slice(1).every((n) => Number(n) >= 0 && Number(n) <= 255)) return { ok: false, error: "Geçersiz IP adresi" };
        if (list.some((b) => b.ip === ip)) return { ok: false, error: "Bu IP zaten banlı" };
        const rec = Object.assign(
          { id: Date.now(), ip, reason: "", note: "", by: "", at: new Date().toISOString(), agent: navigator.userAgent || "" },
          ban,
          { ip }
        );
        list.unshift(rec);
        write(KEYS.bans, list);
        api.banHistory.add({ ip, action: "ban", reason: rec.reason, note: rec.note, by: rec.by });
        return { ok: true, ban: rec };
      },
      remove: (ip, by) => {
        const list = read(KEYS.bans, []);
        const found = list.find((b) => b.ip === ip);
        if (!found) return { ok: false, error: "Ban bulunamadı" };
        write(KEYS.bans, list.filter((b) => b.ip !== ip));
        api.banHistory.add({ ip, action: "unban", reason: found.reason, note: found.note, by: by || "" });
        return { ok: true };
      },
    },
    banHistory: {
      all: () => read(KEYS.banHistory, []),
      add: (rec) => {
        const list = read(KEYS.banHistory, []);
        list.unshift(Object.assign({ at: new Date().toISOString() }, rec));
        write(KEYS.banHistory, list.slice(0, 250));
      },
    },
    productHistory: {
      all: () => read(KEYS.productHistory, []),
      add: (snap, action) => {
        const list = read(KEYS.productHistory, []);
        list.unshift({ at: new Date().toISOString(), action: action || "güncellendi", snapshot: snap });
        write(KEYS.productHistory, list.slice(0, 250));
      },
    },
    /* sıralama: sabitlenenler önce, sonra tarih */
    sortPinned: (list, dateField) =>
      list.slice().sort((a, b) => {
        const pa = a.pinned ? 1 : 0;
        const pb = b.pinned ? 1 : 0;
        if (pa !== pb) return pb - pa;
        const va = String(a[dateField || "date"] || "");
        const vb = String(b[dateField || "date"] || "");
        return va < vb ? 1 : va > vb ? -1 : 0;
      }),
    /* eski kayıtlara pinned alanı ekler */
    ensurePinned: (list) => list.map((x) => (x.pinned === undefined ? { ...x, pinned: false } : x)),
    notices: {
      all: () => read(KEYS.notices, DEFAULTS.notices),
      save: (list) => write(KEYS.notices, list),
    },
    gallery: {
      all: () => normalizeGalleryList(read(KEYS.gallery, DEFAULTS.gallery)),
      save: (list) => write(KEYS.gallery, normalizeGalleryList(list)),
    },
    products: {
      all: () => read(KEYS.products, DEFAULTS.products),
      save: (list) => write(KEYS.products, list),
    },
    messages: {
      all: () => read(KEYS.messages, DEFAULTS.messages),
      save: (list) => write(KEYS.messages, list),
      add: (m) => {
        const list = read(KEYS.messages, []);
        list.unshift(Object.assign({ ip: "", location: "", agent: navigator.userAgent || "", at: new Date().toISOString() }, m));
        write(KEYS.messages, list);
      },
    },
    /* ---- yönetici hesapları ---- */
    accounts: {
      all: () => {
        const list = read(KEYS.accounts, []);
        if (!list.length) {
          const base = [{ id: 1, name: "Admin", email: ADMIN.email, pass: ADMIN.pass, role: "OWNER", at: new Date().toISOString() }];
          write(KEYS.accounts, base);
          return base;
        }
        return list;
      },
      save: (list) => write(KEYS.accounts, list),
      add: (acc) => {
        const list = api.accounts.all();
        if (String(acc.email || "").toLowerCase() === ADMIN.email) return false;
        if (list.some((a) => a.email.toLowerCase() === String(acc.email).toLowerCase())) return false;
        list.push(Object.assign({ id: Date.now(), at: new Date().toISOString(), role: "ADMIN" }, acc));
        write(KEYS.accounts, list);
        return true;
      },
      remove: (id) =>
        write(KEYS.accounts, api.accounts.all().filter((a) => a.id !== Number(id) || String(a.email).toLowerCase() === ADMIN.email)),
      update: (id, patch) => {
        const list = api.accounts.all().map((a) => {
          if (a.id !== Number(id)) return a;
          /* ana hesap korumalı: hiçbir alanı değiştirilemez */
          if (String(a.email).toLowerCase() === ADMIN.email) return a;
          return Object.assign({}, a, patch);
        });
        write(KEYS.accounts, list);
        return list;
      },
      check: (email, pass) => {
        const e = String(email || "").trim().toLowerCase();
        const p = String(pass || "");
        return api.accounts.all().find((a) => String(a.email).toLowerCase() === e && String(a.pass) === p) || null;
      },
    },
    isLoggedIn: () => {
      try {
        if (localStorage.getItem(KEYS.session) !== "1") return false;
        const who = JSON.parse(localStorage.getItem(KEYS.session + "_who") || "null");
        const email = String((who && who.email) || "").trim().toLowerCase();
        if (!email) return false;
        const exists = api.accounts.all().some((a) => String(a.email || "").trim().toLowerCase() === email);
        if (!exists) {
          api.logout();
          return false;
        }
        return true;
      } catch (e) {
        return false;
      }
    },
    login: (email, pass) => {
      const acc = api.accounts.check(email, pass);
      if (acc) {
        localStorage.setItem(KEYS.session, "1");
        localStorage.setItem(KEYS.session + "_who", JSON.stringify({ name: acc.name, email: acc.email, role: acc.role }));
        localStorage.setItem(KEYS.session + "_perms", JSON.stringify(api.permissions.of(acc)));
        api.logins.log(acc);
        return true;
      }
      return false;
    },
    /* oturumdaki hesabın izni var mı? */
    can: (perm) => {
      try {
        const who = JSON.parse(localStorage.getItem(KEYS.session + "_who") || "null");
        if (!who) return false;
        if (String(who.email || "").toLowerCase() === ADMIN.email) return true;
        const list = JSON.parse(localStorage.getItem(KEYS.session + "_perms") || "[]");
        return Array.isArray(list) && list.includes(perm);
      } catch (e) {
        return false;
      }
    },
    isRoot: () => {
      try {
        const who = JSON.parse(localStorage.getItem(KEYS.session + "_who") || "null");
        return !!(who && String(who.email || "").toLowerCase() === ADMIN.email);
      } catch (e) {
        return false;
      }
    },
    whoami: () => {
      try {
        return JSON.parse(localStorage.getItem(KEYS.session + "_who") || "null");
      } catch (e) {
        return null;
      }
    },
    logout: () => {
      localStorage.removeItem(KEYS.session);
      localStorage.removeItem(KEYS.session + "_who");
      localStorage.removeItem(KEYS.session + "_perms");
    },
    /* "2026-11-17" -> 17 Kasım 2026 · "2026-11-17T15:36:45.716Z" -> 17 Kasım 2026 18:36 */
    dateTR: (val, withTime) => {
      if (val == null || val === "") return "—";
      let d;
      const s = String(val).trim();
      if (/^\d{4}-\d{2}-\d{2}$/.test(s)) d = new Date(s + "T00:00:00");
      else d = new Date(s);
      if (isNaN(d.getTime())) d = new Date(Number(val));
      if (isNaN(d.getTime())) return s;
      const opts = { day: "2-digit", month: "long", year: "numeric" };
      const hasTime = withTime || /T\d{2}:/.test(s);
      if (hasTime) {
        opts.hour = "2-digit";
        opts.minute = "2-digit";
      }
      try {
        return d.toLocaleString("tr-TR", opts);
      } catch (e) {
        return d.toLocaleString();
      }
    },
    /* aynı gün ise sadece saat, değilse tarih + saat */
    dateShortTR: (val) => {
      const d = new Date(val);
      if (isNaN(d.getTime())) return "—";
      const now = new Date();
      const sameDay = d.toDateString() === now.toDateString();
      return sameDay
        ? d.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })
        : d.toLocaleString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
    },
    esc: (s) =>
      String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])),
    toast: (msg) => {
      let el = document.querySelector(".toast");
      if (!el) {
        el = document.createElement("div");
        el.className = "toast";
        document.body.appendChild(el);
      }
      el.textContent = msg;
      el.classList.add("show");
      clearTimeout(el._t);
      el._t = setTimeout(() => el.classList.remove("show"), 2200);
    },
  };
  setTimeout(startCloudSync, 0);
  return api;
})();

/* =========================================================
   Sunucu istatistikleri — API bağlanınca burası dolacak
   Kullanım: ADV.serverStats.set({ players: 12, admins: 2, vip: 3, map: "jb_x", names: [...] })
   veya sayfada window.ADV_SERVER = {...} tanımla.
   ========================================================= */
(function () {
  if (!window.ADV) return;
  const EMPTY = { players: 0, admins: 0, vip: 0, map: "jb_avalanche_prison", names: [] };
  const adv = window.ADV;
  adv.serverStats = {
    current: Object.assign({}, EMPTY),
    set(data) {
      this.current = Object.assign({}, EMPTY, data || {});
      document.dispatchEvent(new CustomEvent("adv:serverstats", { detail: this.current }));
      return this.current;
    },
    get() {
      return this.current;
    },
    reset() {
      return this.set(null);
    },
  };
})();
