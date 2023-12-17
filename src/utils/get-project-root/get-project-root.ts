import fs from 'fs'
import path from 'path'

/**
 * Finds out which folder is the root for a given application.
 *
 * It is determined based on the fact that there is a package.json file in the root folder.
 *
 * The plugin can be run in a mono repository with many applications. Therefore we need this function.
 */
export const getProjectRoot = (filepath: string): string | null => {
  const splittedPath = filepath.split(path.sep)

  for (let i = splittedPath.length - 1; i > 0; i--) {
    const pathToCheck = path.join(...splittedPath.slice(0, i))

    if (pathToCheck && fs.existsSync(path.join(pathToCheck, 'package.json'))) {
      return pathToCheck
    }
  }

  return null
}
