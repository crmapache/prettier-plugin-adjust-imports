/**
 * The user can pass any value in his config, so i want to make sure
 * that the passed value is correct or i will make it default.
 */
export const normalizeDepthValue = (value: unknown) => {
  if (typeof value === 'number' && value >= 0) return value
  return 0
}
