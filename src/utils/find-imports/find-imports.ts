/**
 * Find all imports statement in the code.
 */
export const findImports = (code: string): string | null => {
  const rows = code.split('\n')

  let lastImportIndex = -1
  let waitCloseBrace = false

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].trim()

    if (/^import\s\{$/.test(row)) {
      waitCloseBrace = true
    } else if (waitCloseBrace && /}.+/.test(row)) {
      lastImportIndex = i
      waitCloseBrace = false
    } else if (/^import\s.+/.test(row)) {
      lastImportIndex = i
    }
  }

  let imports = []

  if (lastImportIndex >= 0) {
    imports = rows.slice(0, lastImportIndex + 1)
  }

  return imports.length ? imports.join('\n') : null
}
