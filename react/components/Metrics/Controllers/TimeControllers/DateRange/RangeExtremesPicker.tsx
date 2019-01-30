import React, { Component, Fragment } from 'react'
import { DatePicker } from 'vtex.styleguide'


interface Props {
  locale: string
  startDate: Date
  endDate: Date
  handleStartDate: (date: Date) => void
  handleEndDate: (date: Date) => void
}


export default class RangeExtremesPicker extends Component<Props> {

  public render = () => {
    return (
      <Fragment>
        <div className="pa4 mh2">
          <DatePicker
            name={'startDate'}
            label={'From'}
            locale={this.props.locale}
            useTime={true}
            value={this.props.startDate}
            onChange={this.props.handleStartDate}
          />
        </div>
        <div className="pa4 mh2">
          <DatePicker
            name={'endDate'}
            label={'To'}
            locale={this.props.locale}
            useTime={true}
            value={this.props.endDate}
            onChange={this.props.handleEndDate}
          />
        </div>
      </Fragment>
    )
  }
}
