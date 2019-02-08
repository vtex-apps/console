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
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'


interface DataStatusCode {
  httpStatus: number
  count: number
}

interface Props extends InjectedIntlProps {
  name: string
  metricParams: any
}


const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf']

const StatusCodeBarChart: React.SFC<Props> = (props) => {
  const { name, metricParams, intl } = props

  return (
    <Fragment>
      <BlockTitle title={intl.formatMessage({ id: 'console.statusCode.barChart' })} />

      <Query query={dataQuery} ssr={false} variables={{ name, params: metricParams }} >
        {({ loading, data: { data: rawChartData } }) => {
          let chartData: any

          if (!loading) {
            let stepModifier = ''
            if (has('interval', metricParams)) {
              stepModifier = metricParams.interval[metricParams.interval.length - 1]
            }
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
                  <BarChart data={chartData} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="httpStatus" />>
                    <YAxis
                      type="number"
                      tick={<CustomYAxisTick name="statusCodeBarChart" />}
                    />
                    <Tooltip content={<CustomTooltip name="statusCodeBarChart" />} />
                    <Bar dataKey="count" >
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
