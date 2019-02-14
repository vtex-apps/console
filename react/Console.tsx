import { pluck } from 'ramda'
import React, { Component } from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { withRuntimeContext } from 'render'
import { PageHeader, Tab, Tabs } from 'vtex.styleguide'

import Errors from './components/Errors'
import Metrics from './components/Metrics'
import StylesContainer from './components/StylesContainer'


interface Props extends InjectedIntlProps {
  params: {
    tab: string
  }
  runtime: RenderContext
}

interface Field {
  path: string
  name: string
  titleId: string
}


const DivHeight = { minHeight: 'calc(100vh - 3em)' }

const fields: Field[] = [
  {
    name: 'metrics',
    path: 'metrics',
    titleId: 'console.admin.tabs.metrics',
  },
]

class Console extends Component<Props, {}> {

  public componentDidMount() {
    window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  public render() {
    const {
      params: { tab },
      intl,
      runtime: { navigate },
    } = this.props

    if (!pluck('name', fields).includes(tab)) {
      navigate({ to: '/admin/console/metrics' })
    }

    return (
      <div className="bg-muted-5" style={DivHeight}>
        <div className="w-90 center">
          <PageHeader title="IO Console" />
          <Tabs>
            {fields.map(({ name, path, titleId }: Field) => (
              <Tab
                key={name}
                label={intl.formatMessage({ id: titleId })}
                active={tab === path}
                onClick={() => navigate({ to: `/admin/console/${path}` })}
              />
            ))}
          </Tabs>
        </div>
        <div>
          <StylesContainer>
            {tab === 'metrics' && <Metrics />}
          </StylesContainer>
        </div>
      </div>
    )
  }
}

export default withRuntimeContext(injectIntl(Console))
