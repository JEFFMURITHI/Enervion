// src/utils/format.js
export const formatCurrency = (amount, currency = "KES") => {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency,
  }).format(amount);
};

export const truncateText = (text, length = 100) => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};
