import React from 'react'


interface TimeContextInterface {
  timeControllers: TimeController
  setTimeControllers: SetTimeControllers
}

export const TimeContext = React.createContext<TimeContextInterface>({
  timeControllers: {
    startDate: new Date(),
    endDate: new Date(),
    rangeStep: '',
  },
  setTimeControllers: (timeControllers: TimeController) => undefined,
})

