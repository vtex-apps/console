import React from 'react'


interface TimeContextInterface {
  timeControllers: TimeController
  setTimeControllers: SetTimeControllers
}


export const TimeContext = React.createContext<TimeContextInterface>({
  setTimeControllers: (timeControllers: TimeController) => undefined,
  timeControllers: {
    endDate: new Date(),
    mode: undefined,
    rangeStep: '',
    startDate: new Date(),
  },
})

