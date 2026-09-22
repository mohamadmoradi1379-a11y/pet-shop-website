"use client";
import { useState } from "react";
import {
  ArrowRight, Heart, Share2, Star, ChevronDown, ChevronLeft,
  ShieldCheck, Truck, RotateCcw, ShoppingCart, Plus, Minus, MessageCircle
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import MobileNav from "@/components/MobileNav";

const toPersian = (n: number) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
const formatPrice = (n: number) => n.toLocaleString("fa-IR");

const products: Record<string, {
  id: number; name: string; price: number; discount: number;
  rating: number; ratingCount: number; image: string; images: string[];
  description: string; specs: Array<{ label: string; value: string }>;
}> = {
  "1": {
    id: 1,
    name: "غذای خشک سگ بالغ رویال کنین مدل Maxi Adult وزن ۱۵ کیلوگرم",
    price: 2850000,
    discount: 15,
    rating: 4.6,
    ratingCount: 1240,
    image: "https://images.pexels.com/photos/12928244/pexels-photo-12928244.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600",
    images: [
      "https://images.pexels.com/photos/12928244/pexels-photo-12928244.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300",
      "https://images.pexels.com/photos/18764141/pexels-photo-18764141.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300",
      "https://images.pexels.com/photos/34952073/pexels-photo-34952073.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300",
    ],
    description: "غذای خشک سگ رویال کنین برای نژادهای بزرگ بالغ فرموله شده است. این محصول حاوی پروتئین‌های با کیفیت بالا برای حفظ توده عضلانی، اسیدهای چرب امگا ۳ و ۶ برای پوست و موی سالم، و آنتی‌اکسیدان‌ها برای تقویت سیستم ایمنی است.",
    specs: [
      { label: "برند", value: "رویال کنین" },
      { label: "وزن", value: "۱۵ کیلوگرم" },
      { label: "نوع", value: "غذای خشک" },
      { label: "مناسب برای", value: "سگ بالغ" },
      { label: "نژاد مناسب", value: "نژادهای بزرگ (بالای ۲۶ کیلوگرم)" },
      { label: "سن مناسب", value: "۱۵ ماه تا ۵ سال" },
      { label: "طعم", value: "مرغ و برنج" },
    ],
  },
};

// Default product for other IDs
const defaultProduct = {
  id: 0,
  name: "غذای خشک گربه بالغ ویسکاس با طعم مرغ",
  price: 980000,
  discount: 12,
  rating: 4.4,
  ratingCount: 870,
  image: "https://images.pexels.com/photos/27279130/pexels-photo-27279130.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600",
  images: [
    "https://images.pexels.com/photos/27279130/pexels-photo-27279130.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300",
    "https://images.pexels.com/photos/9660361/pexels-photo-9660361.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300",
    "https://images.pexels.com/photos/16577552/pexels-photo-16577552.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300",
  ],
  description: "غذای خشک ویسکاس برای گربه‌های بالغ با طعم مرغ، حاوی تمام مواد مغذی ضروری برای سلامت گربه شما.",
  specs: [
    { label: "برند", value: "ویسکاس" },
    { label: "وزن", value: "۷ کیلوگرم" },
    { label: "نوع", value: "غذای خشک" },
    { label: "مناسب برای", value: "گربه بالغ" },
    { label: "طعم", value: "مرغ" },
  ],
};

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const productId = typeof params?.id === "string" ? params.id : "1";
  const p = products[productId] ?? defaultProduct;
  const finalPrice = Math.round(p.price * (100 - p.discount) / 100);
  const saving = p.price - finalPrice;

  const [selectedImg, setSelectedImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  const [specOpen, setSpecOpen] = useState(false);
  const [descOpen, setDescOpen] = useState(false);

  const ratingBars = [5, 4, 3, 2, 1];
  const ratingDist = [62, 22, 10, 4, 2];

  return (
    <div className="min-h-screen bg-[#f0f0f1] pb-32">
      {/* Header */}
      <div
        className="sticky top-0 z-40 flex items-center justify-between px-4 h-[52px]"
        style={{
          background: "rgba(255,255,255,0.65)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          borderBottom: "1px solid rgba(255,255,255,0.4)",
          boxShadow: "0 1px 12px rgba(0,0,0,0.05)",
        }}
      >
        <div className="flex items-center gap-4">
          <Link href="/search"><ArrowRight className="w-6 h-6 text-[#3d4152]" /></Link>
          <span className="text-[14px] font-bold text-[#3d4152] line-clamp-1 max-w-[220px]">صفحه محصول</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setLiked(!liked)}>
            <Heart className={`w-5 h-5 ${liked ? "fill-[#ef4056] text-[#ef4056]" : "text-[#81858b]"}`} />
          </button>
          <button><Share2 className="w-5 h-5 text-[#81858b]" /></button>
        </div>
      </div>

      {/* Main Image */}
      <div className="bg-white">
        <div className="relative w-full h-[300px] md:h-[450px]">
          <img
            src={p.images[selectedImg]}
            alt={p.name}
            className="w-full h-full object-contain p-4"
          />
          {p.discount > 0 && (
            <span className="absolute top-4 right-4 bg-[#ef4056] text-white text-[11px] font-black px-2 py-1 rounded-full">
              {toPersian(p.discount)}٪
            </span>
          )}
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-2 px-4 pb-4 justify-center">
          {p.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImg(i)}
              className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                selectedImg === i ? "border-[#ef4056]" : "border-[#e0e0e2]"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-white mt-2 px-4 py-4">
        {/* Brand tag */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] text-[#19bfd3] font-bold border border-[#19bfd3]/30 rounded px-2 py-0.5">رویال کنین</span>
          <span className="text-[11px] text-[#81858b]">کد: {toPersian(p.id * 10 + 1234)}</span>
        </div>

        <h1 className="text-[15px] font-bold text-[#3d4152] leading-7">{p.name}</h1>

        {/* Rating row */}
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(star => (
              <Star key={star} className={`w-4 h-4 ${star <= Math.round(p.rating) ? "fill-[#f9a825] text-[#f9a825]" : "text-[#e0e0e2]"}`} />
            ))}
          </div>
          <span className="text-[12px] text-[#81858b]">{toPersian(p.ratingCount)} نظر</span>
          <span className="text-[12px] text-[#3d4152] font-bold">{p.rating}</span>
        </div>
      </div>

      {/* Price section */}
      <div className="bg-white mt-2 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {p.discount > 0 && (
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[12px] text-[#a1a3a8] line-through">{formatPrice(p.price)} تومان</span>
                <span className="text-[11px] text-[#00a049] font-bold">{formatPrice(saving)} تومان سود شما</span>
              </div>
            )}
            <div className="text-[22px] font-black text-[#3d4152]">
              {formatPrice(finalPrice)}
              <span className="text-[13px] font-normal text-[#81858b] mr-1">تومان</span>
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-2 border border-[#e0e0e2] rounded-xl px-3 py-2">
            <button onClick={() => setQty(q => Math.max(1, q - 1))}>
              <Minus className="w-4 h-4 text-[#ef4056]" />
            </button>
            <span className="text-[15px] font-bold text-[#3d4152] min-w-[20px] text-center">{toPersian(qty)}</span>
            <button onClick={() => setQty(q => q + 1)}>
              <Plus className="w-4 h-4 text-[#ef4056]" />
            </button>
          </div>
        </div>

        {/* Services */}
        <div className="mt-4 flex flex-col gap-2.5 pt-4 border-t border-[#f0f0f1]">
          <div className="flex items-center gap-2 text-[11px] text-[#3d4152]">
            <ShieldCheck className="w-4 h-4 text-[#19bfd3] flex-shrink-0" />
            <span>گارانتی اصالت و سلامت فیزیکی کالا</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#3d4152]">
            <Truck className="w-4 h-4 text-[#00a049] flex-shrink-0" />
            <span>ارسال رایگان برای سفارش‌های بالای ۵۰۰ هزار تومان</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#3d4152]">
            <RotateCcw className="w-4 h-4 text-[#f9a825] flex-shrink-0" />
            <span>۷ روز ضمانت بازگشت کالا</span>
          </div>
        </div>
      </div>

      {/* Specs */}
      <div className="bg-white mt-2">
        <button
          onClick={() => setSpecOpen(!specOpen)}
          className="w-full flex items-center justify-between px-4 py-4"
        >
          <span className="text-[14px] font-bold text-[#3d4152]">مشخصات فنی</span>
          <ChevronDown className={`w-5 h-5 text-[#81858b] transition-transform ${specOpen ? "rotate-180" : ""}`} />
        </button>
        {specOpen && (
          <div className="px-4 pb-4 border-t border-[#f0f0f1]">
            <table className="w-full text-[12px]">
              <tbody>
                {p.specs.map((s, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-[#f9f9f9]" : "bg-white"}>
                    <td className="py-3 px-3 text-[#81858b] w-1/2 rounded-r">{s.label}</td>
                    <td className="py-3 px-3 text-[#3d4152] font-medium rounded-l">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="bg-white mt-2">
        <button
          onClick={() => setDescOpen(!descOpen)}
          className="w-full flex items-center justify-between px-4 py-4"
        >
          <span className="text-[14px] font-bold text-[#3d4152]">معرفی محصول</span>
          <ChevronDown className={`w-5 h-5 text-[#81858b] transition-transform ${descOpen ? "rotate-180" : ""}`} />
        </button>
        {descOpen && (
          <div className="px-4 pb-4 border-t border-[#f0f0f1]">
            <p className="text-[12px] text-[#3d4152] leading-7 mt-3">{p.description}</p>
          </div>
        )}
      </div>

      {/* Ratings breakdown */}
      <div className="bg-white mt-2 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[14px] font-bold text-[#3d4152]">امتیاز و دیدگاه‌ها</h2>
          <button className="flex items-center gap-1 text-[#19bfd3] text-[12px] font-bold">
            مشاهده همه <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex flex-col items-center">
            <span className="text-[42px] font-black text-[#3d4152] leading-none">{p.rating}</span>
            <div className="flex mt-1">
              {[1,2,3,4,5].map(s => (
                <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.round(p.rating) ? "fill-[#f9a825] text-[#f9a825]" : "text-[#e0e0e2]"}`} />
              ))}
            </div>
            <span className="text-[10px] text-[#81858b] mt-1">{toPersian(p.ratingCount)} رأی</span>
          </div>
          <div className="flex-1 flex flex-col gap-1.5">
            {ratingBars.map((star, i) => (
              <div key={star} className="flex items-center gap-2">
                <span className="text-[10px] text-[#81858b] w-3">{toPersian(star)}</span>
                <div className="flex-1 h-1.5 bg-[#f0f0f1] rounded-full overflow-hidden">
                  <div className="h-full bg-[#f9a825] rounded-full" style={{ width: `${ratingDist[i]}%` }} />
                </div>
                <span className="text-[10px] text-[#81858b] w-5">{toPersian(ratingDist[i])}٪</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sample review */}
        <div className="mt-4 pt-4 border-t border-[#f0f0f1]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-[#ef4056] flex items-center justify-center text-white text-[12px] font-bold">م</div>
            <div>
              <div className="text-[12px] font-bold text-[#3d4152]">محمد رضایی</div>
              <div className="flex gap-0.5 mt-0.5">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-[#f9a825] text-[#f9a825]" />)}
              </div>
            </div>
          </div>
          <p className="text-[12px] text-[#3d4152] leading-6">
            محصول بسیار عالی، سگم خیلی دوست داره. کیفیت و بسته‌بندی هر دو عالی بود. پیشنهاد می‌کنم حتماً امتحان کنید.
          </p>
        </div>
      </div>

      {/* Similar products */}
      <div className="bg-white mt-2 py-4">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="text-[14px] font-bold text-[#3d4152]">محصولات مشابه</h2>
          <Link href="/search" className="text-[#19bfd3] text-[12px] font-bold flex items-center gap-0.5">مشاهده همه <ChevronLeft className="w-4 h-4" /></Link>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-4">
          {[1,2,3,4].map(i => (
            <Link href="/search" key={i} className="min-w-[130px] bg-[#f9f9f9] rounded-xl p-2.5 flex flex-col">
              <div className="w-full aspect-square rounded-lg overflow-hidden mb-2">
                <img src={`https://images.pexels.com/photos/${[12928244,27279130,9248865,9660361][i-1]}/pexels-photo-${[12928244,27279130,9248865,9660361][i-1]}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200`} alt="" className="w-full h-full object-cover" />
              </div>
              <p className="text-[10px] text-[#3d4152] font-medium line-clamp-2 leading-4">غذای خشک سگ رویال کنین</p>
              <div className="text-[12px] font-black text-[#3d4152] mt-1">{formatPrice(850000 + i * 100000)}<span className="text-[9px] font-normal text-[#81858b] mr-0.5">تومان</span></div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div
        className="fixed bottom-[56px] left-0 right-0 px-4 py-3 flex gap-3 z-40"
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderTop: "1px solid rgba(255,255,255,0.6)",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.07)",
        }}
      >
        <button className="w-12 h-12 rounded-xl border border-[#e0e0e2] flex items-center justify-center flex-shrink-0">
          <MessageCircle className="w-5 h-5 text-[#3d4152]" />
        </button>
        <button className="flex-1 bg-[#ef4056] text-white rounded-xl font-black text-[14px] h-12 flex items-center justify-center gap-2 shadow-lg shadow-[#ef4056]/20 hover:bg-[#d93a4e] transition-colors">
          <ShoppingCart className="w-5 h-5" />
          افزودن به سبد خرید
        </button>
      </div>

      <MobileNav />
    </div>
  );
}
