import {DetalizedImport} from "../types";

export const prepareFinalCode = (
  importsToReplace: DetalizedImport[],
  code: string,
) => {
  let result = code

  for (const importToReplace of importsToReplace) {
    result = result.replace(importToReplace.raw, importToReplace.updatedRaw)
  }

  return result
}
