import { useConfigStore } from "@/store/config-store";

export function formatPrice(
  amount: number | string,
  currency: string = useConfigStore.getState().CURRENCY,
  shortVersion = false
) {
  const parsedAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(parsedAmount)) {
    return "Invalid amount";
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  });

  if (parsedAmount >= 1e6 && shortVersion) {
    return formatter.format(parsedAmount / 1e6) + "M";
  } else if (parsedAmount >= 1e3 && shortVersion) {
    return formatter.format(parsedAmount / 1e3) + "K";
  } else {
    return formatter.format(parsedAmount);
  }
}
