import { UserConfig } from '../../types'
import { getTsConfig } from './helpers'

/**
 * Look for the ts config file in the project root folder and take aliases from it.
 *
 * If ts config file not contain aliases i will try to take it fro user config.
 */
export const getAliases = (
  userConfig: UserConfig,
  rootFolder: string,
): Record<string, string> | null => {
  const aliases: Record<string, string> = {}

  const tsConfig = getTsConfig(rootFolder)
  const paths = tsConfig.compilerOptions?.paths ?? userConfig.aliases

  if (paths) {
    try {
      for (const aliasData of Object.entries(paths)) {
        /**
         * Remove "/*" at the end of alias if exists.
         *
         * @example
         * '@core/*' => '@core'
         */
        const alias = aliasData[0].replace(/\/\*$/, '')

        /**
         * Remove "/src/", "./src/" and other forms at the begining of alias if exists.
         *
         * @example
         * './src/components' => 'components'
         * './components' => 'components'
         * '/components' => 'components'
         * 'src/components' => 'components'
         */
        const path = aliasData[1][0].replace(/^\.?\/?(src)?\/?/g, '')

        if (!aliases[alias]) {
          aliases[alias] = path
        }
      }
    } catch (e) {}
  }

  return Object.entries(aliases).length > 0 ? aliases : null
}
