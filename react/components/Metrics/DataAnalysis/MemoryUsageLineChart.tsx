import { forEachObjIndexed, includes, map } from 'ramda'
import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { Spinner } from 'vtex.styleguide'

import dataQuery from '../../../graphql/data.graphql'

import { CHART_PROPERTIES } from '../../../common/constants'
import BlockTitle from './BlockTitle'
import CustomTooltip from './CustomTooltip'
import CustomYAxisTick from './CustomYAxisTick'

import {
  Line,
  LineChart,
  CartesianGrid,
  Label,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'


interface Props extends InjectedIntlProps {
  appId: string
  name: string
  metricParams: any
}

const calculateMean = (value: any, key: string | number | symbol, obj: any) => {
  const memoryMetrics = ['external', 'heapUsed', 'heapTotal', 'rss']
  if (includes(key, memoryMetrics)) {
    obj[key] = Math.round(obj[key] / obj.count)
  }
}

const calculateMeanOfMemory = (chartData: any[]) => {
  return map((chartPoint: any) => {
    forEachObjIndexed(calculateMean, chartPoint)
    return chartPoint
  }, chartData)
}

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
      return intl.formatTime(date)
  }
}

const addFormattedTime = (chartData: any, intl: any, stepModifier: string) => {
  return map((chartPoint: any) => ({
    ...chartPoint,
    formattedTime: getFormattedTime(chartPoint.date, intl, stepModifier),
  }), chartData)
}

class MemoryUsedLineChart extends Component<Props> {
  public render = () => {
    const { appId, name, metricParams, intl } = this.props

    return (
      <Fragment>
        <BlockTitle title="Memory (bytes) Consumption over Time" />

        <Query query={dataQuery} ssr={false} variables={{ appId, name, params: metricParams }} >
          {({ loading, error, data: { data: rawChartData } }) => {
            let chartData: any

            if (!loading) {
              const stepModifier = metricParams.interval[metricParams.interval.length - 1]
              chartData = addFormattedTime(JSON.parse(rawChartData), intl, stepModifier)
              chartData = calculateMeanOfMemory(chartData)
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
}

export default injectIntl(MemoryUsedLineChart)
