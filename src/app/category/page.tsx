"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown, ChevronLeft, ArrowRight, Search, Camera, Headphones } from "lucide-react";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import { categories } from "@/data/categories";

const itemHref = (catId: string, sub?: string) =>
  sub
    ? `/search?cat=${encodeURIComponent(catId)}&sub=${encodeURIComponent(sub)}`
    : `/search?cat=${encodeURIComponent(catId)}`;

export default function CategoryPage() {
  const [activeCat, setActiveCat] = useState(categories[0].id);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const currentCat = categories.find((c) => c.id === activeCat)!;

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
          {categories.map((cat) => {
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
            href={itemHref(currentCat.id)}
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

              {isOpen(group.title) && (
                <div className="grid grid-cols-3 gap-x-2 gap-y-4 px-3 pb-4">
                  {group.items.map((item) => (
                    <Link
                      key={`${group.title}-${item.label}`}
                      href={itemHref(currentCat.id, item.sub)}
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
