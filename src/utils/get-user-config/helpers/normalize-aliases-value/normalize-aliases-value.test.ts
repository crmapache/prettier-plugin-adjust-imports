import { normalizeAliasesValue } from './normalize-aliases-value'

describe('normalizeDepthValue', () => {
  test('should return the same value if value is array with at least one element that match "Record<string, string[]>" type.', () => {
    expect.assertions(1)

    const value = {
      '@core': ['components/core'],
    }

    const result = normalizeAliasesValue(value)
    expect(result).toEqual(value)
  })

  test('should return undefined if passed value is null.', () => {
    expect.assertions(1)

    const result = normalizeAliasesValue(null)
    expect(result).toEqual(undefined)
  })

  test('should return undefined if passed value is array.', () => {
    expect.assertions(1)

    const result = normalizeAliasesValue(['1'])
    expect(result).toEqual(undefined)
  })

  test('should return undefined if passed value is object but not valid type.', () => {
    expect.assertions(1)

    const value = {
      '@core': 'components/core',
    }

    const result = normalizeAliasesValue(value)
    expect(result).toEqual(undefined)
  })
})
