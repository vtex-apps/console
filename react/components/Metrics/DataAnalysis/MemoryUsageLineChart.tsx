import { map } from 'ramda'
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


const addFormattedTime = (chartData: any, intl: any) => {
  return map((chartDataElement: any) => ({
    ...chartDataElement,
    formattedTime: intl.formatTime(chartDataElement.date)
  }), chartData)
}

class MemoryUsedLineChart extends Component<Props> {
  public render = () => {
    const { appId, name, metricParams, intl } = this.props

    return (
      <Fragment>
        <BlockTitle title="Memory (bytes) Consumption over Time" />

        <Query query={dataQuery} ssr={false} variables={{ appId, name, params: metricParams }} >
          {({ loading, error, data: { data: chartData } }) => {
            let chartDataJSON

            if (!loading) {
              chartDataJSON = addFormattedTime(JSON.parse(chartData), intl)
              console.log({chartDataJSON})
            }

            return (
              loading ? (
                <Spinner />
              ) : (
                  <ResponsiveContainer
                    width={CHART_PROPERTIES.width}
                    height={CHART_PROPERTIES.height}
                  >
                    <LineChart data={chartDataJSON}>
                      <CartesianGrid strokeDasharray="2 8" />
                      <XAxis dataKey="formattedTime" />
                      <YAxis
                        type="number"
                        tick={<CustomYAxisTick />}
                      />
                      <Legend />
                      <Tooltip content={<CustomTooltip />}/>
                      <Line type="monotone" dataKey="external"  stroke="Green" />
                      <Line type="monotone" dataKey="heapUsed"  stroke="Navy" />
                      <Line type="monotone" dataKey="heapTotal" stroke="Maroon" />
                      <Line type="monotone" dataKey="rss"       stroke="Orange" />
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
