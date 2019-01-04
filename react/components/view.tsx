import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Spinner } from 'vtex.styleguide'
import Render from './render'

import specQuery from '../graphql/spec.graphql'

interface Props {
  appId?: string
  name?: string
}

export class View extends Component<Props> {
  public render = () => {
    const {
      appId,
      name
    } = this.props

    console.log('\nAPPID\n', appId, '\nAPPID\nNAME\n', name, '\nNAME\n')
    if (!appId || !name) {
      return null
    }

    return (
      <Query query={specQuery} ssr={false} variables={{name, appId}}>
      {({loading, data: specData}) => {
        console.log('\nSPECDATA\n', specData, '\nSPECDATA\n')
        const { spec: specStr = null } = specData || {}

        if (!specStr) {
          console.log('Must have a Vega Spec to render Dashboards')
          return null
        }

        const spec = JSON.parse(specStr)
        const {storedash: {params, name: sdName}} = spec

        if (!sdName || !params) {
          console.log('StoreDash spec must have params and name')
          return null
        }

        return loading
          ? <Spinner />
          : <Render
              name={sdName}
              params={params}
              appId={appId}
              spec={spec}
            />
      }}
      </Query>
  )}
}
