import { categoryLabel } from "./categories";

export type ProductBadge = "شگفت‌انگیز" | "ارسال رایگان" | "محبوب";

export type Product = {
  id: number;
  name: string;
  brand: string;
  /** category id — see src/data/categories.ts */
  cat: string;
  /** sub-category id — see src/data/categories.ts */
  sub: string;
  price: number;
  /** discount percentage (0 = no discount) */
  discount: number;
  rating: number;
  ratingCount: number;
  image: string;
  stock: number;
  badge?: ProductBadge;
};

const IMG = {
  dogFood: "/images/products/dog-food.jpg",
  catFood: "/images/products/cat-food.jpg",
  canned: "/images/products/canned-food.jpg",
  collar: "/images/products/collar.jpg",
  bed: "/images/products/bed.jpg",
  toy: "/images/products/toy.jpg",
  shampoo: "/images/products/shampoo.jpg",
} as const;

export const products: Product[] = [
  // ─────────────────────────────── سگ ───────────────────────────────
  { id: 1, name: "غذای خشک سگ بالغ رویال کنین مدل Maxi Adult وزن ۱۵ کیلوگرم", brand: "رویال کنین", cat: "dogs", sub: "غذای خشک سگ", price: 2850000, discount: 15, rating: 4.6, ratingCount: 1240, image: IMG.dogFood, stock: 8, badge: "ارسال رایگان" },
  { id: 2, name: "غذای خشک توله سگ جوسرا مدل Junior سایز کوچک ۱۰ کیلوگرم", brand: "جوسرا", cat: "dogs", sub: "غذای خشک سگ", price: 1650000, discount: 18, rating: 4.7, ratingCount: 980, image: IMG.dogFood, stock: 5, badge: "ارسال رایگان" },
  { id: 3, name: "غذای خشک سگ بالغ پروپلن با طعم مرغ ۱۲ کیلوگرم", brand: "پروپلن", cat: "dogs", sub: "غذای خشک سگ", price: 1980000, discount: 10, rating: 4.4, ratingCount: 640, image: IMG.dogFood, stock: 12 },
  { id: 4, name: "غذای خشک سگ یوکانوبا مخصوص نژاد بزرگ ۱۵ کیلوگرم", brand: "یوکانوبا", cat: "dogs", sub: "غذای خشک سگ", price: 2450000, discount: 12, rating: 4.5, ratingCount: 410, image: IMG.dogFood, stock: 6 },
  { id: 5, name: "کنسرو و پوچ سگ بالغ پدیگری با طعم گوشت ۴۰۰ گرم", brand: "پدیگری", cat: "dogs", sub: "کنسرو و پوچ سگ", price: 95000, discount: 12, rating: 4.6, ratingCount: 1100, image: IMG.canned, stock: 40, badge: "محبوب" },
  { id: 6, name: "کنسرو سگ رویال کنین با طعم مرغ و سبزیجات ۴۰۰ گرم", brand: "رویال کنین", cat: "dogs", sub: "کنسرو و پوچ سگ", price: 128000, discount: 5, rating: 4.3, ratingCount: 320, image: IMG.canned, stock: 25 },
  { id: 7, name: "تشویقی سگ مدادی با طعم مرغ و سبزیجات ۱۰۰ گرمی", brand: "تریکسی", cat: "dogs", sub: "تشویقی و دنتال", price: 125000, discount: 0, rating: 4.8, ratingCount: 2100, image: IMG.canned, stock: 60, badge: "محبوب" },
  { id: 8, name: "تشویقی دنتال استیک سگ ضد جرم و پلاک ۷ عددی", brand: "پدیگری", cat: "dogs", sub: "تشویقی و دنتال", price: 180000, discount: 15, rating: 4.4, ratingCount: 530, image: IMG.canned, stock: 30 },
  { id: 9, name: "مولتی‌ویتامین جویدنی سگ بالغ ۶۰ عددی با طعم گوشت", brand: "بیفار", cat: "dogs", sub: "مکمل و ویتامین", price: 380000, discount: 10, rating: 4.4, ratingCount: 670, image: IMG.canned, stock: 18 },
  { id: 10, name: "قلاده گردنی چرمی ایمنی‌دار ضد حساسیت مناسب سگ متوسط", brand: "تریکسی", cat: "dogs", sub: "قلاده و بند", price: 450000, discount: 30, rating: 4.5, ratingCount: 760, image: IMG.collar, stock: 14, badge: "شگفت‌انگیز" },
  { id: 11, name: "قلاده و بند تریکسی مدل کلاسیک برای سگ‌های بزرگ", brand: "تریکسی", cat: "dogs", sub: "قلاده و بند", price: 620000, discount: 8, rating: 4.2, ratingCount: 210, image: IMG.collar, stock: 9 },
  { id: 12, name: "تخت و جای خواب سگ مخملی ضد آب سایز لارج", brand: "پت‌لند", cat: "dogs", sub: "جای خواب و باکس", price: 890000, discount: 20, rating: 4.2, ratingCount: 430, image: IMG.bed, stock: 7, badge: "شگفت‌انگیز" },
  { id: 13, name: "باکس حمل سگ پلاستیکی با تهویه مناسب سایز متوسط", brand: "پت‌لند", cat: "dogs", sub: "جای خواب و باکس", price: 1350000, discount: 10, rating: 4.0, ratingCount: 160, image: IMG.bed, stock: 4 },
  { id: 14, name: "اسباب‌بازی توپ لاستیکی دندانی سگ بسته ۳ عددی", brand: "کانگورو", cat: "dogs", sub: "اسباب‌بازی سگ", price: 75000, discount: 0, rating: 4.1, ratingCount: 320, image: IMG.toy, stock: 50 },
  { id: 15, name: "اسباب‌بازی طنابی و استخوانی سگ بسته ۲ عددی", brand: "کانگورو", cat: "dogs", sub: "اسباب‌بازی سگ", price: 145000, discount: 15, rating: 4.3, ratingCount: 280, image: IMG.toy, stock: 22 },
  { id: 16, name: "ظرف آب و غذای استیل ضد زنگ سگ سایز بزرگ", brand: "پت‌لند", cat: "dogs", sub: "ظروف آب و غذا", price: 265000, discount: 10, rating: 4.4, ratingCount: 190, image: IMG.canned, stock: 28 },
  { id: 17, name: "شامپو ضد کک و کنه برای سگ و گربه ۲۵۰ میلی‌لیتر", brand: "بیفار", cat: "dogs", sub: "لوازم بهداشتی سگ", price: 320000, discount: 8, rating: 4.3, ratingCount: 560, image: IMG.shampoo, stock: 33 },
  { id: 18, name: "شامپو ضد حساسیت سگ با عصاره جو دوسر ۴۰۰ میلی‌لیتر", brand: "بیفار", cat: "dogs", sub: "لوازم بهداشتی سگ", price: 285000, discount: 5, rating: 4.1, ratingCount: 240, image: IMG.shampoo, stock: 27 },

  // ────────────────────────────── گربه ──────────────────────────────
  { id: 19, name: "غذای خشک گربه بالغ ویسکاس با طعم مرغ ۷ کیلوگرم", brand: "ویسکاس", cat: "cats", sub: "غذای خشک گربه", price: 980000, discount: 12, rating: 4.4, ratingCount: 870, image: IMG.catFood, stock: 15 },
  { id: 20, name: "غذای خشک گربه رویال کنین مدل Fit ۳۲ وزن ۴ کیلوگرم", brand: "رویال کنین", cat: "cats", sub: "غذای خشک گربه", price: 1450000, discount: 10, rating: 4.7, ratingCount: 1120, image: IMG.catFood, stock: 9, badge: "ارسال رایگان" },
  { id: 21, name: "غذای خشک گربه هپی کت با طعم ماهی ۱۰ کیلوگرم", brand: "هپی کت", cat: "cats", sub: "غذای خشک گربه", price: 2100000, discount: 14, rating: 4.5, ratingCount: 380, image: IMG.catFood, stock: 6 },
  { id: 22, name: "کنسرو گربه شسیر با طعم ماهی تن ۴۰۰ گرمی", brand: "شسیر", cat: "cats", sub: "کنسرو و پوچ گربه", price: 185000, discount: 10, rating: 4.5, ratingCount: 910, image: IMG.canned, stock: 45, badge: "محبوب" },
  { id: 23, name: "کنسرو و پوچ گربه ویسکاس با طعم گوشت ۴۰۰ گرم", brand: "ویسکاس", cat: "cats", sub: "کنسرو و پوچ گربه", price: 155000, discount: 8, rating: 4.3, ratingCount: 640, image: IMG.canned, stock: 52 },
  { id: 24, name: "تشویقی گربه مدادی با طعم ماهی ۵ عددی", brand: "تریکسی", cat: "cats", sub: "تشویقی گربه", price: 95000, discount: 0, rating: 4.6, ratingCount: 780, image: IMG.canned, stock: 70 },
  { id: 25, name: "خاک گربه ون کت اولتراکلامپینگ گل‌های بهاری ۱۰ لیتری", brand: "ون کت", cat: "cats", sub: "خاک گربه", price: 245000, discount: 22, rating: 4.6, ratingCount: 1540, image: IMG.catFood, stock: 38, badge: "شگفت‌انگیز" },
  { id: 26, name: "خاک گربه کریستالی سیلیکاژل ۵ لیتری", brand: "سیلیکاژل", cat: "cats", sub: "خاک گربه", price: 320000, discount: 15, rating: 4.2, ratingCount: 410, image: IMG.catFood, stock: 20 },
  { id: 27, name: "ظرف خاک گربه درب‌دار با فیلتر کربن سایز بزرگ", brand: "پت‌لند", cat: "cats", sub: "ظرف خاک و بیلچه", price: 780000, discount: 12, rating: 4.1, ratingCount: 260, image: IMG.bed, stock: 11 },
  { id: 28, name: "بستر و جای خواب گربه مخملی ضد آب سایز لارج", brand: "پت‌لند", cat: "cats", sub: "جای خواب و اسکرچر", price: 890000, discount: 20, rating: 4.2, ratingCount: 430, image: IMG.bed, stock: 13 },
  { id: 29, name: "اسکرچر گربه با پایه مقوایی و اسباب‌بازی آویز", brand: "تریکسی", cat: "cats", sub: "جای خواب و اسکرچر", price: 640000, discount: 18, rating: 4.4, ratingCount: 350, image: IMG.bed, stock: 16 },
  { id: 30, name: "اسباب‌بازی گربه چوب ماهیگیری با پر و زنگوله", brand: "کانگورو", cat: "cats", sub: "اسباب‌بازی گربه", price: 135000, discount: 10, rating: 4.5, ratingCount: 520, image: IMG.toy, stock: 40 },
  { id: 31, name: "شامپو خشک گربه بدون نیاز به آب‌شویی ۲۰۰ میلی‌لیتر", brand: "بیفار", cat: "cats", sub: "لوازم بهداشتی گربه", price: 295000, discount: 12, rating: 4.2, ratingCount: 180, image: IMG.shampoo, stock: 25 },

  // ───────────────────────────── پرندگان ─────────────────────────────
  { id: 32, name: "غذای پرندگان ویتاکرافت مخلوط با میوه ۵۰۰ گرمی", brand: "ویتاکرافت", cat: "birds", sub: "غذای پرندگان", price: 95000, discount: 5, rating: 4.3, ratingCount: 280, image: IMG.dogFood, stock: 60 },
  { id: 33, name: "غذای طوطی ویتاکرافت با مغزها و دانه‌های روغنی ۱ کیلوگرم", brand: "ویتاکرافت", cat: "birds", sub: "غذای پرندگان", price: 185000, discount: 8, rating: 4.4, ratingCount: 210, image: IMG.dogFood, stock: 35 },
  { id: 34, name: "قفس پرنده فلزی با سینی کشویی مدل لوکس", brand: "پت‌لند", cat: "birds", sub: "قفس پرنده", price: 1250000, discount: 15, rating: 4.0, ratingCount: 190, image: IMG.bed, stock: 5 },
  { id: 35, name: "اسباب‌بازی پرنده نردبان و زنگوله چوبی", brand: "تریکسی", cat: "birds", sub: "اسباب‌بازی پرنده", price: 85000, discount: 0, rating: 4.1, ratingCount: 120, image: IMG.toy, stock: 80 },
  { id: 36, name: "آبخوری اتوماتیک پرنده با نصب آسان روی قفس", brand: "پت‌لند", cat: "birds", sub: "لوازم جانبی قفس", price: 145000, discount: 10, rating: 4.2, ratingCount: 90, image: IMG.canned, stock: 45 },

  // ────────────────────────────── آبزیان ─────────────────────────────
  { id: 37, name: "غذای ماهی تروپیکال فلکس تترا ۲۵۰ میلی‌لیتر", brand: "تترا", cat: "aquatics", sub: "غذای ماهی", price: 145000, discount: 0, rating: 4.2, ratingCount: 340, image: IMG.canned, stock: 55 },
  { id: 38, name: "غذای ماهی قرمز و طلایی تترا ۱۰۰ گرمی", brand: "تترا", cat: "aquatics", sub: "غذای ماهی", price: 110000, discount: 10, rating: 4.3, ratingCount: 220, image: IMG.canned, stock: 48 },
  { id: 39, name: "آکواریوم شیشه‌ای ۴۰ لیتری با درپوش و نور LED", brand: "پت‌لند", cat: "aquatics", sub: "آکواریوم", price: 1850000, discount: 12, rating: 4.1, ratingCount: 130, image: IMG.bed, stock: 4 },
  { id: 40, name: "پمپ هوا و فیلتر داخلی آکواریوم مدل بی‌صدا", brand: "تترا", cat: "aquatics", sub: "پمپ هوا و فیلتر", price: 420000, discount: 15, rating: 4.3, ratingCount: 170, image: IMG.canned, stock: 22 },
  { id: 41, name: "تزیینات آکواریوم: گیاه مصنوعی و صخره بسته ۵ عددی", brand: "تترا", cat: "aquatics", sub: "تزیینات آکواریوم", price: 165000, discount: 10, rating: 4.0, ratingCount: 85, image: IMG.toy, stock: 60 },

  // ───────────────────────────── جوندگان ─────────────────────────────
  { id: 42, name: "غذای جوندگان ویتاکرافت با دانه آفتاب‌گردان ۸۰۰ گرمی", brand: "ویتاکرافت", cat: "small_pets", sub: "غذای جوندگان", price: 110000, discount: 0, rating: 4.1, ratingCount: 150, image: IMG.dogFood, stock: 40 },
  { id: 43, name: "غذای خرگوش ویتاکرافت غنی‌شده با ویتامین C یک کیلوگرم", brand: "ویتاکرافت", cat: "small_pets", sub: "غذای جوندگان", price: 165000, discount: 12, rating: 4.4, ratingCount: 130, image: IMG.dogFood, stock: 30 },
  { id: 44, name: "قفس همستر و خرگوش با طبقه و تونل مدل استاندارد", brand: "پت‌لند", cat: "small_pets", sub: "قفس جوندگان", price: 980000, discount: 10, rating: 4.0, ratingCount: 95, image: IMG.bed, stock: 6 },
  { id: 45, name: "پوشال و بستر جوندگان ضد بو ۵ لیتری", brand: "ویتاکرافت", cat: "small_pets", sub: "پوشال و بستر", price: 135000, discount: 8, rating: 4.2, ratingCount: 110, image: IMG.catFood, stock: 70 },

  // ───────────────────────────── خزندگان ─────────────────────────────
  { id: 46, name: "غذای لاک‌پشت و خزندگان تترا ۲۵۰ میلی‌لیتر", brand: "تترا", cat: "reptiles", sub: "غذای خزندگان", price: 195000, discount: 10, rating: 4.1, ratingCount: 75, image: IMG.canned, stock: 35 },
  { id: 47, name: "تراریوم شیشه‌ای ۵۰ لیتری با درب کشویی", brand: "پت‌لند", cat: "reptiles", sub: "تراریوم", price: 2100000, discount: 8, rating: 4.0, ratingCount: 45, image: IMG.bed, stock: 3 },
  { id: 48, name: "لامپ گرمایشی تراریوم ۵۰ وات با کلاهک سرامیکی", brand: "تترا", cat: "reptiles", sub: "لوازم گرمایشی", price: 285000, discount: 15, rating: 4.2, ratingCount: 60, image: IMG.toy, stock: 40 },
  { id: 49, name: "بستر تراریوم پوسته نارگیل ۵ لیتری", brand: "تترا", cat: "reptiles", sub: "بستر تراریوم", price: 165000, discount: 5, rating: 4.0, ratingCount: 40, image: IMG.catFood, stock: 55 },
];

