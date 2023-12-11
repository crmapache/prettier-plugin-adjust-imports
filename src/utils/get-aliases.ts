import { Alias } from '../types'
import { getUserTsConfig } from './get-user-ts-config'
import { getUserConfig } from './get-user-config'

export const getAliases = (rootFolder: string): Alias[] => {
  const aliases: Alias[] = []

  const userTsConfig = getUserTsConfig(rootFolder)
  const userConfig = getUserConfig(rootFolder)
  const paths = userTsConfig.compilerOptions?.paths ?? userConfig.aliases

  if (paths) {
    try {
      for (const aliasData of Object.entries(paths)) {
        const alias = aliasData[0].replace(/\/\*$/, '')
        const path = aliasData[1][0]

        if (!aliases.find((el) => el.alias === alias)) {
          aliases.push({ alias, path })
        }
      }
    } catch (e) {}
  }

  return aliases.map((alias) => ({ ...alias, path: alias.path.replace(/^\.?\/?(src)?\/?/g, '') }))
}
