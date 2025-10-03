import { useWindowDimensions } from "react-native";

/**
 * Smart carousel width hook
 * - Dynamically scales item width
 * - Ensures items never perfectly fill the screen (always a peek)
 * @param factorRange - optional min/max scaling factor (default [0.35, 0.8])
 * @param baseWidth - reference width for scaling (default 400)
 * @param spacing - spacing between items
 */
export function useCarouselWidth(
  factorRange: [number, number] = [0.35, 0.8],
  baseWidth = 400,
  spacing = 16
) {
  const { width: screenWidth } = useWindowDimensions();
  const [minFactor, maxFactor] = factorRange;

  // Base smooth scaling factor
  let factor = maxFactor - (screenWidth - baseWidth) / 1000;
  factor = Math.max(minFactor, Math.min(maxFactor, factor));

  // Initial item width
  let itemWidth = screenWidth * factor - spacing;

  // Smart adjustment: prevent perfect full-width fit
  const fullFitCount = Math.round(screenWidth / (itemWidth + spacing));
  const perfectFitWidth =
    (screenWidth - spacing * (fullFitCount - 1)) / fullFitCount;

  if (Math.abs(perfectFitWidth - itemWidth) < 1) {
    // reduce slightly to create peek effect
    itemWidth = perfectFitWidth * 0.95;
  }

  // Never exceed screen width
  if (itemWidth > screenWidth - spacing) itemWidth = screenWidth - spacing;

  return itemWidth;
}
