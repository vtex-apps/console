import moment, { Moment } from 'moment'
import React, { Component, Fragment } from 'react'
import { Button, DatePicker } from 'vtex.styleguide'

import { TimeContext } from '../../../TimeContext'
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
      rangeStep: ''
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

  public isButtonActive = () => {
    const startDate = this.state.startDate.toDate()
    const endDate = this.state.endDate.toDate()
    const currentTime = moment().toDate()
    return (startDate && endDate &&
            startDate <= endDate &&
            endDate <= currentTime)
  }

  public render = () => {
    return (
      <TimeContext.Consumer>
        {({ timeControllers, setTimeControllers }) => (
          <Fragment>
            <RangeExtremesPicker
              locale={this.state.locale}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              handleStartDate={this.setStartDate}
              handleEndDate={this.setEndDate}
            />
            <RangeStepPicker
              rangeStep={this.state.rangeStep}
              handleRangeStep={this.setRangeStep}
            />
            <div className="pa4 mh2">
              <Button
                variation="primary"
                size="small"
                disabled={!this.isButtonActive()}
                onClick={() => {
                  return setTimeControllers({
                  ...timeControllers,
                  startDate: this.state.startDate,
                  endDate: this.state.endDate,
                  rangeStep: this.state.rangeStep
                })}
              }
              >
                Apply
              </Button>
            </div>
          </Fragment>
        )}
      </TimeContext.Consumer>
    )
  }
}
