import React, { Component } from 'react'
import { EmptyState, RadioGroup } from 'vtex.styleguide'

import DateRange from './DateRange'
import Relative from './Relative'


interface State {
  mode: 'DateRange' | 'Relative' | 'Empty'
}


export default class TimeController extends Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {
      mode: 'DateRange'
    }
  }

  public setTimeMode = (mode: any) => {
    this.setState({ mode })
  }

  public render = () => {
    return (
      <div>
        {
          this.state.mode === 'Empty'
          ? (
            <EmptyState title="Please define your time range">
              <p>
                Please define a time range to analyse your metric
              </p>
            </EmptyState>
          ) : (
            <div className="flex flex-wrap mh1">
              <div className="w-40 pa2 mr1">
                <RadioGroup
                  name="timeController"
                  options={[
                    { value: 'DateRange', label: 'DateRange' },
                    { value: 'Relative', label: 'Relative' },
                  ]}
                  value={this.state.mode}
                  onChange={(e: Event) => this.setState({ mode: e.currentTarget.value })}
                />
              </div>
              <div>
                {
                  this.state.mode === 'DateRange'
                  ? (
                    <DateRange />
                  ) : (
                    <Relative />
                  )
                }
              </div>

            </div>
          )
        }
      </div>
    )
  }
}
