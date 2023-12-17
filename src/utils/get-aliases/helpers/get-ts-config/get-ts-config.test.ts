import fs from 'fs'

import { getTsConfig } from './get-ts-config'

const mockReadFileSync = jest.fn()
mockReadFileSync.mockImplementation(() => {})

jest.mock('fs', () => ({
  readFileSync: (path: fs.PathOrFileDescriptor) => {
    return mockReadFileSync(path)
  },
}))

afterEach(() => {
  jest.clearAllMocks()
})

describe('getTsConfig', () => {
  const projectRoot = '/path/to/root'

  test('should return empty object if file reading fails.', () => {
    expect.assertions(2)

    mockReadFileSync.mockImplementation(() => {
      throw new Error('Error reading file')
    })

    const result = getTsConfig(projectRoot)

    expect(mockReadFileSync).toHaveBeenCalledWith(`${projectRoot}/tsconfig.json`)

    expect(result).toEqual({})
  })

  test('should return empty object if file parsing fails.', () => {
    expect.assertions(1)

    mockReadFileSync.mockImplementation(() => 'invalid JSON')

    const result = getTsConfig(projectRoot)

    expect(result).toEqual({})
  })

  test('should return correct ts config when config file contains valid JSON.', () => {
    expect.assertions(1)

    mockReadFileSync.mockImplementation(
      () => '{"compilerOptions": {"paths": {"@core": ["components/core"]}}}',
    )

    const result = getTsConfig(projectRoot)

    expect(result).toEqual({
      compilerOptions: {
        paths: {
          '@core': ['components/core'],
        },
      },
    })
  })
})
