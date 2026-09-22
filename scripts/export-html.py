#!/usr/bin/env python3
"""Generate a single, self-contained HTML file for the product-listing page.

The file is generated from the same data the Next.js app uses
(src/data/products.ts and src/data/categories.ts) and embeds the product
images as base64, so the result can be opened straight from disk with no
server, no build step and no internet connection.

Usage:  python3 scripts/export-html.py [output-file]
"""

import base64
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "digipet-products.html"

IMG_FILES = {
    "dogFood": "dog-food.jpg",
    "catFood": "cat-food.jpg",
    "canned": "canned-food.jpg",
    "collar": "collar.jpg",
    "bed": "bed.jpg",
    "toy": "toy.jpg",
    "shampoo": "shampoo.jpg",
}

# ── parse src/data/products.ts ───────────────────────────────────────────────
PRODUCT_RE = re.compile(
    r'\{\s*id:\s*(\d+),\s*name:\s*"([^"]*)",\s*brand:\s*"([^"]*)",\s*cat:\s*"([^"]*)",'
    r'\s*sub:\s*"([^"]*)",\s*price:\s*(\d+),\s*discount:\s*(\d+),\s*rating:\s*([\d.]+),'
    r'\s*ratingCount:\s*(\d+),\s*image:\s*IMG\.(\w+),\s*stock:\s*(\d+)'
    r'(?:,\s*badge:\s*"([^"]*)")?'
)

products = []
for m in PRODUCT_RE.finditer((ROOT / "src/data/products.ts").read_text(encoding="utf-8")):
    products.append(
        {
            "id": int(m.group(1)),
            "name": m.group(2),
            "brand": m.group(3),
            "cat": m.group(4),
            "sub": m.group(5),
            "price": int(m.group(6)),
            "discount": int(m.group(7)),
            "rating": float(m.group(8)),
            "ratingCount": int(m.group(9)),
            "img": m.group(10),
            "stock": int(m.group(11)),
            "badge": m.group(12) or "",
        }
    )

# ── parse src/data/categories.ts ─────────────────────────────────────────────
cats, cur = [], None
for line in (ROOT / "src/data/categories.ts").read_text(encoding="utf-8").splitlines():
    m = re.match(r'^    id: "([a-z_]+)",$', line)
    if m:
        cur = {"id": m.group(1), "label": "", "icon": "", "subs": []}
        cats.append(cur)
        continue
    if cur is None:
        continue
    if not cur["label"]:
        m = re.match(r'^    label: "([^"]+)",$', line)
        if m:
            cur["label"] = m.group(1)
            continue
    if not cur["icon"]:
        m = re.match(r'^    icon: "([^"]+)",$', line)
        if m:
            cur["icon"] = m.group(1)
            continue
    m = re.search(r'emoji:\s*"([^"]*)",\s*sub:\s*"([^"]*)"', line)
    if m and m.group(2) not in [s["sub"] for s in cur["subs"]]:
        cur["subs"].append({"sub": m.group(2), "emoji": m.group(1)})

# ── embed images ─────────────────────────────────────────────────────────────
images = {}
for key, filename in IMG_FILES.items():
    path = ROOT / "public/images/products" / filename
    if path.exists():
        images[key] = "data:image/jpeg;base64," + base64.b64encode(path.read_bytes()).decode()

DATA = json.dumps(
    {"products": products, "cats": cats, "images": images},
    ensure_ascii=False,
    separators=(",", ":"),
)

