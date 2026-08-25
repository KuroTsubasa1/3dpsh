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
 * `filter()` already returns a new array, so the subsequent `sort()` mutates
 * that copy, not the caller's list.
 */
export function upcomingConventions(list: Convention[], today: string): Convention[] {
  return list
    .filter(c => c.to >= today)
    .sort((a, b) => a.from.localeCompare(b.from))
}

/** Matches a strict ISO calendar date: four digits, two, two. */
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

export interface ConventionProblem {
  name: string
  reason: string
}

/**
 * Splits hand-maintained entries into usable ones and problems.
 *
 * The data file is edited by hand, so a mistyped date is a question of when,
 * not if. A malformed date would sort wrongly and a reversed range would hide
 * the event — both without a trace. Naming the bad entry costs one log line and
 * saves an afternoon.
 */
export function validateConventions(list: Convention[]): {
  valid: Convention[]
  problems: ConventionProblem[]
} {
  const valid: Convention[] = []
  const problems: ConventionProblem[] = []

  for (const c of list) {
    if (!ISO_DATE.test(c.from) || !ISO_DATE.test(c.to)) {
      problems.push({ name: c.name, reason: `Datum nicht im Format JJJJ-MM-TT: ${c.from} / ${c.to}` })
      continue
    }
    if (c.to < c.from) {
      problems.push({ name: c.name, reason: `Enddatum liegt vor dem Startdatum: ${c.from} → ${c.to}` })
      continue
    }
    valid.push(c)
  }

  return { valid, problems }
}
