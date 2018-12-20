import moment, { Moment } from 'moment'
import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Dropdown } from 'vtex.styleguide'
import { string } from 'prop-types';

import workspacesQuery from '../graphql/workspaces.graphql'

interface Props {
  controllers: Controllers
  setControllers: any
}

// const workspacesInCurrentAccount = (account: string) => {
//   const options: WorkspaceResponse[] = []
//   workspaces.list(account).then((workspaceArray: WorkspaceResponse[]) =>
//       workspaceArray.forEach(workspace => {
//         const name = workspace.name
//         const weight = workspace.weight
//         const production = workspace.production
//         options.push({name, weight, production})
//       })
//   )
//   return options
// }

export default class WorkspacePicker extends Component<Props> {
  public render = () => (
    <Query query={workspacesQuery} ssr={false}>
      {({loading, error, data: {availableWorkspaces}}) => !loading && availableWorkspaces &&
        <Dropdown
          value={this.props.controllers.chosenWorkspaceName}
          label="Workspace"
          options={availableWorkspaces}
          onChange={(_: Event, chosenWorkspaceName: string) => this.props.setControllers({
            ...this.props.controllers,
            chosenWorkspaceName,
          })}
        />
      }
    </Query>
  )
}
