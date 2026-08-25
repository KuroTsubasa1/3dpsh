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
 *
 * The input is untyped on purpose: the file is hand-edited JSON, so nothing
 * guarantees it is even an array of objects at runtime, no matter what the
 * `Convention[]` cast at the call site claims. Every check below has to
 * survive a `null`, a string, or a completely different shape without
 * throwing — a bad entry becomes a problem, never a crash.
 */
export function validateConventions(list: unknown): {
  valid: Convention[]
  problems: ConventionProblem[]
} {
  const valid: Convention[] = []
  const problems: ConventionProblem[] = []

  if (!Array.isArray(list)) {
    return { valid: [], problems: [{ name: '(Datei)', reason: 'conventions ist keine Liste' }] }
  }

  list.forEach((entry, index) => {
    const position = `Eintrag ${index + 1}`

    if (typeof entry !== 'object' || entry === null) {
      problems.push({ name: position, reason: `${position} ist kein gültiger Eintrag (Objekt erwartet)` })
      return
    }

    const c = entry as Partial<Convention>
    const name = typeof c.name === 'string' ? c.name.trim() : ''
    const label = name ? `${name} (${position})` : position

    if (!name) {
      problems.push({ name: label, reason: `${position}: Name fehlt` })
      return
    }
    const city = typeof c.city === 'string' ? c.city.trim() : ''
    if (!city) {
      problems.push({ name: label, reason: `${position}: Ort fehlt` })
      return
    }
    const from = typeof c.from === 'string' ? c.from : ''
    const to = typeof c.to === 'string' ? c.to : ''
    if (!ISO_DATE.test(from) || !ISO_DATE.test(to)) {
      problems.push({ name: label, reason: `Datum nicht im Format JJJJ-MM-TT: ${from} / ${to}` })
      return
    }
    if (to < from) {
      problems.push({ name: label, reason: `Enddatum liegt vor dem Startdatum: ${from} → ${to}` })
      return
    }

    valid.push(c as Convention)
  })

  return { valid, problems }
}