HTML = """<!doctype html>
<html lang="fa" dir="rtl">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>دیجی‌پت | لیست محصولات</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700;900&display=swap" rel="stylesheet" />
<style>
  :root{
    --red:#ef4056; --blue:#19bfd3; --green:#00a049; --orange:#f9a825;
    --bg:#f0f0f1; --text:#3d4152; --muted:#81858b; --line:#e0e0e2; --soft:#f7f7f8;
  }
  *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
  body{margin:0;background:var(--bg);color:var(--text);
       font-family:"Vazirmatn",Tahoma,"Segoe UI",sans-serif;-webkit-font-smoothing:antialiased}
  button{font-family:inherit;cursor:pointer;border:0;background:none;color:inherit}
  a{text-decoration:none;color:inherit}
  .no-scroll::-webkit-scrollbar{display:none}
  .no-scroll{-ms-overflow-style:none;scrollbar-width:none}

  /* header */
  header{position:sticky;top:0;z-index:40;padding:12px 16px;background:rgba(255,255,255,.72);
    backdrop-filter:blur(24px) saturate(180%);-webkit-backdrop-filter:blur(24px) saturate(180%);
    border-bottom:1px solid rgba(0,0,0,.06);box-shadow:0 1px 16px rgba(0,0,0,.05)}
  .hrow{display:flex;align-items:center;gap:12px}
  .back{display:flex;align-items:center;justify-content:center;width:28px;height:28px;font-size:22px;color:var(--text)}
  .searchbox{flex:1;display:flex;align-items:center;gap:8px;height:44px;padding:0 12px;border-radius:16px;
    background:rgba(255,255,255,.65);border:1px solid rgba(255,255,255,.8);
    box-shadow:0 2px 10px rgba(0,0,0,.04),inset 0 1px 0 rgba(255,255,255,.9)}
  .searchbox input{flex:1;border:0;outline:0;background:transparent;font-size:13px;color:var(--text);font-family:inherit}
  .searchbox input::placeholder{color:rgba(61,65,82,.4)}
  .chips{display:flex;gap:8px;margin-top:8px;overflow-x:auto}
  .chip{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:700;
    padding:4px 12px;border-radius:999px;white-space:nowrap}
  .chip.cat{background:rgba(239,64,86,.1);color:var(--red)}
  .chip.sub{background:rgba(25,191,211,.1);color:var(--blue)}

  /* circles */
  .panel{background:#fff}
  .circles{display:grid;grid-template-columns:repeat(4,1fr);gap-x:8px;gap-y:16px;padding:16px 12px}
  @media(min-width:768px){.circles{grid-template-columns:repeat(6,1fr)}}
  .circle{display:flex;flex-direction:column;align-items:center;gap:6px}
  .circle i{width:58px;height:58px;border-radius:50%;display:flex;align-items:center;justify-content:center;
    font-size:26px;font-style:normal;background:#f5f5f6;box-shadow:0 0 0 1px #ececee inset;transition:.15s}
  .circle.on i{background:rgba(239,64,86,.1);box-shadow:0 0 0 2px var(--red)}
  .circle span{font-size:10px;line-height:1.35;text-align:center;color:var(--text);font-weight:500}
  .circle.on span{color:var(--red);font-weight:900}
  .allcat{display:flex;align-items:center;justify-content:center;gap:4px;width:100%;padding:12px;
    border-top:1px solid var(--bg);font-size:12px;font-weight:900;color:var(--blue)}

  /* toolbar */
  .toolbar{position:sticky;top:73px;z-index:30;display:flex;align-items:center;justify-content:space-between;
    gap:12px;background:#fff;border-top:1px solid var(--bg);border-bottom:1px solid var(--bg);
    margin-top:8px;padding:8px 16px}
  .btn{border:1px solid var(--line);border-radius:8px;padding:6px 12px;font-size:12px;font-weight:700;
    display:inline-flex;align-items:center;gap:6px}
  .dot{width:8px;height:8px;border-radius:50%;background:var(--red);display:inline-block}
  .sortwrap{position:relative}
  .sortbtn{font-size:12px;color:var(--text);display:inline-flex;align-items:center;gap:4px;white-space:nowrap}
  .sortbtn b{color:var(--red)}
  .menu{position:absolute;top:34px;left:0;z-index:50;width:170px;background:#fff;border:1px solid var(--bg);
    border-radius:12px;box-shadow:0 12px 32px rgba(0,0,0,.16);overflow:hidden;display:none}
  .menu.open{display:block}
  .menu button{display:block;width:100%;text-align:right;padding:12px 16px;font-size:12px;
    border-bottom:1px solid var(--bg);color:var(--text)}
  .menu button:last-child{border-bottom:0}
  .menu button.on{color:var(--red);font-weight:700}
  .count{font-size:11px;color:var(--muted);white-space:nowrap}
  .views{display:flex;gap:2px}
  .views button{padding:6px;border-radius:8px;font-size:14px;color:#a1a3a8}
  .views button.on{background:var(--bg);color:var(--text)}

  /* products */
  .grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--line)}
  @media(min-width:768px){.grid{grid-template-columns:repeat(3,1fr)}}
  @media(min-width:1024px){.grid{grid-template-columns:repeat(4,1fr)}}
  @media(min-width:1280px){.grid{grid-template-columns:repeat(5,1fr)}}
  .card{background:#fff;padding:12px;display:flex;flex-direction:column;position:relative}
  .card:hover{box-shadow:0 2px 12px rgba(0,0,0,.06)}
  .flag{position:absolute;top:8px;right:8px;font-size:9px;font-weight:700;padding:2px 6px;border-radius:4px;color:#fff}
  .flag.amazing{background:var(--red)} .flag.popular{background:#ff9800} .flag.free{background:var(--green)}
  .thumb{width:100%;aspect-ratio:1/1;border-radius:12px;overflow:hidden;background:var(--soft);margin-bottom:8px}
  .thumb img{width:100%;height:100%;object-fit:cover;display:block}
  .name{font-size:11px;font-weight:500;line-height:18px;color:var(--text);
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
  .stars{display:flex;align-items:center;gap:4px;margin-top:4px}
  .stars b{color:var(--orange);font-size:12px;letter-spacing:-1px}
  .stars span{font-size:10px;color:var(--muted)}
  .row{margin-top:8px;display:flex;align-items:flex-end;justify-content:space-between;gap:4px}
  .off{background:var(--red);color:#fff;font-size:10px;font-weight:900;padding:2px 6px;border-radius:999px}
  .pricebox{text-align:left}
  .old{font-size:10px;color:#a1a3a8;text-decoration:line-through}
  .price{font-size:14px;font-weight:900;color:var(--text)}
  .price small{font-size:9px;font-weight:400;color:var(--muted);margin-right:2px}
  .out{font-size:10px;color:var(--red);font-weight:700;margin-top:4px}

  /* list view */
  .list{display:flex;flex-direction:column;gap:1px;background:var(--line)}
  .lrow{background:#fff;padding:16px;display:flex;gap:16px}
  .lrow .thumb{width:100px;flex:0 0 100px;position:relative;margin:0}
  .lrow .off{position:absolute;top:4px;right:4px}
  .linfo{flex:1;display:flex;flex-direction:column;gap:4px;min-width:0}
  .linfo .brand{font-size:10px;color:var(--muted);margin-top:auto}

  /* empty */
  .empty{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 24px;text-align:center}
  .empty .emoji{font-size:48px;margin-bottom:16px}
  .empty h3{font-size:16px;margin:0}
  .empty p{font-size:12px;color:var(--muted);margin:8px 0 0}

  /* drawer */
  .overlay{position:fixed;inset:0;background:rgba(0,0,0,.25);z-index:90;display:none}
  .overlay.open{display:block}
  .sheet{position:absolute;inset:0;background:#fff;display:flex;flex-direction:column}
  .sheet header{position:static;box-shadow:none;border-bottom:1px solid var(--bg);background:#fff;
    display:flex;align-items:center;justify-content:space-between;padding:16px;backdrop-filter:none}
  .sheet header h2{font-size:16px;margin:0;font-weight:900}
  .sheet header .left{display:flex;align-items:center;gap:16px}
  .link{font-size:12px;font-weight:700;color:var(--blue)}
  .sheet .body{flex:1;overflow-y:auto;padding:16px 16px 120px}
  .toggle{display:flex;align-items:center;justify-content:space-between;padding:8px 0}
  .toggle span{font-size:13px}
  .switch{width:40px;height:20px;border-radius:999px;background:var(--line);position:relative;transition:.2s}
  .switch.on{background:var(--red)}
  .switch i{position:absolute;top:4px;right:4px;width:12px;height:12px;border-radius:50%;background:#fff;transition:.2s}
  .switch.on i{right:24px}
  .acc{display:flex;align-items:center;justify-content:space-between;padding:20px 0;
    border-bottom:1px solid var(--bg);font-size:14px;font-weight:700}
  .sheet footer{position:sticky;bottom:0;background:#fff;border-top:1px solid var(--bg);padding:16px}
  .cta{width:100%;background:var(--red);color:#fff;padding:14px;border-radius:12px;
    font-weight:900;font-size:14px;box-shadow:0 8px 20px rgba(239,64,86,.2)}

  /* modal */
  .modal{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.45);display:none;
    align-items:flex-end;justify-content:center}
  .modal.open{display:flex}
  .mcard{background:#fff;width:100%;max-width:520px;border-radius:20px 20px 0 0;padding:20px;
    max-height:88vh;overflow-y:auto}
  @media(min-width:640px){.modal{align-items:center}.mcard{border-radius:20px}}
  .mcard img{width:100%;aspect-ratio:1/1;object-fit:contain;background:var(--soft);border-radius:16px}
  .mcard h3{font-size:15px;line-height:26px;margin:12px 0 4px}
  .mcard .mbrand{font-size:11px;color:var(--blue);font-weight:700}
  .specs{width:100%;border-collapse:collapse;margin-top:12px;font-size:12px}
  .specs td{padding:10px 12px}
  .specs tr:nth-child(odd){background:#f9f9f9}
  .specs td:first-child{color:var(--muted);width:50%}
</style>
</head>
<body>

<header>
  <div class="hrow">
    <a class="back" href="#" onclick="history.back();return false">›</a>
    <div class="searchbox">
      <span style="color:rgba(61,65,82,.4);font-size:16px">🔍</span>
      <input id="q" placeholder="جستجو در دیجی‌پت" oninput="state.q=this.value;render()" />
      <button onclick="state.q='';document.getElementById('q').value='';render()" style="color:rgba(61,65,82,.4)">✕</button>
    </div>
    <div style="font-size:18px;font-weight:900;color:var(--red);white-space:nowrap">دیجی‌پت</div>
  </div>
  <div class="chips no-scroll" id="chips"></div>
</header>

<div class="panel">
  <div class="circles" id="circles"></div>
  <button class="allcat" id="allcat" onclick="clearSub()"></button>
</div>

<div class="toolbar">
  <button class="btn" onclick="openFilter()">⚙ فیلتر <span id="fdot"></span></button>
  <div class="sortwrap">
    <button class="sortbtn" onclick="toggleMenu()">مرتب‌سازی: <b id="sortlabel">مرتبط‌ترین</b> ▾</button>
    <div class="menu" id="menu"></div>
  </div>
  <span class="count" id="count"></span>
  <div class="views">
    <button id="vg" class="on" onclick="setView('grid')">▦</button>
    <button id="vl" onclick="setView('list')">☰</button>
  </div>
</div>

<main id="main"></main>

<!-- filter drawer -->
<div class="overlay" id="drawer">
  <div class="sheet">
    <header>
      <div class="left">
        <button onclick="closeFilter()" style="font-size:22px">✕</button>
        <h2>فیلترها</h2>
      </div>
      <button class="link" onclick="resetFilters()">حذف همه فیلترها</button>
    </header>
    <div class="body">
      <div class="toggle"><span>فقط کالاهای موجود</span>
        <button class="switch" id="f1" onclick="toggleFilter('onlyAvailable')"><i></i></button></div>
      <div class="toggle"><span>فقط کالاهای شگفت‌انگیز</span>
        <button class="switch" id="f2" onclick="toggleFilter('amazingOnly')"><i></i></button></div>
      <div class="toggle"><span>فقط کالاهای با ارسال رایگان</span>
        <button class="switch" id="f3" onclick="toggleFilter('freeShipping')"><i></i></button></div>
      <div style="margin-top:16px;border-top:1px solid var(--bg)">
        <div class="acc">برند ▾</div>
        <div class="acc">محدوده قیمت ▾</div>
        <div class="acc">نوع حیوان ▾</div>
        <div class="acc">سن حیوان ▾</div>
      </div>
    </div>
    <footer><button class="cta" onclick="closeFilter()">مشاهده نتایج</button></footer>
  </div>
</div>

<!-- product modal -->
<div class="modal" id="modal" onclick="if(event.target===this)closeModal()">
  <div class="mcard">
    <img id="mimg" src="" alt="" />
    <div class="mbrand" id="mbrand"></div>
    <h3 id="mname"></h3>
    <div class="stars"><b id="mstars"></b><span id="mrating"></span></div>
    <div class="row"><span class="off" id="moff"></span>
      <div class="pricebox"><div class="old" id="mold"></div><div class="price" id="mprice"></div></div>
    </div>
    <table class="specs" id="mspecs"></table>
    <button class="cta" style="margin-top:16px" onclick="closeModal()">بستن</button>
  </div>
</div>

<script>
const DATA = __DATA__;
const SORTS = ["مرتبط‌ترین","پرفروش‌ترین","ارزان‌ترین","گران‌ترین","امتیاز","بیشترین تخفیف"];
const P = "۰۱۲۳۴۵۶۷۸۹";

const fa = (n) => String(n).replace(/\\d/g, (d) => P[+d]);
const money = (n) => n.toLocaleString("fa-IR");
const final = (p) => Math.round(p.price * (100 - p.discount) / 100);
const label = (id) => (DATA.cats.find((c) => c.id === id) || {}).label || id;

const params = new URLSearchParams(location.search);
const state = {
  cat: params.get("cat") || "",
  sub: params.get("sub") || "",
  q: "",
  sort: 0,
  view: "grid",
  filters: { onlyAvailable: false, amazingOnly: false, freeShipping: false },
};

const flagClass = (b) => (b === "شگفت‌انگیز" ? "amazing" : b === "محبوب" ? "popular" : "free");
const priceBox = (p) =>
  '<div class="pricebox">' +
  (p.discount > 0 ? '<div class="old">' + money(p.price) + "</div>" : "") +
  '<div class="price">' + money(final(p)) + "<small>تومان</small></div></div>";

function filtered() {
  const q = state.q.trim();
  return DATA.products.filter((p) => {
    if (state.cat && p.cat !== state.cat) return false;
    if (state.sub && p.sub !== state.sub) return false;
    if (state.filters.onlyAvailable && p.stock <= 0) return false;
    if (state.filters.amazingOnly && p.badge !== "شگفت‌انگیز") return false;
    if (state.filters.freeShipping && p.badge !== "ارسال رایگان") return false;
    if (q && !(p.name.includes(q) || p.brand.includes(q) || p.sub.includes(q))) return false;
    return true;
  });
}

function sorted() {
  const list = filtered();
  const f = final;
  if (state.sort === 1) list.sort((a, b) => b.ratingCount - a.ratingCount);
  if (state.sort === 2) list.sort((a, b) => f(a) - f(b));
  if (state.sort === 3) list.sort((a, b) => f(b) - f(a));
  if (state.sort === 4) list.sort((a, b) => b.rating - a.rating);
  if (state.sort === 5) list.sort((a, b) => b.discount - a.discount);
  return list;
}

function renderChips() {
  const chips = [];
  if (state.cat)
    chips.push('<button class="chip cat" onclick="clearCat()">' + label(state.cat) + " ✕</button>");
  if (state.sub)
    chips.push('<button class="chip sub" onclick="clearSub()">' + state.sub + " ✕</button>");
  document.getElementById("chips").innerHTML = chips.join("");
}

function renderCircles() {
  const items = state.cat
    ? [{ key: "all", label: "همه", emoji: "🔲", value: "" }].concat(
        (DATA.cats.find((c) => c.id === state.cat) || { subs: [] }).subs.map((s) => ({
          key: s.sub, label: s.sub, emoji: s.emoji, value: s.sub,
        })))
    : DATA.cats.map((c) => ({ key: c.id, label: c.label, emoji: c.icon, value: c.id }));

  document.getElementById("circles").innerHTML = items
    .map((c) => {
      const on = state.cat ? c.value === state.sub : c.value === state.cat;
      return (
        '<button class="circle' + (on ? " on" : "") + '" onclick="' +
        (state.cat ? "pickSub" : "pickCat") + "('" + c.value.replace(/'/g, "") + "')" + '">' +
        "<i>" + c.emoji + "</i><span>" + c.label + "</span></button>"
      );
    })
    .join("");

  const all = document.getElementById("allcat");
  all.style.display = state.cat ? "flex" : "none";
  if (state.cat) all.textContent = "مشاهده همه محصولات " + label(state.cat) + " ‹";
}

function renderProducts() {
  const list = sorted();
  document.getElementById("count").textContent = fa(list.length) + " کالا";

  if (!list.length) {
    document.getElementById("main").innerHTML =
      '<div class="empty"><div class="emoji">🔍</div><h3>محصولی یافت نشد!</h3>' +
      "<p>متأسفانه محصولی مطابق با جستجوی شما پیدا نشد. لطفاً عبارت دیگری را جستجو کنید.</p></div>";
    return;
  }

  const star = (p) =>
    '<div class="stars"><b>' +
    "★★★★★".slice(0, Math.round(p.rating)) +
    "</b><span>" +
    fa(p.rating) +
    " (" +
    fa(p.ratingCount) +
    ")</span></div>";

  if (state.view === "grid") {
    document.getElementById("main").innerHTML =
      '<div class="grid">' +
      list
        .map((p) => {
          const img = DATA.images[p.img] || "";
          return (
            '<div class="card" onclick="openProduct(' + p.id + ')">' +
            (p.badge ? '<span class="flag ' + flagClass(p.badge) + '">' + p.badge + "</span>" : "") +
            '<div class="thumb"><img src="' + img + '" alt="' + p.name + '" loading="lazy"/></div>' +
            '<div class="name">' + p.name + "</div>" +
            star(p) +
            '<div class="row">' +
            (p.discount > 0 ? '<span class="off">' + fa(p.discount) + "٪</span>" : "<span></span>") +
            priceBox(p) +
            "</div>" +
            (p.stock <= 0 ? '<div class="out">ناموجود</div>' : "") +
            "</div>"
          );
        })
        .join("") +
      "</div>";
  } else {
    document.getElementById("main").innerHTML =
      '<div class="list">' +
      list
        .map((p) => {
          const img = DATA.images[p.img] || "";
          return (
            '<div class="lrow" onclick="openProduct(' + p.id + ')">' +
            '<div class="thumb"><img src="' + img + '" alt="' + p.name + '" loading="lazy"/>' +
            (p.discount > 0 ? '<span class="off">' + fa(p.discount) + "٪</span>" : "") +
            "</div>" +
            '<div class="linfo">' +
            (p.badge ? '<span class="flag ' + flagClass(p.badge) + '" style="position:static;align-self:flex-start">' + p.badge + "</span>" : "") +
            '<div class="name">' + p.name + "</div>" +
            star(p) +
            '<div class="brand">' + p.brand + "</div>" +
            "</div></div>"
          );
        })
        .join("") +
      "</div>";
  }
}

function render() {
  renderChips();
  renderCircles();
  renderProducts();
  document.getElementById("sortlabel").textContent = SORTS[state.sort];
  document.getElementById("fdot").innerHTML =
    state.filters.onlyAvailable || state.filters.amazingOnly || state.filters.freeShipping
      ? '<span class="dot"></span>'
      : "";
  ["onlyAvailable", "amazingOnly", "freeShipping"].forEach((k, i) => {
    document.getElementById("f" + (i + 1)).classList.toggle("on", state.filters[k]);
  });
  document.getElementById("vg").classList.toggle("on", state.view === "grid");
  document.getElementById("vl").classList.toggle("on", state.view === "list");
}

function pickCat(id) { state.cat = state.cat === id ? "" : id; state.sub = ""; syncUrl(); render(); }
function pickSub(v) { state.sub = state.sub === v ? "" : v; syncUrl(); render(); }
function clearCat() { state.cat = ""; state.sub = ""; syncUrl(); render(); }
function clearSub() { state.sub = ""; syncUrl(); render(); }
function setView(v) { state.view = v; render(); }
function syncUrl() {
  const s = new URLSearchParams();
  if (state.cat) s.set("cat", state.cat);
  if (state.sub) s.set("sub", state.sub);
  const qs = s.toString();
  history.replaceState(null, "", qs ? "?" + qs : location.pathname);
}

function toggleMenu() {
  const m = document.getElementById("menu");
  m.classList.toggle("open");
  m.innerHTML = SORTS.map(
    (s, i) =>
      '<button class="' + (i === state.sort ? "on" : "") + '" onclick="pickSort(' + i + ')">' + s + "</button>"
  ).join("");
}
function pickSort(i) {
  state.sort = i;
  document.getElementById("menu").classList.remove("open");
  render();
}
document.addEventListener("click", (e) => {
  if (!e.target.closest(".sortwrap")) document.getElementById("menu").classList.remove("open");
});

function openFilter() { document.getElementById("drawer").classList.add("open"); }
function closeFilter() { document.getElementById("drawer").classList.remove("open"); }
function resetFilters() {
  state.filters = { onlyAvailable: false, amazingOnly: false, freeShipping: false };
  render();
}
function toggleFilter(k) { state.filters[k] = !state.filters[k]; render(); }

function openProduct(id) {
  const p = DATA.products.find((x) => x.id === id);
  if (!p) return;
  document.getElementById("mimg").src = DATA.images[p.img] || "";
  document.getElementById("mbrand").textContent = p.brand;
  document.getElementById("mname").textContent = p.name;
  document.getElementById("mstars").textContent = "★★★★★".slice(0, Math.round(p.rating));
  document.getElementById("mrating").textContent = fa(p.rating) + " از ۵ • " + fa(p.ratingCount) + " نظر";
  document.getElementById("moff").textContent = p.discount > 0 ? fa(p.discount) + "٪" : "";
  document.getElementById("mold").textContent = p.discount > 0 ? money(p.price) + " تومان" : "";
  document.getElementById("mprice").innerHTML = money(final(p)) + "<small>تومان</small>";
  document.getElementById("mspecs").innerHTML = [
    ["برند", p.brand],
    ["دسته‌بندی", label(p.cat)],
    ["نوع کالا", p.sub],
    ["موجودی انبار", fa(p.stock) + " عدد"],
    ["گارانتی", "اصالت و سلامت فیزیکی کالا"],
  ]
    .map((r) => "<tr><td>" + r[0] + "</td><td>" + r[1] + "</td></tr>")
    .join("");
  document.getElementById("modal").classList.add("open");
}
function closeModal() { document.getElementById("modal").classList.remove("open"); }

render();
</script>
</body>
</html>
"""

OUT.write_text(HTML.replace("__DATA__", DATA), encoding="utf-8")
print(f"wrote {OUT} ({OUT.stat().st_size/1024:.0f} KB) — {len(products)} products, {len(cats)} categories")
