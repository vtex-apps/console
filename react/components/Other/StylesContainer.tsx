import React from 'react'

interface Props {
  children: React.ReactNode
}

const StylesContainer = (props: Props) => (
  <div className="w-90 mt7 mr-auto ml-auto">{props.children}</div>
)

export default StylesContainer
