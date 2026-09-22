"use client";
import { useState } from "react";
import { ArrowRight, Search, X, SlidersHorizontal, Grid2X2, List, ChevronDown, Star } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import MobileNav from "@/components/MobileNav";
import FilterDrawer from "@/components/FilterDrawer";
import { Suspense } from "react";

const toPersian = (n: number) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
const formatPrice = (n: number) => n.toLocaleString("fa-IR");

const allProducts = [
  { id: 1, name: "غذای خشک سگ بالغ رویال کنین مدل Maxi Adult وزن ۱۵ کیلوگرم", price: 2850000, discount: 15, rating: 4.6, ratingCount: 1240, image: "https://images.pexels.com/photos/12928244/pexels-photo-12928244.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400", badge: "ارسال رایگان", cat: "dogs", sub: "غذای خشک سگ" },
  { id: 2, name: "غذای خشک گربه بالغ ویسکاس با طعم مرغ ۷ کیلوگرم", price: 980000, discount: 12, rating: 4.4, ratingCount: 870, image: "https://images.pexels.com/photos/27279130/pexels-photo-27279130.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400", badge: null, cat: "cats", sub: "غذای خشک گربه" },
  { id: 3, name: "تشویقی سگ مدادی با طعم مرغ و سبزیجات ۱۰۰ گرمی", price: 125000, discount: 0, rating: 4.8, ratingCount: 2100, image: "https://images.pexels.com/photos/9248865/pexels-photo-9248865.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400", badge: "محبوب", cat: "dogs", sub: "تشویقی و دنتال" },
  { id: 4, name: "بستر و جای خواب گربه مخملی ضد آب سایز لارج", price: 890000, discount: 20, rating: 4.2, ratingCount: 430, image: "https://images.pexels.com/photos/9660361/pexels-photo-9660361.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400", badge: null, cat: "cats", sub: "جای خواب و اسکرچر" },
  { id: 5, name: "قلاده گردنی چرمی ایمنی‌دار ضد حساسیت مناسب سگ متوسط", price: 450000, discount: 30, rating: 4.5, ratingCount: 760, image: "https://images.pexels.com/photos/37559533/pexels-photo-37559533.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400", badge: "شگفت‌انگیز", cat: "dogs", sub: "قلاده و بند" },
  { id: 6, name: "شامپو ضد کک و کنه برای سگ و گربه ۲۵۰ میلی‌لیتر", price: 320000, discount: 8, rating: 4.3, ratingCount: 560, image: "https://images.pexels.com/photos/10843207/pexels-photo-10843207.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400", badge: null, cat: "dogs", sub: "لوازم بهداشتی سگ" },
  { id: 7, name: "غذای خشک توله سگ جوسرا مدل Junior سایز کوچک ۱۰ کیلوگرم", price: 1650000, discount: 18, rating: 4.7, ratingCount: 980, image: "https://images.pexels.com/photos/35096607/pexels-photo-35096607.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400", badge: "ارسال رایگان", cat: "dogs", sub: "غذای خشک سگ" },
  { id: 8, name: "اسباب‌بازی توپ لاستیکی دندانی سگ بسته ۳ عددی", price: 75000, discount: 0, rating: 4.1, ratingCount: 320, image: "https://images.pexels.com/photos/16577552/pexels-photo-16577552.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400", badge: null, cat: "dogs", sub: "اسباب‌بازی سگ" },
  { id: 9, name: "خاک گربه ون کت اولتراکلامپینگ گل‌های بهاری ۱۰ لیتری", price: 245000, discount: 22, rating: 4.6, ratingCount: 1540, image: "https://images.pexels.com/photos/30368564/pexels-photo-30368564.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400", badge: null, cat: "cats", sub: "خاک گربه" },
  { id: 10, name: "ویتامین مولتی سگ بالغ قرص جویدنی ۶۰ عددی با طعم گوشت", price: 380000, discount: 10, rating: 4.4, ratingCount: 670, image: "https://images.pexels.com/photos/10096129/pexels-photo-10096129.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400", badge: null, cat: "dogs", sub: "مکمل و ویتامین" },
  { id: 11, name: "کنسرو گربه شسیر با طعم ماهی تن ۴۰۰ گرمی", price: 185000, discount: 10, rating: 4.5, ratingCount: 910, image: "https://images.pexels.com/photos/16656995/pexels-photo-16656995.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400", badge: null, cat: "cats", sub: "کنسرو و پوچ گربه" },
  { id: 12, name: "غذای پرندگان ویتاکرافت مخلوط با میوه ۵۰۰ گرمی", price: 95000, discount: 5, rating: 4.3, ratingCount: 280, image: "https://images.pexels.com/photos/12928244/pexels-photo-12928244.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400", badge: null, cat: "birds", sub: "غذای پرندگان" },
  { id: 13, name: "قفس پرنده فلزی با سینی کشویی مدل لوکس", price: 1250000, discount: 15, rating: 4.0, ratingCount: 190, image: "https://images.pexels.com/photos/37712947/pexels-photo-37712947.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400", badge: null, cat: "birds", sub: "قفس پرنده" },
  { id: 14, name: "غذای ماهی تروپیکال فلکس تترا ۲۵۰ میلی‌لیتر", price: 145000, discount: 0, rating: 4.2, ratingCount: 340, image: "https://images.pexels.com/photos/18764141/pexels-photo-18764141.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400", badge: null, cat: "aquatics", sub: "غذای ماهی" },
  { id: 15, name: "کنسرو و پوچ سگ بالغ پدیگری با طعم گوشت ۴۰۰ گرم", price: 95000, discount: 12, rating: 4.6, ratingCount: 1100, image: "https://images.pexels.com/photos/27175967/pexels-photo-27175967.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400", badge: null, cat: "dogs", sub: "کنسرو و پوچ سگ" },
  { id: 16, name: "غذای جوندگان ویتاکرافت با دانه آفتاب‌گردان ۸۰۰ گرمی", price: 110000, discount: 0, rating: 4.1, ratingCount: 150, image: "https://images.pexels.com/photos/34952073/pexels-photo-34952073.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400", badge: null, cat: "small_pets", sub: "غذای جوندگان" },
];

