import { path, pluck } from 'ramda'
import React, { Component, Fragment } from 'react'
import { Mutation, Query } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { Button, EmptyState } from 'vtex.styleguide'

import layoutQuery from '../graphql/layout.graphql'
import saveLayoutMutation from '../graphql/saveLayout.graphql'
import AddSpecs from './addSpec'
import MetricsControllers from './ControllersWrapper'
import { RenderContainer } from './RenderContainer'

interface State {
  controllers: Controllers
  mode: 'view' | 'edit' | 'add'
}

const getAppId = (controllers: Controllers) => {
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

const paramsFromSpecAndControllers = (params: any, controllers: Controllers) => {
  return {
    ...params,
    ...controllers
  }
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

  public saveLayout = async (saveLayout: any, layoutContainer: LayoutContainer) => {
    const layout = layoutContainer && layoutContainer.layout
    const specLocators = layout && pluck('specLocator', layout)
    if (specLocators) {
      await saveLayout({
        variables: {
          appName: this.state.controllers.chosenAppName,
          specLocators
        }
      })
    }
    this.setState({mode: 'view'})
  }

  public cancelEdit = () => {
    this.setState({mode: 'view'})
  }

  public setAddSpecs = () => {
    this.setState({mode: 'add'})
  }

  public closeAddSpecs = () => {
    this.setState({mode: 'edit'})
  }

  public render = () => {
    const { controllers: {chosenAppName: appName} } = this.state

    return (
      <div className="flex w-100">
          <MetricsControllers
            controllers={this.state.controllers}
            setControllers={this.setControllers}
          />
          <div className="w-80">
          { appName
            ? (
              <Mutation mutation={saveLayoutMutation}>
                {(saveLayout: any) => (
                  <Query query={layoutQuery} ssr={false} variables={{appName}}>
                  {({loading, data, updateQuery}) => {
                    const layout = path(['layout', 'layout'], data)
                    return (
                      <Fragment>
                        <div className="flex justify-end">
                          {this.state.mode !== 'view' && <div className="ph4">
                            <Button variation="primary" onClick={this.cancelEdit} size="small">
                              <FormattedMessage id="console.admin.metrics.button.cancel" />
                            </Button>
                          </div>}
                          {this.state.mode !== 'view' && (
                              <Button variation="danger" onClick={() => this.saveLayout(saveLayout, data && data.layout)} size="small">
                                <FormattedMessage id="console.admin.metrics.button.save" />
                              </Button>
                          )}
                          {this.state.mode === 'view' && <div className="ph4">
                            <Button variation="secondary" onClick={this.setEditMode} size="small">
                              <FormattedMessage id="console.admin.metrics.button.edit" />
                            </Button>
                          </div>}
                          {<div className="ph4">
                            <Button variation="secondary" onClick={this.setAddSpecs} size="small">
                              <FormattedMessage id="console.admin.metrics.button.add" />
                            </Button>
                          </div>}
                        </div>

                        {this.state.mode === 'add' && <AddSpecs
                          updateLayout={updateQuery}
                          mode={this.state.mode}
                          closedAddSpec={this.closeAddSpecs}
                        />}

                        <div className="flex flex-wrap">
                          {!loading && Array.isArray(layout) && layout.map(
                            ({spec}) => {
                              const specJSON = JSON.parse(spec)
                              const {
                                storedash: {
                                  name,
                                  params
                                }
                              } = specJSON
                              return (
                                <RenderContainer
                                  appId={getAppId(this.state.controllers) || ''}
                                  name={name}
                                  params={paramsFromSpecAndControllers(params, this.state.controllers)}
                                  spec={specJSON}
                                />
                              )
                            }
                          )}
                        </div>
                      </Fragment>
                  )}}
                  </Query>
                )}
              </Mutation>
            ) : (
              <EmptyState title="Please select an app">
                <p>
                    Please select an app to see its corresponding version
                </p>
              </EmptyState>
            )
          }
        </div>
    </div>
    )
  }
}
