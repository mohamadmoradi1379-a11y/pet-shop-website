"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Search, X, SlidersHorizontal, Grid2X2, List, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import MobileNav from "@/components/MobileNav";
import FilterDrawer from "@/components/FilterDrawer";
import { GridCard, ListCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { categories, categoryLabel, subCategories } from "@/data/categories";
import { finalPrice, toPersian } from "@/lib/format";

const sortOptions = [
  "مرتبط‌ترین",
  "پرفروش‌ترین",
  "ارزان‌ترین",
  "گران‌ترین",
  "امتیاز",
  "بیشترین تخفیف",
];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [cat, setCat] = useState(searchParams.get("cat") || "");
  const [sub, setSub] = useState(searchParams.get("sub") || "");
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOpen, setSortOpen] = useState(false);
  const [sortIdx, setSortIdx] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    onlyAvailable: false,
    amazingOnly: false,
    freeShipping: false,
  });

  const subs = cat ? subCategories(cat) : [];

  /** Keep the URL in sync so links stay shareable. */
  const syncUrl = (nextCat: string, nextSub: string) => {
    const params = new URLSearchParams();
    if (nextCat) params.set("cat", nextCat);
    if (nextSub) params.set("sub", nextSub);
    const qs = params.toString();
    router.replace(qs ? `/search?${qs}` : "/search", { scroll: false });
  };

  const selectMainCat = (id: string) => {
    const next = id === cat ? "" : id;
    setCat(next);
    setSub("");
    syncUrl(next, "");
  };

  const selectSub = (next: string) => {
    const value = next === sub ? "" : next;
    setSub(value);
    syncUrl(cat, value);
  };

  const filtered = useMemo(() => {
    const q = query.trim();
    return products.filter((p) => {
      if (cat && p.cat !== cat) return false;
      if (sub && p.sub !== sub) return false;
      if (filters.onlyAvailable && p.stock <= 0) return false;
      if (filters.amazingOnly && p.badge !== "شگفت‌انگیز") return false;
      if (filters.freeShipping && p.badge !== "ارسال رایگان") return false;
      if (q && !(p.name.includes(q) || p.brand.includes(q) || p.sub.includes(q))) return false;
      return true;
    });
  }, [cat, sub, query, filters]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    switch (sortIdx) {
      case 1:
        list.sort((a, b) => b.ratingCount - a.ratingCount);
        break;
      case 2:
        list.sort((a, b) => finalPrice(a.price, a.discount) - finalPrice(b.price, b.discount));
        break;
      case 3:
        list.sort((a, b) => finalPrice(b.price, b.discount) - finalPrice(a.price, a.discount));
        break;
      case 4:
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 5:
        list.sort((a, b) => b.discount - a.discount);
        break;
      default:
        break;
    }
    return list;
  }, [filtered, sortIdx]);

  const pageTitle = sub || (cat ? `محصولات ${categoryLabel(cat)}` : "جستجو در دیجی‌پت");
  const activeFilterCount = [
    filters.onlyAvailable,
    filters.amazingOnly,
    filters.freeShipping,
  ].filter(Boolean).length;

  const circles = cat
    ? [{ key: "all", label: "همه", emoji: "🔲", value: "" }, ...subs.map((s) => ({
        key: s.sub,
        label: s.sub,
        emoji: s.emoji,
        value: s.sub,
      }))]
    : categories.map((c) => ({ key: c.id, label: c.label, emoji: c.icon, value: c.id }));

  return (
    <div className="min-h-screen bg-[#f0f0f1] pb-16 md:pb-0">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-40 px-4 py-3"
        style={{
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 1px 16px rgba(0,0,0,0.05)",
        }}
      >
        <div className="flex items-center gap-3">
          <Link href={cat ? "/category" : "/"}>
            <ArrowRight className="w-6 h-6 text-[#3d4152]" />
          </Link>
          <div
            className="flex-1 flex items-center h-[44px] rounded-2xl px-3 gap-2"
            style={{
              background: "rgba(255,255,255,0.65)",
              border: "1px solid rgba(255,255,255,0.8)",
              boxShadow: "0 2px 10px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            <Search className="w-[18px] h-[18px] text-[#3d4152]/40 flex-shrink-0" />
            <input
              autoFocus={!cat && !sub}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={pageTitle}
              className="flex-1 bg-transparent text-[13px] text-[#3d4152] placeholder-[#3d4152]/40 focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery("")} aria-label="پاک کردن جستجو">
                <X className="w-4 h-4 text-[#3d4152]/40" />
              </button>
            )}
          </div>
        </div>

        {/* Active filter chips */}
        {(cat || sub) && (
          <div className="flex gap-2 mt-2 overflow-x-auto no-scrollbar">
            {cat && (
              <button
                onClick={() => selectMainCat(cat)}
                className="flex items-center gap-1 text-[11px] bg-[#ef4056]/10 text-[#ef4056] font-bold px-3 py-1 rounded-full whitespace-nowrap"
              >
                {categoryLabel(cat)}
                <X className="w-3 h-3" />
              </button>
            )}
            {sub && (
              <button
                onClick={() => selectSub(sub)}
                className="flex items-center gap-1 text-[11px] bg-[#19bfd3]/10 text-[#19bfd3] font-bold px-3 py-1 rounded-full whitespace-nowrap"
              >
                {sub}
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Sub-category circles ───────────────────────────────── */}
      <div className="bg-white">
        <div className="grid grid-cols-4 md:grid-cols-6 gap-y-4 gap-x-2 px-3 py-4">
          {circles.map((c) => {
            const active = cat
              ? c.value === sub
              : c.value === cat;
            return (
              <button
                key={c.key}
                onClick={() => (cat ? selectSub(c.value) : selectMainCat(c.value))}
                className="flex flex-col items-center gap-1.5"
              >
                <span
                  className={`w-[58px] h-[58px] rounded-full flex items-center justify-center text-[26px] transition-all ${
                    active
                      ? "bg-[#ef4056]/10 ring-2 ring-[#ef4056]"
                      : "bg-[#f5f5f6] ring-1 ring-[#ececee]"
                  }`}
                >
                  {c.emoji}
                </span>
                <span
                  className={`text-[10px] text-center leading-[1.35] ${
                    active ? "font-black text-[#ef4056]" : "font-medium text-[#3d4152]"
                  }`}
                >
                  {c.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* "View all" link for the current animal category */}
        {cat && (
          <Link
            href={`/search?cat=${encodeURIComponent(cat)}`}
            onClick={() => selectSub("")}
            className="flex items-center justify-center gap-1 py-3 border-t border-[#f0f0f1] text-[12px] font-black text-[#19bfd3]"
          >
            مشاهده همه محصولات {categoryLabel(cat)}
            <ChevronDown className="w-3.5 h-3.5 rotate-[-90deg]" />
          </Link>
        )}
      </div>

      {/* ── Sort + filter bar ──────────────────────────────────── */}
      <div className="bg-white border-y border-[#f0f0f1] px-4 py-2 flex items-center justify-between gap-3 sticky top-[73px] z-30 mt-2">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-1.5 text-[12px] font-bold text-[#3d4152] border border-[#e0e0e2] rounded-lg px-3 py-1.5"
        >
          <SlidersHorizontal className="w-4 h-4" />
          فیلتر
          {activeFilterCount > 0 && (
            <span className="w-2 h-2 bg-[#ef4056] rounded-full" />
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-1 text-[12px] text-[#3d4152] font-medium whitespace-nowrap"
          >
            مرتب‌سازی: <span className="text-[#ef4056] font-bold">{sortOptions[sortIdx]}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#ef4056]" />
          </button>
          {sortOpen && (
            <div className="absolute top-8 left-0 bg-white rounded-xl shadow-2xl border border-[#f0f0f1] overflow-hidden z-50 w-[170px]">
              {sortOptions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSortIdx(i);
                    setSortOpen(false);
                  }}
                  className={`w-full text-right px-4 py-3 text-[12px] border-b border-[#f0f0f1] last:border-0 ${
                    i === sortIdx ? "text-[#ef4056] font-bold" : "text-[#3d4152]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <span className="text-[11px] text-[#81858b] whitespace-nowrap">
          {toPersian(sorted.length)} کالا
        </span>

        <div className="flex gap-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-lg ${viewMode === "grid" ? "bg-[#f0f0f1]" : ""}`}
          >
            <Grid2X2
              className={`w-4 h-4 ${viewMode === "grid" ? "text-[#3d4152]" : "text-[#a1a3a8]"}`}
            />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-lg ${viewMode === "list" ? "bg-[#f0f0f1]" : ""}`}
          >
            <List
              className={`w-4 h-4 ${viewMode === "list" ? "text-[#3d4152]" : "text-[#a1a3a8]"}`}
            />
          </button>
        </div>
      </div>

      {/* ── Empty state ────────────────────────────────────────── */}
      {sorted.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-6">
          <span className="text-5xl mb-4">🔍</span>
          <h3 className="text-[16px] font-bold text-[#3d4152]">محصولی یافت نشد!</h3>
          <p className="text-[12px] text-[#81858b] mt-2 text-center">
            متأسفانه محصولی مطابق با جستجوی شما پیدا نشد. لطفاً عبارت دیگری را جستجو کنید.
          </p>
          <Link
            href="/category"
            className="mt-4 bg-[#ef4056] text-white px-6 py-2.5 rounded-xl text-[13px] font-bold"
          >
            مشاهده دسته‌بندی‌ها
          </Link>
        </div>
      )}

      {/* ── Products ───────────────────────────────────────────── */}
      {sorted.length > 0 && viewMode === "grid" && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-px bg-[#e0e0e2]">
          {sorted.map((p) => (
            <GridCard key={p.id} p={p} />
          ))}
        </div>
      )}

      {sorted.length > 0 && viewMode === "list" && (
        <div className="flex flex-col gap-0.5 bg-[#e0e0e2]">
          {sorted.map((p) => (
            <ListCard key={p.id} p={p} />
          ))}
        </div>
      )}

      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />

      <MobileNav />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <span className="text-[#81858b]">در حال بارگذاری...</span>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
