import React from 'react'
import { Button, PageBlock } from 'vtex.styleguide'

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import AppControllers from './AppControllers'
import TimeControllers from './TimeControllers'


const Controllers = (props: InjectedIntlProps) => {
  const { intl } = props

  return (
    <PageBlock
      title={intl.formatMessage({ id: 'console.context' })}
      variation="half"
      titleAside={
        <div className="nv4 flex justify-end">
          <Button variation="primary" disabled >
            <FormattedMessage id="console.newMetric" />
          </Button>
        </div>
      }
    >
      <AppControllers />
      <TimeControllers />
    </PageBlock>
  )
}

export default injectIntl(Controllers)
