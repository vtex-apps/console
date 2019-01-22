import moment from 'moment'
import React from 'react'

export const TimeContext = React.createContext({
  timeControllers: {
    startDate: moment(),
    endDate: moment(),
    rangeStep: '',
  },
  setTimeControllers: (timeControllers: TimeController) => {},
})

