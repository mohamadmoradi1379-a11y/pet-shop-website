/**
 * Single source of truth for the category tree.
 *
 * Every clickable circle in the app (home page quick-access row, the /category
 * sidebar tree, and the sub-category circles on the listing page) is generated
 * from this file, so a circle can never point at a sub-category that has no
 * products behind it.
 */

export type CategoryItem = {
  label: string;
  emoji: string;
  /** sub-category id (must match `Product.sub`) — omit for "all products" */
  sub?: string;
};

export type CategoryGroup = {
  title: string;
  items: CategoryItem[];
};

export type Category = {
  id: string;
  label: string;
  icon: string;
  groups: CategoryGroup[];
};

export const categories: Category[] = [
  {
    id: "dogs",
    label: "سگ",
    icon: "🐶",
    groups: [
      {
        title: "برندهای برتر غذای سگ",
        items: [
          { label: "رویال کنین", emoji: "🏆", sub: "غذای خشک سگ" },
          { label: "جوسرا", emoji: "⭐", sub: "غذای خشک سگ" },
          { label: "پدیگری", emoji: "🐾", sub: "کنسرو و پوچ سگ" },
          { label: "پروپلن", emoji: "💎", sub: "غذای خشک سگ" },
          { label: "یوکانوبا", emoji: "🌟", sub: "غذای خشک سگ" },
          { label: "همه کالاها", emoji: "🔲" },
        ],
      },
      {
        title: "غذا براساس نوع",
        items: [
          { label: "غذای خشک", emoji: "🥣", sub: "غذای خشک سگ" },
          { label: "کنسرو و پوچ", emoji: "🥫", sub: "کنسرو و پوچ سگ" },
          { label: "تشویقی", emoji: "🦴", sub: "تشویقی و دنتال" },
          { label: "مکمل و ویتامین", emoji: "💊", sub: "مکمل و ویتامین" },
          { label: "دنتال استیک", emoji: "🦷", sub: "تشویقی و دنتال" },
          { label: "همه کالاها", emoji: "🔲" },
        ],
      },
      {
        title: "لوازم و اکسسوری",
        items: [
          { label: "قلاده و بند", emoji: "📿", sub: "قلاده و بند" },
          { label: "تخت و جای خواب", emoji: "🛏️", sub: "جای خواب و باکس" },
          { label: "اسباب‌بازی", emoji: "🎾", sub: "اسباب‌بازی سگ" },
          { label: "ظرف آب و غذا", emoji: "🍚", sub: "ظروف آب و غذا" },
          { label: "لوازم بهداشتی", emoji: "🧴", sub: "لوازم بهداشتی سگ" },
          { label: "همه کالاها", emoji: "🔲" },
        ],
      },
    ],
  },
  {
    id: "cats",
    label: "گربه",
    icon: "🐱",
    groups: [
      {
        title: "برندهای برتر غذای گربه",
        items: [
          { label: "ویسکاس", emoji: "🐱", sub: "غذای خشک گربه" },
          { label: "رویال کنین", emoji: "🏆", sub: "غذای خشک گربه" },
          { label: "شسیر", emoji: "🐠", sub: "کنسرو و پوچ گربه" },
          { label: "هپی کت", emoji: "😺", sub: "غذای خشک گربه" },
          { label: "کت چاو", emoji: "✨", sub: "غذای خشک گربه" },
          { label: "همه کالاها", emoji: "🔲" },
        ],
      },
      {
        title: "غذا براساس نوع",
        items: [
          { label: "غذای خشک", emoji: "🥣", sub: "غذای خشک گربه" },
          { label: "کنسرو و پوچ", emoji: "🥫", sub: "کنسرو و پوچ گربه" },
          { label: "تشویقی گربه", emoji: "🐟", sub: "تشویقی گربه" },
          { label: "خاک گربه", emoji: "🪨", sub: "خاک گربه" },
          { label: "ظرف خاک", emoji: "📦", sub: "ظرف خاک و بیلچه" },
          { label: "همه کالاها", emoji: "🔲" },
        ],
      },
      {
        title: "لوازم و اکسسوری",
        items: [
          { label: "اسکرچر", emoji: "🌲", sub: "جای خواب و اسکرچر" },
          { label: "اسباب‌بازی", emoji: "🎣", sub: "اسباب‌بازی گربه" },
          { label: "تخت و خواب", emoji: "🛏️", sub: "جای خواب و اسکرچر" },
          { label: "لوازم بهداشتی", emoji: "🧴", sub: "لوازم بهداشتی گربه" },
          { label: "سیستم آبخوری", emoji: "💧", sub: "ظرف خاک و بیلچه" },
          { label: "همه کالاها", emoji: "🔲" },
        ],
      },
    ],
  },
  {
    id: "birds",
    label: "پرندگان",
    icon: "🦜",
    groups: [
      {
        title: "غذای پرندگان",
        items: [
          { label: "غذای طوطی", emoji: "🦜", sub: "غذای پرندگان" },
          { label: "غذای قناری", emoji: "🐦", sub: "غذای پرندگان" },
          { label: "غذای مرغ عشق", emoji: "💕", sub: "غذای پرندگان" },
          { label: "دانه و میوه", emoji: "🍎", sub: "غذای پرندگان" },
          { label: "همه کالاها", emoji: "🔲" },
        ],
      },
      {
        title: "لوازم و قفس",
        items: [
          { label: "قفس طوطی", emoji: "🏠", sub: "قفس پرنده" },
          { label: "قفس قناری", emoji: "🏡", sub: "قفس پرنده" },
          { label: "اسباب‌بازی پرنده", emoji: "🎮", sub: "اسباب‌بازی پرنده" },
          { label: "آبخوری و ظرف", emoji: "💧", sub: "لوازم جانبی قفس" },
          { label: "همه کالاها", emoji: "🔲" },
        ],
      },
    ],
  },
  {
    id: "aquatics",
    label: "آبزیان",
    icon: "🐠",
    groups: [
      {
        title: "غذای آبزیان",
        items: [
          { label: "غذای ماهی تزئینی", emoji: "🐠", sub: "غذای ماهی" },
          { label: "غذای طلاماهی", emoji: "🐟", sub: "غذای ماهی" },
          { label: "غذای لاک‌پشت", emoji: "🐢", sub: "غذای ماهی" },
          { label: "همه کالاها", emoji: "🔲" },
        ],
      },
      {
        title: "آکواریوم و تجهیزات",
        items: [
          { label: "آکواریوم", emoji: "🪟", sub: "آکواریوم" },
          { label: "پمپ هوا", emoji: "💨", sub: "پمپ هوا و فیلتر" },
          { label: "فیلتر آب", emoji: "🔵", sub: "پمپ هوا و فیلتر" },
          { label: "تزیینات", emoji: "🪸", sub: "تزیینات آکواریوم" },
          { label: "همه کالاها", emoji: "🔲" },
        ],
      },
    ],
  },
  {
    id: "small_pets",
    label: "جوندگان",
    icon: "🐹",
    groups: [
      {
        title: "غذا و تغذیه",
        items: [
          { label: "غذای همستر", emoji: "🐹", sub: "غذای جوندگان" },
          { label: "غذای خرگوش", emoji: "🐰", sub: "غذای جوندگان" },
          { label: "تشویقی جوندگان", emoji: "🌽", sub: "غذای جوندگان" },
          { label: "همه کالاها", emoji: "🔲" },
        ],
      },
      {
        title: "قفس و لوازم",
        items: [
          { label: "قفس همستر", emoji: "🏠", sub: "قفس جوندگان" },
          { label: "قفس خرگوش", emoji: "🏡", sub: "قفس جوندگان" },
          { label: "بستر و پوشال", emoji: "🪹", sub: "پوشال و بستر" },
          { label: "اسباب‌بازی", emoji: "🎯", sub: "قفس جوندگان" },
          { label: "همه کالاها", emoji: "🔲" },
        ],
      },
    ],
  },
  {
    id: "reptiles",
    label: "خزندگان",
    icon: "🐢",
    groups: [
      {
        title: "غذا و تغذیه",
        items: [
          { label: "غذای لاک‌پشت", emoji: "🐢", sub: "غذای خزندگان" },
          { label: "غذای مار", emoji: "🐍", sub: "غذای خزندگان" },
          { label: "غذای آفتاب‌پرست", emoji: "🦎", sub: "غذای خزندگان" },
          { label: "همه کالاها", emoji: "🔲" },
        ],
      },
      {
        title: "تراریوم و تجهیزات",
        items: [
          { label: "تراریوم", emoji: "🪟", sub: "تراریوم" },
          { label: "لامپ گرمایشی", emoji: "💡", sub: "لوازم گرمایشی" },
          { label: "بستر تراریوم", emoji: "🪨", sub: "بستر تراریوم" },
          { label: "همه کالاها", emoji: "🔲" },
        ],
      },
    ],
  },
];

export const getCategory = (id: string) => categories.find((c) => c.id === id);

export const categoryLabel = (id: string) => getCategory(id)?.label ?? id;

export const categoryIcon = (id: string) => getCategory(id)?.icon ?? "🐾";

/** Unique sub-categories of a category, in the order they appear. */
export const subCategories = (catId: string) => {
  const cat = getCategory(catId);
  if (!cat) return [];
  const seen = new Set<string>();
  const subs: { sub: string; emoji: string }[] = [];
  cat.groups.forEach((group) =>
    group.items.forEach((item) => {
      if (item.sub && !seen.has(item.sub)) {
        seen.add(item.sub);
        subs.push({ sub: item.sub, emoji: item.emoji });
      }
    })
  );
  return subs;
};
