import fs from 'fs'

import { Alias } from '../types'

const getUserTsConfig = ()=> {
  try {
    const tsConfigBuffer = fs.readFileSync(`${process.cwd()}/tsconfig.json`)
    const tsConfigString = tsConfigBuffer.toString('utf8')
    const safeTsConfigString = tsConfigString.replace(/[\s\n]/gm, '').replace(',}', '}')
    return JSON.parse(safeTsConfigString)
  } catch (e) {}

  return {}
}

export const getAliases = (): Alias[] => {
  const aliases: Alias[] = []

  const userTsConfig = getUserTsConfig()
  const paths = userTsConfig.compilerOptions?.paths

  if (paths) {
    for (const aliasData of Object.entries(paths)) {
      const alias = aliasData[0].replace(/\/\*$/, '')
      const path = aliasData[1][0]

      if (!aliases.find((el) => el.alias === alias)) {
        aliases.push({ alias, path })
      }
    }
  }

  return aliases
}
