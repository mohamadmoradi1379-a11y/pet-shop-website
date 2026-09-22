"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, Headphones } from "lucide-react";

const amazingProducts = [
  {
    id: 1,
    name: "غذای خشک سگ بالغ رویال کنین مدل Maxi Adult",
    price: 2850000,
    discount: 25,
    image: "https://images.pexels.com/photos/12928244/pexels-photo-12928244.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300",
  },
  {
    id: 2,
    name: "کنسرو گربه شسیر با طعم مرغ ۴۰۰ گرمی",
    price: 185000,
    discount: 15,
    image: "https://images.pexels.com/photos/16577552/pexels-photo-16577552.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300",
  },
  {
    id: 3,
    name: "قلاده گردنی چرمی مخصوص سگ‌های بزرگ",
    price: 450000,
    discount: 30,
    image: "https://images.pexels.com/photos/37559533/pexels-photo-37559533.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300",
  },
  {
    id: 4,
    name: "تشویقی سگ مدادی با طعم گوشت بره ۵ عددی",
    price: 95000,
    discount: 10,
    image: "https://images.pexels.com/photos/18764141/pexels-photo-18764141.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300",
  },
  {
    id: 5,
    name: "شامپو ضد کک و کنه سگ و گربه ۲۵۰ میلی‌لیتر",
    price: 320000,
    discount: 20,
    image: "https://images.pexels.com/photos/27279130/pexels-photo-27279130.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300",
  },
];

export default function AmazingOffers() {
  const [timeLeft, setTimeLeft] = useState({ h: 21, m: 48, s: 37 });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { h, m, s } = prev;
        if (s > 0) s--;
        else if (m > 0) { s = 59; m--; }
        else if (h > 0) { s = 59; m = 59; h--; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toPersian = (n: number) => {
    return String(n).padStart(2, "0").replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
  };

  const formatPrice = (n: number) => {
    return n.toLocaleString("fa-IR");
  };

  return (
    <div className="bg-[#ef4056] py-4">
      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar px-4" ref={scrollRef}>
        {/* Right side: Title + Timer */}
        <div className="flex flex-col items-center justify-center min-w-[120px] gap-3 py-2">
          {/* Amazing Logo */}
          <div className="flex items-center gap-1">
            <span className="text-white text-[22px] font-black">شگفت‌انگیز</span>
            <span className="text-yellow-300 text-[26px] font-black">٪</span>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-1 direction-ltr">
            <span className="countdown-digit">{toPersian(timeLeft.h)}</span>
            <span className="text-white font-bold text-lg">:</span>
            <span className="countdown-digit">{toPersian(timeLeft.m)}</span>
            <span className="text-white font-bold text-lg">:</span>
            <span className="countdown-digit">{toPersian(timeLeft.s)}</span>
          </div>

          {/* Headphone Icon */}
          <div className="bg-[#4568dc] rounded-full p-3 shadow-lg">
            <Headphones className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Products */}
        {amazingProducts.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl p-3 min-w-[155px] max-w-[155px] flex flex-col gap-1 flex-shrink-0 shadow-sm"
          >
            <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-50">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover"
              />
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
                  {formatPrice(Math.round(p.price * (100 - p.discount) / 100))}
                  <span className="text-[9px] mr-0.5">تومان</span>
                </div>
              </div>
            </div>
            <div className="text-[10px] text-[#81858b] line-through text-left">
              {formatPrice(p.price)}
            </div>
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-pink-100 rounded-full mt-1">
              <div
                className="h-full bg-[#ef4056] rounded-full"
                style={{ width: `${Math.random() * 40 + 40}%` }}
              />
            </div>
          </div>
        ))}

        {/* See All */}
        <div className="min-w-[100px] flex flex-col items-center justify-center text-white gap-2 cursor-pointer flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-[#ef4056]" />
          </div>
          <span className="text-[12px] font-bold whitespace-nowrap">مشاهده همه</span>
        </div>
      </div>
    </div>
  );
}
