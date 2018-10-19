import moment, { Moment } from 'moment'
import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { EmptyState } from 'vtex.styleguide'

import { Render } from './render'

import layoutQuery from '../graphql/layout.graphql'

interface Props {
  controllers: Controllers
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

export default class Metrics extends Component<Props> {
  constructor(props: any) {
    super(props)
  }

  public render = () => {
    const { controllers } = this.props

    const appName = getAppName(controllers)

    return (
      appName ?
      (
        <Query query={layoutQuery} ssr={false} variables={{appName}}>
            {({loading, data: {layout}}) => (
              !loading && layout && Array.isArray(layout) ? (
                <div className="flex flex-wrap">
                    {
                      layout.map(({spec, specLocator}) => {
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
                      })
                    }
                </div>
              ) : null
            )
            }
        </Query>
      ) : (
        <EmptyState title="Please select an app">
            <p>
                Please select an app to see its corresponding metrics
            </p>
        </EmptyState>
      )
    )
  }
}
