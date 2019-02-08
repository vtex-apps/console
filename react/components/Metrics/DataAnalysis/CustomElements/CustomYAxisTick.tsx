import React from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'

import { abbrNum, abbrPerc } from '../../../../common/dataAnalysis'
import RenderYAxisTick from './RenderYAxisTick'


interface Props extends InjectedIntlProps {
  name: string
  x?: number
  y?: number
  payload?: any
  toFixed?: number
  textAnchor?: string
}

const CustomYAxisTick: React.SFC<Props> = (props) => {
  const { name, intl, x, y, payload, toFixed, textAnchor = 'middle' } = props
  let tickValue: string

  if (name === 'cpuUsageLineChart') {
    tickValue = abbrPerc(payload.value, intl)
  } else {
    tickValue = abbrNum(toFixed ? payload.value.toFixed(toFixed) : payload.value, 0)
  }

  return (
    <RenderYAxisTick
      tickValue={tickValue}
      x={x}
      y={y}
      textAnchor={textAnchor}
    />
  )
}

export default injectIntl(CustomYAxisTick)
