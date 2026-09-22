import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import CategoryIcons from "@/components/CategoryIcons";
import AmazingOffers from "@/components/AmazingOffers";
import FourBanners from "@/components/FourBanners";
import ProductGrid from "@/components/ProductGrid";
import BrandSlider from "@/components/BrandSlider";
import WideBanner from "@/components/WideBanner";
import ServiceFeatures from "@/components/ServiceFeatures";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f0f0f1] pb-16 md:pb-0">
      {/* Sticky Header Area — gradient behind for glass effect */}
      <div
        className="sticky top-0 z-40"
        style={{
          background: "linear-gradient(135deg, #e8f4fd 0%, #fde8f0 50%, #e8f0fd 100%)",
        }}
      >
        <TopBanner />
        <Header />
      </div>

      {/* Hero Banner Slider */}
      <HeroBanner />

      {/* Category Quick Access Icons */}
      <CategoryIcons />

      {/* Amazing Offers (Red Bar) */}
      <AmazingOffers />

      {/* Wide Ad Banner */}
      <WideBanner
        image="https://images.pexels.com/photos/27175967/pexels-photo-27175967.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=1200"
        alt="تخفیف ویژه لوازم حیوانات خانگی"
      />

      {/* 4 Category Banners Grid */}
      <FourBanners />

      {/* Popular Products */}
      <ProductGrid title="پرفروش‌ترین محصولات" />

      {/* Brand Slider */}
      <BrandSlider />

      {/* Another Product Row */}
      <ProductGrid title="پیشنهاد دیجی‌پت" />

      {/* Wide Banner */}
      <WideBanner
        image="https://images.pexels.com/photos/10330689/pexels-photo-10330689.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=1200"
        alt="جشنواره فصلی فروش"
      />

      {/* Service Features */}
      <ServiceFeatures />

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
}
