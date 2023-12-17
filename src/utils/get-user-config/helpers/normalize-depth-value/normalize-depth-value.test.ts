import { normalizeDepthValue } from './normalize-depth-value'

describe('normalizeDepthValue', () => {
  test('should return the same number if value is positive.', () => {
    expect.assertions(1)

    const result = normalizeDepthValue(1)
    expect(result).toEqual(1)
  })

  test('should return the same number if value equal to zero', () => {
    expect.assertions(1)

    const result = normalizeDepthValue(0)
    expect(result).toEqual(0)
  })

  test('should return zero if value less than zero', () => {
    expect.assertions(1)

    const result = normalizeDepthValue(-1)
    expect(result).toEqual(0)
  })

  test('should return zero if value not a number', () => {
    expect.assertions(1)

    const result = normalizeDepthValue(Symbol())
    expect(result).toEqual(0)
  })
})
