import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { CartesianGrid, Legend, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
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


const LatencyLineChart: React.SFC<Props> = (props) => {
  const { name, metricParams, intl } = props

  return (
    <Fragment>
      <BlockTitle title={intl.formatMessage({ id: 'console.latency.lineChart' })} />

      <Query query={dataQuery} ssr={false} variables={{ name, params: metricParams }} >
        {({ loading, data: { data: rawChartData } }) => {
          let chartData: any
          const stepModifier = getStepModifier(metricParams)

          if (!loading) {
            chartData = JSON.parse(rawChartData)
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
                      tick={<CustomYAxisTick name="latencyLineChart" />}
                    />
                    <Legend />
                    <Tooltip content={<CustomTooltip name="latencyLineChart" stepModifier={stepModifier} />} />
                    {/* { this.drawLatencyLine() } */}
                  </LineChart>
                </ResponsiveContainer>
              )
          )
        }}
      </Query>
    </Fragment>
  )
}

export default injectIntl(LatencyLineChart)
