"use client";
import { ChevronUp, Globe } from "lucide-react";

// Use local social icons as emojis to avoid lucide version mismatches
const Instagram = ({ className }: { className?: string }) => <span className={className}>📸</span>;
const Twitter = ({ className }: { className?: string }) => <span className={className}>🐦</span>;
const Linkedin = ({ className }: { className?: string }) => <span className={className}>💼</span>;
const Facebook = ({ className }: { className?: string }) => <span className={className}>👥</span>;

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white border-t border-[#e0e0e2] mt-10 pb-20 md:pb-10">
      <div className="max-w-[1440px] mx-auto px-4 py-8">
        {/* Top section: Logo and Back to top */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-[24px] font-black text-[#ef4056]">دیجی‌پت</h2>
            <div className="flex items-center gap-4 text-[12px] text-[#3d4152] font-medium">
              <span>تلفن پشتیبانی ۶۱۹۳۰۰۰۰ - ۰۲۱</span>
              <span className="text-[#e0e0e2]">|</span>
              <span>۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم</span>
            </div>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#e0e0e2] text-[#81858b] text-[12px] font-bold hover:bg-gray-50 transition-colors"
          >
            بازگشت به بالا
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>

        {/* Feature Icons */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-8 border-b border-[#f0f0f1]">
           <FooterFeature icon="🚚" title="امکان تحویل اکسپرس" />
           <FooterFeature icon="💳" title="امکان پرداخت در محل" />
           <FooterFeature icon="📞" title="۷ روز هفته ، ۲۴ ساعته" />
           <FooterFeature icon="🔄" title="۷ روز ضمانت بازگشت" />
           <FooterFeature icon="💎" title="ضمانت اصل بودن کالا" />
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
          <div>
            <h3 className="text-[14px] font-bold text-[#3d4152] mb-4">با دیجی‌پت</h3>
            <ul className="flex flex-col gap-3 text-[12px] text-[#81858b]">
              <li>اتاق خبر دیجی‌پت</li>
              <li>فروش در دیجی‌پت</li>
              <li>فرصت‌های شغلی</li>
              <li>تماس با دیجی‌پت</li>
              <li>درباره دیجی‌پت</li>
            </ul>
          </div>
          <div>
            <h3 className="text-[14px] font-bold text-[#3d4152] mb-4">خدمات مشتریان</h3>
            <ul className="flex flex-col gap-3 text-[12px] text-[#81858b]">
              <li>پاسخ به پرسش‌های متداول</li>
              <li>رویه‌های بازگرداندن کالا</li>
              <li>شرایط استفاده</li>
              <li>حریم خصوصی</li>
              <li>گزارش باگ</li>
            </ul>
          </div>
          <div>
            <h3 className="text-[14px] font-bold text-[#3d4152] mb-4">راهنمای خرید از دیجی‌پت</h3>
            <ul className="flex flex-col gap-3 text-[12px] text-[#81858b]">
              <li>نحوه ثبت سفارش</li>
              <li>رویه ارسال سفارش</li>
              <li>شیوه های پرداخت</li>
            </ul>
          </div>
          <div>
            <h3 className="text-[14px] font-bold text-[#3d4152] mb-4">همراه ما باشید!</h3>
            <div className="flex gap-6 mb-6">
              <Instagram className="w-6 h-6 text-[#81858b] cursor-pointer" />
              <Twitter className="w-6 h-6 text-[#81858b] cursor-pointer" />
              <Linkedin className="w-6 h-6 text-[#81858b] cursor-pointer" />
              <Facebook className="w-6 h-6 text-[#81858b] cursor-pointer" />
            </div>
            <h3 className="text-[14px] font-bold text-[#3d4152] mb-4">با ثبت ایمیل، از جدیدترین تخفیف‌ها با‌خبر شوید</h3>
            <div className="flex gap-2">
              <input type="text" placeholder="ایمیل شما" className="flex-1 bg-[#f0f0f1] rounded-lg px-4 py-2 text-[12px] focus:outline-none" />
              <button className="bg-[#e0e0e2] text-white px-4 py-2 rounded-lg text-[12px] font-bold">ثبت</button>
            </div>
          </div>
        </div>

        {/* App Stores */}
        <div className="bg-[#3c4b5d] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
          <div className="flex items-center gap-3">
             <span className="text-white text-[16px] font-bold">دانلود اپلیکیشن دیجی‌پت</span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
             <img src="https://www.digikala.com/statics/img/svg/app-pages/google-play.svg" alt="Google Play" className="h-10" />
             <img src="https://www.digikala.com/statics/img/svg/app-pages/bazaar.svg" alt="Bazaar" className="h-10" />
             <img src="https://www.digikala.com/statics/img/svg/app-pages/my-ket.svg" alt="MyKet" className="h-10" />
             <img src="https://www.digikala.com/statics/img/svg/app-pages/sib-app.svg" alt="SibApp" className="h-10" />
          </div>
        </div>

        {/* Footer Text */}
        <div className="py-10 border-b border-[#f0f0f1]">
          <h2 className="text-[18px] font-bold text-[#3d4152] mb-4">فروشگاه اینترنتی دیجی‌پت، بررسی، انتخاب و خرید آنلاین</h2>
          <p className="text-[12px] text-[#81858b] leading-7 text-justify">
            دیجی‌پت به عنوان یکی از قدیمی‌ترین فروشگاه های اینترنتی با بیش از یک دهه تجربه، با پایبندی به سه اصل، پرداخت در محل، ۷ روز ضمانت بازگشت کالا و تضمین اصل‌بودن کالا موفق شده تا همگام با فروشگاه‌های معتبر جهان، به بزرگ‌ترین فروشگاه اینترنتی لوازم حیوانات خانگی در ایران تبدیل شود. به محض ورود به سایت دیجی‌پت با دنیایی از کالا رو به رو می‌شوید! هر آنچه که پت شما نیاز دارد و به ذهن شما خطور می‌کند در اینجا پیدا خواهید کرد.
          </p>
        </div>

        {/* Partner Logos */}
        <div className="flex flex-wrap justify-center gap-8 py-8 opacity-40 grayscale">
           <img src="https://www.digikala.com/statics/img/svg/footer/digimag.svg" alt="DigiMag" className="h-6" />
           <img src="https://www.digikala.com/statics/img/svg/footer/digipay.svg" alt="DigiPay" className="h-6" />
           <img src="https://www.digikala.com/statics/img/svg/footer/digistyle.svg" alt="DigiStyle" className="h-6" />
           <img src="https://www.digikala.com/statics/img/svg/footer/digiplus.svg" alt="DigiPlus" className="h-6" />
        </div>

        <div className="text-center text-[10px] text-[#81858b] py-4">
          برای استفاده از مطالب دیجی‌پت، داشتن «هدف غیرتجاری» و ذکر «منبع» کافیست. تمام حقوق اين وب‌سايت نیز برای شرکت نوآوران فن آوازه (فروشگاه آنلاین دیجی‌پت) است.
        </div>
      </div>
    </footer>
  );
}

function FooterFeature({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-[32px]">{icon}</span>
      <span className="text-[10px] text-[#3d4152] font-medium whitespace-nowrap">{title}</span>
    </div>
  );
}
