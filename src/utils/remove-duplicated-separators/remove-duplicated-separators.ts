import path from 'path'

/**
 * Removes duplicate separators from file path.
 */
export const removeDuplicatedSeparators = (filepath: string): string => {
  return path.sep === '/' ? filepath.replace(/\/{2,}/g, '/') : filepath.replace(/\\{2,}/g, '\\')
}
