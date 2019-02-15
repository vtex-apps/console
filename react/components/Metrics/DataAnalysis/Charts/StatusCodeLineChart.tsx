import { map } from 'ramda'
import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { withRuntimeContext } from 'render'
import { Spinner } from 'vtex.styleguide'

import dataQuery from '../../../../graphql/data.graphql'

import { CHART_PROPERTIES } from '../../../../common/constants'
import BlockTitle from '../CustomElements/BlockTitle'
import CustomTooltip from '../CustomElements/CustomTooltip'
import CustomYAxisTick from '../CustomElements/CustomYAxisTick'
import { colors, getChartData, mapIndexed } from './utils'

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

const StatusCodeLineChart: React.SFC<Props> = (props) => {
  const { name, metricParams, intl } = props

  return (
    <Fragment>
      <BlockTitle title={intl.formatMessage({ id: 'console.statusCode.lineChart' })} />

      <Query query={dataQuery} ssr={false} variables={{ name, params: metricParams }} >
        {({ loading, error, data: { data: rawChartData } }) => {
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
                  <LineChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="label"
                      allowDuplicatedCategory={false}
                    />
                    <YAxis
                      type="number"
                      dataKey="value"
                      tick={<CustomYAxisTick name="statusCodeLineChart" />}
                    />
                    <Legend />
                    <Tooltip content={<CustomTooltip name="statusCodeLineChart" />} />
                    {
                      mapIndexed(
                        (chartLine: any, index: number) => (
                          <Line
                            dataKey="value"
                            data={chartLine.data}
                            name={chartLine.name}
                            key={chartLine.name}
                            stroke={colors[index % 20]}
                          />
                        ), chartData
                      )
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
