import React, { Component } from 'react'
import { PageBlock, Layout } from 'vtex.styleguide'

import EnvControllers from './EnvControllers'
import TimeController from './TimeController'


interface Props {
  controllers: Controllers
  setControllers: any
}


export default class Controller extends Component<Props> {

  public render = () => {
    return (
      <PageBlock variation="half">
        <EnvControllers
          controllers={this.props.controllers}
          setControllers={this.props.setControllers}
        />
        <TimeController
          controllers={this.props.controllers}
          setControllers={this.props.setControllers}
        />
      </PageBlock>
    )
  }
}
