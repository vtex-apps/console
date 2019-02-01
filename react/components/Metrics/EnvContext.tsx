import React from 'react'


interface EnvContextInterface {
  envControllers: EnvController
  setEnvControllers: SetEnvControllers
}


export const EnvContext = React.createContext<EnvContextInterface>({
  envControllers: {
    appName: '',
    chosenMajor: '',
    chosenMinor: '',
    chosenPatch: '',
    production: true,
    region: 'Any',
  },
  setEnvControllers: (envControllers: EnvController) => undefined,
})
