import fs from 'fs'

export const getUserTsConfig = (rootFolder: string) => {
  try {
    const tsConfigBuffer = fs.readFileSync(`${rootFolder}/tsconfig.json`)
    const tsConfigString = tsConfigBuffer.toString('utf8')
    const safeTsConfigString = tsConfigString.replace(/[\s\n]/gm, '').replace(',}', '}')
    return JSON.parse(safeTsConfigString)
  } catch (e) {}

  return {}
}
