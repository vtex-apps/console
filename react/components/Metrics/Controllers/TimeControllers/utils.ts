const setTimeControllerOptions = () => {
  return [
    { value: 'Absolute', label: 'console.time.controller.absolute' },
    { value: 'Relative', label: 'console.time.controller.relative' },
  ]
}

export const timeControllerOptions = setTimeControllerOptions()
