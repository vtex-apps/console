import React, { Component } from 'react'

import AppPicker from './appPicker'
import EnvPicker from './envPicker'
import RegionPicker from './regionPicker'
import VersionInput from './versionInput'


interface Props {
  envControllers: EnvController
  setEnvControllers: any
}


export default class EnvControllers extends Component<Props> {
  public render = () => (
    <div className="flex br4 bg-base flex-wrap w-100 pa5">
      <div className="w-40 pa4 mr2">
        <AppPicker envControllers={this.props.envControllers} setEnvControllers={this.props.setEnvControllers} />
      </div>
      <div className="w-40 pa4 mr2">
        <VersionInput envControllers={this.props.envControllers} setEnvControllers={this.props.setEnvControllers} />
      </div>
      <div className="w-40 pa4 mr2">
        <RegionPicker envControllers={this.props.envControllers} setEnvControllers={this.props.setEnvControllers} />
      </div>
      <div className="w-40 pa4 mr2">
        <EnvPicker envControllers={this.props.envControllers} setEnvControllers={this.props.setEnvControllers} />
      </div>
    </div>
  )
}
