import { isEmpty, isNil, map } from 'ramda'

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
