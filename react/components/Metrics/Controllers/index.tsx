import React, { Component } from 'react'
import { Button, Dropdown, Layout, PageBlock, PageHeader } from 'vtex.styleguide'

import { InjectedIntlProps, injectIntl } from 'react-intl'
import EnvControllers from './EnvControllers'
import TimeControllers from './TimeControllers'


class Controllers extends Component<InjectedIntlProps> {

  public render = () => {
    const { intl } = this.props

    return (
      <PageBlock
        title={intl.formatMessage({ id: 'Controllers' })}
        variation="half"
        titleAside={
          <div className="nv4 flex justify-end">
            <Button variation="primary" >
              New Metric
            </Button>
          </div>
        }
      >
        <EnvControllers />
        <TimeControllers />
      </PageBlock>
    )
  }
}

export default injectIntl(Controllers)
