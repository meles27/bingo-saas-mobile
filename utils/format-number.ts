export function formatNumber(
  value: number | string,
  shortVersion = false,
  decimals = 2,
  locale: string = "en-US"
): string {
  const parsedValue = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(parsedValue)) {
    return "Invalid number";
  }

  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });

  if (shortVersion) {
    if (parsedValue >= 1e9) {
      return formatter.format(parsedValue / 1e9) + "B";
    } else if (parsedValue >= 1e6) {
      return formatter.format(parsedValue / 1e6) + "M";
    } else if (parsedValue >= 1e3) {
      return formatter.format(parsedValue / 1e3) + "K";
    }
  }

  return formatter.format(parsedValue);
}
