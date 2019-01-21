import moment, { Moment } from 'moment'
import React, { Component, Fragment } from 'react'
import { Button } from 'vtex.styleguide'

import RangeExtremesPicker from './RangeExtremesPicker'
import RangeStepPicker from './RangeStepPicker'


interface State {
  locale: string
  startDate: Moment
  endDate: Moment
  rangeStep: string
}


export default class DateRange extends Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {
      locale: 'pt-BR',
      startDate: moment(),
      endDate: moment(),
      rangeStep: '1d'
    }
  }

  public setStartDate = (date: Date) => {
    this.setState({ startDate: moment(date) })
  }

  public setEndDate = (date: Date) => {
    this.setState({ endDate: moment(date) })
  }

  public setRangeStep = (rangeStep: string) => {
    this.setState({ rangeStep })
  }

  public render = () => {
    return (
      <Fragment>
        <RangeExtremesPicker
          title={'From'}
          locale={this.state.locale}
          Date={this.state.startDate}
          handleDateChange={this.setStartDate}
        />
        <RangeExtremesPicker
          title={'To'}
          locale={this.state.locale}
          Date={this.state.endDate}
          handleDateChange={this.setEndDate}
        />
        <RangeStepPicker handleRangeStep={this.setRangeStep} />
        <div className="pa4 mh2">
          <Button variation="primary" size="small" >
            Apply
          </Button>
        </div>
      </Fragment>
    )
  }
}
