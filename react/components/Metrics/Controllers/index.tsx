import React, { Component } from 'react'
import { PageBlock, Layout } from 'vtex.styleguide'

import EnvControllers from './EnvControllers'
import TimeControllers from './TimeControllers'


interface Props {
  envControllers: EnvController
  setEnvControllers: any
}


export default class Controllers extends Component<Props> {

  public render = () => {
    return (
      <PageBlock variation="half">
        <EnvControllers
          envControllers={this.props.envControllers}
          setEnvControllers={this.props.setEnvControllers}
        />
        <TimeControllers />
      </PageBlock>
    )
  }
}
