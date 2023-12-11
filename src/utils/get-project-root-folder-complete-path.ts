import fs from 'fs'

export const getProjectRootFolderCompletePath = (completeFilePath: string): string | null => {
  const splittedPath = completeFilePath.split('/')

  for (let i = splittedPath.length - 1; i > 0; i--) {
    const pathToCheck = splittedPath.slice(0, i).join('/')
    if (!pathToCheck) continue

    if (fs.existsSync(`${pathToCheck}/package.json`)) {
      return pathToCheck
    }
  }

  return null
}
