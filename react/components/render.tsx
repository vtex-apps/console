import React, { Component } from 'react'
import { Query } from 'react-apollo'
import Vega from 'react-vega'
import { Spinner } from 'vtex.styleguide'

import dataQuery from '../graphql/data.graphql'

interface Props {
  name: string
  appId: string
  params: any
  spec: string
}

export default class Render extends Component<Props> {
  public render = () => {
    const {name, appId, params, spec} = this.props

    return (
      <Query query={dataQuery} ssr={false} variables={{appId, name, params: JSON.stringify(params)}}>
      {({loading, data: rawData}) => {
        const { data = '{}' } = rawData || {}
        return loading
          ? <Spinner />
          : <Vega spec={spec} data={JSON.parse(data)} />
      }}
      </Query>
    )
  }
}
