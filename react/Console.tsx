import moment, { Moment } from 'moment'
import { pluck } from 'ramda'
import React, { Component, Fragment } from 'react'
import { injectIntl } from 'react-intl'
import { withRuntimeContext } from 'render'
import { PageHeader, Tab, Tabs } from 'vtex.styleguide'

import Builds from './components/Builds'
import ControllersWrapper from './components/ControllersWrapper'
import Errors from './components/Errors'
import Metrics from './components/Metrics'
import StylesContainer from './components/StylesContainer'

type Props = {
  runtime: RenderContext
} & ReactIntl.InjectedIntlProps
& {
  params: {
    tab: string
  }
}

interface State {
  controllers: Controllers
  editMode: boolean
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

class Console extends Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      controllers: {
        chosenAppName: undefined,
        chosenMajor: '',
        chosenMinor: '',
        chosenPatch: '',
        endDate: undefined,
        production: 'true',
        region: 'Any',
        startDate: undefined,
      },
      editMode: false
    }
  }

  public setControllers = (controllers: State['controllers']) => this.setState({controllers})

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
      <Fragment>
        <PageHeader title="IO Console" />
        <ControllersWrapper controllers={this.state.controllers} setControllers={this.setControllers} />
        <div className="ph7">
          <StylesContainer>
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
            {tab === 'metrics' && <Metrics controllers={this.state.controllers} />}
            {tab === 'errors' && <Errors />}
            {tab === 'builds' && <Builds />}
          </StylesContainer>
        </div>
      </Fragment>
    )
  }

}

export default withRuntimeContext(injectIntl(Console))
