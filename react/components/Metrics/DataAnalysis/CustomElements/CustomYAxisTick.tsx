import React from 'react'

import { abbrNum } from '../../../../common/utils'


interface Props {
  x: number
  y: number
  payload: any
  toFixed: number
  textAnchor: string
}


const CustomYAxisTick = ({ x, y, payload, toFixed, textAnchor = 'end' }: Partial<Props>) => (
  <g transform={`translate(${x},${y})`}>
    <text x={0} y={0} dy={5} textAnchor={textAnchor} fill="#666" className="f6">
      {abbrNum(toFixed ? payload.value.toFixed(toFixed) : payload.value, 0)}
    </text>
  </g>
)

export default CustomYAxisTick
