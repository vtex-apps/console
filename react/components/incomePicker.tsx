import moment, { Moment } from 'moment'
import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Dropdown } from 'vtex.styleguide'
import { string } from 'prop-types'
import { compose, map, uniqWith } from 'ramda'

import incomeQuery from '../graphql/income.graphql'
import appsQuery from '../graphql/apps.graphql'

import { dropdownOptions } from '../common/utils'

interface Props {
  controllers: Controllers
  setControllers: any
}

export default class IncomePicker extends Component<Props> {
  public render = () => (
    <Query query={incomeQuery} ssr={false}>
    {({loading, data: {income}}) => {
      return (!loading && income &&
      <Dropdown
        value={this.props.controllers.chosenWorkspaceName}
        label="Available income"
        options={dropdownOptions(income)}
        onChange={(_: Event, chosenWorkspaceName: string) => this.props.setControllers({
          ...this.props.controllers,
          chosenWorkspaceName,
        })}
      />)
      }
    }
    </Query>
  )
}
