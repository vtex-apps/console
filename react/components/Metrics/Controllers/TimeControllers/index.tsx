import React, { Component, Fragment } from 'react'
import { Button, EmptyState, RadioGroup } from 'vtex.styleguide'

import { TimeContext } from '../../TimeContext'
import DateRange from './DateRange'
import Relative from './Relative'

interface State {
  locale: string
  startDate: Date
  endDate: Date
  rangeStep: string
  mode: 'DateRange' | 'Relative' | 'Empty'
}


export default class TimeController extends Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {
      locale: 'pt-BR',
      startDate: new Date(),
      endDate: new Date(),
      rangeStep: '',
      mode: 'DateRange',
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
              <EmptyState title="Please define your time range">
                <p>
                  Please define a time range to analyse your metric
              </p>
              </EmptyState>
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
                    onChange={(e: Event) => this.setState({ mode: e.currentTarget.value })}
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
                                startDate: this.state.startDate,
                                endDate: this.state.endDate,
                                rangeStep: this.state.rangeStep,
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
