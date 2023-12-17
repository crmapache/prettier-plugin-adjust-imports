/**
 * Removes trailing commas in json string.
 */
export const clearJsonTrailingCommas = (value: string) => {
  return value.replace(/[\s\n]/gm, '').replace(',}', '}')
}
