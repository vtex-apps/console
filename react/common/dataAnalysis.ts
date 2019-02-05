import { isEmpty, isNil, map } from 'ramda'


export const getAppId = (appControllers: AppController) => {
  const {
    appName,
    chosenMajor,
    chosenMinor,
    chosenPatch,
  } = appControllers
  return appName ?
    `${appName}@${chosenMajor}.${chosenMinor}.${chosenPatch}` :
    null
}

export const getAppVersion = (appControllers: AppController) => {
  const {
    chosenMajor,
    chosenMinor,
    chosenPatch,
  } = appControllers
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
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      })
    case 'M':
      return intl.formatDate(date, {
        month: 'numeric',
        year: 'numeric',
      })
    case 'y':
      return intl.formatDate(date, {
        year: 'numeric',
      })
    default:
      return intl.formatDate(date, {
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        month: 'numeric',
        year: 'numeric',
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
