import { map, reject } from 'ramda'
import React from 'react'
import { PageBlock } from 'vtex.styleguide'

import { getRangeStep, isNilOrEmpty } from '../../../common/dataAnalysis'
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
      appVersion: appControllers.appVersion,
      production: appControllers.production,
      region: appControllers.region,
    })
  }

  const setTimeRange = (metricParams: object, timeControllers: TimeController, chartType: string) => {
    return reject(isNilOrEmpty, {
      ...metricParams,
      from: timeControllers.startDate,
      interval: (chartType === 'BarChart') ? '' : getRangeStep(timeControllers.startDate!, timeControllers.endDate!),
      to: timeControllers.endDate,
    })
  }

  const { layout } = props

  return (
    <AppContext.Consumer>
      {({ appControllers }) => (
        <TimeContext.Consumer>
          {({ timeControllers }) => (
            <div className="flex flex-wrap mt5 w-100" >
              {
                map(
                  (chartDescription) => {
                    const {
                      ChartComponent,
                      chartType,
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
                    metricParams = setTimeRange(metricParams, timeControllers, chartType)

                    return (
                      <div className="w-33 pa4">
                        <PageBlock key={id} variation="full">
                          <ChartComponent name={name} metricParams={metricParams} />
                        </PageBlock>
                      </div>
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

