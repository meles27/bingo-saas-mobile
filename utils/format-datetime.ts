/**
 * Default formatting options for a full date and time display.
 */
const DEFAULT_DATETIME_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
};

/**
 * A robust utility to format a date string or Date object into a human-readable string.
 * It gracefully handles invalid inputs.
 *
 * @param dateValue The date to format, which can be a Date object or a string (e.g., ISO 8601).
 * @param options Optional Intl.DateTimeFormatOptions to customize the output format.
 * @returns A formatted date string, or "Invalid Date" if the input is not a valid date.
 *
 * @example
 * // Using a string
 * formatDateTime("2025-10-12T03:05:24.455Z");
 * // => "October 11, 2025, 10:05:24 PM" (adjusts for local timezone)
 *
 * @example
 * // Using a Date object
 * formatDateTime(new Date());
 * // => "October 12, 2025, 5:42:00 PM"
 *
 * @example
 * // Customizing the format to date-only
 * formatDateTime("2025-10-12T03:05:24.455Z", {
 *   year: 'numeric',
 *   month: 'short',
 *   day: 'numeric'
 * });
 * // => "Oct 11, 2025"
 *
 * @example
 * // Handling invalid input
 * formatDateTime("not a real date");
 * // => "Invalid Date"
 */
export function formatDateTime(
  dateValue: Date | string | null | undefined,
  options: Intl.DateTimeFormatOptions = DEFAULT_DATETIME_OPTIONS
): string {
  // 1. Handle null or undefined inputs immediately.
  if (!dateValue) {
    return "Invalid Date";
  }

  // 2. Create a Date object. The constructor is flexible and handles both
  //    Date objects (by copying) and string parsing.
  const date = new Date(dateValue);

  // 3. Check if the created date is valid. `isNaN` on the time is the
  //    standard way to check for an "Invalid Date" object.
  if (isNaN(date.getTime())) {
    console.warn(
      `formatDateTime received an invalid date value: "${dateValue}"`
    );
    return "Invalid Date";
  }

  // 4. Format the valid date using the provided options and the user's locale.
  return date.toLocaleString("en-US", options);
}
