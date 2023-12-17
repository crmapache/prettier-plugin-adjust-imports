import { CompilerOptions } from 'typescript'

export type Import = {
  raw: string
  path: string
  aliasPath: string | null
  realPath: string
  updatedRaw?: string
}

export type UserConfig = {
  aliases?: Record<string, string[]>
  ascendingDepth?: number
  descendingDepth?: number
}

export type TsConfig = {
  compilerOptions?: CompilerOptions
  include?: string[]
  exclude?: string[]
  extends?: string
  files?: string[]
  references?: Array<{ path: string }>
}
