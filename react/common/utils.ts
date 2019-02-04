import {compose, isEmpty, isNil, map, uniqWith } from 'ramda'


// -------------
// CONTROLLERS

const strEq = (str1: string, str2: string) => str1 === str2

export const dropdownOptions = (options: string[]) => compose(
  map((optionName: string) => ({ value: optionName, label: optionName })),
  uniqWith(strEq)
)(options)


// -------------
// DATA ANALYSIS

export const getAppId = (envControllers: EnvController) => {
  const {
    appName,
    chosenMajor,
    chosenMinor,
    chosenPatch,
  } = envControllers
  return appName ?
    `${appName}@${chosenMajor}.${chosenMinor}.${chosenPatch}` :
    null
}

export const getAppVersion = (envControllers: EnvController) => {
  const {
    chosenMajor,
    chosenMinor,
    chosenPatch,
  } = envControllers
  return (chosenMajor && chosenMinor && chosenPatch) ?
    `${chosenMajor}.${chosenMinor}.${chosenPatch}` :
    null
}

export const isNilOrEmpty = (x: any) => isEmpty(x) || isNil(x)

const getFormattedTime = (date: any, intl: any, stepModifier: string) => {
  switch (stepModifier) {
    case 's':
      return intl.formatTime(date, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      })
    case 'm':
      return intl.formatTime(date, {
        hour: 'numeric',
        minute: 'numeric',
      })
    case 'h':
      return intl.formatTime(date, {
        hour: 'numeric',
      })
    case 'd':
      return intl.formatDate(date, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })
    case 'M':
      return intl.formatDate(date, {
        year: 'numeric',
        month: 'numeric',
      })
    case 'y':
      return intl.formatDate(date, {
        year: 'numeric',
      })
    default:
      return intl.formatDate(date, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })
  }
}

export const addFormattedTime = (chartData: any, intl: any, stepModifier: string) => {
  return map((chartPoint: any) => ({
    ...chartPoint,
    formattedTime: getFormattedTime(chartPoint.date, intl, stepModifier),
  }), chartData)
}

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
