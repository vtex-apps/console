import React from 'react'


interface AppContextInterface {
  appControllers: AppController
  setAppControllers: SetAppControllers
}


export const AppContext = React.createContext<AppContextInterface>({
  appControllers: {
    appName: '',
    chosenMajor: '',
    chosenMinor: '',
    chosenPatch: '',
    production: true,
    region: 'Any',
  },
  setAppControllers: (appControllers: AppController) => undefined,
})
