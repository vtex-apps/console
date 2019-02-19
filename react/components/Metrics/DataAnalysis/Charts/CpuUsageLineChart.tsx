import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { withRuntimeContext } from 'render'
import { Spinner } from 'vtex.styleguide'

import { CHART_PROPERTIES } from '../../../../common/constants'
import { getFormattedTime, getStepModifier } from '../../../../common/dataAnalysis'
import dataQuery from '../../../../graphql/data.graphql'
import BlockTitle from '../CustomElements/BlockTitle'
import CustomTooltip from '../CustomElements/CustomTooltip'
import CustomYAxisTick from '../CustomElements/CustomYAxisTick'


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
          const stepModifier = getStepModifier(metricParams)

          if (!loading) {
            chartData = JSON.parse(rawChartData)
            console.log({chartData})
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
                    <XAxis
                      dataKey="date"
                      tickFormatter={(rawDate: string) => getFormattedTime(rawDate, intl, stepModifier) }
                    />
                    <YAxis
                      type="number"
                      tick={<CustomYAxisTick name="cpuUsageLineChart" />}
                    />
                    <Legend />
                    <Tooltip content={<CustomTooltip name="cpuUsageLineChart" stepModifier={stepModifier} />} />
                    <Line name="system" type="monotone" dataKey="summary.system" stroke="Green" />
                    <Line name="user" type="monotone" dataKey="summary.user" stroke="Navy" />
                  </LineChart>
                </ResponsiveContainer>
              )
          )
        }}
      </Query>
    </Fragment>
  )
}

export default withRuntimeContext(injectIntl(CpuUsageLineChart))
