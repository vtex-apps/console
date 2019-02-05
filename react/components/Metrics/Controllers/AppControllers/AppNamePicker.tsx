import React from 'react'
import { Query } from 'react-apollo'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { Dropdown } from 'vtex.styleguide'

import { dropdownOptions } from '../../../../common/utils'
import appsQuery from '../../../../graphql/apps.graphql'
import { AppContext } from '../../Contexts/AppContext'


const AppNamePicker = ({ intl }: InjectedIntlProps) => {
  return (
    <AppContext.Consumer>
      {({ appControllers, setAppControllers }) => (
        <Query query={appsQuery} ssr={false}>
          {({ loading, data: { appsWithStats } }) => !loading && appsWithStats &&
            <Dropdown
              value={appControllers.appName}
              label={intl.formatMessage({ id: 'console.available.apps' })}
              options={dropdownOptions(appsWithStats)}
              onChange={(_: Event, appName: string) => setAppControllers({
                ...appControllers,
                appName,
              })}
            />
          }
        </Query>
      )}
    </AppContext.Consumer>
  )
}

export default injectIntl(AppNamePicker)
