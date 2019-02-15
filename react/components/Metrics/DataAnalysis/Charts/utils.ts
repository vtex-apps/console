import { addIndex, has, map } from 'ramda'
import { InjectedIntl } from 'react-intl'
import { addFormattedTime } from '../../../../common/dataAnalysis'


export const mapIndexed = addIndex(map)

mapIndexed((val: any, idx: number) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r'])

export const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf']

export const getChartData = (rawChartData: string, metricParams: any, intl: InjectedIntl) => {
  let stepModifier = ''
  if (has('interval', metricParams)) {
    stepModifier = metricParams.interval[metricParams.interval.length - 1]
  }
  let chartData = JSON.parse(rawChartData)
  if (chartData[0] && has('date', chartData[0])) {
    chartData = addFormattedTime(chartData, intl, stepModifier)
  }
  return chartData
}
