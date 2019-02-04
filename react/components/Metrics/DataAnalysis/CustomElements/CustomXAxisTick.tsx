import React from 'react'


interface Props {
  x: number
  y: number
  payload: any
}


const CustomXAxisTick = ({ x, y, payload }: Partial<Props>) => (
  <g transform={`translate(${x},${y})`}>
    <text x={0} y={15} dy={0} textAnchor="middle" fill="#666" className="f6">
      {payload.value}
    </text>
  </g>
)

export default CustomXAxisTick
