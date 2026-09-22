const banners = [
  {
    id: 1,
    title: "غذای سگ",
    subtitle: "تا ۴۰٪ تخفیف",
    bg: "bg-gradient-to-br from-amber-100 to-amber-50",
    emoji: "🐶",
  },
  {
    id: 2,
    title: "غذای گربه",
    subtitle: "انواع کنسرو و خشک",
    bg: "bg-gradient-to-br from-pink-100 to-pink-50",
    emoji: "🐱",
  },
  {
    id: 3,
    title: "لوازم بهداشتی",
    subtitle: "شامپو و ضدکک",
    bg: "bg-gradient-to-br from-green-100 to-green-50",
    emoji: "🧼",
  },
  {
    id: 4,
    title: "اسباب‌بازی",
    subtitle: "توپ، استخوان و بیشتر",
    bg: "bg-gradient-to-br from-blue-100 to-blue-50",
    emoji: "🎾",
  },
];

export default function FourBanners() {
  return (
    <div className="bg-white mt-2.5 p-4">
      <div className="grid grid-cols-2 gap-3">
        {banners.map((b) => (
          <div
            key={b.id}
            className={`${b.bg} rounded-xl p-4 flex flex-col items-center justify-center gap-1 cursor-pointer hover:shadow-md transition-shadow min-h-[100px]`}
          >
            <span className="text-4xl">{b.emoji}</span>
            <span className="text-[12px] font-bold text-[#3d4152]">{b.title}</span>
            <span className="text-[10px] text-[#81858b]">{b.subtitle}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
