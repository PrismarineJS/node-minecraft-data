export function buildIndexFromObject (
  object: { [x: string]: any } | undefined,
  fieldToIndex: string | number
): { [key: string]: string } | undefined {
  if (object === undefined) {
    return undefined
  }
  return Object.keys(object).reduce(function (
    index: { [key: string]: string },
    key
  ) {
    index[object[key][fieldToIndex]] = object[key]
    return index
  },
  {})
}
export function buildIndexFromArray (
  array: any[] | undefined,
  fieldToIndex: string | number
): any {
  if (array === undefined) {
    return undefined
  }
  return array.reduce(function (
    index: { [x: string]: any },
    element: { [x: string]: string | number }
  ) {
    index[element[fieldToIndex]] = element
    return index
  },
  {})
}
export function buildIndexFromArrayNonUnique (
  array: any[] | undefined,
  fieldToIndex: string | number
): any {
  if (array === undefined) {
    return undefined
  }
  return array.reduce(function (
    index: { [x: string]: any[] },
    element: { [x: string]: string | number }
  ) {
    if (index[element[fieldToIndex]] == null) {
      index[element[fieldToIndex]] = []
    }
    index[element[fieldToIndex]].push(element)
    return index
  },
  {})
}
export function buildIndexFromArrayWithRanges (
  array: any[] | undefined,
  fieldToIndexMin: string | number,
  fieldToIndexMax: string | number
): any {
  if (array === undefined) {
    return undefined
  }
  return array.reduce(function (
    index: { [x: string]: any },
    element: { [x: string]: number }
  ) {
    for (let i = element[fieldToIndexMin]; i <= element[fieldToIndexMax]; i++) {
      index[i] = element
    }
    return index
  },
  {})
}
