import { concat, head, map, path } from 'ramda'
import React, { Component } from 'react'
import { ApolloConsumer, Query } from 'react-apollo'
import { Dropdown, ModalDialog, Spinner } from 'vtex.styleguide'

import getSpecSchema from '../../graphql/spec.graphql'
import availableSpecs from '../../graphql/specs.graphql'

interface Props {
  updateLayoutWithSpecs: any
  mode: 'view' | 'edit' | 'add'
  closedAddSpec: any
}

interface State {
  selectedSpec?: Spec
}

interface Spec {
  appId: string
  specName: string
}

const parseSpec = (parsed: string | void) => {
  if (!parsed) {
    return
  }
  const [appId, specName] = parsed.split('/')
  return {
    appId,
    specName
  }
}

const specToString = (spec: Spec | void) => spec && `${spec.appId}/${spec.specName}`

const specsToDropdownOptions = (specs: Spec[]) => Array.isArray(specs) && map(
  (spec: Spec) => ({value: specToString(spec), label: specToString(spec)}),
  specs
)

export default class AddSpecs extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      selectedSpec: undefined,
    }
  }

  public specSelected = async (apolloClient: any) => {
    const {selectedSpec} = this.state
    const {updateLayoutWithSpecs} = this.props
    if (selectedSpec) {
      const spec = await apolloClient.query({
        query: getSpecSchema,
        variables: selectedSpec,
      }).then(path(['data', 'spec']))

      updateLayoutWithSpecs((previousResult: {layoutWithSpecs: LayoutWithSpecsContainer}) => {
        const layoutWithSpecs = path<LayoutWithSpecs[]>(['layoutWithSpecs', 'layoutWithSpecs'], previousResult) || []
        const specLocator = {
          ...selectedSpec,
          __typename: path(['specLocator', '__typename'], head<any>(layoutWithSpecs)),
        }
        const newLayoutWithSpecs = {
          __typename: path(['__typename'], head<any>(layoutWithSpecs)),
          spec,
          specLocator,
        }

        return {
          ...previousResult,
          layoutWithSpecs: {
            ...previousResult.layoutWithSpecs,
            layoutWithSpecs: concat(layoutWithSpecs, [newLayoutWithSpecs])
          }
        }
      })
    }
    this.props.closedAddSpec()
  }

  public render = () => (
    <Query query={availableSpecs} ssr={false}>
    {({loading, data}) => (
      <ApolloConsumer>
        {apolloClient => (
          <ModalDialog
              centered
              confirmation={{
                label: 'Select',
                onClick: () => this.specSelected(apolloClient),
              }}
              cancelation={{
                label: 'Cancel',
                onClick: () => this.specSelected(apolloClient),
              }}
              isOpen={this.props.mode === 'add'}
              onClose={() => this.specSelected(apolloClient)}
            >
            <h1>Select Spec</h1>
            {loading || !data || !Array.isArray(data.specs)
              ? <Spinner/>
              : <Dropdown
                  label="Specs"
                  options={specsToDropdownOptions(data.specs)}
                  onChange={(_: string, selectedSpec: string) => this.setState({selectedSpec: parseSpec(selectedSpec)})}
                  value={specToString(this.state.selectedSpec)}
                />
            }
          </ModalDialog>
        )}
      </ApolloConsumer>
    )}
    </Query>
  )
}
