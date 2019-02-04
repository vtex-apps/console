import React, { Fragment } from 'react'
import { DatePicker } from 'vtex.styleguide'


interface Props {
  locale: string
  startDate: Date
  endDate: Date
  handleStartDate: (date: Date) => void
  handleEndDate: (date: Date) => void
}


const RangeExtremesPicker = (props: Props) => {
  return (
    <Fragment>
      <div className="pa4 mh2">
        <DatePicker
          name={'startDate'}
          label={'From'}
          locale={props.locale}
          useTime={true}
          value={props.startDate}
          onChange={props.handleStartDate}
        />
      </div>
      <div className="pa4 mh2">
        <DatePicker
          name={'endDate'}
          label={'To'}
          locale={props.locale}
          useTime={true}
          value={props.endDate}
          onChange={props.handleEndDate}
        />
      </div>
    </Fragment>
  )
}

export default RangeExtremesPicker
