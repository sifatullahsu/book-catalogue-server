type FlattenObject<T> = {
  [K in keyof T]: T[K] extends object ? FlattenObject<T[K]> : T[K]
}

type InputObject = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

type OutputObject = FlattenObject<InputObject>

const transformObject: (input: InputObject) => OutputObject = input => {
  const output: OutputObject = {}

  function flattenObject(obj: InputObject, prefix = ''): void {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        flattenObject(obj[key], prefix + key + '.')
      } else {
        output[prefix + key] = obj[key]
      }
    }
  }

  flattenObject(input)

  return output
}

export default transformObject

// Another response:  https://stackoverflow.com/questions/47062922/how-to-get-all-keys-with-values-from-nested-objects
