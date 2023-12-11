import { Alias, DetalizedImport } from '../types'
import { extractImportPath } from './extract-import-path'

const clearImportFromComments = (row: string) =>
  row
    .replace(/\/\*[\s\S]*?\*\//gm, '')
    .replace(/\/\/.+$/gm, '')
    .replace(/^[ \t]*\n/gm, '')

const findAliasMathImport = (path: string, aliases: Alias[]): Alias | null => {
  let largestAlias: Alias | null = null

  for (const alias of aliases) {
    if (path.startsWith(alias.alias)) {
      if (!largestAlias || largestAlias.alias < alias.alias) {
        largestAlias = alias
      }
    }
  }

  return largestAlias
}

const detalizeImport = (rawImport: string, aliases: Alias[]): DetalizedImport => {
  const path = extractImportPath(rawImport)
  const alias = findAliasMathImport(path, aliases)
  const aliasPath = alias?.path
  const realPath = alias ? path.replace(alias.alias, alias.path) : path

  return { raw: rawImport, path, realPath, aliasPath }
}

export const splitImports = (rawImports: string, aliases: Alias[]) => {
  let rawImportsData = rawImports

  const singleLineRegExp = /^import.+['"`];?$/gm
  const singleLineImports = rawImports.match(singleLineRegExp)
  rawImportsData = rawImportsData.replace(singleLineRegExp, '')

  const multiLineRegExp = /^import\s*{(\s*[\w\s,/\n]*\s*)}\s*from\s*['"].+['"].*$/gm
  const multiLineImports = rawImportsData.match(multiLineRegExp)

  const imports: string[] = []

  if (singleLineImports && singleLineImports.length > 0) {
    for (const singleLineImport of singleLineImports) {
      imports.push(clearImportFromComments(singleLineImport))
    }
  }

  if (multiLineImports && multiLineImports.length > 0) {
    for (const multiLineImport of multiLineImports) {
      imports.push(clearImportFromComments(multiLineImport))
    }
  }

  return imports.map((rawImport) => detalizeImport(rawImport, aliases))
}
