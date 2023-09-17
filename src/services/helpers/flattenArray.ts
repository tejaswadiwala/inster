// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const flattenArray = (arr: any[]): any[] => {
  return arr.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val),
    []
  )
}
