import { map } from 'ramda'
import React from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { Dropdown } from 'vtex.styleguide'

import { formattedDropdownOptions } from '../../../../common/utils'
import { AppContext } from '../../Contexts/AppContext'


const options = [
  {
    label: 'console.any',
    value: '',
  },
  {
    label: 'console.envPicker.production',
    value: 'true',
  },
  {
    label: 'console.envPicker.development',
    value: 'false',
  },
]


const EnvPicker: React.SFC<InjectedIntlProps> = ({ intl }) => {
  return (
    <AppContext.Consumer>
      {({ appControllers, setAppControllers }) => (
        <Dropdown
          value={appControllers.production}
          label={intl.formatMessage({ id: 'console.app.environment' })}
          options={formattedDropdownOptions(options, intl)}
          onChange={(_: Event, isProduction: string) => setAppControllers({
            ...appControllers,
            production: isProduction,
          })}
        />
      )}
    </AppContext.Consumer>
  )
}

export default injectIntl(EnvPicker)
