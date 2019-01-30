import React from 'react'

export const TimeContext = React.createContext({
  timeControllers: {
    startDate: new Date(),
    endDate: new Date(),
    rangeStep: '',
  },
  setTimeControllers: (timeControllers: TimeController) => {},
})

