import React from 'react'
import { Dropdown } from 'vtex.styleguide'

import { EnvContext } from '../../Contexts/EnvContext'


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


const ContextPicker = () => {
  return (
    <EnvContext.Consumer>
      {({ envControllers, setEnvControllers }) => (
        <Dropdown
          value={envControllers.production}
          label="Context"
          options={options}
          onChange={(_: Event, context: boolean) => setEnvControllers({
            ...envControllers,
            production: context,
          })}
        />
      )}
    </EnvContext.Consumer>
  )
}

export default ContextPicker
