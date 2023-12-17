import { mergeFilepath, getProjectRoot, getUserConfig, getAliases, findImports } from './utils'
import { UserConfig } from './types'

export class Plugin {
  filepath: string
  projectRoot: string
  userConfig: UserConfig
  aliases: Record<string, string> | null

  preprocess(code: string, { filepath }) {
    this.filepath = mergeFilepath(filepath)
    this.projectRoot = getProjectRoot(filepath)

    if (!this.projectRoot) return code

    this.userConfig = getUserConfig(this.projectRoot)
    this.aliases = getAliases(this.userConfig, this.projectRoot)

    if (!this.aliases) return code

    const rawImports = findImports(code)

    if (!rawImports) return code
  }
}

export const plugin = new Plugin()
