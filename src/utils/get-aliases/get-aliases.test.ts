import { getAliases } from './get-aliases'

const mockGetTsConfig = jest.fn()

jest.mock('./helpers', () => ({
  getTsConfig: (rootFolder: string) => mockGetTsConfig(rootFolder),
}))

afterEach(() => {
  jest.clearAllMocks()
})

describe('getAliases', () => {
  const rootFolder = '/path/to/project'

  test('should return aliases from tsconfig.', () => {
    expect.assertions(1)

    mockGetTsConfig.mockReturnValue({
      compilerOptions: {
        paths: {
          '@core': ['components/core'],
        },
      },
    })

    const userConfig = {
      aliases: {
        '@features': ['components/features'],
      },
    }

    const aliases = getAliases(userConfig, rootFolder)

    expect(aliases).toEqual({
      '@core': 'components/core'
    })
  })

  test('should return aliases from user config if tsconfig does not have paths.', () => {
    expect.assertions(1)

    mockGetTsConfig.mockReturnValue({})

    const userConfig = {
      aliases: {
        '@features': ['components/features'],
      },
    }

    const aliases = getAliases(userConfig, rootFolder)

    expect(aliases).toEqual({
      '@features': 'components/features'
    })
  })

  test('should return null if ts and user configs does not have aliases.', () => {
    expect.assertions(1)

    mockGetTsConfig.mockReturnValue({})

    const userConfig = {}

    const aliases = getAliases(userConfig, rootFolder)

    expect(aliases).toBeNull()
  })

  test('should return aliases without "/*".', () => {
    expect.assertions(1)

    mockGetTsConfig.mockReturnValue({
      compilerOptions: {
        paths: {
          '@core': ['components/core'],
          '@core/*': ['components/core/*'],
        },
      },
    })

    const userConfig = {}

    const aliases = getAliases(userConfig, rootFolder)

    expect(aliases).toEqual({
      '@core': 'components/core'
    })
  })

  test('should return aliases without "src" and "./" prefixes.', () => {
    expect.assertions(1)

    mockGetTsConfig.mockReturnValue({
      compilerOptions: {
        paths: {
          '@core1': ['./src/components/core1'],
          '@core2': ['/src/components/core2'],
          '@core3': ['src/components/core3'],
          '@core4': ['./components/core4'],
        },
      },
    })

    const userConfig = {}

    const aliases = getAliases(userConfig, rootFolder)

    expect(aliases).toEqual({
      '@core1': 'components/core1',
      '@core2': 'components/core2',
      '@core3': 'components/core3',
      '@core4': 'components/core4',
    })
  })
})
