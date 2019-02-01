import React, { Component } from 'react'
import { EmptyState } from 'vtex.styleguide'

import layoutContent from '../../common/layoutContent'
import { EnvContext } from './EnvContext'
import { TimeContext } from './TimeContext'

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
        startDate: undefined,
        endDate: undefined,
        rangeStep: '',
      }
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
      timeControllers: this.state.timeControllers,
      setTimeControllers: this.setTimeControllers,
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
                      Please select an app to see its corresponding version
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
