import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import { injectIntl, intlShape } from 'react-intl'
import { Spinner } from 'vtex.styleguide'

import dataQuery from '../../../graphql/data.graphql'

import { CHART_PROPERTIES } from '../../../common/constants'
import BlockTitle from './BlockTitle'

import {
  Line,
  LineChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'


interface Props {
  appId: string
  metricName: string
  metricParams: any
}


export default class LineChartContent extends Component<Props> {

  public render = () => {
    const { appId, metricName, metricParams } = this.props

    return (
      <Fragment>
        <BlockTitle title="LineChart" />

        <Query query={dataQuery} ssr={false} variables={{ appId, name: metricName, params: metricParams }}>
          {({ loading, error, data: { data: chartData } }) => {
            let chartDataJSON

            if (!loading) {
              chartDataJSON = JSON.parse(chartData)
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
                    <XAxis dataKey="unit" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="2 8" />
                    <Tooltip />
                    <Line type="monotone" dataKey="sum" stroke="#82ca9d" activeDot={{r: 8}}/>
                    <Legend verticalAlign="top" />
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

