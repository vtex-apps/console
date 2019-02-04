import React from 'react'


interface Props {
  title: string
}


const BlockTitle = ({ title }: Props) => (
  <h3 className="block__title mt0">{title}</h3>
)

export default BlockTitle
