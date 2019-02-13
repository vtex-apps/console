import { map } from 'ramda'
import React from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { TooltipPayload, TooltipProps } from 'recharts'
import { PageBlock } from 'vtex.styleguide'

import { abbrPerc } from '../../../../common/dataAnalysis'
import RenderTooltip from './RenderTooltip'


type Props = InjectedIntlProps & TooltipProps & { name: string }


const getColor = (dataPoint: TooltipPayload) => {
  if (dataPoint.color === undefined) {
    return dataPoint.fill
  }
  return dataPoint.color
}

const CustomTooltip: React.SFC<Props> = (props) => {
  const { active, intl, name, payload, label } = props

  return active
    ? (
      <PageBlock>
        <div className="t-small">
          <div className="pa2">
            {label}
          </div>
          {
            map((item) => {
              const itemId: string = item.name
              const itemLabelColor: string = getColor(item) || ''
              const itemLabel: string = String(item.dataKey)
              let itemValue: string
              if (name === 'cpuUsageLineChart') {
                itemValue = abbrPerc(item.value, intl)
              } else {
                itemValue = intl.formatNumber(Number(item.value))
              }
              return (
                <RenderTooltip
                  key={itemId}
                  label={itemLabel}
                  labelColor={itemLabelColor}
                  value={itemValue}
                />
              )
            }, payload || [])
          }
        </div>
      </PageBlock>
    ) : null
}

export default injectIntl(CustomTooltip)
