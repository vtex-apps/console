import React, { Component } from 'react'
import { FormattedNumber, InjectedIntlProps, injectIntl  } from 'react-intl'
import { PageBlock } from 'vtex.styleguide'


interface Props extends InjectedIntlProps {
  active?: boolean
  label?: string
  payload?: any
  type?: string
}


const CustomTooltip = (props: Props) => {
  const { active } = props

  if (active) {
    const { payload, label } = props

    return (
      <PageBlock>
        <div className="t-small">
          <div className="pa2">
            {label}
          </div>
          <div className="flex justify-between" >
            <div className="pa2" style={{ color: payload[0].color }} >
              {`${payload[0].dataKey}:  `}
            </div>
            <div className="pa2" >
              <FormattedNumber value={payload[0].value} />
            </div>
          </div>

          <div className="flex justify-between" >
            <div className="pa2" style={{ color: payload[1].color }} >
              {`${payload[1].dataKey}:  `}
            </div>
            <div className="pa2" >
              <FormattedNumber value={payload[1].value} />
            </div>
          </div>

          <div className="flex justify-between" >
            <div className="pa2" style={{ color: payload[2].color }} >
              {`${payload[2].dataKey}:  `}
            </div>
            <div className="pa2" >
              <FormattedNumber value={payload[2].value} />
            </div>
          </div>

          <div className="flex justify-between" >
            <div className="pa2" style={{ color: payload[3].color }} >
              {`${payload[3].dataKey}:  `}
            </div>
            <div className="pa2" >
              <FormattedNumber value={payload[3].value} />
            </div>
          </div>
        </div>
      </PageBlock>
    )
  }
  return null
}

export default injectIntl(CustomTooltip)
