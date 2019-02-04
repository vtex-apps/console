import React, { Component } from 'react'
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
  }
]

export default class ContextPicker extends Component {
  public render = () => (
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
