import { map } from 'ramda'
import React, { Component, Fragment } from 'react'

import { PageBlock } from 'vtex.styleguide'


interface Props {
  appId: string
  layout: T[]
}


export default class DataAnalysis extends Component<Props> {

  public render() {
    const { appId, layout } = this.props

    return (
      <div className="mt5">
        <Fragment>
          {
            map(
              (chartDescription) => {
                const {
                  ChartType,
                  storedash: {
                    metricName,
                    metricParams
                  }
                } = chartDescription

                return (
                  <PageBlock variation="full">
                    <ChartType appId={appId} metricName={metricName} metricParams={metricParams} />
                  </PageBlock>
                )
              }, layout)
          }
        </Fragment>
      </div>
    )
  }
}


