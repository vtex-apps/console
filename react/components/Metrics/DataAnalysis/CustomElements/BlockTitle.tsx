import React from 'react'


interface Props {
  title: string
}


const BlockTitle: React.SFC<Props> = ({ title }) => {
  return (<h3 className="block__title mt0">{title}</h3>)
}

export default BlockTitle
