import { isEmpty, isNil, map } from 'ramda'
import { InjectedIntl } from 'react-intl'


export const isNilOrEmpty = (x: any) => isEmpty(x) || isNil(x)

const periodName: string[] = ['s', 'm', 'h', 'd', 'M', 'y']

const periodDuration: number[] = [1, 60, 60 * 60, 24 * 60 * 60, 30 * 24 * 60 * 60, 12 * 30 * 24 * 60 * 60]

const adjustRangeStep = (rangeStepSize: number): string => {
  let i: number = 1
  while (i <= periodName.length && rangeStepSize > periodDuration[i]) {
    i++
  }
  i--
  rangeStepSize = Math.round(rangeStepSize / periodDuration[i])
  return rangeStepSize + periodName[i]
}

export const getRangeStep = (startDate: Date, endDate: Date): string => {
  const elapsedTime: number = ((endDate.getTime() + 1000) - startDate.getTime()) / 1000
  const rangeStepSize = Math.round(elapsedTime / 12)
  const rangeStep = adjustRangeStep(rangeStepSize)
  return rangeStep
}

const getFormattedTime = (date: any, intl: InjectedIntl, stepModifier: string) => {
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
        minute: 'numeric',
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

export const addFormattedTime = (chartData: any, intl: InjectedIntl, stepModifier: string) => {
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

export const abbrPerc = (value: any, intl: InjectedIntl): string => {
  return intl.formatNumber(
    Number(value),
    {
      maximumFractionDigits: 2,
      style: 'percent',
    }
  )
}
