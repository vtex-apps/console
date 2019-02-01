import React, { Component } from 'react'
import { Dropdown, NumericStepper } from 'vtex.styleguide'

import { dropdownOptions } from '../../../../../common/utils'
import { RangeStep } from './typings'


interface Props {
  rangeStep: string
  handleRangeStep: (rangeStep: string) => void
}

interface State {
  stepSize: number
  stepModifier: RangeStep
}


export default class RangeStepPicker extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      stepSize: 0,
      stepModifier: 'Full',
    }
  }

  public componentDidUpdate(_: Props, prevState: State) {
    if ((this.state.stepSize !== prevState.stepSize) || (this.state.stepModifier !== prevState.stepModifier)) {
      this.constructRangeStep()
    }
  }

  public constructRangeStep = () => {
    if (this.state.stepModifier === 'Full') {
      this.props.handleRangeStep('')
    } else {
      const mapTime = {
        'Seconds': 's',
        'Minutes': 'm',
        'Hours': 'h',
        'Days': 'd',
        'Months': 'M',
        'Years': 'y',
      }
      const rangeStep = this.state.stepSize + mapTime[this.state.stepModifier]
      this.props.handleRangeStep(rangeStep)
    }
  }

  public render = () => {
    const stepModifierOptions: string[] = [
      'None',
      'Seconds',
      'Minutes',
      'Hours',
      'Days',
      'Months',
      'Years'
    ]

    return (
      <div className="flex flex-colunm items-end pa4 mh0">
        <NumericStepper
          label="Step"
          size="small"
          value={this.state.stepSize}
          onChange={(e: Event) => this.setState({ stepSize: e.value })}
        />
        <Dropdown
          size="small"
          options={dropdownOptions(stepModifierOptions)}
          value={this.state.stepModifier}
          onChange={(e: Event, stepModifier: RangeStep) => this.setState({ stepModifier })}
        />
      </div>
    )
  }
}
