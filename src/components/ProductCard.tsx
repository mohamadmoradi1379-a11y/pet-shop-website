"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import type { Product, ProductBadge } from "@/data/products";
import { finalPrice, formatPrice, toPersian } from "@/lib/format";

const badgeStyle = (badge: ProductBadge) =>
  badge === "شگفت‌انگیز"
    ? "bg-[#ef4056] text-white"
    : badge === "محبوب"
      ? "bg-[#ff9800] text-white"
      : "bg-[#00a049] text-white";

function Price({ p, size = "md" }: { p: Product; size?: "sm" | "md" }) {
  return (
    <div className="text-left">
      {p.discount > 0 && (
        <div
          className={`text-[#a1a3a8] line-through ${size === "sm" ? "text-[9px]" : "text-[10px]"}`}
        >
          {formatPrice(p.price)}
        </div>
      )}
      <div
        className={`font-black text-[#3d4152] ${size === "sm" ? "text-[12px]" : "text-[14px]"}`}
      >
        {formatPrice(finalPrice(p.price, p.discount))}
        <span className="text-[9px] font-normal text-[#81858b] mr-0.5">تومان</span>
      </div>
    </div>
  );
}

function DiscountBadge({ p }: { p: Product }) {
  if (p.discount <= 0) return null;
  return (
    <span className="bg-[#ef4056] text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
      {toPersian(p.discount)}٪
    </span>
  );
}

function Rating({ p, compact = false }: { p: Product; compact?: boolean }) {
  return (
    <div className="flex items-center gap-1 mt-1">
      <Star className="w-3 h-3 text-[#f9a825] fill-[#f9a825]" />
      <span className="text-[10px] text-[#81858b]">
        {toPersian(p.rating)}
        {!compact && ` (${toPersian(p.ratingCount)})`}
      </span>
    </div>
  );
}

/** Vertical card used in the listing page grid (Digikala style). */
export function GridCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/product/${p.id}`}
      className="group bg-white p-3 flex flex-col relative hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-shadow"
    >
      {p.badge && (
        <span
          className={`absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded ${badgeStyle(p.badge)}`}
        >
          {p.badge}
        </span>
      )}
      <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#f7f7f8] mb-2">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <p className="text-[11px] text-[#3d4152] font-medium line-clamp-2 leading-[18px] flex-1">
        {p.name}
      </p>
      <Rating p={p} />
      <div className="mt-2 flex items-end justify-between gap-1">
        <DiscountBadge p={p} />
        <Price p={p} />
      </div>
      {p.stock <= 0 && (
        <span className="mt-1 text-[10px] text-[#ef4056] font-bold">ناموجود</span>
      )}
    </Link>
  );
}

/** Horizontal card used in the listing page list view. */
export function ListCard({ p }: { p: Product }) {
  return (
    <Link href={`/product/${p.id}`} className="bg-white p-4 flex gap-4">
      <div className="w-[100px] flex-shrink-0 aspect-square bg-[#f7f7f8] rounded-xl overflow-hidden relative">
        <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover" />
        {p.discount > 0 && (
          <span className="absolute top-1 right-1 bg-[#ef4056] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
            {toPersian(p.discount)}٪
          </span>
        )}
      </div>
      <div className="flex-1 flex flex-col gap-1">
        {p.badge && (
          <span
            className={`self-start text-[9px] font-bold px-1.5 py-0.5 rounded ${badgeStyle(p.badge)}`}
          >
            {p.badge}
          </span>
        )}
        <p className="text-[12px] text-[#3d4152] font-medium line-clamp-2 leading-5">{p.name}</p>
        <Rating p={p} />
        <div className="mt-auto flex items-end justify-between gap-2">
          <span className="text-[10px] text-[#81858b]">{p.brand}</span>
          <Price p={p} />
        </div>
      </div>
    </Link>
  );
}

/** Small tile used in the horizontal carousels on the home page. */
export function CompactCard({ p, withDivider }: { p: Product; withDivider?: boolean }) {
  return (
    <Link
      href={`/product/${p.id}`}
      className={`min-w-[150px] max-w-[150px] flex-shrink-0 px-2.5 py-2 ${
        withDivider ? "border-l border-[#e0e0e2]" : ""
      }`}
    >
      <div className="w-full aspect-square rounded-lg overflow-hidden bg-[#f7f7f8] mb-2">
        <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover" />
      </div>
      <p className="text-[11px] text-[#3d4152] font-medium line-clamp-2 h-[34px] leading-[17px]">
        {p.name}
      </p>
      <div className="mt-2 flex items-center justify-between">
        <DiscountBadge p={p} />
        <Price p={p} size="sm" />
      </div>
      {p.discount > 0 && (
        <div className="text-[10px] text-[#81858b] line-through text-left mt-0.5">
          {formatPrice(p.price)}
        </div>
      )}
    </Link>
  );
}
