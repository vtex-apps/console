import React, { Component } from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { Dropdown, NumericStepper } from 'vtex.styleguide'

import { adjustStartDate, formattedDropdownOptions, Option, setInterval } from '../../../../../common/utils'
import { EventWithValue } from '../../../../../typings/events'


type RangeStep = 'Seconds Ago' | 'Minutes Ago' | 'Hours Ago' | 'Days Ago' | 'Months Ago' | 'Years Ago'

interface Props extends InjectedIntlProps {
  startDate: Date
  endDate: Date
  rangeStep: string
  handleStartDate: (date: Date) => void
  handleEndDate: (date: Date) => void
  handleRangeStep: (rangeStep: string) => void
}

interface State {
  earliestSize: number
  earliestModifier: RangeStep
}


const mapTime = {
  'Days Ago': 'd',
  'Hours Ago': 'h',
  'Minutes Ago': 'm',
  'Months Ago': 'M',
  'Seconds Ago': 's',
  'Years Ago': 'y',
}

class Relative extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      earliestModifier: 'Hours Ago',
      earliestSize: 1,
    }
  }

  public componentDidUpdate(_: Props, prevState: State) {
    if ((this.state.earliestSize !== prevState.earliestSize) || (this.state.earliestModifier !== prevState.earliestModifier)) {
      this.constructTimeRange()
    }
  }

  public render() {
    const { intl } = this.props
    const earliestModifierOptions: Option[] = this.setEarliestModifierOptions()

    return (
      <div className="flex flex-colunm items-end pa4 mh0">
        <NumericStepper
          label={this.props.intl.formatMessage({ id: 'console.time.controller.relative.earliest' })}
          size="small"
          value={this.state.earliestSize}
          onChange={this.handleStepSize}
        />
        <Dropdown
          size="small"
          options={formattedDropdownOptions(earliestModifierOptions, intl)}
          value={this.state.earliestModifier}
          onChange={this.handleStepModifier}
        />
      </div>
    )
  }

  private handleStepSize = (e: EventWithValue) => {
    this.setState({ earliestSize: e.value })
  }

  private handleStepModifier = (e: Event, earliestModifier: RangeStep) => {
    this.setState({ earliestModifier })
  }

  private constructTimeRange = () => {
    const startDate: Date = adjustStartDate(this.state.earliestSize, this.state.earliestModifier)
    const endDate: Date = new Date()
    const interval: string = setInterval(mapTime[this.state.earliestModifier])

    this.props.handleStartDate(startDate)
    this.props.handleEndDate(endDate)
    this.props.handleRangeStep(interval)
  }

  private setEarliestModifierOptions = () => {
    return [
      { value: 'Seconds Ago', label: 'console.time.controller.relative.earliestModifier.seconds.ago' },
      { value: 'Minutes Ago', label: 'console.time.controller.relative.earliestModifier.minutes.ago' },
      { value: 'Hours Ago', label: 'console.time.controller.relative.earliestModifier.hours.ago' },
      { value: 'Days Ago', label: 'console.time.controller.relative.earliestModifier.days.ago' },
      { value: 'Months Ago', label: 'console.time.controller.relative.earliestModifier.months.ago' },
      { value: 'Years Ago', label: 'console.time.controller.relative.earliestModifier.years.ago' },
    ]
  }
}

export default injectIntl(Relative)
