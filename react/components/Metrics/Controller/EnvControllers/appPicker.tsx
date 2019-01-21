import { compose, map, uniqWith } from 'ramda'
import moment, { Moment } from 'moment'
import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Dropdown } from 'vtex.styleguide'

import appsQuery from '../../../../graphql/apps.graphql'

import { dropdownOptions } from '../../../../common/utils'

interface Props {
  controllers: Controllers
  setControllers: any
}

export default class AppPicker extends Component<Props> {
  public render = () => (
    <Query query={appsQuery} ssr={false}>
    {({loading, data: {appsWithStats}}) => !loading && appsWithStats &&
      <Dropdown
        value={this.props.controllers.chosenAppName}
        label="Available Apps"
        options={dropdownOptions(appsWithStats)}
        onChange={(_: Event, chosenAppName: string) => this.props.setControllers({
          ...this.props.controllers,
          chosenAppName
        })}
      />
    }
    </Query>
  )
}
