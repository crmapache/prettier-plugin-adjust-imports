import { removeDuplicatedSeparators } from '../remove-duplicated-separators'

/**
 * Сhecks the file path and makes it absolute if it is not.
 * The path may be different depending on whether prettier was run. From the console or using the IDE.
 */
export const mergeFilepath = (filepath: string): string => {
  const processPath = process.cwd()

  return filepath.startsWith(processPath)
    ? filepath
    : removeDuplicatedSeparators(`${processPath}/${filepath}`)
}
