import React, { Component, Fragment } from 'react'
import Render from './render'

interface Props {
  appId: string
  name: string
  params: any
  spec: string
}

export class RenderContainer extends Component<Props> {
  public render = () => {
    const {
      appId,
      name,
      params,
      spec
    } = this.props

    if (!appId || !name) {
      return null
    }

    return (
      <Fragment>
        <div className="w-45 pa3 mr2">
          <div className="flex items-center b">{name}</div>
          <div className="flex">
            <Render
              appId={appId}
              name={name}
              params={params}
              spec={spec}
            />
          </div>
        </div>
      </Fragment>
    )
  }
}
