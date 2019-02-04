import React, { Component } from 'react'
import { EmptyState } from 'vtex.styleguide'

import layoutContent from '../../common/layoutContent'
import { EnvContext } from './Contexts/EnvContext'
import { TimeContext } from './Contexts/TimeContext'

import Controllers from './Controllers'
import DataAnalysis from './DataAnalysis'


interface State {
  envControllers: EnvController
  timeControllers: TimeController
}


class Metrics extends Component<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      envControllers: {
        appName: '',
        chosenMajor: '',
        chosenMinor: '',
        chosenPatch: '',
        production: undefined,
        region: '',
      },
      timeControllers: {
        endDate: undefined,
        rangeStep: '',
        startDate: undefined,
      },
    }
  }

  public setEnvControllers = (envControllers: EnvController) => {
    this.setState({ envControllers })
  }

  public setTimeControllers = (timeControllers: TimeController) => {
    this.setState({ timeControllers })
  }

  public render = () => {
    const { envControllers: { appName } } = this.state
    const { timeControllers: { startDate, endDate } } = this.state
    const envContextValue = {
      envControllers: this.state.envControllers,
      setEnvControllers: this.setEnvControllers,
    }
    const timeContextValue = {
      setTimeControllers: this.setTimeControllers,
      timeControllers: this.state.timeControllers,
    }

    return (
      <div className="flex flex-wrap w-100">
        <EnvContext.Provider value={envContextValue}>
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
        </EnvContext.Provider>
      </div>
    )
  }
}

export default Metrics
