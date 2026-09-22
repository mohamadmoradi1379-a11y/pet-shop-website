const persianDigits = "۰۱۲۳۴۵۶۷۸۹";

/** Convert a number (or numeric string) to Persian digits. */
export const toPersian = (n: number | string) =>
  String(n).replace(/\d/g, (d) => persianDigits[Number(d)]);

/** Group digits with Persian separators: 2850000 -> ۲٬۸۵۰٬۰۰۰ */
export const formatPrice = (n: number) => n.toLocaleString("fa-IR");

/** Price after applying a percent discount. */
export const finalPrice = (price: number, discount: number) =>
  Math.round((price * (100 - discount)) / 100);
