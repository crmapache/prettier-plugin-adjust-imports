export type DetalizedImport = {
  raw: string
  updatedRaw?: string
  path: string
  aliasPath: string | null
  realPath: string
}

export type Alias = {
  alias: string
  path: string
}
