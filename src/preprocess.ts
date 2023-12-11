import {
  getAliases,
  splitImports,
  simplifyImports,
  prepareFinalCode,
  getCompleteFilePath,
  getProjectRootFolderCompletePath,
} from './utils'
import { extractor } from './extractor'

export const preprocess = (code: string, { filepath }) => {
  const completeFilePath = getCompleteFilePath(filepath)
  const projectRootFolderCompletePath = getProjectRootFolderCompletePath(completeFilePath)

  if (!projectRootFolderCompletePath) return code

  const aliases = getAliases(projectRootFolderCompletePath)
  const rawImports = extractor(code)

  if (rawImports) {
    const detalizedImports = splitImports(rawImports, aliases)

    const importsToReplace = simplifyImports(
      detalizedImports,
      completeFilePath,
      projectRootFolderCompletePath,
    )

    return prepareFinalCode(importsToReplace, code)
  }

  return code
}
