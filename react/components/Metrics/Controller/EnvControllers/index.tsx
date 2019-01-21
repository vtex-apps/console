import React, { Component } from 'react'

import AppPicker from './appPicker'
import EnvPicker from './envPicker'
import RegionPicker from './regionPicker'
import VersionInput from './versionInput'


interface Props {
  controllers: Controllers
  setControllers: any
}


export default class EnvControllers extends Component<Props> {
  public render = () => (
    <div className="flex br4 bg-base flex-wrap w-100 pa5">
      <div className="w-40 pa4 mr2">
        <AppPicker controllers={this.props.controllers} setControllers={this.props.setControllers} />
      </div>
      <div className="w-40 pa4 mr2">
        <VersionInput controllers={this.props.controllers} setControllers={this.props.setControllers} />
      </div>
      <div className="w-40 pa4 mr2">
        <RegionPicker controllers={this.props.controllers} setControllers={this.props.setControllers} />
      </div>
      <div className="w-40 pa4 mr2">
        <EnvPicker controllers={this.props.controllers} setControllers={this.props.setControllers} />
      </div>
    </div>
  )
}
