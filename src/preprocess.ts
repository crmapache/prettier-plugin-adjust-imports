import {
  splitImports,
  getAliases,
  simplifyImports,
  prepareFinalCode,
} from './utils'

import { extractor } from './extractor'

export const preprocess = (code: string, { filepath }) => {
  const aliases = getAliases()

  const rawImports = extractor(code)

  if (rawImports) {
    const detalizedImports = splitImports(rawImports, aliases)
    const importsToReplace = simplifyImports(detalizedImports, filepath)
    return prepareFinalCode(importsToReplace, code)
  }

  return code
}
