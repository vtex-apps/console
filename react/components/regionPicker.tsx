import moment, { Moment } from 'moment'
import React, { Component } from 'react'
import { Dropdown } from 'vtex.styleguide'

interface Props {
  controllers: {
    chosenAppName?: string
    endDate?: Moment
    startDate?: Moment
    region: string
    production: string
  }
  setControllers: any
}

const options = [
  {
    label: 'Any',
    value: '',
  },
  {
    label: 'East-1',
    value: 'US_east-1',
  },
  {
    label: 'East-2',
    value: 'US_east-2',
  },
]

export default class RegionPicker extends Component<Props> {
  public render = () => (
    <Dropdown
      value={this.props.controllers.region}
      label="Region"
      options={options}
      onChange={(_: Event, region: string) => this.props.setControllers({
        ...this.props.controllers,
        region
      })}
    />
  )
}
