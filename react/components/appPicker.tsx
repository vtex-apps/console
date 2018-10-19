import moment, { Moment } from 'moment'
import { compose, map, uniqWith } from 'ramda'
import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Dropdown } from 'vtex.styleguide'

import appsQuery from '../graphql/apps.graphql'

interface Props {
  controllers: {
    chosenAppName?: string
    endDate?: Moment
    startDate?: Moment
    region: string
    production: string
  }
  setControllers: any
}

const strEq = (str1: string, str2: string) => str1 === str2

const appWithStatsToDropdownOptions = (appsWithStats: string[]) => compose(
  map((appName: string) => ({ value: appName, label: appName })),
  uniqWith(strEq)
)(appsWithStats)

export default class AppPicker extends Component<Props> {
  public render = () => (
    <Query query={appsQuery} ssr={false}>
    {({loading, data: {appsWithStats}}) => !loading && appsWithStats &&
      <Dropdown
        value={this.props.controllers.chosenAppName}
        label="Available Apps"
        options={appWithStatsToDropdownOptions(appsWithStats)}
        onChange={(_: Event, chosenAppName: string) => this.props.setControllers({
          ...this.props.controllers,
          chosenAppName
        })}
      />
    }
    </Query>
  )
}
