import React from 'react'

const CustomXAxisTick = ({ x, y, payload }) => (
  <g transform={`translate(${x},${y})`}>
    <text x={0} y={15} dy={0} textAnchor="middle" fill="#666" className="f6">
      {payload.value}
    </text>
  </g>
)

export default CustomXAxisTick
