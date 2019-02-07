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
    label: 'East-1',
    value: 'aws-us-east-1',
  },
  {
    label: 'East-2',
    value: 'aws-us-east-2',
  },
]


const RegionPicker: React.SFC<InjectedIntlProps> = ({ intl }) => {
  return (
    <AppContext.Consumer>
      {({ appControllers, setAppControllers }) => (
        <Dropdown
          value={appControllers.region}
          label={intl.formatMessage({ id: 'console.app.region' })}
          options={formattedDropdownOptions(options, intl)}
          onChange={(_: Event, region: string) => setAppControllers({
            ...appControllers,
            region,
          })}
        />
      )}
    </AppContext.Consumer>
  )
}

export default injectIntl(RegionPicker)
