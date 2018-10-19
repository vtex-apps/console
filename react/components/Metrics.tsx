import { path } from 'ramda'
import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { Button, EmptyState } from 'vtex.styleguide'

import layoutQuery from '../graphql/layout.graphql'
import AddSpecs from './addSpec'
import MetricsControllers from './ControllersWrapper'
import { Render } from './render'

interface State {
  controllers: Controllers
  mode: 'view' | 'edit' | 'add'
}

const getAppName = (controllers: Controllers) => {
  const {
    chosenAppName,
    chosenMajor,
    chosenMinor,
    chosenPatch,
  } = controllers
  return chosenAppName ?
         `${chosenAppName}@${chosenMajor}.${chosenMinor}.${chosenPatch}` :
         null
}

export default class Metrics extends Component<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      controllers: {
        chosenAppName: undefined,
        chosenMajor: '',
        chosenMinor: '',
        chosenPatch: '',
        endDate: undefined,
        production: 'true',
        region: 'Any',
        startDate: undefined,
      },
      mode: 'view',
    }
  }

  public setControllers = (controllers: Controllers) => this.setState({controllers})

  public setEditMode = () => {
    this.setState({mode: 'edit'})
  }

  public saveLayout = () => {
    this.setState({mode: 'view'})
  }

  public cancelEdit = () => {
    this.setState({mode: 'view'})
  }

  public setAddSpecs = () => {
    this.setState({mode: 'add'})
  }

  public render = () => {
    const { controllers } = this.state

    const appName = getAppName(controllers)

    return (
      <div className="flex w-100">
          <MetricsControllers
            controllers={this.state.controllers}
            setControllers={this.setControllers}
          />
          <div className="w-80">
            <div className="flex justify-end">
              {this.state.mode === 'edit' && <div className="ph4">
                <Button variation="primary" onClick={this.cancelEdit} size="small">
                  <FormattedMessage id="console.admin.metrics.button.cancel" />
                </Button>
              </div>}
              {this.state.mode === 'edit' && (
                  <Button variation="danger" onClick={this.saveLayout} size="small">
                    <FormattedMessage id="console.admin.metrics.button.save" />
                  </Button>
              )}
              <div className="ph4">
                <Button variation="secondary" onClick={this.setEditMode} size="small" disabled={this.state.mode !== 'view'}>
                  <FormattedMessage id="console.admin.metrics.button.edit" />
                </Button>
              </div>
              <div className="ph4">
                <Button variation="secondary" onClick={this.setAddSpecs} size="small">
                  <FormattedMessage id="console.admin.metrics.button.add" />
                </Button>
              </div>
            </div>
          {appName
          ? (
            <Query query={layoutQuery} ssr={false} variables={{appName}}>
                {({loading, data, updateQuery}) => {
                  const layout = path(['layout', 'layout'], data)
                  const renderedSpecs = (!loading && Array.isArray(layout))
                  ? layout.map(
                    ({spec}) => {
                      const specJSON = JSON.parse(spec)
                      const {
                        storedash: {
                          name,
                          params
                        }
                      } = specJSON
                      return (
                        <div className="w-45 pa3 mr2">
                            <Render
                              appId={appName}
                              name={name}
                              params={params}
                              spec={specJSON}
                            />
                        </div>
                      )
                    }
                  )
                  : []
                  const editComponent = this.state.mode === 'add'
                    ? [(
                      <div className="w-45 pa3 mr2">
                        <AddSpecs updateLayout={updateQuery} />
                      </div>
                    )]
                    : []
                  return (
                    <div className="flex flex-wrap">
                      {[...renderedSpecs, ...editComponent]}
                    </div>
                  )
                }}
            </Query>
          ) : (
            <EmptyState title="Please select an app">
                <p>
                    Please select an app to see its corresponding version
                </p>
            </EmptyState>
          )}
        </div>
    </div>
    )
  }
}
