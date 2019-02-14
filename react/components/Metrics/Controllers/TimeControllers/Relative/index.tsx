import React, { Component } from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { Dropdown, NumericStepper } from 'vtex.styleguide'

import { adjustStartDate, formattedDropdownOptions } from '../../../../../common/utils'
import { EventWithValue } from '../../../../../typings/events'
import { earliestModifierOptions } from './utils'


type EarliestModifier = 'Seconds Ago' | 'Minutes Ago' | 'Hours Ago' | 'Days Ago' | 'Months Ago' | 'Years Ago'

interface Props extends InjectedIntlProps {
  startDate: Date
  endDate: Date
  handleStartDate: (date: Date) => void
  handleEndDate: (date: Date) => void
}

interface State {
  earliestSize: number
  earliestModifier: EarliestModifier
}


class Relative extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      earliestModifier: 'Hours Ago',
      earliestSize: 1,
    }
    this.constructTimeRange()
  }

  public componentDidUpdate(_: Props, prevState: State) {
    if ((this.state.earliestSize !== prevState.earliestSize) || (this.state.earliestModifier !== prevState.earliestModifier)) {
      this.constructTimeRange()
    }
  }

  public render() {
    const { intl } = this.props

    return (
      <div className="flex flex-colunm items-end pa4 mh0">
        <NumericStepper
          label={this.props.intl.formatMessage({ id: 'console.time.controller.relative.earliest' })}
          size="small"
          value={this.state.earliestSize}
          onChange={this.handleEarliestSize}
        />
        <Dropdown
          size="small"
          options={formattedDropdownOptions(earliestModifierOptions, intl)}
          value={this.state.earliestModifier}
          onChange={this.handleEarliestModifier}
        />
      </div>
    )
  }

  private handleEarliestSize = (e: EventWithValue) => {
    this.setState({ earliestSize: e.value })
  }

  private handleEarliestModifier = (e: Event, earliestModifier: EarliestModifier) => {
    this.setState({ earliestModifier })
  }

  private constructTimeRange = () => {
    const startDate: Date = adjustStartDate(this.state.earliestSize, this.state.earliestModifier)
    const endDate: Date = new Date()

    this.props.handleStartDate(startDate)
    this.props.handleEndDate(endDate)
  }
}

export default injectIntl(Relative)
