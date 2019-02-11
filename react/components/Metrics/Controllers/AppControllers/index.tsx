import React from 'react'

import AppNamePicker from './AppNamePicker'
import EnvPicker from './EnvPicker'
import RegionPicker from './RegionPicker'
import VersionInput from './VersionInput'


const AppControllers = () => {
  return (
    <div className="flex br4 bg-base flex-wrap w-100 pa5">
      <div className="w-40 pa4 mr2">
        <AppNamePicker />
      </div>
      <div className="w-40 pa4 mr2">
        <VersionInput />
      </div>
      <div className="w-40 pa4 mr2">
        <RegionPicker />
      </div>
      <div className="w-40 pa4 mr2">
        <EnvPicker />
      </div>
    </div>
  )
}

export default AppControllers
