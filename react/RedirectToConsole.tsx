import React, { Component } from 'react'
import { withRuntimeContext } from 'render'

interface Props {
  runtime: RenderContext
}

class RedirectToConsole extends Component<Props> {
  public render = () => {
    const {
      runtime: { navigate },
    } = this.props

    return navigate({ to: '/admin/console/metrics' })
  }

}

export default withRuntimeContext(RedirectToConsole)
