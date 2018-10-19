import { pluck } from 'ramda'
import React, { Component, Fragment } from 'react'
import { injectIntl } from 'react-intl'
import { withRuntimeContext } from 'render'
import { PageHeader, Tab, Tabs } from 'vtex.styleguide'

import Builds from './components/Builds'
import MetricsControllers from './components/ControllersWrapper'
import Errors from './components/Errors'
import Metrics from './components/Metrics'
import StylesContainer from './components/StylesContainer'
var DivHeight = { minHeight: 'calc(100vh - 3em)'};
type Props = {
  runtime: RenderContext
} & ReactIntl.InjectedIntlProps
& {
  params: {
    tab: string
  }
}

interface Field {
  path: string
  name: string
  titleId: string
}

const fields: Field[] = [
  {
    name: 'metrics',
    path: 'metrics',
    titleId: 'console.admin.tabs.metrics',
  },
  {
    name: 'builds',
    path: 'builds',
    titleId: 'console.admin.tabs.builds',
  },
  {
    name: 'errors',
    path: 'errors',
    titleId: 'console.admin.tabs.errors',
  }
]

class Console extends Component<Props, {}> {
  constructor(props: any) {
    super(props)
  }

  public componentDidMount () {
    window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  public render = () => {
    const {
      params: {tab},
      intl,
      runtime: { navigate },
    } = this.props

    if (!pluck('name',fields).includes(tab)) {
      navigate({ to: '/admin/console/metrics' })
    }

    return (
      <div className="bg-muted-5" style={DivHeight}>
        <div className="w-90 center">
        <PageHeader title="IO Console" />
        <Tabs>
        {fields.map(({name, path, titleId}: Field) => (
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
            {tab === 'errors' && <Errors />}
            {tab === 'builds' && <Builds />}
          </StylesContainer>
        </div>
      </div>
    )
  }

}

export default withRuntimeContext(injectIntl(Console))
