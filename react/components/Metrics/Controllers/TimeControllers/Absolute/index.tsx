import React, { Fragment } from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { DatePicker } from 'vtex.styleguide'


interface Props extends InjectedIntlProps {
  locale: string
  startDate: Date
  endDate: Date
  handleStartDate: (date: Date) => void
  handleEndDate: (date: Date) => void
}


const Absolute: React.SFC<Props> = (props) => {
  return (
    <div className="flex flex-wrap">
      <Fragment>
        <div className="pa4 mh2">
          <DatePicker
            name={'startDate'}
            label={props.intl.formatMessage({ id: 'console.date.picker.from' })}
            locale={props.locale}
            useTime={true}
            value={props.startDate}
            onChange={props.handleStartDate}
          />
        </div>
        <div className="pa4 mh2">
          <DatePicker
            name={'endDate'}
            label={props.intl.formatMessage({ id: 'console.date.picker.to' })}
            locale={props.locale}
            useTime={true}
            value={props.endDate}
            onChange={props.handleEndDate}
          />
        </div>
      </Fragment>
    </div>

  )
}

export default injectIntl(Absolute)
