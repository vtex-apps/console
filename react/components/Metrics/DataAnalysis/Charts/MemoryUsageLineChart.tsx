import { forEachObjIndexed, has, includes, map } from 'ramda'
import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { Spinner } from 'vtex.styleguide'

import dataQuery from '../../../../graphql/data.graphql'

import { CHART_PROPERTIES } from '../../../../common/constants'
import { addFormattedTime } from '../../../../common/dataAnalysis'
import BlockTitle from '../CustomElements/BlockTitle'
import CustomTooltip from '../CustomElements/CustomTooltip'
import CustomYAxisTick from '../CustomElements/CustomYAxisTick'


import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'


interface Props extends InjectedIntlProps {
  name: string
  metricParams: any
}

const calculateMean = (value: any, key: string | number | symbol, obj: any) => {
  const memoryMetrics = ['external', 'heapUsed', 'heapTotal', 'rss']
  if (includes(key, memoryMetrics)) {
    obj[key] = Math.round(obj[key] / obj.count)
  }
}

const calculateMeanMemory = (chartData: any[]) => {
  return map((chartPoint: any) => {
    forEachObjIndexed(calculateMean, chartPoint)
    return chartPoint
  }, chartData)
}

const MemoryUsageLineChart = (props: Props) => {
  const { name, metricParams, intl } = props

  return (
    <Fragment>
      <BlockTitle title="Memory (bytes) Consumption over Time" />

      <Query query={dataQuery} ssr={false} variables={{ name, params: metricParams }} >
        {({ loading, error, data: { data: rawChartData } }) => {
          let chartData: any

          if (!loading) {
            let stepModifier = ''
            if (has('interval', metricParams)) {
              stepModifier = metricParams.interval[metricParams.interval.length - 1]
            }
            chartData = addFormattedTime(JSON.parse(rawChartData), intl, stepModifier)
            chartData = calculateMeanMemory(chartData)
          }

          return (
            loading ? (
              <Spinner />
            ) : (
                <ResponsiveContainer
                  width={CHART_PROPERTIES.width}
                  height={CHART_PROPERTIES.height}
                >
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="formattedTime" />>
                      <YAxis
                      type="number"
                      tick={<CustomYAxisTick />}
                    />
                    <Legend />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="external" stroke="Green" />
                    <Line type="monotone" dataKey="heapUsed" stroke="Navy" />
                    <Line type="monotone" dataKey="heapTotal" stroke="Maroon" />
                    <Line type="monotone" dataKey="rss" stroke="Orange" />
                  </LineChart>
                </ResponsiveContainer>
              )
          )
        }}
      </Query>
    </Fragment>
  )
}

export default injectIntl(MemoryUsageLineChart)
