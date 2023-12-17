import fs from 'fs'

import { UserConfig } from '../../types'
import { USER_CONFIG_NAME } from '../../constants'
import { clearJsonTrailingCommas } from '../clear-json-trailing-commas'
import { normalizeAliasesValue, normalizeDepthValue } from './helpers'

/**
 * Look for the user config file in the project root folder and normalize the final value.
 */
export const getUserConfig = (rootFolder: string): UserConfig => {
  let json = null

  try {
    const fileBuffer = fs.readFileSync(`${rootFolder}/${USER_CONFIG_NAME}`)
    const fileRaw = fileBuffer.toString('utf8')
    const safeFileRaw = clearJsonTrailingCommas(fileRaw)
    json = JSON.parse(safeFileRaw)
  } catch (e) {}

  return {
    aliases: normalizeAliasesValue(json?.aliases),
    ascendingDepth: normalizeDepthValue(json?.ascendingDepth),
    descendingDepth: normalizeDepthValue(json?.descendingDepth),
  }
}
