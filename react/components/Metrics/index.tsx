import moment, { Moment } from 'moment'
import { map, path, pluck } from 'ramda'
import React, { Component, Fragment } from 'react'
import { Mutation, Query, withApollo } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { Button, EmptyState } from 'vtex.styleguide'

import layoutContent from '../../common/layoutContent'
import { TimeContext } from './TimeContext'

import Controllers from './Controllers'
import DataAnalysis from './DataAnalysis'


interface State {
  envControllers: EnvController
  timeControllers: TimeController
}


const getAppId = (envControllers: EnvController) => {
  const {
    chosenAppName,
    chosenMajor,
    chosenMinor,
    chosenPatch,
  } = envControllers
  return chosenAppName ?
    `${chosenAppName}@${chosenMajor}.${chosenMinor}.${chosenPatch}` :
    null
}


class Metrics extends Component<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      envControllers: {
        chosenAppName: undefined,
        chosenMajor: '',
        chosenMinor: '',
        chosenPatch: '',
        production: 'true',
        region: 'Any',
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
    const { envControllers: { chosenAppName: appName, chosenMajor: versionMajor } } = this.state
    const timeContextValue = { timeControllers: { ...this.state.timeControllers }, setTimeControllers: this.setTimeControllers }

    return (
      <TimeContext.Provider value={timeContextValue} >
        <div className="flex flex-wrap w-100">
          <Controllers
            envControllers={this.state.envControllers}
            setEnvControllers={this.setEnvControllers}
          />

          <div className="w-80">
            {appName && versionMajor && Array.isArray(layoutContent)
              ? (
                <DataAnalysis
                  appId={getAppId(this.state.envControllers) || ''}
                  layout={layoutContent}
                />
              ) : (
                <EmptyState title="Please select an app">
                  <p>
                    Please select an app to see its corresponding version
                  </p>
                </EmptyState>
              )
            }
          </div>
        </div>
      </TimeContext.Provider>
    )
  }
}

export default withApollo(Metrics)
