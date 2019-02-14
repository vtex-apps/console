import React from 'react'
import { Button, PageBlock } from 'vtex.styleguide'

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import { TimeContext } from '../Contexts/TimeContext'
import AppControllers from './AppControllers'
import TimeControllers from './TimeControllers'


const Controllers: React.SFC<InjectedIntlProps> = (props) => {
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
      <TimeContext.Consumer>
        {({ timeControllers, setTimeControllers }) => (
          <TimeControllers
            timeControllers={timeControllers}
            setTimeControllers={setTimeControllers}
          />
        )}
      </TimeContext.Consumer>
    </PageBlock>
  )
}

export default injectIntl(Controllers)
