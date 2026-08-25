import { describe, it, expect } from 'vitest'
import { upcomingConventions, validateConventions, type Convention } from '../utils/conventions'

const con = (name: string, from: string, to: string): Convention => ({
  name, from, to, city: 'Eutin', venue: '', stand: '', url: ''
})

describe('upcomingConventions', () => {
  it('hides events that ended before today', () => {
    const list = [con('Vergangen', '2026-03-01', '2026-03-02')]
    expect(upcomingConventions(list, '2026-08-25')).toEqual([])
  })

  it('keeps an event that is running today', () => {
    const list = [con('Laeuft', '2026-08-24', '2026-08-26')]
    expect(upcomingConventions(list, '2026-08-25').map(c => c.name)).toEqual(['Laeuft'])
  })

  it('keeps an event that ends today', () => {
    const list = [con('Endet heute', '2026-08-20', '2026-08-25')]
    expect(upcomingConventions(list, '2026-08-25').map(c => c.name)).toEqual(['Endet heute'])
  })

  it('sorts the remaining events by start date', () => {
    const list = [
      con('Spaeter', '2026-11-01', '2026-11-02'),
      con('Frueher', '2026-09-01', '2026-09-02')
    ]
    expect(upcomingConventions(list, '2026-08-25').map(c => c.name))
      .toEqual(['Frueher', 'Spaeter'])
  })

  it('returns an empty array for an empty list', () => {
    expect(upcomingConventions([], '2026-08-25')).toEqual([])
  })

  it('does not mutate the input array', () => {
    const list = [con('B', '2026-11-01', '2026-11-02'), con('A', '2026-09-01', '2026-09-02')]
    upcomingConventions(list, '2026-08-25')
    expect(list.map(c => c.name)).toEqual(['B', 'A'])
  })
})

describe('validateConventions', () => {
  it('passes a well-formed entry through', () => {
    const list = [con('Gut', '2026-09-01', '2026-09-02')]
    expect(validateConventions(list)).toEqual({ valid: list, problems: [] })
  })

  it('reports a date missing zero-padding', () => {
    const list = [con('Schlecht', '2026-9-1', '2026-9-2')]
    const result = validateConventions(list)
    expect(result.valid).toEqual([])
    expect(result.problems).toHaveLength(1)
    expect(result.problems[0].name).toBe('Schlecht')
  })

  it('reports an end date before the start date', () => {
    const list = [con('Verkehrt', '2026-09-10', '2026-09-01')]
    const result = validateConventions(list)
    expect(result.valid).toEqual([])
    expect(result.problems).toHaveLength(1)
    expect(result.problems[0].name).toBe('Verkehrt')
  })

  it('splits a mix of a valid and an invalid entry', () => {
    const good = con('Gut', '2026-09-01', '2026-09-02')
    const bad = con('Schlecht', '2026-9-1', '2026-9-2')
    const result = validateConventions([good, bad])
    expect(result.valid).toEqual([good])
    expect(result.problems).toHaveLength(1)
    expect(result.problems[0].name).toBe('Schlecht')
  })
})
