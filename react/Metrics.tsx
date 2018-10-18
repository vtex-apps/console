import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import * as Datetime from 'react-datetime'
import { ExtensionContainer } from 'render'
import { Dropdown } from 'vtex.styleguide'
import { View } from './components/view'

import appsQuery from './graphql/apps.graphql'

interface State {
  chosenAppId?: string
}

export default class Metrics extends Component<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      chosenAppId: undefined
    }
  }

  public render = () => (
    <Query query={appsQuery} ssr={false}>
    {({loading, data: {appsWithStats}}) => !loading && appsWithStats && Array.isArray(appsWithStats)
    ? (
      <Fragment>
        <Dropdown
          value={this.state.chosenAppId}
          label="Available Apps"
          options={appsWithStats.map(app => ({ value: app, label: app }))}
          onChange={(_: Event, chosenAppId: string) => this.setState({chosenAppId})}
        />
        <Datetime />
        <View
          appId={this.state.chosenAppId}
          name={'sample'}
        />
        <ExtensionContainer id="extensions" />
      </Fragment>
    ) : null}
    </Query>
  )
}
