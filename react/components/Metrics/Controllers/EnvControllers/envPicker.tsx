import moment, { Moment } from 'moment'
import React, { Component } from 'react'
import { Dropdown } from 'vtex.styleguide'


interface Props {
  envControllers: EnvController
  setEnvControllers: any
}


const options = [
  {
    label: 'Production',
    value: 'true',
  },
  {
    label: 'Development',
    value: 'false',
  }
]

export default class EnvPicker extends Component<Props> {
  public render = () => (
    <Dropdown
      value={this.props.envControllers.production}
      label="Env"
      options={options}
      onChange={(_: Event, production: string) => this.props.setEnvControllers({
        ...this.props.envControllers,
        production,
      })}
    />
  )
}
