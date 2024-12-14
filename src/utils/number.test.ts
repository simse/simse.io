import { describe, expect, test } from 'vitest'
import { kFormatter } from './number.ts'

describe('kFormatter', () => {
  test('it does no formatting when number is less than 1,000', () => {
    expect(kFormatter(100)).toBe('100')
  })
})
