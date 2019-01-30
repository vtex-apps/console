import React, { Component } from 'react'
import { InjectedIntlProps, injectIntl, intlShape } from 'react-intl'
import { Layout, PageBlock } from 'vtex.styleguide'

import { handleLabelTranslation, handleValueTranslation } from '../../utils'


interface Props extends InjectedIntlProps {
  active: boolean
  label: string
  payload: any
  type: string
}

class CustomTooltip extends Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  public handleLabel = (label: string) => {
    // const { intl } = this.props
    // return intl.formatMessage({ id: label })
    return label
  }

  public handleValue = (value: number) => {
    const { intl } = this.props
    return intl.formatNumber(value)
  }

  public render() {
    const { active } = this.props

    if (active) {
      const { payload, label } = this.props

      return (
        <PageBlock>
          <div className="t-small">
            <div className="pa2">
              {label}
            </div>
            <div className="flex justify-between" >
              <div className="pa2" style={{ color: payload[0].color }} >
                {`${this.handleLabel(payload[0].dataKey)}:  `}
              </div>
              <div className="pa2" >
                {this.handleValue(payload[0].value)}
              </div>
            </div>

            <div className="flex justify-between" >
              <div className="pa2" style={{ color: payload[1].color }} >
                {`${this.handleLabel(payload[1].dataKey)}:  `}
              </div>
              <div className="pa2" >
                {this.handleValue(payload[1].value)}
              </div>
            </div>

            <div className="flex justify-around" >
              <div className="pa2" style={{ color: payload[2].color }} >
                {`${this.handleLabel(payload[2].dataKey)}:  `}
              </div>
              <div className="pa2" >
                {this.handleValue(payload[2].value)}
              </div>
            </div>

            <div className="flex justify-between" >
              <div className="pa2" style={{ color: payload[3].color }} >
                {`${this.handleLabel(payload[3].dataKey)}:  `}
              </div>
              <div className="pa2" >
                {this.handleValue(payload[3].value)}
              </div>
            </div>
          </div>
        </PageBlock>
      )
    }

    return null
  }
}

export default injectIntl(CustomTooltip)
