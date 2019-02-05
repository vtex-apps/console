import React from 'react'
import { Dropdown } from 'vtex.styleguide'

import { AppContext } from '../../Contexts/AppContext'


const options = [
  {
    label: 'Any',
    value: '',
  },
  {
    label: 'Production',
    value: true,
  },
  {
    label: 'Development',
    value: false,
  },
]


const EnvPicker = () => {
  return (
    <AppContext.Consumer>
      {({ appControllers, setAppControllers }) => (
        <Dropdown
          value={appControllers.production}
          label="Environment"
          options={options}
          onChange={(_: Event, isProduction: boolean) => setAppControllers({
            ...appControllers,
            production: isProduction,
          })}
        />
      )}
    </AppContext.Consumer>
  )
}

export default EnvPicker
