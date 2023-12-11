import { DetalizedImport } from '../types'
import { getUserConfig } from './get-user-config'

const getTargetFileFolderPath = (
  completeFilePath: string,
  projectRootFolderCompletePath: string,
) => {
  let path = completeFilePath.replace(/\/([^/]+)$/, '')
  path = path.replace(projectRootFolderCompletePath, '')

  return path.replace(/^\.?\/?(src)?\/?/g, '')
}

const checkNestedPath = (path: string, depth: number) => {
  if (depth < 1) return true

  return path.split('/').length - 1 <= depth
}

const checkOuterPath = (path: string, depth: number) => {
  if (depth < 1) return true

  return (path.match(/\.\.\//g) || []).length <= depth
}

const getNestedPath = (detalizedImport: DetalizedImport, targetFileFolderPath: string) => {
  return detalizedImport.realPath.replace(targetFileFolderPath, '.')
}

const getOuterPath = (detalizedImport: DetalizedImport, targetFileFolderPath: string) => {
  const splittedRealPath = detalizedImport.realPath.split('/')
  const splittedTargetFileFolderPath = targetFileFolderPath.split('/')
  let targetIndex = splittedRealPath.length

  for (let i = 0; i < splittedRealPath.length; i++) {
    if (splittedRealPath[i] !== splittedTargetFileFolderPath[i]) {
      targetIndex = i
      break
    }
  }

  const pathFirstPart = splittedTargetFileFolderPath
    .slice(targetIndex)
    .reduce((acc, cur) => `../${acc}`, '')
  const pathSecondPart = splittedRealPath.slice(targetIndex).join('/')

  return `${pathFirstPart}${pathSecondPart}`
}

export const simplifyImports = (
  detalizedImports: DetalizedImport[],
  completeFilePath: string,
  projectRootFolderCompletePath: string,
) => {
  const userConfig = getUserConfig(projectRootFolderCompletePath)

  const result: DetalizedImport[] = []
  const targetFileFolderPath = getTargetFileFolderPath(
    completeFilePath,
    projectRootFolderCompletePath,
  )

  for (const detalizedImport of detalizedImports) {
    if (!detalizedImport.aliasPath) continue

    if (detalizedImport.realPath.includes(targetFileFolderPath)) {
      const newPath = getNestedPath(detalizedImport, targetFileFolderPath)

      if (!checkNestedPath(newPath, userConfig.descendingDepth ?? 0)) continue

      const newRawImport = detalizedImport.raw.replace(detalizedImport.path, newPath)
      result.push({ ...detalizedImport, updatedRaw: newRawImport })
    } else if (targetFileFolderPath.startsWith(detalizedImport.aliasPath)) {
      const newPath = getOuterPath(detalizedImport, targetFileFolderPath)

      if (!checkOuterPath(newPath, userConfig.ascendingDepth ?? 0)) continue

      const newRawImport = detalizedImport.raw.replace(detalizedImport.path, newPath)
      result.push({ ...detalizedImport, updatedRaw: newRawImport })
    }
  }

  return result
}
