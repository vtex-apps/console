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

const crazySpec = {
  '$schema': 'https://vega.github.io/schema/vega-lite/v2.json',
  'description': 'A scatterplot showing horsepower and miles per gallons for various cars.',
  'data': {'url': 'https://vega.github.io/editor/data/cars.json'},
  'mark': 'point',
  'encoding': {
    'x': {'field': 'Horsepower','type': 'quantitative'},
    'y': {'field': 'Miles_per_Gallon','type': 'quantitative'}
  }
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