/** Extra gallery shots for the product page (main image first). */
const galleryPool = [IMG.canned, IMG.bed, IMG.toy, IMG.collar, IMG.shampoo];

export const productGallery = (p: Product) => [
  p.image,
  ...galleryPool.filter((src) => src !== p.image).slice(0, 2),
];

export const productDescription = (p: Product) =>
  `${p.name} از برند ${p.brand}، انتخابی مطمئن برای مراقبت روزانه از حیوان خانگی شما. ` +
  `این محصول با کیفیت ساخت بالا و بسته‌بندی استاندارد عرضه می‌شود و در فروشگاه دیجی‌پت ` +
  `با گارانتی اصالت و سلامت فیزیکی کالا و ۷ روز ضمانت بازگشت ارائه می‌گردد.`;

export const productSpecs = (p: Product) => [
  { label: "برند", value: p.brand },
  { label: "دسته‌بندی", value: categoryLabel(p.cat) },
  { label: "نوع کالا", value: p.sub },
  { label: "امتیاز کاربران", value: `${p.rating} از ۵` },
  { label: "موجودی انبار", value: `${p.stock} عدد` },
  { label: "گارانتی", value: "اصالت و سلامت فیزیکی کالا" },
];

export const getProduct = (id: string | number) =>
  products.find((p) => String(p.id) === String(id));

export const popularProducts = [...products]
  .sort((a, b) => b.ratingCount - a.ratingCount)
  .slice(0, 8);

export const suggestedProducts = [...products]
  .filter((p) => p.discount > 0)
  .sort((a, b) => b.discount - a.discount)
  .slice(0, 8);

export const amazingProducts = [...products]
  .filter((p) => p.discount >= 15)
  .sort((a, b) => b.discount - a.discount)
  .slice(0, 6);
