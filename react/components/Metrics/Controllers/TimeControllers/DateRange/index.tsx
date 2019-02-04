import React, { Component, Fragment } from 'react'

import RangeExtremesPicker from './RangeExtremesPicker'
import RangeStepPicker from './RangeStepPicker'


interface Props {
  locale: string
  startDate: Date
  endDate: Date
  rangeStep: string
  handleStartDate: (date: Date) => void
  handleEndDate: (date: Date) => void
  handleRangeStep: (rangeStep: string) => void
}


export default class DateRange extends Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  public render = () => {
    return (
      <Fragment>
        <RangeExtremesPicker
          locale={this.props.locale}
          startDate={this.props.startDate}
          endDate={this.props.endDate}
          handleStartDate={this.props.handleStartDate}
          handleEndDate={this.props.handleEndDate}
        />
        <RangeStepPicker
          rangeStep={this.props.rangeStep}
          handleRangeStep={this.props.handleRangeStep}
        />
      </Fragment>
    )
  }
}
