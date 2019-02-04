import { map, reject } from 'ramda'
import React, { Component } from 'react'
import { PageBlock } from 'vtex.styleguide'

import { getAppVersion } from '../../../common/dataAnalysis'
import { isNilOrEmpty } from '../../../common/dataAnalysis'
import { EnvContext } from '../Contexts/EnvContext'
import { TimeContext } from '../Contexts/TimeContext'


interface Props {
  layout: any[]
}


const DataAnalysis = (props: Props) => {
  const updateEnvironment = (metricParams: object, envControllers: EnvController) => {
    return reject(isNilOrEmpty, {
      ...metricParams,
      appName: envControllers.appName,
      appVersion: getAppVersion(envControllers),
      production: envControllers.production,
      region: envControllers.region,
    })
  }

  const updateAnalyzedPeriod = (metricParams: object, timeControllers: TimeController) => {
    return reject(isNilOrEmpty, {
      ...metricParams,
      from: timeControllers.startDate,
      interval: timeControllers.rangeStep,
      to: timeControllers.endDate,
    })
  }

  const { layout } = props

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
                      },
                    } = chartDescription
                    let {
                      storedash: {
                        metricParams,
                      },
                    } = chartDescription

                    metricParams = updateEnvironment(metricParams, envControllers)
                    metricParams = updateAnalyzedPeriod(metricParams, timeControllers)

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

export default DataAnalysis

