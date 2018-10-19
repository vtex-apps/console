import React, { Component } from 'react'
import { Button } from 'vtex.styleguide'

import { FormattedMessage } from 'react-intl'
import AppPicker from './appPicker'
import EnvPicker from './envPicker'
import RegionPicker from './regionPicker'
import VersionInput from './versionInput'

interface Props {
  controllers: Controllers
  setControllers: any
}

export default class ControllersWrapper extends Component<Props> {
  public render = () => (
    <div className="ph8">
      <div className="flex">
        <div className="w-25 pa3 mr2">
          <AppPicker controllers={this.props.controllers} setControllers={this.props.setControllers} />
        </div>
        <div className="w-25 pa3 mr2">
          <VersionInput controllers={this.props.controllers} setControllers={this.props.setControllers} />
        </div>
        <div className="w-25 pa3 mr2">
          <RegionPicker controllers={this.props.controllers} setControllers={this.props.setControllers} />
        </div>
        <div className="w-25 pa3 mr2">
          <EnvPicker controllers={this.props.controllers} setControllers={this.props.setControllers} />
        </div>
      </div>
      {/* <div className="flex justify-end">
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
      </div> */}
    </div>
  )
}