const catLabels: Record<string, string> = {
  dogs: "سگ", cats: "گربه", birds: "پرندگان", aquatics: "آبزیان",
  small_pets: "جوندگان", reptiles: "خزندگان", farm: "حیوانات مزرعه",
};

const sortOptions = ["مرتبط‌ترین", "پرفروش‌ترین", "ارزان‌ترین", "گران‌ترین", "امتیاز"];

function SearchContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat") || "";
  const subParam = searchParams.get("sub") || "";

  const [query, setQuery] = useState(subParam);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOpen, setSortOpen] = useState(false);
  const [sortIdx, setSortIdx] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    onlyAvailable: false,
    amazingOnly: false,
    freeShipping: false
  });

  const filtered = allProducts.filter(p => {
    if (catParam && p.cat !== catParam) return false;
    if (subParam && p.sub !== subParam) {
      if (query && !p.name.includes(query) && p.sub !== query) return false;
    }
    if (!catParam && !subParam && query && !p.name.includes(query)) return false;
    
    // Apply filters
    if (filters.amazingOnly && p.badge !== "شگفت‌انگیز") return false;
    if (filters.freeShipping && p.badge !== "ارسال رایگان") return false;
    // onlyAvailable logic could go here (e.g. if we had stock property)
    
    return true;
  });

  const pageTitle = subParam
    ? subParam
    : catParam
      ? `محصولات ${catLabels[catParam] || catParam}`
      : "جستجو";

  return (
    <div className="min-h-screen bg-[#f0f0f1] pb-20">
      {/* Header */}
      <div
        className="sticky top-0 z-40 px-4 py-3"
        style={{
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          borderBottom: "1px solid rgba(255,255,255,0.4)",
          boxShadow: "0 1px 20px rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex items-center gap-3">
          <Link href={catParam ? "/category" : "/"}>
            <ArrowRight className="w-6 h-6 text-[#3d4152]" />
          </Link>
          <div
            className="flex-1 flex items-center h-[44px] rounded-2xl px-3 gap-2"
            style={{
              background: "rgba(255,255,255,0.5)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.7)",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            <Search className="w-[18px] h-[18px] text-[#3d4152]/40 flex-shrink-0" />
            <input
              autoFocus={!catParam}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={pageTitle}
              className="flex-1 bg-transparent text-[13px] text-[#3d4152] placeholder-[#3d4152]/40 focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery("")}>
                <X className="w-4 h-4 text-[#3d4152]/40" />
              </button>
            )}
          </div>
        </div>

        {/* Active filters */}
        {(catParam || subParam) && (
          <div className="flex gap-2 mt-2 overflow-x-auto no-scrollbar">
            {catParam && (
              <span className="text-[11px] bg-[#ef4056]/10 text-[#ef4056] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                {catLabels[catParam] || catParam}
              </span>
            )}
            {subParam && (
              <span className="text-[11px] bg-[#19bfd3]/10 text-[#19bfd3] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                {subParam}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Sort + Filter bar */}
      <div className="bg-white border-b border-[#f0f0f1] px-4 py-2 flex items-center justify-between gap-3 sticky top-[67px] z-30">
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-1.5 text-[12px] font-bold text-[#3d4152] border border-[#e0e0e2] rounded-lg px-3 py-1.5"
        >
          <SlidersHorizontal className="w-4 h-4" />
          فیلتر
          {(filters.amazingOnly || filters.freeShipping || filters.onlyAvailable) && (
            <span className="w-2 h-2 bg-[#ef4056] rounded-full" />
          )}
        </button>
        <div className="relative flex-1">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-1 text-[12px] text-[#3d4152] font-medium"
          >
            مرتب‌سازی: <span className="text-[#ef4056] font-bold">{sortOptions[sortIdx]}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#ef4056]" />
          </button>
          {sortOpen && (
            <div className="absolute top-8 right-0 bg-white rounded-xl shadow-2xl border border-[#f0f0f1] overflow-hidden z-50 w-[160px]">
              {sortOptions.map((s, i) => (
                <button key={i} onClick={() => { setSortIdx(i); setSortOpen(false); }}
                  className={`w-full text-right px-4 py-3 text-[12px] border-b border-[#f0f0f1] last:border-0 ${i === sortIdx ? "text-[#ef4056] font-bold" : "text-[#3d4152]"}`}>
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
        <span className="text-[11px] text-[#81858b]">{toPersian(filtered.length)} کالا</span>
        <div className="flex gap-1">
          <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded-lg ${viewMode === "grid" ? "bg-[#f0f0f1]" : ""}`}>
            <Grid2X2 className={`w-4 h-4 ${viewMode === "grid" ? "text-[#3d4152]" : "text-[#a1a3a8]"}`} />
          </button>
          <button onClick={() => setViewMode("list")} className={`p-1.5 rounded-lg ${viewMode === "list" ? "bg-[#f0f0f1]" : ""}`}>
            <List className={`w-4 h-4 ${viewMode === "list" ? "text-[#3d4152]" : "text-[#a1a3a8]"}`} />
          </button>
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-6">
          <span className="text-5xl mb-4">🔍</span>
          <h3 className="text-[16px] font-bold text-[#3d4152]">محصولی یافت نشد!</h3>
          <p className="text-[12px] text-[#81858b] mt-2 text-center">
            متأسفانه محصولی مطابق با جستجوی شما پیدا نشد. لطفاً عبارت دیگری را جستجو کنید.
          </p>
          <Link href="/category" className="mt-4 bg-[#ef4056] text-white px-6 py-2.5 rounded-xl text-[13px] font-bold">
            مشاهده دسته‌بندی‌ها
          </Link>
        </div>
      )}

      {/* Products */}
      {filtered.length > 0 && viewMode === "grid" && (
        <div className="grid grid-cols-2 gap-px bg-[#e0e0e2] mt-0.5">
          {filtered.map(p => (
            <Link href={`/product/${p.id}`} key={p.id} className="bg-white p-3 flex flex-col">
              {p.badge && (
                <span className={`self-start text-[9px] font-bold px-1.5 py-0.5 rounded mb-1 ${
                  p.badge === "شگفت‌انگیز" ? "bg-[#ef4056] text-white" :
                  p.badge === "محبوب" ? "bg-[#ff9800] text-white" :
                  "bg-[#00a049] text-white"
                }`}>{p.badge}</span>
              )}
              <div className="w-full aspect-square bg-gray-50 rounded-xl overflow-hidden mb-3">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-[11px] text-[#3d4152] font-medium line-clamp-2 leading-[18px] flex-1">{p.name}</p>
              <div className="flex items-center gap-1 mt-2">
                <Star className="w-3 h-3 text-[#f9a825] fill-[#f9a825]" />
                <span className="text-[10px] text-[#81858b]">{toPersian(Math.floor(p.rating * 10) / 10)} ({toPersian(p.ratingCount)})</span>
              </div>
              <div className="mt-2 flex items-end justify-between">
                {p.discount > 0 && (
                  <span className="bg-[#ef4056] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full mb-1 self-end">{toPersian(p.discount)}٪</span>
                )}
                <div className="text-left flex-1 mr-1">
                  {p.discount > 0 && (
                    <div className="text-[10px] text-[#a1a3a8] line-through text-left">{formatPrice(p.price)}</div>
                  )}
                  <div className="text-[13px] font-black text-[#3d4152]">
                    {formatPrice(p.discount > 0 ? Math.round(p.price * (100 - p.discount) / 100) : p.price)}
                    <span className="text-[9px] font-normal text-[#81858b] mr-0.5">تومان</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {filtered.length > 0 && viewMode === "list" && (
        <div className="flex flex-col gap-0.5 bg-[#e0e0e2] mt-0.5">
          {filtered.map(p => (
            <Link href={`/product/${p.id}`} key={p.id} className="bg-white p-4 flex gap-4">
              <div className="w-[90px] flex-shrink-0 aspect-square bg-gray-50 rounded-xl overflow-hidden relative">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                {p.discount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#ef4056] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">{toPersian(p.discount)}٪</span>
                )}
              </div>
              <div className="flex-1 flex flex-col gap-1">
                {p.badge && (
                  <span className={`self-start text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    p.badge === "شگفت‌انگیز" ? "bg-[#ef4056] text-white" :
                    p.badge === "محبوب" ? "bg-[#ff9800] text-white" :
                    "bg-[#00a049] text-white"
                  }`}>{p.badge}</span>
                )}
                <p className="text-[12px] text-[#3d4152] font-medium line-clamp-3 leading-5">{p.name}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 text-[#f9a825] fill-[#f9a825]" />
                  <span className="text-[10px] text-[#81858b]">{toPersian(Math.floor(p.rating * 10) / 10)} ({toPersian(p.ratingCount)})</span>
                </div>
                <div className="mt-auto">
                  {p.discount > 0 && (
                    <div className="text-[10px] text-[#a1a3a8] line-through text-left">{formatPrice(p.price)} تومان</div>
                  )}
                  <div className="text-[15px] font-black text-[#3d4152] text-left">
                    {formatPrice(p.discount > 0 ? Math.round(p.price * (100 - p.discount) / 100) : p.price)}
                    <span className="text-[10px] font-normal text-[#81858b] mr-0.5">تومان</span>
                  </div>
                </div>
              </div>
            </Link>
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
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><span className="text-[#81858b]">در حال بارگذاری...</span></div>}>
      <SearchContent />
    </Suspense>
  );
}
