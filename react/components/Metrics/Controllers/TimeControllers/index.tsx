import React, { Component, Fragment } from 'react'
import { Button, EmptyState, RadioGroup } from 'vtex.styleguide'

import { EventWithValue } from '../../../../typings/events'
import { TimeContext } from '../../Contexts/TimeContext'
import DateRange from './DateRange'
import Relative from './Relative'


type TimeRange = 'DateRange' | 'Relative' | 'Empty'
interface State {
  locale: string
  startDate: Date
  endDate: Date
  rangeStep: string
  mode: TimeRange
}


export default class TimeController extends Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {
      endDate: new Date(),
      locale: 'pt-BR',
      mode: 'Empty',
      rangeStep: '',
      startDate: new Date(),
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

  public setTimeMode = (mode: any) => {
    this.setState({ mode })
  }

  public render = () => {
    return (
      <div>
        {
          this.state.mode === 'Empty'
            ? (
              <Fragment>
                <EmptyState title="Please set a time range">
                  <p>
                    Please set a time range to analyze your metric
                  </p>
                </EmptyState>
                <div className="pa4 mh2 flex justify-end">
                  <Button
                    variation="primary"
                    size="small"
                    onClick={() => this.setTimeMode('DateRange')}
                  >
                    Set Time Range
                  </Button>
                </div>
              </Fragment>
            ) : (
              <div className="flex flex-wrap mh1">
                <div className="w-40 pa2 mr1">
                  <RadioGroup
                    name="timeController"
                    options={[
                      { value: 'DateRange', label: 'DateRange' },
                      { value: 'Relative', label: 'Relative' },
                    ]}
                    value={this.state.mode}
                    onChange={(e: EventWithValue) => this.setState({
                      mode:
                        e.currentTarget
                          ? e.currentTarget.value as TimeRange
                          : 'Empty',
                    })}
                  />
                </div>
                <div className="w-40 pa2 mr1">
                  <TimeContext.Consumer>
                    {({ timeControllers, setTimeControllers }) => (
                      <Fragment>
                        {this.state.mode === 'DateRange'
                          ? (
                            <DateRange
                              locale={this.state.locale}
                              startDate={this.state.startDate}
                              endDate={this.state.endDate}
                              rangeStep={this.state.rangeStep}
                              handleRangeStep={this.setRangeStep}
                              handleStartDate={this.setStartDate}
                              handleEndDate={this.setEndDate}
                            />
                          ) : (
                            <Relative />
                          )
                        }
                        <div className="pa4 mh2">
                          <Button
                            variation="primary"
                            size="small"
                            disabled={!this.isButtonActive()}
                            onClick={() => {
                              return setTimeControllers({
                                ...timeControllers,
                                endDate: this.state.endDate,
                                rangeStep: this.state.rangeStep,
                                startDate: this.state.startDate,
                              })
                            }
                            }
                          >
                            Apply
                          </Button>
                        </div>
                      </Fragment>
                    )}
                  </TimeContext.Consumer>
                </div>
              </div>
            )
        }
      </div>
    )
  }
}
