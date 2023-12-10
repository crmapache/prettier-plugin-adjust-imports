import { DetalizedImport } from '../types'

const getTargetFileFolderPath = (rootFolderPath: string, filepath: string) => {
  let path = filepath.replace(/\/([^/]+)$/, '')

  if (filepath.startsWith(rootFolderPath)) {
    path = path.replace(rootFolderPath, '')
  }

  return path.replace(/^\/?src\//, '')
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

  const pathFirstPart = splittedTargetFileFolderPath.slice(targetIndex).reduce((acc, cur) => `../${acc}`, '')
  const pathSecondPart = splittedRealPath.slice(targetIndex).join('/')

  return `${pathFirstPart}${pathSecondPart}`
}

export const simplifyImports = (detalizedImports: DetalizedImport[], filepath: string) => {
  const result: DetalizedImport[] = []
  const rootFolderPath = process.cwd()

  const targetFileFolderPath = getTargetFileFolderPath(rootFolderPath, filepath)

  for (const detalizedImport of detalizedImports) {
    if (!detalizedImport.aliasPath) continue

    if (detalizedImport.realPath.includes(targetFileFolderPath)) {
      const newPath = getNestedPath(detalizedImport, targetFileFolderPath)
      const newRawImport = detalizedImport.raw.replace(detalizedImport.path, newPath)
      result.push({ ...detalizedImport, updatedRaw: newRawImport })
    } else if(targetFileFolderPath.startsWith(detalizedImport.aliasPath)) {
      const newPath = getOuterPath(detalizedImport, targetFileFolderPath)
      const newRawImport = detalizedImport.raw.replace(detalizedImport.path, newPath)
      result.push({ ...detalizedImport, updatedRaw: newRawImport })
    }
  }

  return result
}
