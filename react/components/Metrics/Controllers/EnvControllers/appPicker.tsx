import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Dropdown } from 'vtex.styleguide'

import appsQuery from '../../../../graphql/apps.graphql'

import { dropdownOptions } from '../../../../common/utils'

interface Props {
  envControllers: EnvController
  setEnvControllers: any
}

export default class AppPicker extends Component<Props> {
  public render = () => (
    <Query query={appsQuery} ssr={false}>
    {({loading, data: {appsWithStats}}) => !loading && appsWithStats &&
      <Dropdown
        value={this.props.envControllers.chosenAppName}
        label="Available Apps"
        options={dropdownOptions(appsWithStats)}
        onChange={(_: Event, chosenAppName: string) => this.props.setEnvControllers({
          ...this.props.envControllers,
          chosenAppName
        })}
      />
    }
    </Query>
  )
}
