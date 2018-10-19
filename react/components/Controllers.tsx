import moment, { Moment } from 'moment'
import React, { Component, Fragment } from 'react'

import AppPicker from './appPicker'
import EnvPicker from './envPicker'
import RegionPicker from './regionPicker'

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

export default class Controllers extends Component<Props> {
  public render = () => (
    <div className="ph8">
      <div className="flex">
        <div className="w-33 pa3 mr2">
          <AppPicker controllers={this.props.controllers} setControllers={this.props.setControllers} />
        </div>
        <div className="w-33 pa3 mr2">
          <RegionPicker controllers={this.props.controllers} setControllers={this.props.setControllers} />
        </div>
        <div className="w-33 pa3 mr2">
          <EnvPicker controllers={this.props.controllers} setControllers={this.props.setControllers} />
        </div>
      </div>
    </div>
  )
}
