"use client";
import { Home, LayoutGrid, ShoppingCart, Search, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: Home, label: "خانه", href: "/" },
  { icon: LayoutGrid, label: "دسته‌بندی", href: "/category" },
  { icon: ShoppingCart, label: "سبد خرید", href: "/cart" },
  { icon: Search, label: "جستجو", href: "/search" },
  { icon: User, label: "دیجی‌پت من", href: "/profile" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e0e0e2] z-50 md:hidden safe-area-bottom pb-env-bottom">
      <div className="flex justify-around items-center h-[56px] px-1">
        {navItems.map((item, idx) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={idx}
              href={item.href}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full"
            >
              <item.icon
                className={`w-[22px] h-[22px] ${
                  isActive ? "text-[#3d4152]" : "text-[#a1a3a8]"
                }`}
                fill={isActive ? "#3d4152" : "none"}
              />
              <span
                className={`text-[10px] ${
                  isActive
                    ? "text-[#3d4152] font-bold"
                    : "text-[#a1a3a8] font-medium"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
