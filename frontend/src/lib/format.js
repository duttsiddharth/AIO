// Number/currency formatting helpers
export const fmtNumber = (n, opts = {}) => new Intl.NumberFormat("en-US", opts).format(n);

export const fmtCurrency = (n, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(n);

export const fmtCompact = (n) =>
  new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);

export const fmtPct = (n, digits = 1) => `${Number(n).toFixed(digits)}%`;

export const fmtMinutes = (m) => {
  if (m < 60) return `${Math.round(m)}m`;
  const h = Math.floor(m / 60);
  const rem = Math.round(m - h * 60);
  return rem === 0 ? `${h}h` : `${h}h ${rem}m`;
};
