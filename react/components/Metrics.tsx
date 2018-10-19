import moment, { Moment } from 'moment'
import React, { Component } from 'react'
import { EmptyState } from 'vtex.styleguide'

interface Props {
  controllers: {
    chosenAppName?: string
    endDate?: Moment
    startDate?: Moment
    region: string
    production: string
  }
}

export default class Metrics extends Component<Props> {
  public render = () => (
    <EmptyState title="Coming Soon">
      <p>
        Formula VTEX should last LONGER !!!.
      </p>
    </EmptyState>
  )
}
