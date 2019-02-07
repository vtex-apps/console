import { map } from 'ramda'
import React from 'react'
import { FormattedNumber, InjectedIntlProps, injectIntl } from 'react-intl'
import { TooltipProps } from 'recharts'
import { PageBlock } from 'vtex.styleguide'


type Props = InjectedIntlProps & TooltipProps

const CustomTooltip: React.SFC<Props> = (props) => {
  const { active, payload, label } = props

  return active
    ? (
      <PageBlock>
        <div className="t-small">
          <div className="pa2">
            {label}
          </div>
          {
            map((dataPoint) => (
              <div key={dataPoint.name} className="flex justify-between" >
                <div className="pa2" style={{ color: dataPoint.color }} >
                  {`${dataPoint.dataKey}:  `}
                </div>
                <div className="pa2" >
                  <FormattedNumber value={Number(dataPoint.value)} />
                </div>
              </div>
            ), payload || [])
          }
        </div>
      </PageBlock>
    ) : null
}

export default injectIntl(CustomTooltip)
