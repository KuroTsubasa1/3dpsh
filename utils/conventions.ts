export interface Convention {
  name: string
  /** ISO date, first day, e.g. "2026-09-14" */
  from: string
  /** ISO date, last day. An event is shown through the end of this day. */
  to: string
  city: string
  venue: string
  stand: string
  url: string
}

/**
 * Events that have not finished yet, earliest first.
 *
 * Compares ISO date strings directly — they sort lexicographically, which
 * avoids timezone surprises from Date parsing on the server. An event running
 * across today stays visible: the cut-off is its end date, not its start.
 */
export function upcomingConventions(list: Convention[], today: string): Convention[] {
  return list
    .filter(c => c.to >= today)
    .slice()
    .sort((a, b) => a.from.localeCompare(b.from))
}
