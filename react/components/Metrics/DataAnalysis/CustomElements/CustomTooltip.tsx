import { map } from 'ramda'
import React from 'react'
import { InjectedIntl, InjectedIntlProps, injectIntl } from 'react-intl'
import { TooltipPayload, TooltipProps } from 'recharts'
import { PageBlock } from 'vtex.styleguide'

import { abbrPerc, getFormattedTime } from '../../../../common/dataAnalysis'
import RenderTooltip from './RenderTooltip'


type Props = InjectedIntlProps & TooltipProps & {
  name: string
  stepModifier: string
}


const getLabel = (label: string | number, name: string, intl: InjectedIntl, stepModifier: string) => {
  if (name !== 'statusCodeBarChart') {
    return getFormattedTime(label, intl, stepModifier)
  }
  return label
}

const getColor = (dataPoint: TooltipPayload) => {
  if (dataPoint.color === undefined) {
    return dataPoint.fill
  }
  return dataPoint.color
}

const CustomTooltip: React.SFC<Props> = (props) => {
  const { active, intl, name, payload, label, stepModifier } = props

  return active
    ? (
      <PageBlock>
        <div className="t-small">
          <div className="pa2">
            {getLabel(label!, name, intl, stepModifier)}
          </div>
          {
            map((item) => {
              const itemLabelColor: string = getColor(item) || ''
              const itemLabel: string = String(item.name)
              let itemValue: string
              if (name === 'cpuUsageLineChart' || name === 'statusCodeLineChart') {
                itemValue = abbrPerc(item.value, intl)
              } else {
                itemValue = intl.formatNumber(Number(item.value))
              }
              return (
                <RenderTooltip
                  key={itemLabel}
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
