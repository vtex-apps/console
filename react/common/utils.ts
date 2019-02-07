import { compose, map, uniqWith } from 'ramda'
import { InjectedIntl } from 'react-intl'


export interface Option {
  label: string
  value: string
}


export const getAppVersion = (chosenMajor: string, chosenMinor: string, chosenPatch: string) => {
  return (chosenMajor && chosenMinor && chosenPatch) ?
    `${chosenMajor}.${chosenMinor}.${chosenPatch}` :
    undefined
}

const strEq = (str1: string, str2: string) => str1 === str2

export const dropdownOptions = (options: string[]) => compose(
  map((optionName: string) => ({ value: optionName, label: optionName })),
  uniqWith(strEq)
)(options)

export const formattedDropdownOptions = (options: Option[], intl: InjectedIntl) => map(
  (option: Option) => {
    return {
      label: intl.formatMessage({ id: option.label, defaultMessage: option.label }),
      value: option.value,
    }
  },
  options)
