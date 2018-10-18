import PropTypes from 'prop-types'
import { mapObjIndexed, values } from 'ramda'
import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import * as Datetime from 'react-datetime'
import { FormattedMessage, injectIntl } from 'react-intl'
import { ExtensionContainer, withRuntimeContext } from 'render'
import { Dropdown, PageHeader, Tab, Tabs } from 'vtex.styleguide'
import { View } from './components/view'

import appsQuery from './graphql/apps.graphql'

import DatePicker from './components/DatePicker'
import StylesContainer from './components/StylesContainer'

/* import DatePicker from 'react-datepicker' */
import moment, { Moment } from 'moment'

interface CustomProps {
  params: { field: string }
  runtime: RenderContext
}

type Props = CustomProps & ReactIntl.InjectedIntlProps

interface State {
  chosenAppId?: string
  endDate?: Moment
  startDate?: Moment
}

interface FieldInfo {
  path: string
  titleId: string
}

interface Fields {
  [field: string]: FieldInfo
}

const fields: Fields = {
  metrics: {
    path: 'metrics',
    titleId: 'console.admin.tabs.metrics',
  },
  errors: {
    path: 'errors',
    titleId: 'console.admin.tabs.errors',
  },
}



class Metrics extends Component<{}, State> {
  public static contextTypes = {
    culture: PropTypes.shape({ locale: PropTypes.string.isRequired })
                      .isRequired,
  }

  public static propTypes = {
    children: PropTypes.object,
    runtime: PropTypes.object,
  }

  constructor(props: any) {
    super(props)
    this.state = {
      chosenAppId: undefined,
      endDate: undefined,
      startDate: undefined,
    }
  }

  public render = () => {
    const { locale } = this.context.culture
    const { endDate, startDate } = this.state
    const {
      children,
      intl,
      params,
      treePath,
      runtime: { navigate },
    } = this.props
    const path = treePath && treePath.split('/').slice(-1)[0] || 'metrics'

    return (
      <Query query={appsQuery} ssr={false}>
          {({loading, data: {appsWithStats}}) => !loading && appsWithStats && Array.isArray(appsWithStats) ? (
             <div>
                 <PageHeader title="Console" />
                 <Fragment>
                     <StylesContainer>
                         <Dropdown
                           value={this.state.chosenAppId}
                           label="Available Apps"
                           options={appsWithStats.map(app => ({ value: app, label: app }))}
                           onChange={(_: Event, chosenAppId: string) => this.setState({chosenAppId})}
                         />
                         <Fragment>
                             <FormattedMessage
                               id="console.admin.metrics.datePicker.startDateTitle">
                                 {(text: string) => (
                                   <div className="mb3 w-100 f6">{text}</div>
                                 )}
                             </FormattedMessage>
                             <DatePicker
                               locale={locale}
                               selected={
                                 startDate ? moment(startDate) : undefined
                               }
                               onChange={this.updateStartDate}
                             />
                             <FormattedMessage
                               id="console.admin.metrics.datePicker.endDateTitle">
                                 {(text: string) => (
                                   <div className="mb3 w-100 f6">{text}</div>
                                 )}
                             </FormattedMessage>
                             <DatePicker
                               locale={locale}
                               selected={
                                 startDate ? moment(endDate) : undefined
                               }
                               onChange={this.updateEndDate}
                             />
                         </Fragment>
                     </StylesContainer>
                     <ExtensionContainer id="extensions" />
                 </Fragment>

                 <div className="pH7">
                     <Tabs>
                         {values(
                            mapObjIndexed((info: FieldInfo, key: string) => {
                              return (
                                <Tab
                                  key={key}
                                  label={intl.formatMessage({ id: info.titleId })}
                                  active={
                                    path.startsWith(info.path) &&
                                    (path === '' ? path === info.path : true)
                                  }
                                  onClick={() => {
                                      navigate({ to: '/admin/console/' + info.path })
                                  }}
                                />
                              )
                            }, fields),
                         )}
                     </Tabs>
                 </div>
                 <View
                   appId={this.state.chosenAppId}
                   name={'sample'}
                 />
             </div>
          ) : null}
      </Query>
    )
  }

  private handleInputChange = (inputData: any) => {
    this.setState(prevState => ({
      ...prevState,
      ...inputData,
    }))
  }

  private updateStartDate = (value: Moment) {
    this.handleInputChange({ startDate: value.utc().format()})
  }

  private updateEndDate = (value: Moment) {
    this.handleInputChange({ endDate: value.utc().format()})
  }
}

export default withRuntimeContext(injectIntl(Metrics))
