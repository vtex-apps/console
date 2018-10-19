import { concat, map, path, head } from 'ramda'
import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import { Button, Dropdown, EmptyState, ModalDialog, Spinner } from 'vtex.styleguide'

import availableSpecs from '../graphql/specs.graphql'

interface Props {
  updateLayout: any
}

interface State {
  selectingNewSpec: boolean
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
      selectingNewSpec: false,
    }
  }

  public selectingNewSpec = () => this.setState({selectingNewSpec: true})

  public specSelected = () => {
    const {selectedSpec} = this.state
    const {updateLayout} = this.props
    if (selectedSpec) {
      updateLayout((previousResult: {layout: LayoutContainer}) => {
        const layout = path<Layout[]>(['layout', 'layout'], previousResult) || []
        const specLocator = {
          ...selectedSpec,
          __typename: path(['specLocator', '__typename'], head<any>(layout)),
        }
        const newLayout = {
          __typename: path(['__typename'], head<any>(layout)),
          spec: '{}',
          specLocator,
        }

        return {
          ...previousResult,
          layout: {
            ...previousResult.layout,
            layout: concat(layout, [newLayout])
          }
        }
      })
    }
    this.setState({selectingNewSpec: false})
  }

  public render = () => (
    <Fragment>
      <EmptyState>
        <div className="pt5">
          <Button variation="tertiary" size="small" onClick={this.selectingNewSpec}>
            <span className="flex align-baseline">Select New</span>
          </Button>
        </div>
      </EmptyState>
      <Query query={availableSpecs} ssr={false}>
      {({loading, data}) => (
        <ModalDialog
            centered
            confirmation={{
              label: 'Select',
              onClick: this.specSelected,
            }}
            cancelation={{
              label: 'Cancel',
              onClick: this.specSelected,
            }}
            isOpen={this.state.selectingNewSpec}
            onClose={this.specSelected}
          >
          <h1>Select Spec?</h1>
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
      </Query>
    </Fragment>
  )
}
