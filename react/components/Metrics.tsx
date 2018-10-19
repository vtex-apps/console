import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { Button, EmptyState } from 'vtex.styleguide'

import { path } from 'ramda'
import layoutQuery from '../graphql/layout.graphql'
import AddSpecs from './addSpec'
import { Render } from './render'

interface Props {
  controllers: Controllers
  editMode: boolean
  saveLayout: any
  setEditMode: any
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
      <Fragment>
        <div className="flex justify-end">
          {this.props.editMode && (
            <div className="ph4">
              <Button variation="danger" onClick={this.props.saveLayout} size="small">
                <FormattedMessage id="console.admin.metrics.button.save" />
              </Button>
            </div>
          )}
          <div className="ph4">
            <Button variation="secondary" onClick={this.props.setEditMode} size="small" disabled={this.props.editMode}>
              <FormattedMessage id="console.admin.metrics.button.edit" />
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
                const editComponent = this.props.editMode
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
      </Fragment>
    )
  }
}
