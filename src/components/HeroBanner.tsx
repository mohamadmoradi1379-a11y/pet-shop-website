"use client";
import { useState, useEffect, useRef } from "react";

const banners = [
  {
    id: 1,
    image: "/images/banner1.jpg",
    title: "بهترین غذای حیوانات",
    subtitle: "تا ۴۰٪ تخفیف",
    cta: "خرید",
  },
  {
    id: 2,
    image: "/images/banner2.jpg",
    title: "لوازم جانبی پت",
    subtitle: "قلاده، تخت، اسباب‌بازی",
    cta: "خرید",
  },
  {
    id: 3,
    image: "/images/banner3.jpg",
    title: "محصولات ویژه گربه",
    subtitle: "با بهترین کیفیت",
    cta: "خرید",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Handle native scroll to update dots
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.clientWidth;
      // In RTL, scrollLeft is negative or counts from right depending on browser, 
      // but standard approach is Math.abs for cross-browser RTL compat.
      const index = Math.round(Math.abs(scrollLeft) / width);
      setCurrent(index);
    }
  };

  // Auto scroll
  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollRef.current) {
        const width = scrollRef.current.clientWidth;
        const nextIndex = (current + 1) % banners.length;
        
        // Use smooth scrolling to the next slide
        scrollRef.current.scrollTo({
          // In RTL, to go to next slide (leftwards visually), we subtract width
          // Some browsers handle RTL scroll positive/negative differently, so we use direction-aware scroll
          left: document.dir === 'rtl' ? -(nextIndex * width) : (nextIndex * width),
          behavior: 'smooth'
        });
        setCurrent(nextIndex);
      }
    }, 4000);
    return () => clearInterval(timer);
  }, [current]);

  const scrollToSlide = (index: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: document.dir === 'rtl' ? -(index * width) : (index * width),
        behavior: 'smooth'
      });
      setCurrent(index);
    }
  };

  return (
    <div className="px-4 py-3 bg-white">
      <div className="relative w-full h-[160px] md:h-[350px] rounded-2xl overflow-hidden">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
          style={{ scrollBehavior: 'smooth' }}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="w-full h-full flex-shrink-0 snap-center relative">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay Text */}
              <div className="absolute inset-0 flex flex-col items-start justify-center pr-6 md:pr-16 bg-gradient-to-l from-black/60 via-black/10 to-transparent text-right">
                <div className="flex flex-col items-start">
                  <h2 className="text-white text-xl md:text-5xl font-black drop-shadow-2xl text-right leading-tight">
                    {banner.title}
                  </h2>
                  <p className="text-white text-sm md:text-2xl mt-3 font-bold drop-shadow-xl text-right">
                    {banner.subtitle}
                  </p>
                  <button className="mt-6 bg-white text-[#ef4056] text-[10px] md:text-[14px] font-black px-10 py-3 rounded-xl shadow-2xl hover:bg-gray-100 transition-all transform hover:scale-105">
                    {banner.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "bg-white w-5" : "bg-white/50 w-1.5"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
