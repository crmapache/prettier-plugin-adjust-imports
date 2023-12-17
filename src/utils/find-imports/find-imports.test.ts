import { findImports } from './find-imports'
import fs from 'fs'
import path from 'path'

describe('findImports', () => {
  test('should find imports correctly.', () => {
    expect.assertions(1)

    const code = fs.readFileSync(path.resolve(__dirname, "./mocks/component-mock.txt")).toString('utf8')
    const imports = fs.readFileSync(path.resolve(__dirname, "./mocks/component-imports-mock.txt")).toString('utf8')

    const result = findImports(code)

    expect(result).toBe(imports.trim())
  })
})
