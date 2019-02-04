import React from 'react'

import AppPicker from './appPicker'
import ContextPicker from './contextPicker'
import RegionPicker from './regionPicker'
import VersionInput from './versionInput'


const EnvControllers = () => {
  return (
    <div className="flex br4 bg-base flex-wrap w-100 pa5">
      <div className="w-40 pa4 mr2">
        <AppPicker />
      </div>
      <div className="w-40 pa4 mr2">
        <VersionInput />
      </div>
      <div className="w-40 pa4 mr2">
        <RegionPicker />
      </div>
      <div className="w-40 pa4 mr2">
        <ContextPicker />
      </div>
    </div>
  )
}

export default EnvControllers
