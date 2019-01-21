import { Moment } from 'moment'
import React, { Component } from 'react'
import { DatePicker } from 'vtex.styleguide'


interface Props {
  title: string
  locale: string
  Date: Moment
  handleDateChange: (date: Date) => void
}


export default class RangeExtremesPicker extends Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  public render = () => {

    return (
      <div className="pa4 mh2">
        <DatePicker
          label={this.props.title}
          locale={this.props.locale}
          onChange={this.props.handleDateChange}
          useTime={true}
          value={this.props.Date.toDate()}
        />
      </div>
    )
  }
}
