export const intersect = (a: string[], b: string[]): string[] => {
  const setA = new Set(a)
  const setB = new Set(b)

  return Array.from(new Set([...setA].filter(x => setB.has(x))))
}

export const isInclude = (a: string[], b: string[]): string[] => {
  const setA = new Set(a)
  const setB = new Set(b)

  return Array.from(new Set([...setB].filter(x => !setA.has(x))))
}
