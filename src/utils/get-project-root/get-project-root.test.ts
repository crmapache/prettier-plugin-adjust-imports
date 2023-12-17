import { getProjectRoot } from './get-project-root'
import path from 'path'

const projectRootPath = 'path/to/my/project'

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  existsSync: (filepath: string) => filepath === `${projectRootPath}/package.json`,
}))

jest.mock('path', () => ({
  ...jest.requireActual('path'),
  join: (...args: string[]) => args.join('/'),
}))

describe('getProjectRoot', () => {
  test('should return the correct root path when package.json exists', () => {
    expect.assertions(1)

    Object.defineProperty(path, 'sep', { value: '/' })

    const filepath = `${projectRootPath}/src/nested/folder/file.ts`
    const result = getProjectRoot(filepath)

    expect(result).toEqual(projectRootPath)
  })

  test('should return null when no package.json is found in the path', () => {
    expect.assertions(1)

    Object.defineProperty(path, 'sep', { value: '/' })

    const filepath = 'wrong/path/src/nested/folder/file.ts'
    const result = getProjectRoot(filepath)

    expect(result).toBeNull()
  })
})
