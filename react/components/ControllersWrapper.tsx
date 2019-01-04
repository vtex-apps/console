import React, { Component } from 'react'
import { Button } from 'vtex.styleguide'

import { FormattedMessage } from 'react-intl'
import AppPicker from './appPicker'
import EnvPicker from './envPicker'
import IncomePicker from './incomePicker'
import RegionPicker from './regionPicker'
import Render from './render'
import VersionInput from './versionInput'
import WorkspacePicker from './workspacePicker'

import dataQuery from '../graphql/data.graphql'
import { Query } from 'react-apollo'

interface Props {
  controllers: Controllers
  setControllers: any
}

export default class MetricsControllers extends Component<Props> {
  public render = () => (
    <div className="flex br3 bg-base flex-column w5 pa5">
      <div className="w-100 pa4 mr2">
        <AppPicker controllers={this.props.controllers} setControllers={this.props.setControllers} />
      </div>
      <div className="w-100 pa4 mr2">
        <VersionInput controllers={this.props.controllers} setControllers={this.props.setControllers} />
      </div>
      <div className="w-100 pa4 mr2">
        <RegionPicker controllers={this.props.controllers} setControllers={this.props.setControllers} />
      </div>
      <div className="w-100 pa4 mr2">
        <EnvPicker controllers={this.props.controllers} setControllers={this.props.setControllers} />
      </div>
      {/* <Query query={dataQuery} ssr={false}>
        {({loading, data}) => {
            console.log('\nDATA FROM STOREDASH\n', data, '\nDATA FROM STOREDASH\n')
            return !loading && data
          }
        }
      </Query>
      div className="w-100 pa4 mr2">
        <Render controllers={this.props.controllers} setControllers={this.props.setControllers} />
      </div> */}
    </div>
  )
}
