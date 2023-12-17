/**
 * Extract path value from import string.
 */
export const extractImportPath = (importValue: string): string => {
  /**
   * Check if the import is kind of
   * import * from 'some/import/path'
   */
  const matches = importValue.match(/from.+/)

  if (matches !== null) {
    /**
     * Remove everything in import and left only path
     */
    return matches[0].replace(/['";]|from/gm, '').trim()
  }

  /**
   * Remove everything in import and left only path
   */
  return importValue.replace(/['";]|import/gm, '').trim()
}
