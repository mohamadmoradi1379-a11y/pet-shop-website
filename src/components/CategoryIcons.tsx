import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "سوپرمارکت حیوانات",
    icon: "🛒",
    bgColor: "bg-green-50",
    badge: "ارسال رایگان",
    badgeColor: "bg-green-500",
    href: "/search",
  },
  {
    id: 2,
    name: "غذای خشک",
    icon: "🥫",
    bgColor: "bg-orange-50",
    badge: "کف قیمت",
    badgeColor: "bg-orange-500",
    href: "/search?sub=غذای+خشک+سگ",
  },
  {
    id: 3,
    name: "لوازم بهداشتی",
    icon: "🧴",
    bgColor: "bg-pink-50",
    badge: null,
    badgeColor: "",
    href: "/search?sub=لوازم+بهداشتی+سگ",
  },
  {
    id: 4,
    name: "اسباب‌بازی",
    icon: "🎾",
    bgColor: "bg-yellow-50",
    badge: null,
    badgeColor: "",
    href: "/search?sub=اسباب‌بازی+سگ",
  },
  {
    id: 5,
    name: "قلاده و تسمه",
    icon: "🐕",
    bgColor: "bg-blue-50",
    badge: null,
    badgeColor: "",
    href: "/search?cat=dogs&sub=قلاده+و+بند",
  },
  {
    id: 6,
    name: "تخت و جای خواب",
    icon: "🛏️",
    bgColor: "bg-purple-50",
    badge: null,
    badgeColor: "",
    href: "/search?cat=cats&sub=جای+خواب+و+اسکرچر",
  },
  {
    id: 7,
    name: "آکواریوم",
    icon: "🐠",
    bgColor: "bg-cyan-50",
    badge: null,
    badgeColor: "",
    href: "/search?cat=aquatics",
  },
  {
    id: 8,
    name: "پرندگان",
    icon: "🦜",
    bgColor: "bg-lime-50",
    badge: null,
    badgeColor: "",
    href: "/search?cat=birds",
  },
];

export default function CategoryIcons() {
  return (
    <div className="bg-white py-5">
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-4">
        {categories.map((cat) => (
          <Link
            href={cat.href}
            key={cat.id}
            className="flex flex-col items-center gap-2 min-w-[72px] cursor-pointer group"
          >
            <div className="relative">
              <div
                className={`${cat.bgColor} w-[60px] h-[60px] rounded-full flex items-center justify-center text-[28px] transition-transform group-hover:scale-110 shadow-sm`}
              >
                {cat.icon}
              </div>
              {cat.badge && (
                <span
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 ${cat.badgeColor} text-white text-[7px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap`}
                >
                  {cat.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium text-[#3d4152] text-center leading-4 mt-1">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
