import { map, reject } from 'ramda'
import React, { Component, Fragment } from 'react'
import { PageBlock } from 'vtex.styleguide'

import { EnvContext } from '../EnvContext'
import { TimeContext } from '../TimeContext'
import { getAppVersion } from '../utils'
import { isNilOrEmpty } from './utils'

interface Props {
  layout: T[]
}

export default class DataAnalysis extends Component<Props> {

  public updateEnvironment = (metricParams: object, envControllers: EnvController) => {
    console.log('updateEnvironment')
    return reject(isNilOrEmpty, {
      ...metricParams,
      appName: envControllers.appName,
      appVersion: getAppVersion(envControllers),
      region: envControllers.region,
      production: envControllers.production,
    })
  }

  public updateAnalyzedPeriod = (metricParams: object, timeControllers: TimeController) => {
    console.log('updateAnalyzedPeriod')
    return reject(isNilOrEmpty, {
      ...metricParams,
      from: timeControllers.startDate,
      to: timeControllers.endDate,
      interval: timeControllers.rangeStep,
    })
  }

  public render() {
    const { layout } = this.props

    return (
      <EnvContext.Consumer>
        {({ envControllers }) => (
          <TimeContext.Consumer>
            {({ timeControllers }) => (
              <div className="mt5" >
                {
                  map(
                    (chartDescription) => {
                      const {
                        ChartType,
                        storedash: {
                          name,
                        }
                      } = chartDescription
                      let {
                        storedash: {
                          metricParams,
                        }
                      } = chartDescription

                      console.log({envControllers}, {timeControllers})
                      metricParams = this.updateEnvironment(metricParams, envControllers)
                      metricParams = this.updateAnalyzedPeriod(metricParams, timeControllers)

                      console.log({ metricParams })

                      return (
                        <PageBlock variation="full">
                          <ChartType name={name} metricParams={metricParams} />
                        </PageBlock>
                      )
                    }, layout)
                }
              </div>
            )}
          </TimeContext.Consumer>
        )}
      </EnvContext.Consumer>
    )
  }
}


