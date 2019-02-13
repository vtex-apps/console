import React from 'react'


interface Props {
  tickValue: string
  x?: number
  y?: number
  textAnchor?: string
}

const RenderYAxisTick: React.SFC<Props> = (props) => {
  const { tickValue, x, y, textAnchor } = props
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={5} textAnchor={textAnchor} fill="#666" className="f6">
        {tickValue}
      </text>
    </g>
  )
}

export default RenderYAxisTick
