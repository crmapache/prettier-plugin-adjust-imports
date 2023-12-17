import { clearJsonTrailingCommas } from './clear-json-trailing-commas'

describe('getUserConfig', () => {
  test('should return clear value if it is not contain trailing commas.', () => {
    expect.assertions(1)

    const result = clearJsonTrailingCommas('{"aliases": {"@core": ["components/core"]}}')

    expect(result).toEqual('{"aliases":{"@core":["components/core"]}}')
  })

  test('should return value without trailing commas.', () => {
    expect.assertions(1)

    const result = clearJsonTrailingCommas('{"aliases": {"@core": ["components/core"]},}')

    expect(result).toEqual('{"aliases":{"@core":["components/core"]}}')
  })
})
