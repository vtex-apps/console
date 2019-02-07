import { map, reject } from 'ramda'
import React, { Component } from 'react'
import { PageBlock } from 'vtex.styleguide'

import { getAppVersion } from '../../../common/dataAnalysis'
import { isNilOrEmpty } from '../../../common/dataAnalysis'
import { AppContext } from '../Contexts/AppContext'
import { TimeContext } from '../Contexts/TimeContext'


interface Props {
  layout: any[]
}


const DataAnalysis: React.SFC<Props> = (props) => {
  const setAppParams = (metricParams: object, appControllers: AppController) => {
    return reject(isNilOrEmpty, {
      ...metricParams,
      appName: appControllers.appName,
      appVersion: getAppVersion(appControllers),
      production: appControllers.production,
      region: appControllers.region,
    })
  }

  const setTimeRange = (metricParams: object, timeControllers: TimeController) => {
    return reject(isNilOrEmpty, {
      ...metricParams,
      from: timeControllers.startDate,
      interval: timeControllers.rangeStep,
      to: timeControllers.endDate,
    })
  }

  const { layout } = props

  return (
    <AppContext.Consumer>
      {({ appControllers }) => (
        <TimeContext.Consumer>
          {({ timeControllers }) => (
            <div className="mt5" >
              {
                map(
                  (chartDescription) => {
                    const {
                      ChartType,
                      id,
                      storedash: {
                        name,
                      },
                    } = chartDescription
                    let {
                      storedash: {
                        metricParams,
                      },
                    } = chartDescription

                    metricParams = setAppParams(metricParams, appControllers)
                    metricParams = setTimeRange(metricParams, timeControllers)

                    return (
                      <PageBlock key={id} variation="full">
                        <ChartType name={name} metricParams={metricParams} />
                      </PageBlock>
                    )
                  }, layout)
              }
            </div>
          )}
        </TimeContext.Consumer>
      )}
    </AppContext.Consumer>
  )
}

export default DataAnalysis

