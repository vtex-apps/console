import {compose, map, uniqWith } from 'ramda'

const strEq = (str1: string, str2: string) => str1 === str2

export const dropdownOptions = (options: string[]) => compose(
  map((optionName: string) => ({ value: optionName, label: optionName })),
  uniqWith(strEq)
)(options)

// Source: stackoverflow.com/questions/2685911/is-there-a-way-to-round-numbers-into-a-reader-friendly-format-e-g-1-1k
export const abbrNum = (value: number, decPlaces: number): string => {
  decPlaces = Math.pow(10, decPlaces)
  const abbrev = [' k', ' M', ' G', ' T']

  let tickValue: string = '0'
  for (let i = abbrev.length - 1; i >= 0; i--) {
    const size = Math.pow(10, (i + 1) * 3)

    if (size <= value) {
      value = Math.round((value * decPlaces) / size) / decPlaces

      if (value === 1000 && i < abbrev.length - 1) {
        value = 1
        i++
      }

      tickValue = value + abbrev[i]

      break
    }
  }

  return tickValue
}
