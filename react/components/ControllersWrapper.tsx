import React, { Component } from 'react'
import { Button } from 'vtex.styleguide'

import { FormattedMessage } from 'react-intl'
import AppPicker from './appPicker'
import EnvPicker from './envPicker'
import RegionPicker from './regionPicker'
import VersionInput from './versionInput'

interface Props {
  controllers: Controllers
  setControllers: any
}

export default class MetricsControllers extends Component<Props> {
  public render = () => (
    <div className="flex">
      <div className="w-25 pa3 mr2">
        <AppPicker controllers={this.props.controllers} setControllers={this.props.setControllers} />
      </div>
      <div className="w-25 pa3 mr2">
        <VersionInput controllers={this.props.controllers} setControllers={this.props.setControllers} />
      </div>
      <div className="w-25 pa3 mr2">
        <RegionPicker controllers={this.props.controllers} setControllers={this.props.setControllers} />
      </div>
      <div className="w-25 pa3 mr2">
        <EnvPicker controllers={this.props.controllers} setControllers={this.props.setControllers} />
      </div>
    </div>
  )
}
