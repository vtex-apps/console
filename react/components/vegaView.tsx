import React, { Component } from 'react'
import { Query } from 'react-apollo'
import Vega from 'react-vega'

import dataQuery from '../graphql/data.graphql'
import specQuery from '../graphql/spec.graphql'

interface Props {
  appId?: string
  name?: string
}

export class VegaView extends Component<Props> {
  public render = () => {
    const {
      appId,
      name
    } = this.props

    if (!appId || !name) {
      return null
    }

    return (
      <Query query={specQuery} ssr={false} variables={{name}}>
      {({loading: specLoading, data: specData}) => {
        const { spec: specStr = null } = specData || {}
        const spec = JSON.parse(specStr)
        const storedashName = spec && spec.storedash && spec.storedash.name
        return appId && storedashName && (
          <Query query={dataQuery} ssr={false} variables={{appId, name: storedashName}}>
          {({loading: dataLoading, data: rawData}) => {
            const { data = null } = rawData || {}
            const dataJSON = JSON.parse(data)
            return specLoading || dataLoading
              ? null
              : <Vega spec={spec} data={dataJSON} />
          }}
          </Query>
        )
      }}
      </Query>
  )}
}
