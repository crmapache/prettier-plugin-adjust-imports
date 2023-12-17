import path from 'path'

import { removeDuplicatedSeparators } from './remove-duplicated-separators'
import { describe } from 'node:test'

const correctUnixPath = '/Users/someuser/Documents/Projects/my-project'
const badUnixPath = '/Users//someuser/Documents//Projects/my-project'
const veryBadUnixPath = '/Users//someuser/Documents///Projects/my-project'

const correctWindowsPath = '\\Users\\someuser\\Documents\\Projects\\my-project'
const badWindowsPath = '\\Users\\someuser\\Documents\\\\Projects\\my-project'
const veryBadWindowsPath = '\\Users\\someuser\\Documents\\\\\\Projects\\my-project'

describe('removeDuplicateSeparators', () => {
  describe('unix', () => {
    test('returns the same path if there is no duplicated separators', () => {
      Object.defineProperty(path, 'sep', { value: '/' })
      expect(removeDuplicatedSeparators(correctUnixPath)).toBe(correctUnixPath)
    })

    test('returns correct path if there is duplicated separators', () => {
      Object.defineProperty(path, 'sep', { value: '/' })
      expect(removeDuplicatedSeparators(badUnixPath)).toBe(correctUnixPath)
    })

    test('returns correct path if there is more than two separators in a row', () => {
      Object.defineProperty(path, 'sep', { value: '/' })
      expect(removeDuplicatedSeparators(veryBadUnixPath)).toBe(correctUnixPath)
    })
  })

  describe('windows', () => {
    test('returns the same path if there is no duplicated separators', () => {
      Object.defineProperty(path, 'sep', { value: '\\' })
      expect(removeDuplicatedSeparators(correctWindowsPath)).toBe(correctWindowsPath)
    })

    test('returns correct path if there is duplicated separators', () => {
      Object.defineProperty(path, 'sep', { value: '\\' })
      expect(removeDuplicatedSeparators(badWindowsPath)).toBe(correctWindowsPath)
    })

    test('returns correct path if there is more than two separators in a row', () => {
      Object.defineProperty(path, 'sep', { value: '\\' })
      expect(removeDuplicatedSeparators(veryBadWindowsPath)).toBe(correctWindowsPath)
    })
  })
})
