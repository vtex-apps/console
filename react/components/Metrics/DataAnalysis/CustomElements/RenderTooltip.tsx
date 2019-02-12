import React from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'


interface Props extends InjectedIntlProps {
  label: string
  labelColor: string
  value: string
}


const RenderTooltip: React.SFC<Props> = (props) => {
  const { label, labelColor, value } = props

  return (
    <div className="flex justify-between" >
      <div className="pa2" style={{ color: labelColor }} >
        {`${label}:  `}
      </div>
      <div className="pa2" >
        {value}
      </div>
    </div>
  )
}

export default injectIntl(RenderTooltip)
