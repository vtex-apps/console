import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Dropdown } from 'vtex.styleguide'

import { dropdownOptions } from '../../../../common/utils'
import appsQuery from '../../../../graphql/apps.graphql'
import { EnvContext } from '../../EnvContext'


export default class AppPicker extends Component {
  public render = () => (
    <EnvContext.Consumer>
      {({ envControllers, setEnvControllers }) => (
        <Query query={appsQuery} ssr={false}>
          {({ loading, data: { appsWithStats } }) => !loading && appsWithStats &&
            <Dropdown
              value={envControllers.appName}
              label="Available Apps"
              options={dropdownOptions(appsWithStats)}
              onChange={(_: Event, appName: string) => setEnvControllers({
                ...envControllers,
                appName,
              })}
            />
          }
        </Query>
      )}
    </EnvContext.Consumer>
  )
}
