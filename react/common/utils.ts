import { compose, map, uniqWith } from 'ramda'


interface Option {
  label: string
  value: string
}


const strEq = (str1: string, str2: string) => str1 === str2

export const dropdownOptions = (options: string[]) => compose(
  map((optionName: string) => ({ value: optionName, label: optionName })),
  uniqWith(strEq)
)(options)

export const formattedDropdownOptions = (options: Option[], intl: any) => map(
  (option: Option) => {
    return {
      label: intl.formatMessage({ id: option.label }),
      value: option.value,
    }
  },
  options)
