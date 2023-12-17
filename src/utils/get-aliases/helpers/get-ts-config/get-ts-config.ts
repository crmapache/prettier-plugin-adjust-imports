import fs from 'fs'

import { clearJsonTrailingCommas } from '../../../clear-json-trailing-commas'
import { TsConfig } from '../../../../types'

/**
 * Look for the ts config file in the project root folder.
 */
export const getTsConfig = (rootFolder: string): TsConfig => {
  try {
    const tsConfigBuffer = fs.readFileSync(`${rootFolder}/tsconfig.json`)
    const tsConfigString = tsConfigBuffer.toString('utf8')
    const safeTsConfigString = clearJsonTrailingCommas(tsConfigString)
    return JSON.parse(safeTsConfigString)
  } catch (e) {}

  return {}
}
