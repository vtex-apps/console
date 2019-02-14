import React from 'react'

import AppNamePicker from './AppNamePicker'
import EnvPicker from './EnvPicker'
import RegionPicker from './RegionPicker'
import VersionInput from './VersionInput'


const AppControllers = () => {
  return (
    <div className="flex br4 bg-base flex-wrap w-100 pa2">
      <div className="pa4">
        <AppNamePicker />
      </div>
      <div className="pa4">
        <VersionInput />
      </div>
      <div className="pa4">
        <RegionPicker />
      </div>
      <div className="pa4">
        <EnvPicker />
      </div>
    </div>
  )
}

export default AppControllers
