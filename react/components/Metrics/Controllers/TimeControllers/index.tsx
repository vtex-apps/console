import React, { Component, Fragment } from 'react'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import { Button, EmptyState, RadioGroup } from 'vtex.styleguide'

import { formattedDropdownOptions } from '../../../../common/utils'
import { adjustStartDateHour } from '../../../../common/utils'
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
  rangeStep: string
}


class TimeControllers extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      endDate: this.props.timeControllers.endDate || new Date(),
      locale: 'pt-BR',
      rangeStep: this.props.timeControllers.rangeStep!,
      startDate: this.props.timeControllers.startDate || adjustStartDateHour(),
    }
  }

  public render() {
    const { intl, timeControllers } = this.props
    const { locale, startDate, endDate, rangeStep } = this.state
    const timeControllerOptions = this.setTimeControllerOptions(intl)

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
          <div className="flex flex-wrap w-100 mh1">
            <div className="w-20 pa2 mr4">
              <RadioGroup
                name="timeController"
                options={timeControllerOptions}
                value={timeControllers.mode}
                onChange={this.handleOnChangeMode}
              />
            </div>
            <div className="pa2 mr1">
              <Fragment>
                {timeControllers.mode === 'absolute'
                  ? (
                    <Absolute
                      startDate={startDate}
                      endDate={endDate}
                      rangeStep={rangeStep}
                      handleRangeStep={this.setRangeStep}
                      handleStartDate={this.setStartDate}
                      handleEndDate={this.setEndDate}
                      locale={locale}
                    />
                  ) : (
                    <Relative
                      startDate={startDate}
                      endDate={endDate}
                      rangeStep={rangeStep}
                      handleRangeStep={this.setRangeStep}
                      handleStartDate={this.setStartDate}
                      handleEndDate={this.setEndDate}
                    />
                  )
                }
                <div className="flex content-end pa4 mr1">
                  <Button
                    variation="primary"
                    size="small"
                    disabled={!this.isButtonActive}
                    onClick={this.handleOnClickTimeControllers}
                  >
                    <FormattedMessage id="console.button.apply.time.range" />
                  </Button>
                </div>
              </Fragment>
            </div>
          </div>
        )
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

  private setTimeControllerOptions = (intl: InjectedIntl) => {
    return [
      { value: 'absolute', label: intl.formatMessage({ id: 'console.time.controller.absolute' }) },
      { value: 'relative', label: intl.formatMessage({ id: 'console.time.controller.relative' }) },
    ]
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
