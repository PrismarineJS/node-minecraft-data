export function buildIndexFromObject (
  object: { [x: string]: any },
  fieldToIndex: string | number
) {
  console.log(object)
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
  array: any[],
  fieldToIndex: string | number
) {
  if (array === undefined) {
    return undefined
  }
  return array.reduce(function (index, element) {
    index[element[fieldToIndex]] = element
    return index
  }, {})
}
export function buildIndexFromArrayNonUnique (
  array: any[],
  fieldToIndex: string | number
) {
  if (array === undefined) {
    return undefined
  }
  return array.reduce(function (index, element) {
    if (!index[element[fieldToIndex]]) {
      index[element[fieldToIndex]] = []
    }
    index[element[fieldToIndex]].push(element)
    return index
  }, {})
}
export function buildIndexFromArrayWithRanges (
  array: any[],
  fieldToIndexMin: string | number,
  fieldToIndexMax: string | number
) {
  if (array === undefined) {
    return undefined
  }
  return array.reduce(function (index, element) {
    for (let i = element[fieldToIndexMin]; i <= element[fieldToIndexMax]; i++) {
      index[i] = element
    }
    return index
  }, {})
}
