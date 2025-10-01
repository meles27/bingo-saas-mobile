export function formatEpochToDate(epochMillSeconds: number) {
  const date = new Date(epochMillSeconds); // Convert seconds to milliseconds
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}
