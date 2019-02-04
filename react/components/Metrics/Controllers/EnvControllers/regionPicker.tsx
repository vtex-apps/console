import React, { Component } from 'react'
import { Dropdown } from 'vtex.styleguide'

import { EnvContext } from '../../Contexts/EnvContext'


const options = [
  {
    label: 'Any',
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

export default class RegionPicker extends Component {
  public render = () => (
    <EnvContext.Consumer>
      {({ envControllers, setEnvControllers }) => (
        <Dropdown
          value={envControllers.region}
          label="Region"
          options={options}
          onChange={(_: Event, region: string) => setEnvControllers({
            ...envControllers,
            region,
          })}
        />
      )}
    </EnvContext.Consumer>
  )
}
