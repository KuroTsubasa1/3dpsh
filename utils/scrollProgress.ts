/**
 * Fraction of the page that has been scrolled, always within 0…1.
 *
 * Guards two real-world cases: pages shorter than the viewport (max === 0 would
 * divide by zero) and iOS rubber-band overscroll (scrollTop can be negative or
 * exceed the maximum).
 */
export function scrollProgress(
  scrollTop: number,
  scrollHeight: number,
  viewportHeight: number
): number {
  const max = scrollHeight - viewportHeight
  if (max <= 0) return 0
  return Math.min(1, Math.max(0, scrollTop / max))
}
