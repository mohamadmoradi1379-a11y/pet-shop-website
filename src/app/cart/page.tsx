"use client";
import { useState } from "react";
import { ArrowRight, Trash2, Plus, Minus, ShieldCheck, Truck, Store } from "lucide-react";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const toPersian = (n: number) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
const formatPrice = (n: number) => n.toLocaleString("fa-IR");

export default function CartPage() {
  const [activeTab, setActiveTab] = useState<"cart" | "next">("cart");
  const [quantity, setQuantity] = useState(1);

  const price = 2850000;
  const discount = 200000;
  const totalPrice = price * quantity;
  const finalPrice = (price - discount) * quantity;
  const totalDiscount = discount * quantity;

  return (
    <div className="min-h-screen bg-[#f0f0f1] pb-[130px]">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-[#e0e0e2]">
        <div className="flex items-center justify-between px-4 h-[56px]">
          <Link href="/">
            <ArrowRight className="w-6 h-6 text-[#3d4152]" />
          </Link>
          <span className="text-[15px] font-bold text-[#3d4152]">سبد خرید</span>
          <div className="w-6" /> {/* Spacer */}
        </div>
        
        {/* Tabs */}
        <div className="flex px-4">
          <button
            onClick={() => setActiveTab("cart")}
            className={`flex-1 py-3 text-[13px] font-bold text-center border-b-2 transition-colors ${
              activeTab === "cart"
                ? "border-[#ef4056] text-[#ef4056]"
                : "border-transparent text-[#81858b]"
            }`}
          >
            سبد خرید
            <span className={`inline-block mr-1 px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === 'cart' ? 'bg-[#ef4056] text-white' : 'bg-[#f0f0f1] text-[#3d4152]'}`}>
              ۱
            </span>
          </button>
          <button
            onClick={() => setActiveTab("next")}
            className={`flex-1 py-3 text-[13px] font-bold text-center border-b-2 transition-colors ${
              activeTab === "next"
                ? "border-[#ef4056] text-[#ef4056]"
                : "border-transparent text-[#81858b]"
            }`}
          >
            خرید بعدی
          </button>
        </div>
      </div>

      {activeTab === "cart" ? (
        <div className="p-2 md:p-4 max-w-3xl mx-auto">
          {/* Cart Item */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex gap-4">
              <div className="w-[100px] flex-shrink-0 flex flex-col gap-3">
                <img
                  src="https://images.pexels.com/photos/12928244/pexels-photo-12928244.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300"
                  alt="Product"
                  className="w-full aspect-square object-cover rounded-lg border border-[#f0f0f1]"
                />
                {/* Quantity Controls */}
                <div className="flex items-center justify-between border border-[#e0e0e2] rounded-lg p-1.5 bg-white shadow-sm">
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="w-6 h-6 flex items-center justify-center text-[#ef4056]"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <span className="text-[14px] font-bold text-[#ef4056] px-2">{toPersian(quantity)}</span>
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="w-6 h-6 flex items-center justify-center text-[#ef4056]"
                  >
                    {quantity > 1 ? <Minus className="w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <h3 className="text-[13px] font-bold text-[#3d4152] leading-6 mb-2">
                  غذای خشک سگ بالغ رویال کنین مدل Maxi Adult وزن ۱۵ کیلوگرم
                </h3>
                
                <div className="flex flex-col gap-1.5 mt-2">
                  <div className="flex items-center gap-2 text-[#81858b] text-[11px]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>گارانتی اصالت و سلامت فیزیکی کالا</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#81858b] text-[11px]">
                    <Store className="w-4 h-4 text-[#19bfd3]" />
                    <span>دیجی‌پت</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#81858b] text-[11px]">
                    <Truck className="w-4 h-4 text-[#ef4056]" />
                    <span>ارسال دیجی‌پت</span>
                  </div>
                </div>

                <div className="mt-auto pt-4 flex flex-col items-end">
                  <div className="text-[12px] text-[#ef4056] font-bold mb-1">
                    {formatPrice(totalDiscount)} تومان تخفیف
                  </div>
                  <div className="text-[16px] font-black text-[#3d4152]">
                    {formatPrice(finalPrice)} <span className="text-[10px] font-normal text-[#3d4152]">تومان</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <img src="https://www.digikala.com/statics/img/svg/empty-cart.svg" alt="Empty" className="w-[150px] mb-6" />
          <h3 className="text-[16px] font-bold text-[#3d4152]">لیست خرید بعدی شما خالی است!</h3>
          <p className="text-[12px] text-[#81858b] mt-2">
            شما می‌توانید محصولاتی که به سبد خرید خود افزوده‌اید را برای خرید در آینده به این لیست منتقل کنید.
          </p>
        </div>
      )}

      {/* Bottom Action Bar */}
      {activeTab === "cart" && (
        <div className="fixed bottom-[56px] left-0 right-0 bg-white border-t border-[#e0e0e2] p-3 flex justify-between items-center z-40 safe-area-bottom shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          <button className="bg-[#ef4056] text-white px-8 py-3 rounded-xl font-bold text-[13px] shadow-md hover:bg-[#d93a4e] transition-colors">
            ثبت سفارش
          </button>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-[#81858b] font-medium">جمع سبد خرید</span>
            <div className="text-[16px] font-black text-[#3d4152]">
              {formatPrice(finalPrice)} <span className="text-[10px] font-normal">تومان</span>
            </div>
          </div>
        </div>
      )}

      <div className="hidden md:block">
        <Footer />
      </div>

      <MobileNav />
    </div>
  );
}
