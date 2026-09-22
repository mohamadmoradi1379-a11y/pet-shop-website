"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, Headphones } from "lucide-react";
import Link from "next/link";
import { amazingProducts } from "@/data/products";
import { finalPrice, formatPrice, toPersian } from "@/lib/format";

export default function AmazingOffers() {
  const [timeLeft, setTimeLeft] = useState({ h: 21, m: 48, s: 37 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { h, m, s } = prev;
        if (s > 0) s--;
        else if (m > 0) {
          s = 59;
          m--;
        } else if (h > 0) {
          s = 59;
          m = 59;
          h--;
        }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toPersianPadded = (n: number) =>
    toPersian(String(n).padStart(2, "0"));

  return (
    <div className="bg-[#ef4056] py-4">
      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar px-4">
        {/* Right side: Title + Timer */}
        <div className="flex flex-col items-center justify-center min-w-[120px] gap-3 py-2">
          <div className="flex items-center gap-1">
            <span className="text-white text-[22px] font-black">شگفت‌انگیز</span>
            <span className="text-yellow-300 text-[26px] font-black">٪</span>
          </div>

          <div className="flex items-center gap-1 direction-ltr">
            <span className="countdown-digit">{toPersianPadded(timeLeft.h)}</span>
            <span className="text-white font-bold text-lg">:</span>
            <span className="countdown-digit">{toPersianPadded(timeLeft.m)}</span>
            <span className="text-white font-bold text-lg">:</span>
            <span className="countdown-digit">{toPersianPadded(timeLeft.s)}</span>
          </div>

          <div className="bg-[#4568dc] rounded-full p-3 shadow-lg">
            <Headphones className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Products */}
        {amazingProducts.map((p) => (
          <Link
            href={`/product/${p.id}`}
            key={p.id}
            className="bg-white rounded-xl p-3 min-w-[155px] max-w-[155px] flex flex-col gap-1 flex-shrink-0 shadow-sm"
          >
            <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-50">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <p className="text-[11px] font-medium text-[#3d4152] line-clamp-2 h-[34px] mt-1 leading-[17px]">
              {p.name}
            </p>
            <div className="flex items-center justify-between mt-auto">
              <span className="bg-[#ef4056] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {toPersian(p.discount)}٪
              </span>
              <div className="text-left">
                <div className="text-[13px] font-bold text-[#3d4152]">
                  {formatPrice(finalPrice(p.price, p.discount))}
                  <span className="text-[9px] mr-0.5">تومان</span>
                </div>
              </div>
            </div>
            <div className="text-[10px] text-[#81858b] line-through text-left">
              {formatPrice(p.price)}
            </div>
            {/* Progress bar (value derived from the id so SSR and client match) */}
            <div className="w-full h-1.5 bg-pink-100 rounded-full mt-1">
              <div
                className="h-full bg-[#ef4056] rounded-full"
                style={{ width: `${((p.id * 37) % 45) + 40}%` }}
              />
            </div>
          </Link>
        ))}

        {/* See All */}
        <Link
          href="/search"
          className="min-w-[100px] flex flex-col items-center justify-center text-white gap-2 cursor-pointer flex-shrink-0"
        >
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-[#ef4056]" />
          </div>
          <span className="text-[12px] font-bold whitespace-nowrap">مشاهده همه</span>
        </Link>
      </div>
    </div>
  );
}
