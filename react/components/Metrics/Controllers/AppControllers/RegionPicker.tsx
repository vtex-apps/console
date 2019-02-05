import React from 'react'
import { Dropdown } from 'vtex.styleguide'

import { AppContext } from '../../Contexts/AppContext'


const options = [
  {
    label: 'Any',
    value: '',
  },
  {
    label: 'East-1',
    value: 'aws-us-east-1',
  },
  {
    label: 'East-2',
    value: 'aws-us-east-2',
  },
]


const RegionPicker = () => {
  return (
    <AppContext.Consumer>
      {({ appControllers, setAppControllers }) => (
        <Dropdown
          value={appControllers.region}
          label="Region"
          options={options}
          onChange={(_: Event, region: string) => setAppControllers({
            ...appControllers,
            region,
          })}
        />
      )}
    </AppContext.Consumer>
  )
}

export default RegionPicker
