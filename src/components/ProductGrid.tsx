import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { CompactCard } from "./ProductCard";
import type { Product } from "@/data/products";
import { popularProducts, suggestedProducts } from "@/data/products";

export default function ProductGrid({
  title,
  products,
  href = "/search",
}: {
  title: string;
  products?: Product[];
  href?: string;
}) {
  const list = products ?? (title.includes("پرفروش") ? popularProducts : suggestedProducts);

  return (
    <div className="bg-white mt-2.5 py-4">
      {/* Section Header */}
      <div className="flex items-center justify-between px-4 mb-4">
        <h2 className="text-[14px] font-bold text-[#3d4152]">{title}</h2>
        <Link
          href={href}
          className="flex items-center gap-1 text-[#19bfd3] text-[12px] font-medium"
        >
          مشاهده همه
          <ChevronLeft className="w-4 h-4" />
        </Link>
      </div>

      {/* Horizontal scroll products */}
      <div className="flex gap-0 overflow-x-auto no-scrollbar px-4">
        {list.map((p, idx) => (
          <CompactCard key={p.id} p={p} withDivider={idx < list.length - 1} />
        ))}
      </div>
    </div>
  );
}
