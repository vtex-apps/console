import React, { Component } from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { PageBlock } from 'vtex.styleguide'


interface Props extends InjectedIntlProps {
  active?: boolean
  label?: string
  payload?: any
  type?: string
}


const CustomTooltip = (props: Props) => {
  const handleLabel = (label: string) => {
    // After it will treat intl
    return label
  }

  const handleValue = (value: number) => {
    const { intl } = props
    return intl.formatNumber(value)
  }

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
              {`${handleLabel(payload[0].dataKey)}:  `}
            </div>
            <div className="pa2" >
              {handleValue(payload[0].value)}
            </div>
          </div>

          <div className="flex justify-between" >
            <div className="pa2" style={{ color: payload[1].color }} >
              {`${handleLabel(payload[1].dataKey)}:  `}
            </div>
            <div className="pa2" >
              {handleValue(payload[1].value)}
            </div>
          </div>

          <div className="flex justify-around" >
            <div className="pa2" style={{ color: payload[2].color }} >
              {`${handleLabel(payload[2].dataKey)}:  `}
            </div>
            <div className="pa2" >
              {handleValue(payload[2].value)}
            </div>
          </div>

          <div className="flex justify-between" >
            <div className="pa2" style={{ color: payload[3].color }} >
              {`${handleLabel(payload[3].dataKey)}:  `}
            </div>
            <div className="pa2" >
              {handleValue(payload[3].value)}
            </div>
          </div>
        </div>
      </PageBlock>
    )
  }
  return null
}

export default injectIntl(CustomTooltip)
