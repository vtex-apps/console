import React, { Component } from 'react'
import { Dropdown, NumericStepper } from 'vtex.styleguide'

import { dropdownOptions } from '../../../../../common/utils'
import { EventWithValue } from '../../../../../typings/events'


type RangeStep = 'Full' | 'Seconds' | 'Minutes' | 'Hours' | 'Days' | 'Months' | 'Years'

interface Props {
  rangeStep: string
  handleRangeStep: (rangeStep: string) => void
}

interface State {
  stepSize: number
  stepModifier: RangeStep
}


const mapTime = {
  'Days': 'd',
  'Hours': 'h',
  'Minutes': 'm',
  'Months': 'M',
  'Seconds': 's',
  'Years': 'y',
}

const stepModifierOptions: string[] = [
  'Full',
  'Seconds',
  'Minutes',
  'Hours',
  'Days',
  'Months',
  'Years',
]

export default class RangeStepPicker extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      stepModifier: 'Full',
      stepSize: 0,
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
      const rangeStep = this.state.stepSize + mapTime[this.state.stepModifier]
      this.props.handleRangeStep(rangeStep)
    }
  }

  public render = () => {

    return (
      <div className="flex flex-colunm items-end pa4 mh0">
        <NumericStepper
          label="Step"
          size="small"
          onChange={(e: EventWithValue) => this.setState({ stepSize: e.value })}
          value={this.state.stepSize}
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
