import { ChevronLeft } from "lucide-react";

const brands = [
  { id: 1, name: "رویال کنین", logo: "🏆" },
  { id: 2, name: "جوسرا", logo: "⭐" },
  { id: 3, name: "ویسکاس", logo: "🐱" },
  { id: 4, name: "پدیگری", logo: "🐕" },
  { id: 5, name: "رفلکس", logo: "✨" },
  { id: 6, name: "پروپلن", logo: "💎" },
  { id: 7, name: "هپی کت", logo: "😺" },
  { id: 8, name: "نوتری", logo: "🌿" },
];

export default function BrandSlider() {
  return (
    <div className="bg-white mt-2.5 py-4">
      <div className="flex items-center justify-between px-4 mb-4">
        <h2 className="text-[14px] font-bold text-[#3d4152]">محبوب‌ترین برندها</h2>
        <button className="flex items-center gap-1 text-[#19bfd3] text-[12px] font-medium">
          مشاهده همه
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto no-scrollbar px-4">
        {brands.map((b) => (
          <div
            key={b.id}
            className="flex flex-col items-center gap-2 min-w-[80px] cursor-pointer group"
          >
            <div className="w-[64px] h-[64px] rounded-full border-2 border-[#e0e0e2] flex items-center justify-center text-3xl bg-white group-hover:border-[#19bfd3] transition-colors shadow-sm">
              {b.logo}
            </div>
            <span className="text-[10px] font-medium text-[#3d4152] text-center">
              {b.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
