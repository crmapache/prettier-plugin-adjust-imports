import { UserConfig } from '../../../../types'

/**
 * The user can pass any value in his config, so i want to make sure
 * that the passed value is correct or i will make it default.
 */
export const normalizeAliasesValue = (value: unknown): UserConfig['aliases'] => {
  if (typeof value !== 'object' || value === null) {
    return undefined
  }

  for (const [key, items] of Object.entries(value as UserConfig['aliases'])) {
    if (
      typeof key !== 'string' ||
      !Array.isArray(items) ||
      !items.every((item) => typeof item === 'string')
    ) {
      return undefined
    }
  }

  return value as UserConfig['aliases']
}
