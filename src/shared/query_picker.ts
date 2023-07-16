const queryPicker = <T extends Record<string, unknown>, K extends keyof T>(query: T, keys: K[]) => {
  const final: Partial<T> = {}

  for (const key of keys) {
    if (query && Object.hasOwnProperty.call(query, key)) {
      final[key] = query[key]
    }
  }

  return final
}

export default queryPicker
