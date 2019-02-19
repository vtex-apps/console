import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Spinner } from 'vtex.styleguide'

import { CHART_PROPERTIES, colors } from '../../../../common/constants'
import { getStepModifier } from '../../../../common/dataAnalysis'
import dataQuery from '../../../../graphql/data.graphql'
import BlockTitle from '../CustomElements/BlockTitle'
import CustomTooltip from '../CustomElements/CustomTooltip'
import CustomYAxisTick from '../CustomElements/CustomYAxisTick'


interface DataStatusCode {
  httpStatus: number
  count: number
}

interface Props extends InjectedIntlProps {
  name: string
  metricParams: any
}


const StatusCodeBarChart: React.SFC<Props> = (props) => {
  const { name, metricParams, intl } = props

  return (
    <Fragment>
      <BlockTitle title={intl.formatMessage({ id: 'console.statusCode.barChart' })} />

      <Query query={dataQuery} ssr={false} variables={{ name, params: metricParams }} >
        {({ loading, data: { data: rawChartData } }) => {
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
                  <BarChart data={chartData} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="key.httpStatus" />
                    <YAxis
                      type="number"
                      tick={<CustomYAxisTick name="statusCodeBarChart" />}
                    />
                    <Tooltip content={<CustomTooltip name="statusCodeBarChart" stepModifier={stepModifier} />} />
                    <Bar name="count" dataKey="summary.count" >
                      {
                        chartData.map((entry: DataStatusCode, index: number) => (
                          <Cell key={`cell-${index}`} fill={colors[index % 20]}  />
                        ))
                      }
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )
          )
        }}
      </Query>
    </Fragment>
  )
}

export default injectIntl(StatusCodeBarChart)
