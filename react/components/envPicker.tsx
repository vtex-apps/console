import moment, { Moment } from 'moment'
import React, { Component } from 'react'
import { Dropdown } from 'vtex.styleguide'

interface Props {
  controllers: Controllers
  setControllers: any
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
      value={this.props.controllers.production}
      label="Env"
      options={options}
      onChange={(_: Event, production: string) => this.props.setControllers({
        ...this.props.controllers,
        production,
      })}
    />
  )
}
