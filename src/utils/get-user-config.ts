import fs from 'fs'

import { UserConfig } from '../types'

export const getUserConfig = (rootFolder: string): UserConfig => {
  try {
    const tsConfigBuffer = fs.readFileSync(`${rootFolder}/adjust-imports-plugin.config.json`)
    const tsConfigString = tsConfigBuffer.toString('utf8')
    const safeTsConfigString = tsConfigString.replace(/[\s\n]/gm, '').replace(',}', '}')
    return JSON.parse(safeTsConfigString)
  } catch (e) {}

  return {
    aliases: {},
    ascendingDepth: 0,
    descendingDepth: 0,
  }
}
