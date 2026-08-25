import { describe, it, expect } from 'vitest'
import { upcomingConventions, validateConventions, type Convention } from '../utils/conventions'

const con = (name: string, from: string, to: string): Convention => ({
  name, from, to, city: 'Eutin', venue: '', stand: '', url: ''
})

describe('upcomingConventions', () => {
  it('drops an event that ended before today but keeps one that has not', () => {
    const list = [
      con('Vergangen', '2026-03-01', '2026-03-02'),
      con('Kommend', '2026-09-01', '2026-09-02')
    ]
    expect(upcomingConventions(list, '2026-08-25').map(c => c.name)).toEqual(['Kommend'])
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
    expect(result.problems[0].name).toBe('Schlecht (Eintrag 1)')
  })

  it('reports an end date before the start date', () => {
    const list = [con('Verkehrt', '2026-09-10', '2026-09-01')]
    const result = validateConventions(list)
    expect(result.valid).toEqual([])
    expect(result.problems).toHaveLength(1)
    expect(result.problems[0].name).toBe('Verkehrt (Eintrag 1)')
  })

  it('splits a mix of a valid and an invalid entry, naming the invalid one by its position', () => {
    const good = con('Gut', '2026-09-01', '2026-09-02')
    const bad = con('Schlecht', '2026-9-1', '2026-9-2')
    const result = validateConventions([good, bad])
    expect(result.valid).toEqual([good])
    expect(result.problems).toHaveLength(1)
    expect(result.problems[0].name).toBe('Schlecht (Eintrag 2)')
  })

  it('rejects a top-level value that is not an array, without throwing', () => {
    expect(validateConventions(null)).toEqual({
      valid: [],
      problems: [{ name: '(Datei)', reason: 'conventions ist keine Liste' }]
    })
    expect(validateConventions({ not: 'an array' })).toEqual({
      valid: [],
      problems: [{ name: '(Datei)', reason: 'conventions ist keine Liste' }]
    })
    expect(validateConventions(undefined)).toEqual({
      valid: [],
      problems: [{ name: '(Datei)', reason: 'conventions ist keine Liste' }]
    })
  })

  it('rejects a bare string entry, locating it by position', () => {
    const result = validateConventions(['not an object'])
    expect(result.valid).toEqual([])
    expect(result.problems).toHaveLength(1)
    expect(result.problems[0].name).toBe('Eintrag 1')
  })

  it('rejects null inside the array without throwing', () => {
    const result = validateConventions([null])
    expect(result.valid).toEqual([])
    expect(result.problems).toHaveLength(1)
    expect(result.problems[0].name).toBe('Eintrag 1')
  })

  it('rejects an entry with a missing "to" date', () => {
    const bad = { name: 'Halb', from: '2026-09-01', city: 'Eutin', venue: '', stand: '', url: '' }
    const result = validateConventions([bad])
    expect(result.valid).toEqual([])
    expect(result.problems).toHaveLength(1)
    expect(result.problems[0].name).toBe('Halb (Eintrag 1)')
  })

  it('rejects a date carrying a time component', () => {
    const list = [con('Mit Uhrzeit', '2026-09-01T09:00', '2026-09-02')]
    const result = validateConventions(list)
    expect(result.valid).toEqual([])
    expect(result.problems).toHaveLength(1)
    expect(result.problems[0].name).toBe('Mit Uhrzeit (Eintrag 1)')
  })

  it('rejects an entry with a missing name, locating it by position', () => {
    const bad = { from: '2026-09-01', to: '2026-09-02', city: 'Eutin', venue: '', stand: '', url: '' }
    const result = validateConventions([bad])
    expect(result.valid).toEqual([])
    expect(result.problems).toHaveLength(1)
    expect(result.problems[0].name).toBe('Eintrag 1')
  })

  it('rejects an entry with a missing city', () => {
    const bad = { name: 'Kein Ort', from: '2026-09-01', to: '2026-09-02', venue: '', stand: '', url: '' }
    const result = validateConventions([bad])
    expect(result.valid).toEqual([])
    expect(result.problems).toHaveLength(1)
    expect(result.problems[0].name).toBe('Kein Ort (Eintrag 1)')
  })

  it('survives a mix of every kind of bad entry without throwing', () => {
    const good = con('Gut', '2026-09-01', '2026-09-02')
    const result = validateConventions([null, 'x', 42, good, { name: 'Ohne Ort' }])
    expect(result.valid).toEqual([good])
    expect(result.problems).toHaveLength(4)
  })
})
