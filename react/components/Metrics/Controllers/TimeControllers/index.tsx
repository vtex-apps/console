import React, { Component, Fragment } from 'react'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import { Button, EmptyState, RadioGroup } from 'vtex.styleguide'

import { adjustEndDate, adjustStartDateHour, formattedDropdownOptions } from '../../../../common/utils'
import Absolute from './Absolute'
import Relative from './Relative'
import { timeControllerOptions } from './utils'


interface Props extends InjectedIntlProps {
  timeControllers: TimeController
  setTimeControllers: SetTimeControllers
}

interface State {
  locale: string
  startDate: Date
  endDate: Date
}


class TimeControllers extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      endDate: this.props.timeControllers.endDate || new Date(),
      locale: 'pt-BR',
      startDate: this.props.timeControllers.startDate || adjustStartDateHour(),
    }
  }

  public render() {
    const { intl, timeControllers } = this.props
    const { locale, startDate, endDate } = this.state

    return (
      !timeControllers.mode
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
          <div className="flex flex-row">
            <div className="pa1 mr6">
              <RadioGroup
                name="timeController"
                options={formattedDropdownOptions(timeControllerOptions, intl)}
                value={timeControllers.mode}
                onChange={this.handleOnChangeMode}
              />
            </div>
            <div className="flex items-center flex-wrap w-100">
              {timeControllers.mode === 'absolute'
                ? (
                  <Absolute
                    startDate={startDate}
                    endDate={endDate}
                    handleStartDate={this.setStartDate}
                    handleEndDate={this.setEndDate}
                    locale={locale}
                  />
                ) : (
                  <Relative
                    startDate={startDate}
                    endDate={endDate}
                    handleStartDate={this.setStartDate}
                    handleEndDate={this.setEndDate}
                  />
                )
              }
              <div className="content-end pa4 pt7 mr1 mh4">
                <Button
                  variation="primary"
                  size="small"
                  disabled={!this.isButtonActive}
                  onClick={this.handleOnClickTimeControllers}
                >
                  <FormattedMessage id="console.button.apply.time.range" />
                </Button>
              </div>
            </div>
          </div>
        )
    )
  }

  private setStartDate = (startDate: Date) => {
    this.setState({ startDate })
  }

  private setEndDate = (endDate: Date) => {
    this.setState({ endDate: adjustEndDate(endDate) })
  }

  private handleOnClickMode = () => {
    this.props.setTimeControllers({
      ...this.props.timeControllers,
      mode: 'absolute',
    })
  }

  private handleOnChangeMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setTimeControllers({
      ...this.props.timeControllers,
      mode: e.currentTarget
        ? e.currentTarget.value as TimeRange
        : 'absolute',
    })
  }

  private handleOnClickTimeControllers = () => {
    this.props.setTimeControllers({
      ...this.props.timeControllers,
      endDate: this.state.endDate,
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
