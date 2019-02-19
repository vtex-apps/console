import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { withRuntimeContext } from 'render'
import { Spinner } from 'vtex.styleguide'

import { CHART_PROPERTIES, colors } from '../../../../common/constants'
import { getFormattedTime, getStepModifier, mapIndexed } from '../../../../common/dataAnalysis'
import dataQuery from '../../../../graphql/data.graphql'
import BlockTitle from '../CustomElements/BlockTitle'
import CustomTooltip from '../CustomElements/CustomTooltip'
import CustomYAxisTick from '../CustomElements/CustomYAxisTick'


interface Props extends InjectedIntlProps {
  name: string
  metricParams: any
}

const StatusCodeLineChart: React.SFC<Props> = (props) => {
  const { name, metricParams, intl } = props

  return (
    <Fragment>
      <BlockTitle title={intl.formatMessage({ id: 'console.statusCode.lineChart' })} />

      <Query query={dataQuery} ssr={false} variables={{ name, params: metricParams }} >
        {({ loading, error, data: { data: rawChartData } }) => {
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
                  <LineChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="label"
                      allowDuplicatedCategory={false}
                      tickFormatter={(rawDate: string) => getFormattedTime(rawDate, intl, stepModifier)}
                    />
                    <YAxis
                      type="number"
                      dataKey="value"
                      tick={<CustomYAxisTick name="statusCodeLineChart" />}
                    />
                    <Legend />
                    <Tooltip
                      content={<CustomTooltip name="statusCodeLineChart" stepModifier={stepModifier} />}
                    />
                    {
                      mapIndexed(
                        (chartLine: any, index: number) => (
                          <Line
                            isAnimationActive={false}
                            dataKey="value"
                            data={chartLine.data}
                            name={chartLine.name}
                            key={chartLine.name}
                            stroke={colors[index % 20]}
                          />
                        ), chartData)
                    }
                  </LineChart>
                </ResponsiveContainer>
              )
          )
        }}
      </Query>
    </Fragment>
  )
}

export default withRuntimeContext(injectIntl(StatusCodeLineChart))
