import { forEachObjIndexed, includes, map } from 'ramda'
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


const CpuUsageLineChart: React.SFC<Props> = (props) => {
  const { name, metricParams, intl } = props

  return (
    <Fragment>
      <BlockTitle title={intl.formatMessage({ id: 'console.cpuUsage.lineChart' })} />

      <Query query={dataQuery} ssr={false} variables={{ name, params: metricParams }} >
        {({ loading, error, data: { data: rawChartData } }) => {
          let chartData: any

          if (!loading) {
            const stepModifier = metricParams.interval[metricParams.interval.length - 1]
            chartData = addFormattedTime(JSON.parse(rawChartData), intl, stepModifier)
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
                      tick={<CustomYAxisTick name="cpuUsageLineChart" />}
                    />
                    <Legend />
                    <Tooltip content={<CustomTooltip name="cpuUsageLineChart" />} />
                    <Line type="monotone" dataKey="system" stroke="Green" />
                    <Line type="monotone" dataKey="user" stroke="Navy" />
                  </LineChart>
                </ResponsiveContainer>
              )
          )
        }}
      </Query>
    </Fragment>
  )
}

export default injectIntl(CpuUsageLineChart)
