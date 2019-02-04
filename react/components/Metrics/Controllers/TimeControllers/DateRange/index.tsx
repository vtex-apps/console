import React, { Fragment } from 'react'

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


const DateRange = (props: Props) => {
  return (
    <Fragment>
      <RangeExtremesPicker
        locale={props.locale}
        startDate={props.startDate}
        endDate={props.endDate}
        handleStartDate={props.handleStartDate}
        handleEndDate={props.handleEndDate}
      />
      <RangeStepPicker
        rangeStep={props.rangeStep}
        handleRangeStep={props.handleRangeStep}
      />
    </Fragment>
  )
}

export default DateRange