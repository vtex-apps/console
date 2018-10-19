import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { EmptyState } from 'vtex.styleguide'

import layoutQuery from '../graphql/layout.graphql'
import AddSpecs from './addSpec'
import { Render } from './render'

interface Props {
  controllers: Controllers
  editMode: boolean
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
            {({loading, data: {layout}}) => {
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
              const editComponent = this.props.editMode
                ? [(
                  <div className="w-45 pa3 mr2">
                    <AddSpecs />
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
      )
    )
  }
}
