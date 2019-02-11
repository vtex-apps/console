import React, { Component, Fragment } from 'react'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import { Button, EmptyState, RadioGroup } from 'vtex.styleguide'

import { formattedDropdownOptions } from '../../../../common/utils'
import { TimeContext } from '../../Contexts/TimeContext'
import Absolute from './Absolute'
import Relative from './Relative'
import { timeControllerOptions } from './utils'


type TimeRange = 'Absolute' | 'Relative' | 'Empty'
interface State {
  locale: string
  startDate: Date
  endDate: Date
  rangeStep: string
  mode: TimeRange
}


class TimeControllers extends Component<InjectedIntlProps, State> {
  constructor(props: InjectedIntlProps) {
    super(props)
    this.state = {
      endDate: new Date(),
      locale: 'pt-BR',
      mode: 'Empty',
      rangeStep: '',
      startDate: new Date(),
    }
  }

  public render() {
    const { intl } = this.props

    return (
      <div>
        {
          this.state.mode === 'Empty'
            ? (
              <Fragment>
                <EmptyState title={intl.formatMessage({ id: 'console.empty.time.range.headline' })}>
                  <FormattedMessage id="console.empty.time.range.explanation" />
                </EmptyState>
                <div className="pa4 mh2 flex justify-end">
                  <Button
                    variation="primary"
                    size="small"
                    onClick={this.handleOnClickMode}
                  >
                    <FormattedMessage id="console.button.set.time.range" />
                  </Button>
                </div>
              </Fragment>
            ) : (
              <div className="flex flex-wrap mh1">
                <div className="w-40 pa2 mr1">
                  <RadioGroup
                    name="timeController"
                    options={formattedDropdownOptions(timeControllerOptions, intl)}
                    value={this.state.mode}
                    onChange={this.handleOnChangeMode}
                  />
                </div>
                <div className="w-40 pa2 mr1">
                  <TimeContext.Consumer>
                    {({ timeControllers, setTimeControllers }) => (
                      <Fragment>
                        {this.state.mode === 'Absolute'
                          ? (
                            <Absolute
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
                            disabled={!this.isButtonActive}
                            onClick={() => this.handleOnClickTimeControllers(timeControllers, setTimeControllers)}
                          >
                            <FormattedMessage id="console.button.apply.time.range" />
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

  private setStartDate = (startDate: Date) => {
    this.setState({ startDate })
  }

  private setEndDate = (endDate: Date) => {
    // always decrease one second to avoid taking the next bucket
    endDate.setSeconds(endDate.getSeconds() - 1)
    this.setState({ endDate })
  }

  private setRangeStep = (rangeStep: string) => {
    this.setState({ rangeStep })
  }

  private setTimeMode = (mode: any) => {
    this.setState({ mode })
  }

  private handleOnClickMode = () => {
    this.setTimeMode('Absolute')
  }

  private handleOnChangeMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(
      {
        mode: e.currentTarget
          ? e.currentTarget.value as TimeRange
          : 'Absolute',
      })
  }

  private handleOnClickTimeControllers = (timeControllers: TimeController, setTimeControllers: SetTimeControllers) => {
    setTimeControllers({
      ...timeControllers,
      endDate: this.state.endDate,
      rangeStep: this.state.rangeStep,
      startDate: this.state.startDate,
    })
  }

  private isButtonActive = () => {
    const startDate = this.state.startDate
    const endDate = this.state.endDate
    const currentTime = new Date()
    return (startDate && endDate &&
      startDate <= endDate &&
      endDate <= currentTime)
  }
}

export default injectIntl(TimeControllers)
