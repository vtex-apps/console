import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import { Spinner } from 'vtex.styleguide'

import dataQuery from '../../../graphql/data.graphql'

import { CHART_PROPERTIES } from '../../../common/constants'
import BlockTitle from './BlockTitle'

import {
  CartesianGrid,
  Legend,
  Bar,
  BarChart,
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


export default class BarChartContent extends Component<Props> {

  public render = () => {
    const { appId, metricName, metricParams } = this.props

    return (
      <Fragment>
        <BlockTitle title='BarChart' />

        <Query query={dataQuery} ssr={false} variables={{ appId, name: metricName, params: metricParams }} >
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

                    <BarChart data={chartDataJSON} >
                      <XAxis dataKey="unit" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sum" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
              )
            )
          }}
        </Query>

      </Fragment>
    )
  }
}
