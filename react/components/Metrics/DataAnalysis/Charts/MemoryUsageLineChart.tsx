import { has } from 'ramda'
import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { Spinner } from 'vtex.styleguide'

import dataQuery from '../../../../graphql/data.graphql'

import { CHART_PROPERTIES } from '../../../../common/constants'
import BlockTitle from '../CustomElements/BlockTitle'
import CustomTooltip from '../CustomElements/CustomTooltip'
import CustomYAxisTick from '../CustomElements/CustomYAxisTick'
import { getChartData } from './utils'


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
  appId: string
  name: string
  metricParams: any
}

const MemoryUsageLineChart: React.SFC<Props> = (props) => {
  const { appId, name, metricParams, intl } = props

  return (
    <Fragment>
      <BlockTitle title={intl.formatMessage({ id: 'console.memoryUsage.lineChart' })} />

      <Query query={dataQuery} ssr={false} variables={{ appId, name, params: metricParams }} >
        {({ loading, data: { data: rawChartData } }) => {
          let chartData: any

          if (!loading) {
            chartData = getChartData(rawChartData, metricParams, intl)
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
                      tick={<CustomYAxisTick name="memoryUsageLineChart" />}
                    />
                    <Legend />
                    <Tooltip content={<CustomTooltip name="memoryUsageLineChart" />} />
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
