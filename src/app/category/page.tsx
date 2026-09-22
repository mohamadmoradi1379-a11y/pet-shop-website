"use client";
import { useState } from "react";
import { ChevronUp, ChevronDown, ChevronLeft, ArrowRight, Search, Camera, Headphones } from "lucide-react";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";

// ─── DATA ─────────────────────────────────────────────────────────────────────

type SubGroup = {
  title: string;
  href: string;
  items: { label: string; emoji: string; href: string }[];
};

type MainCat = {
  id: string;
  label: string;
  icon: string;
  viewAllHref: string;
  groups: SubGroup[];
};

const mainCategories: MainCat[] = [
  {
    id: "dogs",
    label: "سگ",
    icon: "🐶",
    viewAllHref: "/search?cat=dogs",
    groups: [
      {
        title: "برندهای برتر غذای سگ",
        href: "/search?cat=dogs",
        items: [
          { label: "رویال کنین", emoji: "🏆", href: "/search?cat=dogs&sub=غذای+خشک+سگ" },
          { label: "جوسرا", emoji: "⭐", href: "/search?cat=dogs&sub=غذای+خشک+سگ" },
          { label: "پدیگری", emoji: "🐾", href: "/search?cat=dogs&sub=کنسرو+و+پوچ+سگ" },
          { label: "پروپلن", emoji: "💎", href: "/search?cat=dogs&sub=غذای+خشک+سگ" },
          { label: "یوکانوبا", emoji: "🌟", href: "/search?cat=dogs&sub=غذای+خشک+سگ" },
          { label: "همه کالاها", emoji: "🔲", href: "/search?cat=dogs" },
        ],
      },
      {
        title: "غذا براساس نوع",
        href: "/search?cat=dogs",
        items: [
          { label: "غذای خشک", emoji: "🥣", href: "/search?cat=dogs&sub=غذای+خشک+سگ" },
          { label: "کنسرو و پوچ", emoji: "🥫", href: "/search?cat=dogs&sub=کنسرو+و+پوچ+سگ" },
          { label: "تشویقی", emoji: "🦴", href: "/search?cat=dogs&sub=تشویقی+و+دنتال" },
          { label: "مکمل و ویتامین", emoji: "💊", href: "/search?cat=dogs&sub=مکمل+و+ویتامین" },
          { label: "دنتال استیک", emoji: "🦷", href: "/search?cat=dogs&sub=تشویقی+و+دنتال" },
          { label: "همه کالاها", emoji: "🔲", href: "/search?cat=dogs" },
        ],
      },
      {
        title: "لوازم و اکسسوری",
        href: "/search?cat=dogs",
        items: [
          { label: "قلاده و بند", emoji: "📿", href: "/search?cat=dogs&sub=قلاده+و+بند" },
          { label: "تخت و جای خواب", emoji: "🛏️", href: "/search?cat=dogs&sub=جای+خواب+و+باکس" },
          { label: "اسباب‌بازی", emoji: "🎾", href: "/search?cat=dogs&sub=اسباب‌بازی+سگ" },
          { label: "ظرف آب و غذا", emoji: "🥣", href: "/search?cat=dogs&sub=ظروف+آب+و+غذا" },
          { label: "لوازم بهداشتی", emoji: "🧴", href: "/search?cat=dogs&sub=لوازم+بهداشتی+سگ" },
          { label: "همه کالاها", emoji: "🔲", href: "/search?cat=dogs" },
        ],
      },
    ],
  },
  {
    id: "cats",
    label: "گربه",
    icon: "🐱",
    viewAllHref: "/search?cat=cats",
    groups: [
      {
        title: "برندهای برتر غذای گربه",
        href: "/search?cat=cats",
        items: [
          { label: "ویسکاس", emoji: "🐱", href: "/search?cat=cats&sub=غذای+خشک+گربه" },
          { label: "رویال کنین", emoji: "🏆", href: "/search?cat=cats&sub=غذای+خشک+گربه" },
          { label: "شسیر", emoji: "🐠", href: "/search?cat=cats&sub=کنسرو+و+پوچ+گربه" },
          { label: "هپی کت", emoji: "😺", href: "/search?cat=cats&sub=غذای+خشک+گربه" },
          { label: "کت چاو", emoji: "✨", href: "/search?cat=cats&sub=غذای+خشک+گربه" },
          { label: "همه کالاها", emoji: "🔲", href: "/search?cat=cats" },
        ],
      },
      {
        title: "غذا براساس نوع",
        href: "/search?cat=cats",
        items: [
          { label: "غذای خشک", emoji: "🥣", href: "/search?cat=cats&sub=غذای+خشک+گربه" },
          { label: "کنسرو و پوچ", emoji: "🥫", href: "/search?cat=cats&sub=کنسرو+و+پوچ+گربه" },
          { label: "تشویقی گربه", emoji: "🐟", href: "/search?cat=cats&sub=تشویقی+گربه" },
          { label: "خاک گربه", emoji: "🪨", href: "/search?cat=cats&sub=خاک+گربه" },
          { label: "ظرف خاک", emoji: "📦", href: "/search?cat=cats&sub=ظرف+خاک+و+بیلچه" },
          { label: "همه کالاها", emoji: "🔲", href: "/search?cat=cats" },
        ],
      },
      {
        title: "لوازم و اکسسوری",
        href: "/search?cat=cats",
        items: [
          { label: "اسکرچر", emoji: "🌲", href: "/search?cat=cats&sub=جای+خواب+و+اسکرچر" },
          { label: "اسباب‌بازی", emoji: "🎣", href: "/search?cat=cats&sub=اسباب‌بازی+گربه" },
          { label: "تخت و خواب", emoji: "🛏️", href: "/search?cat=cats&sub=جای+خواب+و+اسکرچر" },
          { label: "لوازم بهداشتی", emoji: "🧴", href: "/search?cat=cats&sub=لوازم+بهداشتی+گربه" },
          { label: "سیستم آبخوری", emoji: "💧", href: "/search?cat=cats" },
          { label: "همه کالاها", emoji: "🔲", href: "/search?cat=cats" },
        ],
      },
    ],
  },
  {
    id: "birds",
    label: "پرندگان",
    icon: "🦜",
    viewAllHref: "/search?cat=birds",
    groups: [
      {
        title: "غذای پرندگان",
        href: "/search?cat=birds",
        items: [
          { label: "غذای طوطی", emoji: "🦜", href: "/search?cat=birds&sub=غذای+پرندگان" },
          { label: "غذای قناری", emoji: "🐦", href: "/search?cat=birds&sub=غذای+پرندگان" },
          { label: "غذای مرغ عشق", emoji: "💕", href: "/search?cat=birds&sub=غذای+پرندگان" },
          { label: "دانه و میوه", emoji: "🍎", href: "/search?cat=birds&sub=غذای+پرندگان" },
          { label: "مکمل پرنده", emoji: "💊", href: "/search?cat=birds" },
          { label: "همه کالاها", emoji: "🔲", href: "/search?cat=birds" },
        ],
      },
      {
        title: "لوازم و قفس",
        href: "/search?cat=birds",
        items: [
          { label: "قفس طوطی", emoji: "🏠", href: "/search?cat=birds&sub=قفس+پرنده" },
          { label: "قفس قناری", emoji: "🏡", href: "/search?cat=birds&sub=قفس+پرنده" },
          { label: "اسباب‌بازی پرنده", emoji: "🎮", href: "/search?cat=birds&sub=اسباب‌بازی+پرنده" },
          { label: "آبخوری و ظرف", emoji: "💧", href: "/search?cat=birds" },
          { label: "آداپتور قفس", emoji: "🔧", href: "/search?cat=birds&sub=لوازم+جانبی+قفس" },
          { label: "همه کالاها", emoji: "🔲", href: "/search?cat=birds" },
        ],
      },
    ],
  },
  {
    id: "aquatics",
    label: "آبزیان",
    icon: "🐠",
    viewAllHref: "/search?cat=aquatics",
    groups: [
      {
        title: "غذای آبزیان",
        href: "/search?cat=aquatics",
        items: [
          { label: "غذای ماهی تزئینی", emoji: "🐠", href: "/search?cat=aquatics&sub=غذای+ماهی" },
          { label: "غذای طلاماهی", emoji: "🐟", href: "/search?cat=aquatics&sub=غذای+ماهی" },
          { label: "غذای کیلی", emoji: "🐡", href: "/search?cat=aquatics&sub=غذای+ماهی" },
          { label: "غذای لاک‌پشت", emoji: "🐢", href: "/search?cat=aquatics" },
          { label: "غذای میگو", emoji: "🦐", href: "/search?cat=aquatics" },
          { label: "همه کالاها", emoji: "🔲", href: "/search?cat=aquatics" },
        ],
      },
      {
        title: "آکواریوم و تجهیزات",
        href: "/search?cat=aquatics",
        items: [
          { label: "آکواریوم", emoji: "🪟", href: "/search?cat=aquatics&sub=آکواریوم" },
          { label: "پمپ هوا", emoji: "💨", href: "/search?cat=aquatics&sub=پمپ+هوا+و+فیلتر" },
          { label: "فیلتر آب", emoji: "🔵", href: "/search?cat=aquatics&sub=پمپ+هوا+و+فیلتر" },
          { label: "بخاری آکواریوم", emoji: "🌡️", href: "/search?cat=aquatics&sub=بخاری+و+دماسنج" },
          { label: "تزیینات", emoji: "🪸", href: "/search?cat=aquatics&sub=تزیینات+آکواریوم" },
          { label: "همه کالاها", emoji: "🔲", href: "/search?cat=aquatics" },
        ],
      },
    ],
  },
  {
    id: "small_pets",
    label: "جوندگان",
    icon: "🐹",
    viewAllHref: "/search?cat=small_pets",
    groups: [
      {
        title: "غذا و تغذیه",
        href: "/search?cat=small_pets",
        items: [
          { label: "غذای همستر", emoji: "🐹", href: "/search?cat=small_pets&sub=غذای+جوندگان" },
          { label: "غذای خرگوش", emoji: "🐰", href: "/search?cat=small_pets&sub=غذای+جوندگان" },
          { label: "غذای خوکچه", emoji: "🐾", href: "/search?cat=small_pets&sub=غذای+جوندگان" },
          { label: "تشویقی جوندگان", emoji: "🌽", href: "/search?cat=small_pets" },
          { label: "مکمل", emoji: "💊", href: "/search?cat=small_pets" },
          { label: "همه کالاها", emoji: "🔲", href: "/search?cat=small_pets" },
        ],
      },
      {
        title: "قفس و لوازم",
        href: "/search?cat=small_pets",
        items: [
          { label: "قفس همستر", emoji: "🏠", href: "/search?cat=small_pets&sub=قفس+جوندگان" },
          { label: "قفس خرگوش", emoji: "🏡", href: "/search?cat=small_pets&sub=قفس+جوندگان" },
          { label: "بستر و پوشال", emoji: "🪹", href: "/search?cat=small_pets&sub=پوشال+و+بستر" },
          { label: "چرخ دویدن", emoji: "⚙️", href: "/search?cat=small_pets" },
          { label: "اسباب‌بازی", emoji: "🎯", href: "/search?cat=small_pets" },
          { label: "همه کالاها", emoji: "🔲", href: "/search?cat=small_pets" },
        ],
      },
    ],
  },
  {
    id: "reptiles",
    label: "خزندگان",
    icon: "🐢",
    viewAllHref: "/search?cat=reptiles",
    groups: [
      {
        title: "غذا و تغذیه",
        href: "/search?cat=reptiles",
        items: [
          { label: "غذای لاک‌پشت", emoji: "🐢", href: "/search?cat=reptiles&sub=غذای+خزندگان" },
          { label: "غذای مار", emoji: "🐍", href: "/search?cat=reptiles&sub=غذای+خزندگان" },
          { label: "غذای آفتاب‌پرست", emoji: "🦎", href: "/search?cat=reptiles&sub=غذای+خزندگان" },
          { label: "مکمل و کلسیم", emoji: "💊", href: "/search?cat=reptiles" },
          { label: "همه کالاها", emoji: "🔲", href: "/search?cat=reptiles" },
        ],
      },
      {
        title: "تراریوم و تجهیزات",
        href: "/search?cat=reptiles",
        items: [
          { label: "تراریوم", emoji: "🪟", href: "/search?cat=reptiles&sub=تراریوم" },
          { label: "لامپ گرمایشی", emoji: "💡", href: "/search?cat=reptiles&sub=لوازم+گرمایشی" },
          { label: "بستر تراریوم", emoji: "🪨", href: "/search?cat=reptiles&sub=بستر+تراریوم" },
          { label: "همه کالاها", emoji: "🔲", href: "/search?cat=reptiles" },
        ],
      },
    ],
  },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function CategoryPage() {
  const [activeCat, setActiveCat] = useState(mainCategories[0].id);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const currentCat = mainCategories.find((c) => c.id === activeCat)!;

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const isOpen = (title: string) =>
    openGroups[title] === undefined ? true : openGroups[title]; // default open

  return (
    <div className="min-h-screen bg-white pb-[56px] flex flex-col">
      {/* ── Header ────────────────────────────────────────────────────── */}
      <div
        className="flex items-center gap-3 px-4 py-3 shrink-0"
        style={{
          background: "rgba(255,255,255,0.65)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 1px 12px rgba(0,0,0,0.05)",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <Link href="/">
          <ArrowRight className="w-6 h-6 text-[#3d4152]" />
        </Link>
        <Link
          href="/search"
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
          <span className="text-[13px] text-[#3d4152]/50">جستجو در</span>
          <span className="text-[13px] text-[#ef4056] font-black">دیجی‌پت</span>
          <Camera className="w-5 h-5 text-[#3d4152]/40 mr-auto flex-shrink-0" />
        </Link>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar ─────────────────────────────────────────────────── */}
        <div className="w-[80px] flex-shrink-0 bg-[#f5f5f5] overflow-y-auto no-scrollbar border-l border-[#ebebeb]">
          {mainCategories.map((cat) => {
            const active = cat.id === activeCat;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCat(cat.id);
                  setOpenGroups({}); // reset accordion when switching
                }}
                className={`w-full flex flex-col items-center gap-1 py-3 px-1 border-b border-white transition-colors relative ${
                  active ? "bg-white" : "bg-[#f5f5f5]"
                }`}
              >
                {/* Red left indicator */}
                {active && (
                  <span className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-[#ef4056] rounded-r" />
                )}
                <span className="text-[24px] leading-none">{cat.icon}</span>
                <span
                  className={`text-[9px] text-center leading-[1.3] mt-0.5 ${
                    active ? "font-black text-[#ef4056]" : "font-medium text-[#81858b]"
                  }`}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Main Content ─────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto no-scrollbar bg-white pb-4">

          {/* "View all" top link */}
          <Link
            href={currentCat.viewAllHref}
            className="flex items-center justify-between px-4 py-3 border-b border-[#f0f0f1]"
          >
            <div className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4 text-[#19bfd3]" />
              <span className="text-[13px] font-black text-[#19bfd3]">
                همه محصولات {currentCat.label}
              </span>
            </div>
          </Link>

          {/* ── Accordion groups ──────────────────────────────────────── */}
          {currentCat.groups.map((group) => (
            <div key={group.title} className="border-b border-[#f0f0f1]">
              {/* Accordion header */}
              <button
                onClick={() => toggleGroup(group.title)}
                className="w-full flex items-center justify-between px-4 py-3"
              >
                <span className="text-[13px] font-black text-[#3d4152]">{group.title}</span>
                {isOpen(group.title) ? (
                  <ChevronUp className="w-4 h-4 text-[#81858b] flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#81858b] flex-shrink-0" />
                )}
              </button>

              {/* Grid of items — visible when open */}
              {isOpen(group.title) && (
                <div className="grid grid-cols-3 gap-x-2 gap-y-4 px-3 pb-4">
                  {group.items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="w-[64px] h-[64px] rounded-full bg-[#f5f5f5] flex items-center justify-center text-[28px] shadow-sm">
                        {item.emoji}
                      </div>
                      <span className="text-[10px] text-[#3d4152] font-medium text-center leading-[1.35]">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Support FAB */}
          <button className="fixed bottom-[72px] left-4 w-12 h-12 bg-[#4568dc] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#4568dc]/40 z-30">
            <Headphones className="w-6 h-6" />
          </button>
        </div>
      </div>

      <MobileNav />
    </div>
  );
}
