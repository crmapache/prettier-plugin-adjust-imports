import { mergeFilepath } from './merge-filepath'

const pathToProjectRootFolder = '/Users/someuser/Documents/Projects/my-project'

const mockCwd = jest.spyOn(process, 'cwd')
mockCwd.mockImplementation(() => pathToProjectRootFolder)

describe('mergeFilepath', () => {
  const relativeFilepath = 'src/components/MyComponent'
  const absoluteFilepath = `${pathToProjectRootFolder}/src/components/MyComponent`

  test('returns the same path if it is already absolute', () => {
    expect(mergeFilepath(absoluteFilepath)).toBe(absoluteFilepath)
  })

  test('returns the absolute path if it is relative', () => {
    expect(mergeFilepath(relativeFilepath)).toBe(absoluteFilepath)
  })
})
