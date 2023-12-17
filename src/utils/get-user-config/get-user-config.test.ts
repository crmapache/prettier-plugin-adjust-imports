import fs from 'fs'

import { USER_CONFIG_NAME } from '../../constants'
import { getUserConfig } from './get-user-config'

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

describe('getUserConfig', () => {
  const projectRoot = '/path/to/root'

  test('should return default config if file reading fails.', () => {
    expect.assertions(2)

    mockReadFileSync.mockImplementation(() => {
      throw new Error('Error reading file')
    })

    const result = getUserConfig(projectRoot)

    expect(mockReadFileSync).toHaveBeenCalledWith(`${projectRoot}/${USER_CONFIG_NAME}`)

    expect(result).toEqual({
      aliases: undefined,
      ascendingDepth: 0,
      descendingDepth: 0,
    })
  })

  test('should return default config if file parsing fails.', () => {
    expect.assertions(1)

    mockReadFileSync.mockImplementation(() => 'invalid JSON')

    const result = getUserConfig(projectRoot)

    expect(result).toEqual({
      aliases: undefined,
      ascendingDepth: 0,
      descendingDepth: 0,
    })
  })

  test('should return correct user config when user config file contains valid JSON.', () => {
    expect.assertions(1)

    mockReadFileSync.mockImplementation(() => '{"aliases": {"@core": ["components/core"]}}')

    const result = getUserConfig(projectRoot)

    expect(result).toEqual({
      aliases: {
        '@core': ['components/core'],
      },
      ascendingDepth: 0,
      descendingDepth: 0,
    })
  })

  test('should return correct ascendingDepth value from user config.', () => {
    expect.assertions(1)

    mockReadFileSync.mockImplementation(() => '{"ascendingDepth": 1}')

    const result = getUserConfig(projectRoot)

    expect(result).toEqual({
      aliases: undefined,
      ascendingDepth: 1,
      descendingDepth: 0,
    })
  })

  test('should return correct descendingDepth value from user config.', () => {
    expect.assertions(1)

    mockReadFileSync.mockImplementation(() => '{"descendingDepth": 1}')

    const result = getUserConfig(projectRoot)

    expect(result).toEqual({
      aliases: undefined,
      ascendingDepth: 0,
      descendingDepth: 1,
    })
  })
})
