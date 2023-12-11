export const getCompleteFilePath = (filepath: string) => {
  const processPath = process.cwd()

  if (filepath.startsWith(processPath)) return filepath

  return `${processPath}/${filepath}`
}
