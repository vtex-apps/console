import React, { Component } from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { Dropdown, NumericStepper } from 'vtex.styleguide'

import { formattedDropdownOptions } from '../../../../../common/utils'
import { EventWithValue } from '../../../../../typings/events'
import { mapTime, noOp, stepModifierOptions } from './utils'
import { mapTimeInverse } from './utils'


type RangeStep = 'Full' | 'Seconds' | 'Minutes' | 'Hours' | 'Days' | 'Months' | 'Years'

interface Props extends InjectedIntlProps {
  rangeStep: string
  handleRangeStep: (rangeStep: string) => void
}

interface State {
  stepSize: number
  stepModifier: string
}


class RangeStepPicker extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = this.setStateFromRangeStep()
  }

  public componentDidUpdate(_: Props, prevState: State) {
    if ((this.state.stepSize !== prevState.stepSize) || (this.state.stepModifier !== prevState.stepModifier)) {
      this.constructRangeStep()
    }
  }

  public render() {
    const { intl } = this.props

    return (
      <div className="flex flex-colunm items-end pa4">
        {this.state.stepModifier === 'Full'
          ? (
            <NumericStepper
              label={this.props.intl.formatMessage({ id: 'console.range.step.picker.stepSize' })}
              size="small"
              value={0}
              onChange={noOp}
            />
          ) : (
            <NumericStepper
              label={this.props.intl.formatMessage({ id: 'console.range.step.picker.stepSize' })}
              size="small"
              value={this.state.stepSize}
              onChange={this.handleStepSize}
            />
          )
        }
        <Dropdown
          size="small"
          options={formattedDropdownOptions(stepModifierOptions, intl)}
          value={this.state.stepModifier}
          onChange={this.handleStepModifier}
        />
      </div>
    )
  }

  private setStateFromRangeStep = () => {
    let stepModifier: RangeStep = 'Full'
    let stepSize: number = 0
    if (this.props.rangeStep) {
      const stepSizePart: number = Number(this.props.rangeStep[0])
      const stepModifierPart: string = this.props.rangeStep[1]

      stepModifier = mapTimeInverse[stepModifierPart]
      stepSize = stepSizePart
    }
    return {
      stepModifier,
      stepSize,
    }
  }

  private handleStepSize = (e: EventWithValue) => {
    this.setState({ stepSize: e.value })
  }

  private handleStepModifier = (e: Event, stepModifier: RangeStep) => {
    this.setState({ stepModifier })
  }

  private constructRangeStep = () => {
    if (this.state.stepModifier === 'Full') {
      this.props.handleRangeStep('')
    } else {
      const rangeStep = this.state.stepSize + mapTime[this.state.stepModifier]
      this.props.handleRangeStep(rangeStep)
    }
  }
}

export default injectIntl(RangeStepPicker)
