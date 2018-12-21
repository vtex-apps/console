import moment, { Moment } from 'moment'
import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Dropdown } from 'vtex.styleguide'
import { string } from 'prop-types'
import { compose, map, uniqWith } from 'ramda'

import workspacesQuery from '../graphql/workspaces.graphql'

import { dropdownOptions } from '../common/utils'

interface Props {
  controllers: Controllers
  setControllers: any
}

export default class WorkspacePicker extends Component<Props> {
  public render = () => (
    <Query query={workspacesQuery} ssr={false}>
    {({loading, data: {workspaces}}) => !loading && workspaces &&
      <Dropdown
        value={this.props.controllers.chosenWorkspaceName}
        label="Available Workspaces"
        options={dropdownOptions(workspaces)}
        onChange={(_: Event, chosenWorkspaceName: string) => this.props.setControllers({
          ...this.props.controllers,
          chosenWorkspaceName,
        })}
      />
    }
    </Query>
  )
}
