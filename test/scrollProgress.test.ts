import { describe, it, expect } from 'vitest'
import { scrollProgress } from '../utils/scrollProgress'

describe('scrollProgress', () => {
  it('is 0 at the top of a scrollable page', () => {
    expect(scrollProgress(0, 3000, 1000)).toBe(0)
  })

  it('is 1 at the bottom', () => {
    expect(scrollProgress(2000, 3000, 1000)).toBe(1)
  })

  it('is 0.5 halfway down', () => {
    expect(scrollProgress(1000, 3000, 1000)).toBe(0.5)
  })

  it('returns 0 when the page is not scrollable (no division by zero)', () => {
    expect(scrollProgress(0, 800, 1000)).toBe(0)
  })

  it('clamps negative scrollTop from overscroll', () => {
    expect(scrollProgress(-120, 3000, 1000)).toBe(0)
  })

  it('clamps scrollTop beyond the maximum from overscroll', () => {
    expect(scrollProgress(9999, 3000, 1000)).toBe(1)
  })
})
