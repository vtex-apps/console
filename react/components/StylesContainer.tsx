import React from 'react'

interface Props {
  children: React.ReactNode
}

const StylesContainer = (props: Props) => (
  <div className="w-90 mv6 ph6 mr-auto ml-auto">{props.children}</div>
)

export default StylesContainer
