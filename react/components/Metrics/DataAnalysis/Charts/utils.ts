import { has } from 'ramda'
import { InjectedIntl } from 'react-intl'
import { addFormattedTime } from '../../../../common/dataAnalysis'


export const getChartData = (rawChartData: string, metricParams: any, intl: InjectedIntl) => {
  let stepModifier = ''
  if (has('interval', metricParams)) {
    stepModifier = metricParams.interval[metricParams.interval.length - 1]
  }
  let chartData = JSON.parse(rawChartData)
  if (has('date', chartData[0])) {
    chartData = addFormattedTime(chartData, intl, stepModifier)
  }
  return chartData
}
