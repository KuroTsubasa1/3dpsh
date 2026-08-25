import { describe, it, expect } from 'vitest'
import { upcomingConventions, type Convention } from '../utils/conventions'

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
