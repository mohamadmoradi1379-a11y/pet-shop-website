import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  discount?: number;
}

const popularProducts: Product[] = [
  {
    id: 1,
    name: "غذای خشک سگ بالغ نژاد بزرگ رویال کنین",
    price: 2850000,
    discount: 15,
    image: "https://images.pexels.com/photos/10096129/pexels-photo-10096129.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300",
  },
  {
    id: 2,
    name: "غذای خشک گربه بالغ ویسکاس طعم مرغ",
    price: 580000,
    discount: 10,
    image: "https://images.pexels.com/photos/27279130/pexels-photo-27279130.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300",
  },
  {
    id: 3,
    name: "تشویقی سگ با طعم مرغ ۱۰۰ گرمی",
    price: 125000,
    image: "https://images.pexels.com/photos/9248865/pexels-photo-9248865.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300",
  },
  {
    id: 4,
    name: "بستر و جای خواب گربه مدل مخملی",
    price: 890000,
    discount: 20,
    image: "https://images.pexels.com/photos/9660361/pexels-photo-9660361.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300",
  },
  {
    id: 5,
    name: "اسباب‌بازی توپ لاستیکی سگ",
    price: 75000,
    image: "https://images.pexels.com/photos/16577552/pexels-photo-16577552.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300",
  },
  {
    id: 6,
    name: "شامپو ضد حساسیت سگ و گربه",
    price: 285000,
    discount: 5,
    image: "https://images.pexels.com/photos/10843207/pexels-photo-10843207.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300",
  },
];

const formatPrice = (n: number) => n.toLocaleString("fa-IR");
const toPersian = (n: number) =>
  String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);

export default function ProductGrid({ title }: { title: string }) {
  return (
    <div className="bg-white mt-2.5 py-4">
      {/* Section Header */}
      <div className="flex items-center justify-between px-4 mb-4">
        <h2 className="text-[14px] font-bold text-[#3d4152]">{title}</h2>
        <button className="flex items-center gap-1 text-[#19bfd3] text-[12px] font-medium">
          مشاهده همه
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Horizontal scroll products */}
      <div className="flex gap-0 overflow-x-auto no-scrollbar px-4">
        {popularProducts.map((p, idx) => (
          <Link
            href={`/product/${p.id}`}
            key={p.id}
            className={`min-w-[150px] max-w-[150px] flex-shrink-0 px-2.5 py-2 ${
              idx < popularProducts.length - 1 ? "border-l border-[#e0e0e2]" : ""
            }`}
          >
            <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-50 mb-2">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[11px] text-[#3d4152] font-medium line-clamp-2 h-[34px] leading-[17px]">
              {p.name}
            </p>
            <div className="mt-2 flex items-center justify-between">
              {p.discount && (
                <span className="bg-[#ef4056] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {toPersian(p.discount)}٪
                </span>
              )}
              <div className={`text-left ${!p.discount ? "mr-auto" : ""}`}>
                <span className="text-[13px] font-bold text-[#3d4152]">
                  {formatPrice(
                    p.discount
                      ? Math.round((p.price * (100 - p.discount)) / 100)
                      : p.price
                  )}
                </span>
                <span className="text-[9px] text-[#81858b] mr-0.5">تومان</span>
              </div>
            </div>
            {p.discount && (
              <div className="text-[10px] text-[#81858b] line-through text-left mt-0.5">
                {formatPrice(p.price)}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
