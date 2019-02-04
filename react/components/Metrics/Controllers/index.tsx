import React from 'react'
import { Button, PageBlock } from 'vtex.styleguide'

import { InjectedIntlProps, injectIntl } from 'react-intl'
import EnvControllers from './EnvControllers'
import TimeControllers from './TimeControllers'


const Controllers = (props: InjectedIntlProps) => {
  const { intl } = props

  return (
    <PageBlock
      title={intl.formatMessage({ id: 'Controllers' })}
      variation="half"
      titleAside={
        <div className="nv4 flex justify-end">
          <Button variation="primary" disabled >
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

export default injectIntl(Controllers)
