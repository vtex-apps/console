import { map, path, pluck } from 'ramda'
import React, { Component, Fragment } from 'react'
import { Mutation, Query, withApollo } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { Button, EmptyState } from 'vtex.styleguide'

import layoutContent from '../../common/layoutContent'

import Controller from './Controller'
import DataAnalysis from './DataAnalysis'


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

class Metrics extends Component<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      controllers: {
        chosenAppName: undefined,
        chosenMajor: '',
        chosenMinor: '',
        chosenPatch: '',
        startDate: undefined,
        endDate: undefined,
        region: 'Any',
        production: 'true',
      },
      mode: 'view',
    }
  }

  public setControllers = (controllers: Controllers) => this.setState({ controllers })

  public setEditMode = () => {
    this.setState({ mode: 'edit' })
  }

  public saveLayoutWithSpecs = async (saveLayoutWithSpecs: any, layoutWithSpecsContainer: LayoutWithSpecsContainer) => {
    const layoutWithSpecs = layoutWithSpecsContainer && layoutWithSpecsContainer.layoutWithSpecs
    const specLocators = layoutWithSpecs && pluck('specLocator', layoutWithSpecs)
    if (specLocators) {
      await saveLayoutWithSpecs({
        variables: {
          appName: this.state.controllers.chosenAppName,
          specLocators
        }
      })
    }
    this.setState({ mode: 'view' })
  }

  public cancelEdit = () => {
    this.setState({ mode: 'view' })
  }

  public setAddSpecs = () => {
    this.setState({ mode: 'add' })
  }

  public closeAddSpecs = () => {
    this.setState({ mode: 'edit' })
  }

  public render = () => {
    const { controllers: { chosenAppName: appName, chosenMajor: versionMajor } } = this.state

    return (
      <div className="flex flex-wrap w-100">
        <Controller
          controllers={this.state.controllers}
          setControllers={this.setControllers}
        />

        <div className="w-80">
          {appName && versionMajor && Array.isArray(layoutContent)
            ? (
              <DataAnalysis
                appId={getAppId(this.state.controllers) || ''}
                layout={layoutContent}
              />
            ) : (
              <EmptyState title="Please select an app">
                <p>
                  Please select an app to see its corresponding version
                </p>
              </EmptyState>
            )
          }
        </div>

        {/* quando for fazer com mutation
          <div className="w-80">
          { appName
            ? (
              <Mutation mutation={saveLayoutWithSpecsMutation}>
                {(saveLayoutWithSpecs: any) => (
                  <Query query={layoutWithSpecsQuery} ssr={false} variables={{appName}}>
                  {({loading, data, updateQuery}) => {
                    const layoutWithSpecs = path(['layoutWithSpecs', 'layoutWithSpecs'], data)
                    console.log('\nLAYOUT\n', layoutWithSpecs, '\nLAYOUT\n')
                    return (
                      <Fragment>
                        <div className="flex justify-end">
                          {this.state.mode !== 'view' && <div className="ph4">
                            <Button variation="primary" onClick={this.cancelEdit} size="small">
                              <FormattedMessage id="console.admin.metrics.button.cancel" />
                            </Button>
                          </div>}
                          {this.state.mode !== 'view' && (
                              <Button variation="danger" onClick={() => this.saveLayoutWithSpecs(saveLayoutWithSpecs, data && data.layoutWithSpecs)} size="small">
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
                          updateLayoutWithSpecs={updateQuery}
                          mode={this.state.mode}
                          closedAddSpec={this.closeAddSpecs}
                        />}

                        <div className="flex flex-wrap">
                          {!loading && Array.isArray(layoutWithSpecs) && layoutWithSpecs.map(
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
        </div> */}
      </div>
    )
  }
}

export default withApollo(Metrics)
