import { compose, map, uniqWith } from 'ramda'
import { InjectedIntl } from 'react-intl'


export interface Option {
  label: string
  value: string
}


export const adjustStartDate = (earliestSize: number, earliestModifier: string) => {
  const startDate: Date = new Date()
  switch (earliestModifier) {
    case 'Seconds Ago':
      startDate.setSeconds(startDate.getSeconds() - earliestSize)
      return startDate
    case 'Minutes Ago':
      startDate.setMinutes(startDate.getMinutes() - earliestSize)
      return startDate
    case 'Hours Ago':
      startDate.setHours(startDate.getHours() - earliestSize)
      return startDate
    case 'Days Ago':
      startDate.setDate(startDate.getDay() - earliestSize)
      return startDate
    case 'Months Ago':
      startDate.setMonth(startDate.getMonth() - earliestSize)
      return startDate
    case 'Years Ago':
      startDate.setFullYear(startDate.getFullYear() - earliestSize)
      return startDate
    default:
      startDate.setHours(startDate.getHours() - earliestSize)
      return startDate
  }
}

export const setInterval = (earliestModifier: string) => {
  return '1' + earliestModifier
}

export const adjustStartDateHour = () => {
  const date = new Date()
  date.setHours(date.getHours() - 1)
  return date
}

export const getAppId = (account: string, appName: string, appVersion: string) => {
  return `${account}.${appName}@${appVersion}`
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
