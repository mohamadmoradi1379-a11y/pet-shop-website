"use client";
import { Search, Camera, Bell, MapPin, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <div
      className="px-4 pt-4 pb-3 border-b border-white/10"
      style={{
        background: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
      }}
    >
      {/* Search + Bell */}
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <button
          onClick={() => router.push("/search")}
          className="flex-1 flex items-center h-[44px] rounded-2xl border gap-2 px-3"
          style={{
            background: "rgba(255,255,255,0.45)",
            backdropFilter: "blur(20px) saturate(200%)",
            WebkitBackdropFilter: "blur(20px) saturate(200%)",
            borderColor: "rgba(255,255,255,0.6)",
            boxShadow:
              "0 2px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        >
          <Search className="w-[18px] h-[18px] text-[#3d4152]/50 flex-shrink-0" />
          <div className="flex items-center gap-1 flex-1">
            <span className="text-[13px] text-[#3d4152]/50">جستجو در</span>
            <span className="text-[13px] text-[#ef4056] font-black">دیجی‌پت</span>
          </div>
          {/* Camera icon pill */}
          <div
            className="w-[30px] h-[30px] rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(168,85,247,0.15)",
              boxShadow: "0 1px 4px rgba(168,85,247,0.1)",
            }}
          >
            <Camera className="w-4 h-4 text-[#a855f7]" />
          </div>
        </button>

        {/* Bell Button */}
        <button
          className="w-[44px] h-[44px] flex items-center justify-center rounded-2xl flex-shrink-0"
          style={{
            background: "rgba(255,255,255,0.5)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.65)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
          }}
        >
          <Bell className="w-5 h-5 text-[#3d4152]" />
        </button>
      </div>

      {/* Address Row */}
      <div className="flex items-center justify-end gap-1.5 mt-3">
        <span className="text-[12px] text-[#3d4152] font-medium">انتخاب آدرس</span>
        <ChevronDown className="w-3.5 h-3.5 text-[#3d4152]" />
        <MapPin className="w-4 h-4 text-[#3d4152]" />
      </div>
    </div>
  );
}
