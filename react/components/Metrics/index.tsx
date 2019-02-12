import { Location } from 'history'
import React, { Component } from 'react'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import { withRuntimeContext } from 'render'
import { EmptyState } from 'vtex.styleguide'

import layoutContent from '../../common/layoutContent'
import { getAppId } from '../../common/utils'
import { AppContext } from './Contexts/AppContext'
import { TimeContext } from './Contexts/TimeContext'

import Controllers from './Controllers'
import DataAnalysis from './DataAnalysis'


interface Props extends InjectedIntlProps {
  runtime: RenderContext
}

interface State {
  appControllers: AppController
  timeControllers: TimeController
}


class Metrics extends Component<Props, State> {
  private searchParams: URLSearchParams = new URLSearchParams()
  constructor(props: Props) {
    super(props)
    this.props.runtime.history.listen(this.listenChangesInHistoryLocation)
    this.state = this.stateFromUrl(this.props.runtime.history.location)
  }

  public render() {
    const { runtime: { account } } = this.props
    const { appControllers: { appName, appVersion } } = this.state
    const { timeControllers: { startDate, endDate } } = this.state
    const appContextValue = {
      appControllers: this.state.appControllers,
      setAppControllers: this.setAppControllers,
    }
    const timeContextValue = {
      setTimeControllers: this.setTimeControllers,
      timeControllers: this.state.timeControllers,
    }

    return (
      <div className="flex flex-wrap w-100">
        <AppContext.Provider value={appContextValue}>
          <TimeContext.Provider value={timeContextValue} >
            <Controllers />
            <div className="w-100">
              {appName && startDate && endDate && Array.isArray(layoutContent)
                ? (
                  <DataAnalysis layout={layoutContent} appId={getAppId(account, appName, appVersion || '')}/>
                ) : (
                  <EmptyState title={this.props.intl.formatMessage({ id: 'console.empty.app.headline' })}>
                    <FormattedMessage id="console.empty.app.explanation" />
                  </EmptyState>
                )
              }
            </div>
          </TimeContext.Provider>
        </AppContext.Provider>
      </div>
    )
  }

  private setAppControllers = (appControllers: AppController) => {
    if (appControllers.appName) {
      this.searchParams.set('appName', appControllers.appName)
    }
    if (appControllers.appVersion) {
      this.searchParams.set('appVersion', appControllers.appVersion)
    }
    if (appControllers.production) {
      this.searchParams.set('production', appControllers.production)
    }
    if (appControllers.region) {
      this.searchParams.set('region', appControllers.region)
    }

    this.changeCurrentLocationInHistory()
  }

  private setTimeControllers = (timeControllers: TimeController) => {
    if (timeControllers.startDate) {
      this.searchParams.set('startDate', timeControllers.startDate.toString())
    }
    if (timeControllers.endDate) {
      this.searchParams.set('endDate', timeControllers.endDate.toString())
    }
    if (timeControllers.rangeStep) {
      this.searchParams.set('rangeStep', timeControllers.rangeStep)
    }
    if (timeControllers.mode) {
      this.searchParams.set('mode', timeControllers.mode)
    }

    this.changeCurrentLocationInHistory()
  }

  private changeCurrentLocationInHistory = () => {
    const { runtime: { history } } = this.props
    const newRelativePathQuery = history.location.pathname + '?' + this.searchParams.toString()
    history.push(newRelativePathQuery)
  }

  private listenChangesInHistoryLocation = (location: Location<any>) => {
    this.setState(this.stateFromUrl(location))
  }

  private stateFromUrl = (location: Location<any>) => {
    this.searchParams = new URLSearchParams(location.search)
    const startDate = this.searchParams.get('startDate')
    const endDate = this.searchParams.get('endDate')
    const mode = this.searchParams.get('mode')
    return {
      appControllers: {
        appName: this.searchParams.get('appName') || '',
        appVersion: this.searchParams.get('appVersion') || '',
        production: this.searchParams.get('production') || '',
        region: this.searchParams.get('region') || '',
      },
      timeControllers: {
        endDate: endDate ? new Date(endDate) : undefined,
        mode: mode as TimeRange,
        rangeStep: this.searchParams.get('rangeStep') || '',
        startDate: startDate ? new Date(startDate) : undefined,
      },
    }
  }
}

export default withRuntimeContext(injectIntl(Metrics))
