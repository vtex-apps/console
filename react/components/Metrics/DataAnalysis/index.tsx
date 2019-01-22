import { map } from 'ramda'
import React, { Component, Fragment } from 'react'
import { PageBlock } from 'vtex.styleguide'

import { TimeContext } from '../TimeContext'

interface Props {
  appId: string
  layout: T[]
}


export default class DataAnalysis extends Component<Props> {

  public render() {
    const { appId, layout } = this.props

    return (
      <TimeContext.Consumer>
        {({ timeControllers, setTimeControllers }) => (
          <div className="mt5">
            <Fragment>
              {
                map(
                  (chartDescription) => {
                    const {
                      ChartType,
                      storedash: {
                        metricName,
                      }
                    } = chartDescription
                    let {
                      storedash: {
                        metricParams
                      }
                    } = chartDescription

                    if (timeControllers.startDate !== undefined && timeControllers.endDate !== undefined) {
                      metricParams = {
                        ...metricParams,
                        from: timeControllers.startDate.toDate(),
                        to: timeControllers.endDate.toDate(),
                      }
                    }

                    if (timeControllers.rangeStep !== '') {
                      metricParams = {
                        ...metricParams,
                        interval: timeControllers.rangeStep
                      }
                    }

                    return (
                      <PageBlock variation="full">
                        <ChartType appId={appId} metricName={metricName} metricParams={metricParams} />
                      </PageBlock>
                    )
                  }, layout)
              }
            </Fragment>
          </div>
        )}
      </TimeContext.Consumer>
    )
  }
}


