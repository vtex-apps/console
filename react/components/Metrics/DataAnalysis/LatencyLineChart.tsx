import { forEachObjIndexed, includes, map } from 'ramda'
import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { Spinner } from 'vtex.styleguide'

import dataQuery from '../../../graphql/data.graphql'

import { CHART_PROPERTIES } from '../../../common/constants'
import { addFormattedTime } from './utils'
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
  name: string
  metricParams: any
}


const calculateMeanLatency = (chartData: any[]) => {
  return map((chartPoint: any) => {
    const meanLatency = chartPoint.sum / chartPoint.count
    return {
      ...chartPoint,
      meanLatency,
    }
  }, chartData)
}

// const matchColorByStatusCode = (statusCode: string) => {

// }

// const colors = {
//   '200': 'Green',
//   '204': 'Olive',
//   '301': 'Blue',
//   '302': 'Navy',
//   '400': 'Yellow',
//   '405': 'Orange',
//   '500': 'Red',
//   '502': 'Maroon',
// }

class LatencyLineChart extends Component<Props> {
  public drawLatencyLine = (chartData: any[]) => {

  }

  public render = () => {
    const { name, metricParams, intl } = this.props

    return (
      <Fragment>
        <BlockTitle title="Latency (miliseconds) over Time" />

        <Query query={dataQuery} ssr={false} variables={{ name, params: metricParams }} >
          {({ loading, error, data: { data: rawChartData } }) => {
            let chartData: any

            if (!loading) {
              const stepModifier = metricParams.interval[metricParams.interval.length - 1]
              chartData = addFormattedTime(JSON.parse(rawChartData), intl, stepModifier)
              chartData = calculateMeanLatency(chartData)
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
                      {/* <Tooltip content={<CustomTooltip />} />
                      {this.drawLatencyLine()} */}
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

export default injectIntl(LatencyLineChart)
