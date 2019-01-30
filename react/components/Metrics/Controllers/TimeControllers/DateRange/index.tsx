import React, { Component, Fragment } from 'react'
import { Button, DatePicker } from 'vtex.styleguide'

import { TimeContext } from '../../../TimeContext'
import RangeExtremesPicker from './RangeExtremesPicker'
import RangeStepPicker from './RangeStepPicker'


interface State {
  locale: string
  startDate: Date
  endDate: Date
  rangeStep: string
}


export default class DateRange extends Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {
      locale: 'pt-BR',
      startDate: new Date(),
      endDate: new Date(),
      rangeStep: '',
    }
  }

  public setStartDate = (startDate: Date) => {
    this.setState({ startDate })
  }

  public setEndDate = (endDate: Date) => {
    // always decrease one second to avoid taking the next bucket
    endDate.setSeconds(endDate.getSeconds() - 1)
    this.setState({ endDate })
  }

  public setRangeStep = (rangeStep: string) => {
    this.setState({ rangeStep })
  }

  public isButtonActive = () => {
    const startDate = this.state.startDate
    const endDate = this.state.endDate
    const currentTime = new Date()
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
                  rangeStep: this.state.rangeStep,
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
