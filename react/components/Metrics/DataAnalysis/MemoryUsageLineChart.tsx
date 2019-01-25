import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import { Spinner } from 'vtex.styleguide'

import dataQuery from '../../../graphql/data.graphql'

import { CHART_PROPERTIES } from '../../../common/constants'
import BlockTitle from './BlockTitle'


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


interface Props {
  appId: string
  name: string
  metricParams: any
}


export default class MemoryUsedLineChart extends Component<Props> {
  public render = () => {
    const { appId, name, metricParams } = this.props


    return (
      <Fragment>
        <BlockTitle title="Memory Consumption over Time" />

        <Query query={dataQuery} ssr={false} variables={{ appId, name, params: metricParams }} >
          {({ loading, error, data: { data: chartData } }) => {
            let chartDataJSON

            if (!loading) {
              chartDataJSON = JSON.parse(chartData)
              console.log(chartDataJSON)
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
                      <XAxis type="number" dataKey="date" />
                      <YAxis type="number" >
                        <Label value="Used Memory (bytes)" position="left" />
                      </YAxis>
                      <Legend />
                      <Tooltip />
                      <Line type="monotone" dataKey="data.summary.external" />
                      <Line type="monotone" dataKey="data.summary.heapUsed" />
                      <Line type="monotone" dataKey="data.summary.heapTotal" />
                      <Line type="monotone" dataKey="data.summary.rss" />
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
