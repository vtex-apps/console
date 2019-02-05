import React, { Component } from 'react'
import { EmptyState } from 'vtex.styleguide'

import layoutContent from '../../common/layoutContent'
import { AppContext } from './Contexts/AppContext'
import { TimeContext } from './Contexts/TimeContext'

import Controllers from './Controllers'
import DataAnalysis from './DataAnalysis'


interface State {
  appControllers: AppController
  timeControllers: TimeController
}


class Metrics extends Component<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      appControllers: {
        appName: '',
        chosenMajor: '',
        chosenMinor: '',
        chosenPatch: '',
        production: '',
        region: '',
      },
      timeControllers: {
        endDate: undefined,
        rangeStep: '',
        startDate: undefined,
      },
    }
  }

  public setAppControllers = (appControllers: AppController) => {
    this.setState({ appControllers })
  }

  public setTimeControllers = (timeControllers: TimeController) => {
    this.setState({ timeControllers })
  }

  public render = () => {
    const { appControllers: { appName } } = this.state
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
                  <DataAnalysis layout={layoutContent} />
                ) : (
                  <EmptyState title="Please select an app">
                    <p>
                      Please select an app to be analyzed
                    </p>
                  </EmptyState>
                )
              }
            </div>
          </TimeContext.Provider>
        </AppContext.Provider>
      </div>
    )
  }
}

export default Metrics
