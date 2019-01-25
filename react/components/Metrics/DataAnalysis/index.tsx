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
          // <div className="mt5 mw9 center ph3-ns">
          // <div className="cf ph2-ns">
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

                  console.log({metricParams})

                  return (
                    // <PageBlock variation="half">
                    // </PageBlock>
                    // <div className="fl w-100 w-50-ns pa4">
                    //   <div className="br4 bg-base pv4">
                    <PageBlock variation="full">
                      <ChartType appId={appId} name={name} metricParams={metricParams} />
                    </PageBlock>
                    //   </div>
                    // </div>
                  )
                }, layout)
            }
          </div>
        )}
      </TimeContext.Consumer>
    )
  }
}


