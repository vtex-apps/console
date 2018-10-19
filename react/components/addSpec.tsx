import React, { Component } from 'react'
import { Button, EmptyState } from 'vtex.styleguide'

interface Props {
  controllers: Controllers
  setControllers: any
}

interface State {
  inputIsNotSemver: boolean
}

export default class VersionInput extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      inputIsNotSemver: false
    }
  }

  public render = () => (
    <EmptyState>
      <div className="pt5">
        <Button variation="secondary" size="small">
          <span className="flex align-baseline">Select</span>
        </Button>
      </div>
    </EmptyState>
  )
}
