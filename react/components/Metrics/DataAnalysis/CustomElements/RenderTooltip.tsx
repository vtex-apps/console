import React from 'react'
import { FormattedNumber, InjectedIntlProps, injectIntl } from 'react-intl'


interface Props extends InjectedIntlProps {
  id: string
  label: string
  labelColor: string
  value: string
}


const RenderTooltip: React.SFC<Props> = (props) => {
  const { id, label, labelColor, value } = props

  return (
    <div key={id} className="flex justify-between" >
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
