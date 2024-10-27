/**
 * Checks if two objects are deep equal
 * @param object1
 * @param object2
 * @returns true if the two objects are deep equal, false otherwise
 */
export const isDeepEqual = (object1: any, object2: any) => {
  const objKeys1 = Object.keys(object1)
  const objKeys2 = Object.keys(object2)

  if (objKeys1.length !== objKeys2.length) return false

  for (const key of objKeys1) {
    const value1 = object1[key]
    const value2 = object2[key]

    const isObjects = isObject(value1) && isObject(value2)

    if ((isObjects && !isDeepEqual(value1, value2)) || (!isObjects && value1 !== value2)) {
      return false
    }
  }
  return true
}

/**
 * Checks if the value specified as parameter is of type object
 * @param object
 * @returns true if it's an object, false otherwise
 */
export const isObject = (object: any) => {
  return object != null && typeof object === 'object'
}
